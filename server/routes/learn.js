import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Retrieve all categories
router.get('/categories', authenticate, async (req, res) => {
  try {
    const categoriesRes = await query('SELECT * FROM categories ORDER BY id');
    // Map to camelCase expected by the frontend
    const categories = categoriesRes.rows.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      color: c.color,
      iconChar: c.icon_char
    }));
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error while fetching categories' });
  }
});

// Retrieve units for a specific category with levels
router.get('/units', authenticate, async (req, res) => {
  const { categoryId } = req.query;

  try {
    let unitsRes;
    if (categoryId) {
      unitsRes = await query(
        `SELECT * FROM units WHERE category_id = $1 ORDER BY unit_number`,
        [categoryId]
      );
    } else {
      unitsRes = await query(
        `SELECT * FROM units ORDER BY category_id, unit_number`
      );
    }

    const units = [];

    // 2. Fetch levels for each unit and map them
    for (const unit of unitsRes.rows) {
      const levelsRes = await query(
        `SELECT l.id, l.label, l.icon, COUNT(q.id)::int AS question_count
         FROM levels l
         LEFT JOIN questions q ON q.unit_id = l.unit_id AND q.level_id = l.id
         WHERE l.unit_id = $1
         GROUP BY l.unit_id, l.id, l.label, l.icon
         ORDER BY 
           CASE l.id 
             WHEN 'easy' THEN 1 
             WHEN 'medium1' THEN 2 
             WHEN 'medium2' THEN 3 
             WHEN 'hard1' THEN 4 
             WHEN 'hard2' THEN 5 
             ELSE 6 
           END`,
        [unit.id]
      );

      units.push({
        id: unit.id,
        category: unit.category_id,
        unitNumber: unit.unit_number,
        title: unit.title,
        section: `UNIT ${unit.unit_number}`, // Frontend expects a section field
        description: unit.description,
        color: unit.color,
        levels: levelsRes.rows.map(l => ({
          id: l.id,
          label: l.label,
          icon: l.icon,
          questions: Array(l.question_count || 0).fill({})
        }))
      });
    }

    res.json(units);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Server error while fetching units' });
  }
});

// Retrieve leaderboard for a specific category
router.get('/leaderboard/:categoryId', authenticate, async (req, res) => {
  const { categoryId } = req.params;
  const { uid } = req.user;

  try {
    // 1. Fetch top 20 active public users (or the user themselves)
    const leaderboardRes = await query(
      `SELECT 
         u.name,
         u.email,
         u.uid,
         COALESCE(ucp.xp, 0) AS xp
       FROM users u
       LEFT JOIN user_category_progress ucp ON u.uid = ucp.user_id AND ucp.category_id = $1
       WHERE u.status = 'active' AND (u.is_private = FALSE OR u.uid = $2)
       ORDER BY xp DESC, u.joined_at ASC
       LIMIT 20`,
      [categoryId, uid]
    );

    const leaderboard = leaderboardRes.rows.map((row, index) => {
      const initials = row.name ? row.name.slice(0, 2).toUpperCase() : 'YO';
      return {
        name: row.name,
        avatar: null, // UI will render fallback/initials
        initials,
        xp: parseInt(row.xp) || 0,
        rank: index + 1,
        isYou: row.uid === uid
      };
    });

    // 2. Fetch requesting user's status and calculate their rank
    const userRes = await query('SELECT name, email, joined_at FROM users WHERE uid = $1', [uid]);
    const userRow = userRes.rows[0];
    
    const userXpRes = await query(
      'SELECT xp FROM user_category_progress WHERE user_id = $1 AND category_id = $2',
      [uid, categoryId]
    );
    const userXp = userXpRes.rows[0] ? parseInt(userXpRes.rows[0].xp) : 0;

    const rankRes = await query(
      `SELECT COUNT(*)::int + 1 AS rank 
       FROM users u
       LEFT JOIN user_category_progress ucp ON u.uid = ucp.user_id AND ucp.category_id = $1
       WHERE u.status = 'active' 
         AND (u.is_private = FALSE OR u.uid = $2)
         AND (
           COALESCE(ucp.xp, 0) > $3 OR 
           (COALESCE(ucp.xp, 0) = $3 AND u.joined_at < $4)
         )`,
      [categoryId, uid, userXp, userRow.joined_at]
    );
    const userRank = rankRes.rows[0].rank;

    const currentUser = {
      name: userRow.name,
      initials: userRow.name ? userRow.name.slice(0, 2).toUpperCase() : 'YO',
      xp: userXp,
      rank: userRank,
      isYou: true
    };

    res.json({
      leaderboard,
      currentUser
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Server error while fetching leaderboard' });
  }
});

export default router;
