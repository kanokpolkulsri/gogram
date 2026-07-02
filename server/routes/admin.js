import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Helper Admin Verification Middleware
const verifyAdmin = async (req, res, next) => {
  try {
    const adminRes = await query('SELECT role, name FROM users WHERE uid = $1', [req.user.uid]);
    if (adminRes.rows.length === 0 || adminRes.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required.' });
    }
    req.adminName = adminRes.rows[0].name;
    next();
  } catch (error) {
    console.error('Error verifying admin status:', error);
    res.status(500).json({ error: 'Server error during administrator verification' });
  }
};

// Apply authenticators to all admin routes
router.use(authenticate, verifyAdmin);

// Create log entry helper
const logAction = async (adminId, adminName, action) => {
  try {
    await query(
      `INSERT INTO audit_logs (admin_id, action, timestamp)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [adminId, action]
    );
    console.log(`Audit Log: [${adminName}] ${action}`);
  } catch (e) {
    console.error('Failed to write audit log:', e);
  }
};

// Fetch system stats for dashboard
router.get('/stats', async (req, res) => {
  try {
    const usersCount = await query('SELECT COUNT(*)::int AS count FROM users');
    const premiumCount = await query(
      `SELECT COUNT(*)::int AS count FROM users 
       WHERE subscription_expires_at > CURRENT_TIMESTAMP`
    );
    const questionsCount = await query('SELECT COUNT(*)::int AS count FROM questions');
    const promosCount = await query(
      `SELECT COUNT(*)::int AS count FROM promo_codes 
       WHERE expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP`
    );
    res.json({
      totalUsers: usersCount.rows[0].count,
      premiumUsers: premiumCount.rows[0].count,
      totalQuestions: questionsCount.rows[0].count,
      activePromoCodesCount: promosCount.rows[0].count
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Server error while fetching system stats' });
  }
});

// Fetch detailed progress & promo claims for a single user
router.get('/users/:uid/details', async (req, res) => {
  const { uid } = req.params;

  try {
    const userRes = await query('SELECT uid, name FROM users WHERE uid = $1', [uid]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get category progress metrics completed
    const progressRes = await query(
      `SELECT category_id, xp FROM user_category_progress WHERE user_id = $1`,
      [uid]
    );
    const progress = {};
    progressRes.rows.forEach(p => {
      progress[p.category_id] = p.xp;
    });

    // Get promo codes used
    const promoCodesRes = await query(
      `SELECT pc.code, up.is_suspended FROM user_promo_codes up
       JOIN promo_codes pc ON up.code = pc.code
       WHERE up.user_id = $1`,
      [uid]
    );
    
    const usedPromoCodes = promoCodesRes.rows.map(p => p.code);
    const suspendedPromoCodes = promoCodesRes.rows.filter(p => p.is_suspended).map(p => p.code);

    res.json({
      progress,
      usedPromoCodes,
      suspendedPromoCodes
    });
  } catch (error) {
    console.error('Error fetching admin user details:', error);
    res.status(500).json({ error: 'Server error while fetching user profile details' });
  }
});

// Fetch paginated questions list with filters
router.get('/questions', async (req, res) => {
  try {
    const search = req.query.search || '';
    const categoryId = req.query.categoryId || 'all';
    const unitId = req.query.unitId || 'all';
    const difficulty = req.query.difficulty || 'all';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const queryParams = [];
    let paramIndex = 1;
    const whereClauses = [];

    if (search.trim() !== '') {
      whereClauses.push(`q.question ILIKE $${paramIndex}`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (categoryId !== 'all') {
      whereClauses.push(`u.category_id = $${paramIndex}`);
      queryParams.push(categoryId);
      paramIndex++;
    }

    if (unitId !== 'all') {
      whereClauses.push(`q.unit_id = $${paramIndex}`);
      queryParams.push(parseInt(unitId));
      paramIndex++;
    }

    if (difficulty !== 'all') {
      const dbLvlPattern = difficulty.toLowerCase() === 'easy' 
        ? 'easy' 
        : difficulty.toLowerCase() === 'medium' 
        ? 'medium%' 
        : 'hard%';

      whereClauses.push(`q.level_id LIKE $${paramIndex}`);
      queryParams.push(dbLvlPattern);
      paramIndex++;
    }

    const whereClauseStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Total count query
    const countRes = await query(
      `SELECT COUNT(*)::int AS count 
       FROM questions q
       JOIN units u ON q.unit_id = u.id
       ${whereClauseStr}`,
      queryParams
    );
    const total = countRes.rows[0].count;

    // Paginated questions query
    const queryStr = `
      SELECT q.id, q.unit_id AS "unitId", q.level_id AS "levelId", q.question, q.options, 
             q.correct_answer AS "correctAnswer", q.explanation, q.explanation_th AS "explanationTh",
             u.title AS "unitTitle", u.category_id AS "categoryId", c.title AS "categoryTitle"
       FROM questions q
       JOIN units u ON q.unit_id = u.id
       JOIN categories c ON u.category_id = c.id
       ${whereClauseStr}
       ORDER BY q.unit_id, q.level_id, q.id
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit);
    queryParams.push(offset);

    const questionsRes = await query(queryStr, queryParams);
    const questions = questionsRes.rows.map(q => {
      let parsedOptions = q.options;
      if (typeof q.options === 'string') {
        try {
          parsedOptions = JSON.parse(q.options);
        } catch (err) {
          parsedOptions = [];
        }
      }
      return {
        id: q.id,
        unitId: q.unitId,
        unitTitle: q.unitTitle,
        categoryId: q.categoryId,
        categoryTitle: q.categoryTitle,
        question: q.question,
        options: parsedOptions,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        explanationTh: q.explanationTh,
        difficulty: q.levelId.includes('easy') ? 'EASY' : q.levelId.includes('medium') ? 'MEDIUM' : 'HARD'
      };
    });

    res.json({
      questions,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching admin questions:', error);
    res.status(500).json({ error: 'Server error while fetching questions' });
  }
});

// Delete a single question
router.delete('/questions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const qRes = await query('SELECT question FROM questions WHERE id = $1', [id]);
    if (qRes.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const qText = qRes.rows[0].question;

    await query('DELETE FROM questions WHERE id = $1', [id]);
    await logAction(req.user.uid, req.adminName, `Deleted question: "${qText.substring(0, 40)}..."`);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Server error during question deletion' });
  }
});

