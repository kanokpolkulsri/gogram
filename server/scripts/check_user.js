import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in server/.env');
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log('Migrating database schema updates (adding streak, dropping league)...');
    await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0 NOT NULL');
    await client.query("ALTER TABLE users DROP COLUMN IF EXISTS league");
    console.log('Migration complete!');

    console.log('Querying database for users...');
    const res = await client.query('SELECT uid, email, name, role FROM users');
    console.log('Current Users in Database:');
    console.table(res.rows);

    const targetEmail = 'kanokpolkulsri@gmail.com';
    const targetUser = res.rows.find(u => u.email && u.email.toLowerCase() === targetEmail.toLowerCase());

    if (targetUser) {
      console.log(`Found user:`, targetUser);
      if (targetUser.role !== 'admin') {
        console.log(`Setting role of ${targetEmail} to 'admin'...`);
        await client.query("UPDATE users SET role = 'admin' WHERE email = $1", [targetEmail]);
        console.log('Update complete! User is now an admin.');
      } else {
        console.log(`${targetEmail} is already an admin!`);
      }
    } else {
      console.log(`User ${targetEmail} not found in database.`);
      console.log(`Please sign in once on the website with this email. Firebase auth will trigger user creation in the database, after which you can run this script again to promote them to admin.`);
    }
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await client.end();
  }
}

run();
