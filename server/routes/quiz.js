import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import { syncAndGetHearts } from '../utils/hearts.js';

const router = express.Router();

// Start a quiz session, returns questions list and starts from index 0
router.post('/session/start', authenticate, async (req, res) => {
  const { unitId, levelId } = req.body;

  if (!unitId || !levelId) {
    return res.status(400).json({ error: 'unitId and levelId are required' });
  }

  try {
    // 1. Fetch questions for this unit and level
    const questionsRes = await query(
      `SELECT id, question, options, correct_answer AS "correctAnswer", explanation, explanation_th AS "explanationTh"
       FROM questions 
       WHERE unit_id = $1 AND level_id = $2
       ORDER BY id`,
      [unitId, levelId]
    );

    const questions = questionsRes.rows;

    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for this quiz level.' });
    }

    res.json({
      questions,
      currentIndex: 0
    });
  } catch (error) {
    console.error('Error starting quiz session:', error);
    res.status(500).json({ error: 'Server error while starting quiz session' });
  }
});

// Deduct heart on a wrong answer
router.post('/session/error', authenticate, async (req, res) => {
  const { uid } = req.user;

  try {
    const userRes = await query('SELECT * FROM users WHERE uid = $1', [uid]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRes.rows[0];
    const profile = await syncAndGetHearts(user);

    if (profile.hearts === 'infinity') {
      return res.json({ hearts: 'infinity', heartsCount: profile.hearts_count });
    }

    const currentHearts = profile.hearts_count;
    const newHearts = Math.max(0, currentHearts - 1);

    const updateRes = await query(
      `UPDATE users 
       SET hearts_count = $1, last_heart_refill_at = CURRENT_TIMESTAMP 
       WHERE uid = $2 
       RETURNING *`,
      [newHearts, uid]
    );

    const updatedUser = updateRes.rows[0];

    res.json({
      hearts: updatedUser.hearts_count,
      heartsCount: updatedUser.hearts_count
    });
  } catch (error) {
    console.error('Error handling wrong answer deduction:', error);
    res.status(500).json({ error: 'Server error during heart deduction' });
  }
});

// Complete quiz level, compute unit completion and reward XP
router.post('/session/complete', authenticate, async (req, res) => {
  const { uid } = req.user;
  const { unitId, levelId } = req.body;

  if (!unitId || !levelId) {
    return res.status(400).json({ error: 'unitId and levelId are required' });
  }

  try {
    // 2. Fetch category_id of this unit
    const unitRes = await query('SELECT category_id, title FROM units WHERE id = $1', [unitId]);
    if (unitRes.rows.length === 0) {
      return res.status(404).json({ error: 'Unit not found' });
    }
    const { category_id, title: unitTitle } = unitRes.rows[0];

    // 3. Check if already completed
    const existingComp = await query(
      `SELECT id FROM completed_lessons WHERE user_id = $1 AND unit_id = $2 AND level_id = $3`,
      [uid, unitId, levelId]
    );

    let isNewCompletion = false;
    let unitCompleted = false;

    if (existingComp.rows.length === 0) {
      isNewCompletion = true;
      // Record completion
      await query(
        `INSERT INTO completed_lessons (user_id, unit_id, level_id)
         VALUES ($1, $2, $3)`,
        [uid, unitId, levelId]
      );

      // Check if user completed all 5 levels of this unit: 'easy', 'medium1', 'medium2', 'hard1', 'hard2'
      const completedLevelsRes = await query(
        `SELECT level_id FROM completed_lessons 
         WHERE user_id = $1 AND unit_id = $2 
         AND level_id IN ('easy', 'medium1', 'medium2', 'hard1', 'hard2')`,
        [uid, unitId]
      );

      if (completedLevelsRes.rows.length === 5) {
        unitCompleted = true;
      }

      // Reward 1 XP (Completed lesson node = 1 XP)
      // Global XP increment
      await query(
        `UPDATE users SET total_xp = total_xp + 1 WHERE uid = $1`,
        [uid]
      );

      // Category-specific XP increment
      await query(
        `INSERT INTO user_category_progress (user_id, category_id, xp)
         VALUES ($1, $2, 1)
         ON CONFLICT (user_id, category_id) 
         DO UPDATE SET xp = user_category_progress.xp + 1`,
        [uid, category_id]
      );
    }

    res.json({
      success: true,
      isNewCompletion,
      unitCompleted,
      unitTitle
    });
  } catch (error) {
    console.error('Error completing quiz level:', error);
    res.status(500).json({ error: 'Server error during quiz completion processing' });
  }
});

export default router;