// Edit a single question
router.put('/questions/:id', async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer, explanation, explanationTh } = req.body;

  if (!question || !options || !correctAnswer) {
    return res.status(400).json({ error: 'question, options, and correctAnswer are required' });
  }

  try {
    const qRes = await query('SELECT id FROM questions WHERE id = $1', [id]);
    if (qRes.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    await query(
      `UPDATE questions 
       SET question = $1, options = $2, correct_answer = $3, explanation = $4, explanation_th = $5
       WHERE id = $6`,
      [
        question,
        JSON.stringify(options),
        correctAnswer,
        explanation || null,
        explanationTh || null,
        id
      ]
    );

    await logAction(req.user.uid, req.adminName, `Edited question details for question ID: ${id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error editing question:', error);
    res.status(500).json({ error: 'Server error during question update' });
  }
});

// 1. Fetch users (paginated and filtered)
router.get('/users', async (req, res) => {
  try {
    const search = req.query.search || '';
    const role = req.query.role || 'all';
    const status = req.query.status || 'all';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const queryParams = [];
    let paramIndex = 1;
    const whereClauses = [];

    if (search.trim() !== '') {
      whereClauses.push(`(name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (role !== 'all') {
      if (role === 'admin' || role === 'user') {
        whereClauses.push(`role = $${paramIndex}`);
        queryParams.push(role);
        paramIndex++;
      } else if (role === 'subscribed') {
        whereClauses.push(`subscription_expires_at > CURRENT_TIMESTAMP`);
      } else if (role === 'free') {
        whereClauses.push(`role = 'user' AND (subscription_expires_at IS NULL OR subscription_expires_at <= CURRENT_TIMESTAMP)`);
      }
    }

    if (status !== 'all') {
      whereClauses.push(`status = $${paramIndex}`);
      queryParams.push(status);
      paramIndex++;
    }

    const whereClauseStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Query for total matching count
    const countRes = await query(
      `SELECT COUNT(*)::int AS count FROM users ${whereClauseStr}`,
      queryParams
    );
    const total = countRes.rows[0].count;

    // Query for paginated users
    const usersQueryStr = `
      SELECT uid, email, name, role, status, joined_at AS "joined", 
             hearts_count AS "heartsCount", subscription_expires_at AS "subscriptionExpiresAt"
      FROM users
      ${whereClauseStr}
      ORDER BY joined_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit);
    queryParams.push(offset);

    const usersRes = await query(usersQueryStr, queryParams);
    
    const users = usersRes.rows.map(u => {
      const now = new Date();
      const hasInfinity = u.subscriptionExpiresAt && new Date(u.subscriptionExpiresAt) > now;
      return {
        uid: u.uid,
        name: u.name,
        email: u.email,
        authLevel: hasInfinity ? 'subscribed' : (u.role === 'user' ? 'free' : u.role),
        role: u.role,
        joined: u.joined,
        status: u.status,
        hearts: hasInfinity ? 'infinity' : u.heartsCount,
        promoExpiresAt: u.subscriptionExpiresAt ? new Date(u.subscriptionExpiresAt).getTime() : null
      };
    });

    res.json({
      users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching admin users list:', error);
    res.status(500).json({ error: 'Server error while fetching users directory' });
  }
});

// 2. Edit user role (admin / user)
router.put('/users/:uid/role', async (req, res) => {
  const { uid } = req.params;
  const { role } = req.body;

  if (!role || (role !== 'admin' && role !== 'user')) {
    return res.status(400).json({ error: 'Invalid role. Must be admin or user.' });
  }

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await query('UPDATE users SET role = $1 WHERE uid = $2', [role, uid]);
    await logAction(req.user.uid, req.adminName, `Changed role of ${targetUser.rows[0].name} to ${role.toUpperCase()}`);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Server error during role modification' });
  }
});

// 3. Update user status (block/unblock)
router.put('/users/:uid/status', async (req, res) => {
  const { uid } = req.params;
  const { status } = req.body;

  if (!status || (status !== 'active' && status !== 'blocked')) {
    return res.status(400).json({ error: 'Invalid status. Must be active or blocked.' });
  }

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await query('UPDATE users SET status = $1 WHERE uid = $2', [status, uid]);
    await logAction(req.user.uid, req.adminName, `${status === 'blocked' ? 'Blocked' : 'Activated'} user account ${targetUser.rows[0].name}`);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Server error during status modification' });
  }
});

// 4. Update user hearts count directly
router.put('/users/:uid/hearts', async (req, res) => {
  const { uid } = req.params;
  const { heartsValue } = req.body; // can be 'infinity' or an integer

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;

    if (heartsValue === 'infinity') {
      // Grant a perpetual subscription (far in future date)
      await query(
        `UPDATE users SET subscription_expires_at = '2099-12-31T23:59:59Z' WHERE uid = $1`,
        [uid]
      );
      await logAction(req.user.uid, req.adminName, `Set hearts status of ${userName} to Infinity`);
    } else {
      const numericHearts = parseInt(heartsValue) || 10;
      await query(
        `UPDATE users 
         SET hearts_count = $1, subscription_expires_at = NULL, last_heart_refill_at = CURRENT_TIMESTAMP 
         WHERE uid = $2`,
        [numericHearts, uid]
      );
      await logAction(req.user.uid, req.adminName, `Changed hearts pool of ${userName} to ${numericHearts}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user hearts directly:', error);
    res.status(500).json({ error: 'Server error during hearts value modification' });
  }
});

// 5. Update user subscription expiration date
router.put('/users/:uid/subscription', async (req, res) => {
  const { uid } = req.params;
  const { expiresAt } = req.body; // ISO Date string or null

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;
    const dbExpiresVal = expiresAt ? new Date(expiresAt) : null;

    await query(
      `UPDATE users SET subscription_expires_at = $1 WHERE uid = $2`,
      [dbExpiresVal, uid]
    );

    const logMsg = dbExpiresVal 
      ? `Granted premium subscription to ${userName} until ${dbExpiresVal.toLocaleString()}`
      : `Revoked premium subscription from ${userName}`;

    await logAction(req.user.uid, req.adminName, logMsg);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    res.status(500).json({ error: 'Server error during subscription time modification' });
  }
});

