import { MAX_HEARTS, HEARTS_REFILL_RATE_MINUTES, HEARTS_REFILL_COUNT } from '../config.js';
import { query } from '../db/index.js';

/**
 * Calculates and updates a user's hearts in the database based on elapsed time.
 * If the user's subscription is active, hearts are effectively infinite (reverts to fallback when subscription ends).
 * Returns the updated user row.
 */
export const syncAndGetHearts = async (user) => {
  const { uid, hearts_count, subscription_expires_at, last_heart_refill_at } = user;

  // 1. Check if subscription is active
  const now = new Date();
  const isSubscriptionActive = subscription_expires_at && new Date(subscription_expires_at) > now;
  if (isSubscriptionActive) {
    return {
      ...user,
      hearts: 'infinity',
      isPremium: true
    };
  }

  // 2. If hearts are already full, do nothing
  if (hearts_count >= MAX_HEARTS) {
    // Keep refill timestamp fresh when full
    if (new Date(last_heart_refill_at).getTime() < now.getTime() - 10000) {
      await query(
        `UPDATE users SET last_heart_refill_at = $1 WHERE uid = $2`,
        [now, uid]
      );
      user.last_heart_refill_at = now;
    }
    return {
      ...user,
      hearts: hearts_count,
      isPremium: false
    };
  }

  // 3. Calculate how many hearts should be refilled
  const lastRefillTime = new Date(last_heart_refill_at).getTime();
  const elapsedMs = now.getTime() - lastRefillTime;
  const refillIntervalMs = HEARTS_REFILL_RATE_MINUTES * 60 * 1000;

  if (elapsedMs >= refillIntervalMs) {
    const intervalsElapsed = Math.floor(elapsedMs / refillIntervalMs);
    const heartsToAdd = intervalsElapsed * HEARTS_REFILL_COUNT;
    const updatedHearts = Math.min(MAX_HEARTS, hearts_count + heartsToAdd);

    // Calculate new refill timestamp anchor
    let newRefillTime;
    if (updatedHearts >= MAX_HEARTS) {
      newRefillTime = now;
    } else {
      newRefillTime = new Date(lastRefillTime + intervalsElapsed * refillIntervalMs);
    }

    const updateRes = await query(
      `UPDATE users 
       SET hearts_count = $1, last_heart_refill_at = $2 
       WHERE uid = $3 
       RETURNING *`,
      [updatedHearts, newRefillTime, uid]
    );

    const updatedUser = updateRes.rows[0];
    return {
      ...updatedUser,
      hearts: updatedUser.hearts_count,
      isPremium: false
    };
  }

  return {
    ...user,
    hearts: hearts_count,
    isPremium: false
  };
};
