import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import { syncAndGetHearts } from '../utils/hearts.js';

const router = express.Router();

// Claim a promo or referral code
router.post('/claim', authenticate, async (req, res) => {
  const { uid } = req.user;
  const rawCode = req.body.code;

  if (!rawCode) {
    return res.status(400).json({ error: 'Promo code is required' });
  }

  const codeUpper = rawCode.trim().toUpperCase();

  try {
    // 1. Check if user already claimed this code
    const claimCheck = await query(
      `SELECT * FROM user_promo_codes WHERE user_id = $1 AND code = $2`,
      [uid, codeUpper]
    );

    if (claimCheck.rows.length > 0) {
      return res.status(400).json({ error: 'You have already used this promo code.' });
    }

    // 2. Fetch promo code info
    let promoRes = await query('SELECT * FROM promo_codes WHERE code = $1', [codeUpper]);
    let promo = promoRes.rows[0];
    let isReferral = false;

    // Handle dynamic referral codes starting with REF- if no static code matches
    if (!promo) {
      const match = codeUpper.match(/^REF-(.+)$/);
      if (match) {
        const refIdentifier = match[1].toLowerCase();
        // Check if there is an active user matching name or UID
        const referrerRes = await query(
          `SELECT uid FROM users WHERE LOWER(name) = $1 OR LOWER(uid) = $1`,
          [refIdentifier]
        );
        if (referrerRes.rows.length > 0) {
          isReferral = true;
          // Dynamically instantiate referral reward (e.g., 10 hearts)
          promo = {
            code: codeUpper,
            type: 'hearts',
            reward: '10',
            description: `Referral code from ${refIdentifier}`,
            expires_at: null,
            infinity_duration_minutes: null,
            max_redemptions: null
          };
        }
      }
    }

    if (!promo) {
      return res.status(400).json({ error: 'Invalid promo or referral code.' });
    }

    // 3. Validate code constraints
    const now = new Date();

    if (promo.expires_at && new Date(promo.expires_at) < now) {
      return res.status(400).json({ error: 'This promo code has expired.' });
    }

    if (promo.max_redemptions) {
      const redemptionCountRes = await query(
        `SELECT COUNT(*) FROM user_promo_codes WHERE code = $1`,
        [codeUpper]
      );
      const redemptions = parseInt(redemptionCountRes.rows[0].count);
      if (redemptions >= promo.max_redemptions) {
        return res.status(400).json({ error: 'This promo code has reached its maximum redemptions limit.' });
      }
    }

    // 4. Update Database
    // Fetch current user status
    const userRes = await query('SELECT * FROM users WHERE uid = $1', [uid]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    const user = userRes.rows[0];

    // Apply code benefits
    let updatedHeartsCount = user.hearts_count;
    let updatedSubExpiresAt = user.subscription_expires_at;

    if (promo.type === 'infinity') {
      if (promo.infinity_duration_minutes) {
        // Calculate new expiration time
        const currentSubEnd = user.subscription_expires_at && new Date(user.subscription_expires_at) > now
          ? new Date(user.subscription_expires_at)
          : now;
        updatedSubExpiresAt = new Date(currentSubEnd.getTime() + promo.infinity_duration_minutes * 60 * 1000);
      } else {
        // Perpetual infinity (null represents never expires)
        updatedSubExpiresAt = null; // Wait! If it's perpetual, how do we distinguish? 
        // Let's set it to a date far in the future (e.g., 2099-12-31) to differentiate from 'not subscribed' (null).
        // That makes it extremely clean to manage in database query comparisons!
        updatedSubExpiresAt = new Date('2099-12-31T23:59:59Z');
      }
    } else if (promo.type === 'hearts') {
      const rewardAmt = parseInt(promo.reward) || 10;
      updatedHeartsCount = user.hearts_count + rewardAmt;
    }

    // Save claim in transaction
    await query('BEGIN');

    // Create promo claim check record
    // If it was a dynamic referral code, create it in promo_codes first to satisfy FK constraint
    if (isReferral) {
      await query(
        `INSERT INTO promo_codes (code, type, reward, description, infinity_duration_minutes, max_redemptions)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (code) DO NOTHING`,
        [promo.code, promo.type, promo.reward, promo.description, promo.infinity_duration_minutes, promo.max_redemptions]
      );
    }

    await query(
      `INSERT INTO user_promo_codes (user_id, code, claimed_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [uid, codeUpper]
    );

    // Update user stats
    const updatedUserRes = await query(
      `UPDATE users 
       SET hearts_count = $1, subscription_expires_at = $2
       WHERE uid = $3
       RETURNING *`,
      [updatedHeartsCount, updatedSubExpiresAt, uid]
    );

    await query('COMMIT');

    const updatedUser = updatedUserRes.rows[0];
    const profile = await syncAndGetHearts(updatedUser);

    res.json({
      success: true,
      message: promo.type === 'infinity' 
        ? (promo.infinity_duration_minutes 
            ? `Premium active! You now have infinite hearts until ${updatedSubExpiresAt.toLocaleString()}.` 
            : 'Premium active! You now have infinite hearts.')
        : `Successfully added ${promo.reward} hearts!`,
      hearts: profile.hearts,
      heartsCount: profile.hearts_count,
      subscriptionExpiresAt: profile.subscription_expires_at ? new Date(profile.subscription_expires_at).getTime() : null,
      isPremium: profile.isPremium
    });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error claiming promo code:', error);
    res.status(500).json({ error: 'Server error during promo code claim' });
  }
});

export default router;
