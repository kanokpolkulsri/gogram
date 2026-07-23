import dotenv from 'dotenv';
dotenv.config({ path: 'server/.env' });

import pool from '../db/index.js';
import { conversationQuestions } from '../../src/data/conversationQuestions.js';

async function seedConversationPoc() {
  console.log('Seeding Conversation Category POC into Database...');
  const client = await pool.connect();

  try {
    // 1. Insert/Update Category
    console.log('1. Inserting Conversation Category...');
    await client.query(
      `INSERT INTO categories (id, title, description, color, icon_char)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE 
       SET title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color, icon_char = EXCLUDED.icon_char`,
      [
        'conversation',
        'Conversation',
        'Master practical English dialogues & exam-style conversations',
        '#1CB0F6',
        'C'
      ]
    );

    // 2. Insert/Update Unit 301
    console.log('2. Inserting Unit #301...');
    await client.query(
      `INSERT INTO units (id, category_id, unit_number, title, description, color)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE 
       SET category_id = EXCLUDED.category_id, unit_number = EXCLUDED.unit_number, title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color`,
      [
        301,
        'conversation',
        1,
        'Everyday & Campus Conversation',
        'Master daily interactions, ordering, asking directions, and campus small talk.',
        '#1CB0F6'
      ]
    );

    // 3. Insert Levels for Unit 301
    const levels = [
      { id: 'easy', label: 'Easy' },
      { id: 'medium1', label: 'Medium 1' },
      { id: 'medium2', label: 'Medium 2' },
      { id: 'hard1', label: 'Hard 1' },
      { id: 'hard2', label: 'Hard 2' }
    ];

    console.log('3. Inserting Levels for Unit #301...');
    for (const lvl of levels) {
      await client.query(
        `INSERT INTO levels (unit_id, id, label)
         VALUES ($1, $2, $3)
         ON CONFLICT (unit_id, id) DO UPDATE SET label = EXCLUDED.label`,
        [301, lvl.id, lvl.label]
      );
    }

    // 4. Insert Questions for Unit 101
    console.log('4. Inserting 10 Conversation Questions...');
    for (const q of conversationQuestions) {
      // Store full question structure including dialogue JSON in options or question JSON
      const optionsWithDialogue = q.options;

      await client.query(
        `INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE 
         SET question = EXCLUDED.question,
             options = EXCLUDED.options,
             correct_answer = EXCLUDED.correct_answer,
             explanation = EXCLUDED.explanation,
             explanation_th = EXCLUDED.explanation_th`,
        [
          q.id,
          q.unitId,
          q.levelId,
          q.question,
          JSON.stringify(optionsWithDialogue),
          q.correctAnswer,
          q.explanation,
          q.explanationTh
        ]
      );
    }

    console.log('✅ Conversation Category POC Seeding Complete!');
  } catch (err) {
    console.error('❌ Error seeding conversation POC:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedConversationPoc();