// 6. Reset progress in category
router.post('/users/:uid/reset-progress', async (req, res) => {
  const { uid } = req.params;
  const { categoryId } = req.body;

  if (!categoryId) {
    return res.status(400).json({ error: 'categoryId is required' });
  }

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;

    await query('BEGIN');

    // Remove completions matching units belonging to this category
    await query(
      `DELETE FROM completed_lessons 
       WHERE user_id = $1 AND unit_id IN (
         SELECT id FROM units WHERE category_id = $2
       )`,
      [uid, categoryId]
    );

    // Remove ongoing quiz sessions in this category
    await query(
      `DELETE FROM user_quiz_sessions 
       WHERE user_id = $1 AND unit_id IN (
         SELECT id FROM units WHERE category_id = $2
       )`,
      [uid, categoryId]
    );

    // Delete or zero category progress
    await query(
      `INSERT INTO user_category_progress (user_id, category_id, xp)
       VALUES ($1, $2, 0)
       ON CONFLICT (user_id, category_id) 
       DO UPDATE SET xp = 0`,
      [uid, categoryId]
    );

    // Recalculate global total_xp (sum of category progress)
    const sumRes = await query(
      `SELECT COALESCE(SUM(xp), 0) AS total FROM user_category_progress WHERE user_id = $1`,
      [uid]
    );
    const newTotalXp = parseInt(sumRes.rows[0].total);
    await query('UPDATE users SET total_xp = $1 WHERE uid = $2', [newTotalXp, uid]);

    await query('COMMIT');

    await logAction(req.user.uid, req.adminName, `Wiped progress in category [${categoryId.toUpperCase()}] for ${userName}`);
    res.json({ success: true, newTotalXp });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error resetting user progress:', error);
    res.status(500).json({ error: 'Server error during category progress wipe' });
  }
});

