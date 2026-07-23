import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DATABASE_URL } from '../config.js';

const { Pool } = pg;

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isUnixSocket = DATABASE_URL && (DATABASE_URL.includes('host=/') || DATABASE_URL.includes('%2Fcloudsql'));
const isRemoteCloudSqlIp = DATABASE_URL && DATABASE_URL.includes('34.126.85.240');

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: !isUnixSocket && (isRemoteCloudSqlIp || process.env.NODE_ENV === 'production') ? { rejectUnauthorized: false } : false
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

// Initialize the database tables by executing schema.sql
export const initDb = async () => {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  try {
    await pool.query(sql);
    console.log('PostgreSQL database tables initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
    throw error;
  }
};

export default pool;
