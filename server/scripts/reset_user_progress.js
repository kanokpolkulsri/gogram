import pool from '../db/index.js';
import dotenv from 'dotenv';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dotenv.config();

async function resetProgress() {
  console.log('Starting user progress database reset...');
  const client = await pool.connect();

  try {
    // 1. Delete all rows from completed_lessons
    console.log('- Wiping completed_lessons table...');
    const completedDel = await client.query('DELETE FROM completed_lessons');
    console.log(`  Deleted ${completedDel.rowCount} completed lesson records.`);

    // 2. Delete all rows from user_category_progress
    console.log('- Wiping user_category_progress table...');
    const progressDel = await client.query('DELETE FROM user_category_progress');
    console.log(`  Deleted ${progressDel.rowCount} category progress records.`);

    // 3. Reset total_xp, streak, and refill hearts to default 100 in users table
    console.log('- Resetting users stats (streak, total_xp, hearts) to defaults...');
    const usersUpdate = await client.query(`
      UPDATE users 
      SET total_xp = 0, 
          streak = 0,
          hearts_count = 100
    `);
    console.log(`  Successfully reset stats for ${usersUpdate.rowCount} users.`);

    console.log('🎉 User progress reset completed successfully!');
  } catch (err) {
    console.error('❌ Error resetting user progress:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

resetProgress();