// 6b. Directly update user category progress level (levels completed)
router.put('/users/:uid/progress', async (req, res) => {
  const { uid } = req.params;
  const { categoryId, levelValue } = req.body; // levelValue: 1 to 5

  if (!categoryId || levelValue === undefined) {
    return res.status(400).json({ error: 'categoryId and levelValue are required' });
  }

  const targetLevel = parseInt(levelValue) || 1;

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;

    await query('BEGIN');

    // 1. Clear existing completed lessons in this category
    await query(
      `DELETE FROM completed_lessons 
       WHERE user_id = $1 AND unit_id IN (
         SELECT id FROM units WHERE category_id = $2
       )`,
      [uid, categoryId]
    );

    // 2. Fetch units belonging to this category ordered by unit_number
    const unitsRes = await query(
      `SELECT id FROM units WHERE category_id = $1 ORDER BY unit_number`,
      [categoryId]
    );

    const units = unitsRes.rows;
    const completedUnitsCount = targetLevel - 1; // e.g. LV 2 means Unit 1 is completed (1 completed unit)

    // 3. For each completed unit, insert all 5 levels as completed lessons
    for (let i = 0; i < Math.min(completedUnitsCount, units.length); i++) {
      const unitId = units[i].id;
      const levels = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
      for (const lvl of levels) {
        await query(
          `INSERT INTO completed_lessons (user_id, unit_id, level_id)
           VALUES ($1, $2, $3)
           ON CONFLICT (user_id, unit_id, level_id) DO NOTHING`,
          [uid, unitId, lvl]
        );
      }
    }

    // 4. Update user_category_progress
    await query(
      `INSERT INTO user_category_progress (user_id, category_id, xp)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, category_id) 
       DO UPDATE SET xp = $3`,
      [uid, categoryId, completedUnitsCount]
    );

    // 5. Recalculate global total_xp (sum of category progress)
    const sumRes = await query(
      `SELECT COALESCE(SUM(xp), 0) AS total FROM user_category_progress WHERE user_id = $1`,
      [uid]
    );
    const newTotalXp = parseInt(sumRes.rows[0].total);
    await query('UPDATE users SET total_xp = $1 WHERE uid = $2', [newTotalXp, uid]);

    await query('COMMIT');

    await logAction(
      req.user.uid, 
      req.adminName, 
      `Updated learning progress for ${userName} in category [${categoryId.toUpperCase()}] to Level ${targetLevel}`
    );

    res.json({ success: true, newTotalXp });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error updating user progress level:', error);
    res.status(500).json({ error: 'Server error during category progress level modification' });
  }
});

