import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/gogram';
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'gogram-web-2026';

// Hearts system configurations
export const MAX_HEARTS = parseInt(process.env.MAX_HEARTS) || 10;
export const HEARTS_REFILL_RATE_MINUTES = parseInt(process.env.HEARTS_REFILL_RATE_MINUTES) || 60;
export const HEARTS_REFILL_COUNT = parseInt(process.env.HEARTS_REFILL_COUNT) || 1;
export const XP_PER_UNIT = 1; // Completed entire unit = 1 XP
