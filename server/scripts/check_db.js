import pool from '../db/index.js';

async function check() {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM units');
    console.log('Total units count in DB:', res.rows[0].count);

    const units = await pool.query('SELECT id, category_id, unit_number, title FROM units ORDER BY id LIMIT 10');
    console.log('First 10 units in DB:', units.rows);
  } catch (error) {
    console.error('Error checking DB:', error);
  } finally {
    await pool.end();
  }
}

check();
