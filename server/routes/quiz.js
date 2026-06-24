import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import { syncAndGetHearts } from '../utils/hearts.js';

const router = express.Router();

// Start or resume a quiz session, returns questions list and session index
router.post('/session/start', authenticate, async (req, res) => {
  const { uid } = req.user;
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

    // 2. Check if user quiz session exists
    const sessionRes = await query(
      `SELECT * FROM user_quiz_sessions 
       WHERE user_id = $1 AND unit_id = $2 AND level_id = $3`,
      [uid, unitId, levelId]
    );

    let sessionIndex = 0;

    if (sessionRes.rows.length === 0) {
      // Create new session
      await query(
        `INSERT INTO user_quiz_sessions (user_id, unit_id, level_id, current_question_index, completed)
         VALUES ($1, $2, $3, $4, FALSE)`,
        [uid, unitId, levelId, 0]
      );
    } else {
      const session = sessionRes.rows[0];
      if (session.completed) {
        // Reset completed session for repeat play
        await query(
          `UPDATE user_quiz_sessions 
           SET current_question_index = 0, completed = FALSE, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $1 AND unit_id = $2 AND level_id = $3`,
          [uid, unitId, levelId]
        );
      } else {
        sessionIndex = session.current_question_index;
      }
    }

    res.json({
      questions,
      currentIndex: sessionIndex
    });
  } catch (error) {
    console.error('Error starting quiz session:', error);
    res.status(500).json({ error: 'Server error while starting quiz session' });
  }
});

// Progress user to the next question index
router.post('/session/progress', authenticate, async (req, res) => {
  const { uid } = req.user;
  const { unitId, levelId, nextIndex } = req.body;

  if (!unitId || !levelId || nextIndex === undefined) {
    return res.status(400).json({ error: 'unitId, levelId, and nextIndex are required' });
  }

  try {
    await query(
      `UPDATE user_quiz_sessions 
       SET current_question_index = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $2 AND unit_id = $3 AND level_id = $4`,
      [nextIndex, uid, unitId, levelId]
    );
    res.json({ success: true, currentIndex: nextIndex });
  } catch (error) {
    console.error('Error progressing quiz session:', error);
    res.status(500).json({ error: 'Server error while updating quiz session progress' });
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
    // 1. Mark session completed
    await query(
      `UPDATE user_quiz_sessions 
       SET completed = TRUE, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $1 AND unit_id = $2 AND level_id = $3`,
      [uid, unitId, levelId]
    );

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

        // Reward 1 XP (Completed entire unit = 1 XP)
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