// 7. Delete user account and progress
router.delete('/users/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;

    // Cascade references will automatically purge other dependent records
    await query('DELETE FROM users WHERE uid = $1', [uid]);
    
    await logAction(req.user.uid, req.adminName, `Permanently removed user account and learning profile of ${userName}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error during account removal' });
  }
});

// 8. Suspend/Unsuspend user's claimed promo code
router.post('/users/:uid/promo-codes/:code/suspend', async (req, res) => {
  const { uid, code } = req.params;
  const { isSuspended } = req.body; // boolean

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;
    const codeUpper = code.toUpperCase();

    await query(
      `UPDATE user_promo_codes SET is_suspended = $1 
       WHERE user_id = $2 AND code = $3`,
      [isSuspended, uid, codeUpper]
    );

    // If the code is infinite hearts, suspend/reactivate the infinite hearts benefit too
    const promoRes = await query('SELECT type, reward, infinity_duration_minutes FROM promo_codes WHERE code = $1', [codeUpper]);
    if (promoRes.rows.length > 0 && promoRes.rows[0].type === 'infinity') {
      if (isSuspended) {
        // Revoke infinite hearts
        await query(
          `UPDATE users SET subscription_expires_at = NULL WHERE uid = $1`,
          [uid]
        );
      } else {
        // Restore infinite hearts
        const promo = promoRes.rows[0];
        let subEnd = null;
        if (promo.infinity_duration_minutes) {
          subEnd = new Date(Date.now() + promo.infinity_duration_minutes * 60 * 1000);
        } else {
          subEnd = new Date('2099-12-31T23:59:59Z');
        }
        await query(
          `UPDATE users SET subscription_expires_at = $1 WHERE uid = $2`,
          [subEnd, uid]
        );
      }
    }

    await logAction(
      req.user.uid, 
      req.adminName, 
      `${isSuspended ? 'Suspended' : 'Reactivated'} promo code claims [${codeUpper}] for ${userName}`
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error suspending user promo code:', error);
    res.status(500).json({ error: 'Server error during promo code suspension' });
  }
});

// 9. Remove user promo code claim record completely
router.delete('/users/:uid/promo-codes/:code', async (req, res) => {
  const { uid, code } = req.params;
  const codeUpper = code.toUpperCase();

  try {
    const targetUser = await query('SELECT name FROM users WHERE uid = $1', [uid]);
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = targetUser.rows[0].name;

    await query('BEGIN');

    // Delete claims record
    await query(
      `DELETE FROM user_promo_codes WHERE user_id = $1 AND code = $2`,
      [uid, codeUpper]
    );

    // If it was infinite hearts, remove active infinite hearts status
    const promoRes = await query('SELECT type FROM promo_codes WHERE code = $1', [codeUpper]);
    if (promoRes.rows.length > 0 && promoRes.rows[0].type === 'infinity') {
      await query(
        `UPDATE users SET subscription_expires_at = NULL WHERE uid = $1`,
        [uid]
      );
    }

    await query('COMMIT');

    await logAction(req.user.uid, req.adminName, `Revoked claims benefit and deleted promo code registry [${codeUpper}] from ${userName}`);
    res.json({ success: true });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error deleting user promo claim:', error);
    res.status(500).json({ error: 'Server error during promo code claims revocation' });
  }
});

// 10. Fetch all promo codes
router.get('/promo-codes', async (req, res) => {
  try {
    const promosRes = await query('SELECT * FROM promo_codes ORDER BY code');
    const promos = promosRes.rows.map(p => ({
      code: p.code,
      type: p.type,
      reward: p.reward,
      description: p.description,
      expiresAt: p.expires_at ? new Date(p.expires_at).toISOString().split('T')[0] : null,
      infinityDuration: p.infinity_duration_minutes, // returned as raw minutes
      maxRedemptions: p.max_redemptions
    }));

    // Find redemptions count for each
    for (const p of promos) {
      const redemptionsCount = await query(
        `SELECT COUNT(*) FROM user_promo_codes WHERE code = $1`,
        [p.code]
      );
      p.usedByCount = parseInt(redemptionsCount.rows[0].count);
    }

    res.json(promos);
  } catch (error) {
    console.error('Error fetching admin promo codes:', error);
    res.status(500).json({ error: 'Server error while fetching promo codes list' });
  }
});

// 11. Create a new promo code
router.post('/promo-codes', async (req, res) => {
  const { code, type, reward, description, expiresAt, infinityDuration, maxRedemptions } = req.body;

  if (!code || !type || !reward) {
    return res.status(400).json({ error: 'code, type, and reward are required' });
  }

  const codeUpper = code.trim().toUpperCase();

  try {
    const existing = await query('SELECT code FROM promo_codes WHERE code = $1', [codeUpper]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Promo code already exists' });
    }

    await query(
      `INSERT INTO promo_codes (code, type, reward, description, expires_at, infinity_duration_minutes, max_redemptions)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        codeUpper,
        type,
        reward,
        description || '',
        expiresAt ? new Date(expiresAt) : null,
        infinityDuration ? parseInt(infinityDuration) : null,
        maxRedemptions ? parseInt(maxRedemptions) : null
      ]
    );

    await logAction(req.user.uid, req.adminName, `Created promotional code [${codeUpper}] (${type.toUpperCase()} reward)`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating promo code:', error);
    res.status(500).json({ error: 'Server error during promo code creation' });
  }
});

