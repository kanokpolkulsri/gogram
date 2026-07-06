import pool from '../db/index.js';

async function test() {
  const client = await pool.connect();
  try {
    console.log('Inserting unit 9...');
    await client.query('DELETE FROM categories');
    
    await client.query(
      `INSERT INTO categories (id, title, description, color, icon_char)
       VALUES ('grammar', 'Grammar', 'Master English grammar', '#58CC02', 'G')`
    );

    const unitRes = await client.query(
      `INSERT INTO units (id, category_id, unit_number, title, description, color)
       VALUES (9, 'grammar', 9, 'Existence with There', 'there is/are/was/were/will be', '#58CC02')
       RETURNING id`
    );
    const dbUnitId = unitRes.rows[0].id;
    console.log('Inserted Unit ID:', dbUnitId);

    console.log('Inserting level easy...');
    await client.query(
      `INSERT INTO levels (id, unit_id, label, icon)
       VALUES ($1, $2, $3, $4)`,
      ['easy', dbUnitId, 'Easy', 'star']
    );

    // Let's query levels table to see if it's there
    const levelsInDb = await client.query('SELECT * FROM levels WHERE unit_id = 9');
    console.log('Levels in DB for unit 9:', levelsInDb.rows);

    console.log('Inserting question...');
    await client.query(
      `INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      ['q-9-easy-0', dbUnitId, 'easy', 'Question text', JSON.stringify(['a', 'b']), 'a']
    );
    console.log('Question inserted successfully!');
  } catch (error) {
    console.error('Test Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

test();
