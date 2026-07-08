import { studyCategories, units } from '../../src/data/mockData.js';
import { getMockQuestions } from '../../src/data/mockGenerator.js';
import pool, { initDb } from '../db/index.js';
import { DATABASE_URL } from '../config.js';

async function seed() {
  const isProduction = process.env.NODE_ENV === 'production' || 
                        (DATABASE_URL && !DATABASE_URL.includes('localhost') && !DATABASE_URL.includes('127.0.0.1'));

  if (isProduction) {
    if (process.env.CONFIRM_PRODUCTION_SEED !== 'yes-i-want-to-wipe-production') {
      console.error('\n================================================================');
      console.error('🛑 DANGER: Database seeding is BLOCKED on remote/production DB!');
      console.error('Running this script will permanently delete all user progress history.');
      console.error('================================================================');
      console.error('If you are absolutely sure you want to seed this database, run:');
      console.error('CONFIRM_PRODUCTION_SEED=yes-i-want-to-wipe-production npm run seed');
      console.error('================================================================\n');
      process.exit(1);
    }
  }

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
    // Check if database is already populated
    const countRes = await client.query('SELECT COUNT(*)::int AS count FROM categories');
    const hasData = countRes.rows[0].count > 0;

    if (hasData && process.env.RESET_DB !== 'true') {
      console.log('\n================================================================');
      console.log('✅ Database already initialized with study categories and content.');
      console.log('ℹ️  Seeding skipped to prevent overwriting existing progress.');
      console.log('💡 To force a full database reset and re-seed, run:');
      console.log('   RESET_DB=true npm run seed');
      console.log('================================================================\n');
      return;
    }

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
          `INSERT INTO levels (id, unit_id, label)
           VALUES ($1, $2, $3)
           ON CONFLICT (unit_id, id) DO UPDATE 
           SET label = EXCLUDED.label`,
          [lvl.id, dbUnitId, lvl.label]
        );

        // Generate and Seed Questions for this Level in a single bulk query
        const questionsList = getMockQuestions(catId, unit.id, lvl.id, unit.title) || [];
        if (questionsList.length > 0) {
          const values = [];
          const valuePlaceholders = [];
          let paramIndex = 1;

          for (let i = 0; i < questionsList.length; i++) {
            const q = questionsList[i];
            const questionId = q.id || `q-${dbUnitId}-${lvl.id}-${i}`;

            valuePlaceholders.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7})`);

            values.push(
              questionId,
              dbUnitId,
              lvl.id,
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

          await pool.query(bulkQueryText, values);
        }
      }
      console.log(`- Finished Seeding Unit #${unit.id}`);
    };

    for (const unit of unitsWithNumbers) {
      await seedUnit(unit);
    }

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
