import { studyCategories, units } from '../../src/data/mockData.js';
import { getMockQuestions } from '../../src/data/mockGenerator.js';
import pool, { initDb } from '../db/index.js';

async function seed() {
  console.log('Starting database seeding...');
  
  // 1. Initialize tables (schema.sql)
  try {
    await initDb();
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }

  const client = await pool.connect();

  try {
    // Clean up existing learning content tables
    console.log('Cleaning up existing learning content tables...');
    await client.query('DELETE FROM categories');

    // 2. Seed Categories
    console.log('Seeding categories...');
    const allCategories = [...studyCategories];

    for (const cat of allCategories) {
      await client.query(
        `INSERT INTO categories (id, title, description, color, icon_char)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE 
         SET title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color, icon_char = EXCLUDED.icon_char`,
        [cat.id, cat.title, cat.description || '', cat.color, cat.iconChar || cat.icon_char || '']
      );
    }

    // 3. Seed Units and Levels
    console.log('Seeding units and levels in parallel...');
    const categoryUnitCounters = {};
    const unitsWithNumbers = units.map((unit) => {
      const catId = unit.category;
      if (!categoryUnitCounters[catId]) {
        categoryUnitCounters[catId] = 0;
      }
      categoryUnitCounters[catId]++;
      return {
        ...unit,
        unitNumber: categoryUnitCounters[catId]
      };
    });

    const seedUnit = async (unit) => {
      const catId = unit.category;
      // Insert Unit (using pool to run in parallel)
      const unitRes = await pool.query(
        `INSERT INTO units (id, category_id, unit_number, title, description, color)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE 
         SET category_id = EXCLUDED.category_id, unit_number = EXCLUDED.unit_number, title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color
         RETURNING id`,
        [unit.id, catId, unit.unitNumber, unit.title, unit.description || '', unit.color]
      );

      const dbUnitId = unitRes.rows[0].id;
      console.log(`- Seeding Unit #${unit.id} ("${unit.title}") as DB Unit #${dbUnitId}`);

      // Insert Levels and Questions for this Unit
      for (const lvl of unit.levels) {
        await pool.query(
          `INSERT INTO levels (id, unit_id, label, icon)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (unit_id, id) DO UPDATE 
           SET label = EXCLUDED.label, icon = EXCLUDED.icon`,
          [lvl.id, dbUnitId, lvl.label, lvl.icon]
        );

        // Generate and Seed Questions for this Level in parallel
        const questionsList = getMockQuestions(catId, unit.id, lvl.id, unit.title) || [];
        const insertPromises = questionsList.map((q, i) => {
          const questionId = q.id || `q-${dbUnitId}-${lvl.id}-${i}`;
          return pool.query(
            `INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             ON CONFLICT (id) DO UPDATE 
             SET question = EXCLUDED.question, options = EXCLUDED.options, correct_answer = EXCLUDED.correct_answer, explanation = EXCLUDED.explanation, explanation_th = EXCLUDED.explanation_th`,
            [
              questionId,
              dbUnitId,
              lvl.id,
              q.question,
              JSON.stringify(q.options),
              q.correctAnswer,
              q.explanation || null,
              q.explanationTh || q.explanation_th || null
            ]
          );
        });
        await Promise.all(insertPromises);
      }
      console.log(`- Finished Seeding Unit #${unit.id}`);
    };

    await Promise.all(unitsWithNumbers.map(seedUnit));

    console.log('Seeding default administrator user...');
    await client.query(
      `INSERT INTO users (uid, email, name, role, status, total_xp, hearts_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (uid) DO NOTHING`,
      ['18JCe75AVxZEZF3Y1h0gBNo93ti2', 'kanokpolkulsri@gmail.com', 'Kanokpol Kulsri (Admin)', 'admin', 'active', 0, 100]
    );

    // 5. Seed some initial promo codes
    console.log('Seeding initial promo codes...');
    const defaultPromos = [
      { code: 'INFINITY', type: 'infinity', reward: 'infinity', description: 'Infinite hearts promo', infinity_duration_minutes: null, max_redemptions: null },
      { code: 'WELCOME100', type: 'hearts', reward: '100', description: 'Get 100 hearts', infinity_duration_minutes: null, max_redemptions: null },
      { code: 'REF-ADMIN', type: 'infinity', reward: 'infinity', description: 'Admin referral code', infinity_duration_minutes: 1440, max_redemptions: 10 }
    ];

    for (const promo of defaultPromos) {
      await client.query(
        `INSERT INTO promo_codes (code, type, reward, description, infinity_duration_minutes, max_redemptions)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (code) DO UPDATE 
         SET type = EXCLUDED.type, reward = EXCLUDED.reward, description = EXCLUDED.description, infinity_duration_minutes = EXCLUDED.infinity_duration_minutes, max_redemptions = EXCLUDED.max_redemptions`,
        [promo.code, promo.type, promo.reward, promo.description, promo.infinity_duration_minutes, promo.max_redemptions]
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
