import { getMockQuestions } from '../../src/data/mockGenerator.js';
import pool from '../db/index.js';

async function runSurgicalFix() {
  console.log('Starting surgical content fix for Unit 1 and Unit 2...');
  const client = await pool.connect();

  try {
    // 1. Verify that Unit 1 and Unit 2 exist in the database
    const unit1Res = await client.query("SELECT id, title FROM units WHERE unit_number = 1 AND category_id = 'grammar'");
    const unit2Res = await client.query("SELECT id, title FROM units WHERE unit_number = 2 AND category_id = 'grammar'");

    if (unit1Res.rows.length === 0 || unit2Res.rows.length === 0) {
      console.error('❌ Error: Unit 1 or Unit 2 not found in units table. Seeding is required first.');
      process.exit(1);
    }

    const dbUnit1Id = unit1Res.rows[0].id;
    const dbUnit1Title = unit1Res.rows[0].title;
    const dbUnit2Id = unit2Res.rows[0].id;
    const dbUnit2Title = unit2Res.rows[0].title;

    console.log(`Found Unit 1: ID = ${dbUnit1Id}, Title = "${dbUnit1Title}"`);
    console.log(`Found Unit 2: ID = ${dbUnit2Id}, Title = "${dbUnit2Title}"`);

    // 2. Delete existing questions for Unit 1 and Unit 2
    console.log('Deleting existing questions for Unit 1 and Unit 2...');
    await client.query('DELETE FROM questions WHERE unit_id = $1 OR unit_id = $2', [dbUnit1Id, dbUnit2Id]);
    console.log('Deletion successful!');

    // 3. Define levels
    const levels = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
    const targets = [
      { id: dbUnit1Id, title: dbUnit1Title },
      { id: dbUnit2Id, title: dbUnit2Title }
    ];

    // 4. Re-generate and insert questions
    for (const target of targets) {
      console.log(`Re-seeding questions for Unit #${target.id} ("${target.title}")...`);
      for (const level of levels) {
        const questionsList = getMockQuestions('grammar', target.id, level, target.title) || [];
        
        if (questionsList.length > 0) {
          const values = [];
          const valuePlaceholders = [];
          let paramIndex = 1;

          for (let i = 0; i < questionsList.length; i++) {
            const q = questionsList[i];
            const questionId = q.id || `q-${target.id}-${level}-${i}`;

            valuePlaceholders.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7})`);

            values.push(
              questionId,
              target.id,
              level,
              q.question,
              JSON.stringify(q.options),
              q.correctAnswer,
              q.explanation || null,
              q.explanationTh || q.explanation_th || null
            );

            paramIndex += 8;
          }

          const bulkQueryText = `
            INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
            VALUES ${valuePlaceholders.join(', ')}
            ON CONFLICT (id) DO UPDATE 
            SET question = EXCLUDED.question, 
                options = EXCLUDED.options, 
                correct_answer = EXCLUDED.correct_answer, 
                explanation = EXCLUDED.explanation, 
                explanation_th = EXCLUDED.explanation_th
          `;

          await client.query(bulkQueryText, values);
        }
      }
      console.log(`- Finished re-seeding Unit #${target.id}`);
    }

    console.log('✅ Surgical content fix completed successfully!');
  } catch (error) {
    console.error('❌ Error during surgical fix:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

runSurgicalFix();