// 12. Delete a promo code
router.delete('/promo-codes/:code', async (req, res) => {
  const { code } = req.params;
  const codeUpper = code.toUpperCase();

  try {
    await query('DELETE FROM promo_codes WHERE code = $1', [codeUpper]);
    await logAction(req.user.uid, req.adminName, `Deleted promotional code [${codeUpper}] from system database`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    res.status(500).json({ error: 'Server error during promo code global deletion' });
  }
});

// 13. Edit a promo code
router.put('/promo-codes/:code', async (req, res) => {
  const { code } = req.params;
  const codeUpper = code.toUpperCase();
  const { type, reward, description, expiresAt, infinityDuration, maxRedemptions } = req.body;

  try {
    await query(
      `UPDATE promo_codes 
       SET type = $1, reward = $2, description = $3, expires_at = $4, 
           infinity_duration_minutes = $5, max_redemptions = $6
       WHERE code = $7`,
      [
        type,
        reward,
        description || '',
        expiresAt ? new Date(expiresAt) : null,
        infinityDuration ? parseInt(infinityDuration) : null,
        maxRedemptions ? parseInt(maxRedemptions) : null,
        codeUpper
      ]
    );

    await logAction(req.user.uid, req.adminName, `Edited parameters of promo code [${codeUpper}]`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error editing promo code:', error);
    res.status(500).json({ error: 'Server error during promo code parameters modification' });
  }
});

// 14. Fetch audit logs
router.get('/audit-logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || null;
    let queryStr = `
      SELECT a.id, u.name AS "adminName", a.action, a.timestamp 
      FROM audit_logs a
      JOIN users u ON a.admin_id = u.uid
      ORDER BY a.timestamp DESC
    `;
    const params = [];
    if (limit) {
      queryStr += ` LIMIT $1`;
      params.push(limit);
    }
    const logsRes = await query(queryStr, params);
    res.json(logsRes.rows);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Server error while fetching system audit logs' });
  }
});

// 15. Approve and publish AI draft questions bulk
router.post('/questions/publish', async (req, res) => {
  const { unitId, levelId, questions } = req.body; // questions array

  if (!unitId || !levelId || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'unitId, levelId, and questions array are required' });
  }

  try {
    const unitRes = await query('SELECT title FROM units WHERE id = $1', [unitId]);
    if (unitRes.rows.length === 0) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    const unitTitle = unitRes.rows[0].title;

    await query('BEGIN');

    for (const q of questions) {
      const qId = q.id || `q-ai-${unitId}-${levelId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      await query(
        `INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE 
         SET question = EXCLUDED.question, options = EXCLUDED.options, correct_answer = EXCLUDED.correct_answer, explanation = EXCLUDED.explanation, explanation_th = EXCLUDED.explanation_th`,
        [
          qId,
          unitId,
          levelId,
          q.question,
          JSON.stringify(q.options),
          q.correctAnswer,
          q.explanation || null,
          q.explanationTh || q.explanation_th || null
        ]
      );
    }

    await query('COMMIT');

    await logAction(
      req.user.uid, 
      req.adminName, 
      `Approved and published ${questions.length} questions into ${unitTitle} (${levelId.toUpperCase()})`
    );

    res.json({ success: true });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error publishing questions:', error);
    res.status(500).json({ error: 'Server error during questions publishing' });
  }
});

// 7. Category CRUD Routes

// 7a. Create a category
router.post('/categories', async (req, res) => {
  const { title, description, color } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Category title is required' });
  }
  // Generate a URL-friendly ID from the title
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
  try {
    await query(
      `INSERT INTO categories (id, title, description, color, icon_char)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, title, description || '', color || '#58CC02', title.slice(0, 1).toUpperCase()]
    );
    await logAction(req.user.uid, req.adminName, `Created category "${title}" (${id})`);
    res.json({ success: true, categoryId: id });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Server error while creating category' });
  }
});

