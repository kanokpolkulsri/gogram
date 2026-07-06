import pool from '../db/index.js';

async function check() {
  try {
    const res = await pool.query('SELECT * FROM levels ORDER BY unit_id, id');
    console.log('All levels in DB:', res.rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

check();
