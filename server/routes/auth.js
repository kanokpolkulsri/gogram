import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import { syncAndGetHearts } from '../utils/hearts.js';

const router = express.Router();

// Synchronizes and returns the authenticated user's complete profile
router.post('/sync', authenticate, async (req, res) => {
  const { uid, email } = req.user;
  const name = req.body.name || email.split('@')[0];

  try {
    // 1. Fetch or create user record
    let userRes = await query('SELECT * FROM users WHERE uid = $1', [uid]);
    let user;

    if (userRes.rows.length === 0) {
      // Determine default role (Alex is Admin)
      const role = (email === 'alex@gogram.com') ? 'admin' : 'user';
      
      const insertRes = await query(
        `INSERT INTO users (uid, email, name, role, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [uid, email, name, role, 'active']
      );
      user = insertRes.rows[0];
      console.log(`Created new database user: ${name} (${email})`);
    } else {
      user = userRes.rows[0];
      
      // Update display name if it changed
      if (req.body.name && user.name !== req.body.name) {
        const updateRes = await query(
          `UPDATE users SET name = $1 WHERE uid = $2 RETURNING *`,
          [req.body.name, uid]
        );
        user = updateRes.rows[0];
      }
    }

    // 2. Check if user is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'This account has been suspended by the administrator.' });
    }

    // 3. Process heart refills
    const profile = await syncAndGetHearts(user);

    // 4. Fetch category progress
    const progressRes = await query(
      `SELECT category_id, xp FROM user_category_progress WHERE user_id = $1`,
      [uid]
    );
    const progress = {};
    progressRes.rows.forEach(p => {
      progress[p.category_id] = p.xp;
    });

    // 5. Fetch completed lessons as "unitId-levelId" strings
    const completedRes = await query(
      `SELECT unit_id, level_id FROM completed_lessons WHERE user_id = $1`,
      [uid]
    );
    const completedLessons = completedRes.rows.map(c => `${c.unit_id}-${c.level_id}`);

    // 6. Fetch promo code claim lists
    const promoRes = await query(
      `SELECT code FROM user_promo_codes WHERE user_id = $1 AND is_suspended = FALSE`,
      [uid]
    );
    const usedPromoCodes = promoRes.rows.map(p => p.code);

    res.json({
      uid: profile.uid,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      joinedAt: profile.joined_at,
      totalXP: profile.total_xp,
      hearts: profile.hearts,
      heartsCount: profile.hearts_count,
      lastHeartRefillTime: new Date(profile.last_heart_refill_at).getTime(),
      subscriptionExpiresAt: profile.subscription_expires_at ? new Date(profile.subscription_expires_at).getTime() : null,
      isPremium: profile.isPremium,
      streak: profile.streak,
      progress,
      completedLessons,
      usedPromoCodes
    });
  } catch (error) {
    console.error('Error syncing user profile:', error);
    res.status(500).json({ error: 'Server error during profile synchronization' });
  }
});

export default router;