// 7b. Update/Edit a category (including color)
router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, color } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Category title is required' });
  }
  try {
    const updateRes = await query(
      `UPDATE categories 
       SET title = $1, description = $2, color = $3 
       WHERE id = $4`,
      [title, description || '', color || '#58CC02', id]
    );
    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await logAction(req.user.uid, req.adminName, `Updated category "${title}" (${id})`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Server error while updating category' });
  }
});

// 7c. Delete a category
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const delRes = await query('DELETE FROM categories WHERE id = $1', [id]);
    if (delRes.rowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await logAction(req.user.uid, req.adminName, `Deleted category (${id})`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Server error while deleting category' });
  }
});

// 8. Unit (Topic) CRUD Routes

// 8a. Create a unit
router.post('/units', async (req, res) => {
  const { categoryId, title, description, color } = req.body;
  if (!categoryId || !title) {
    return res.status(400).json({ error: 'categoryId and title are required' });
  }
  try {
    // Get count of existing units in this category to calculate unit_number
    const countRes = await query('SELECT COALESCE(MAX(id), 0) AS max_id FROM units');
    const countInCat = await query('SELECT COUNT(*)::int AS count FROM units WHERE category_id = $1', [categoryId]);
    
    const newUnitId = countRes.rows[0].max_id + 1;
    const unitNumber = countInCat.rows[0].count + 1;
    const unitColor = color || '#58CC02';

    await query(
      `INSERT INTO units (id, category_id, unit_number, title, description, color)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newUnitId, categoryId, unitNumber, title, description || '', unitColor]
    );

    // Seed default levels for this unit (easy, medium1, medium2, hard1, hard2)
    const levels = [
      { id: 'easy', label: 'Easy', xp: 10, icon: 'star' },
      { id: 'medium1', label: 'Medium 1', xp: 15, icon: 'star' },
      { id: 'medium2', label: 'Medium 2', xp: 15, icon: 'dumbbell' },
      { id: 'hard1', label: 'Hard 1', xp: 20, icon: 'level-up' },
      { id: 'hard2', label: 'Hard 2', xp: 35, icon: 'boss' }
    ];

    for (const lvl of levels) {
      await query(
        `INSERT INTO levels (unit_id, id, label, xp_reward, icon)
         VALUES ($1, $2, $3, $4, $5)`,
        [newUnitId, lvl.id, lvl.label, lvl.xp, lvl.icon]
      );
    }

    await logAction(req.user.uid, req.adminName, `Created topic "${title}" (ID ${newUnitId}) in category ${categoryId}`);
    res.json({ success: true, unitId: newUnitId });
  } catch (error) {
    console.error('Error creating unit:', error);
    res.status(500).json({ error: 'Server error while creating topic' });
  }
});

// 8b. Update/Edit a unit
router.put('/units/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Topic title is required' });
  }
  try {
    const updateRes = await query(
      `UPDATE units 
       SET title = $1, description = $2 
       WHERE id = $3`,
      [title, description || '', parseInt(id)]
    );
    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    await logAction(req.user.uid, req.adminName, `Updated topic "${title}" (ID ${id})`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating unit:', error);
    res.status(500).json({ error: 'Server error while updating topic' });
  }
});

// 8c. Delete a unit
router.delete('/units/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const delRes = await query('DELETE FROM units WHERE id = $1', [parseInt(id)]);
    if (delRes.rowCount === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    await logAction(req.user.uid, req.adminName, `Deleted topic (ID ${id})`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting unit:', error);
    res.status(500).json({ error: 'Server error while deleting topic' });
  }
});

export default router;
