import express from 'express'; // reload env keys
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { PORT } from './config.js';
import { initDb } from './db/index.js';

// Import Routers
import authRouter from './routes/auth.js';
import learnRouter from './routes/learn.js';
import quizRouter from './routes/quiz.js';
import promoRouter from './routes/promo.js';
import adminRouter from './routes/admin.js';
import paymentRouter from './routes/payment.js';

const app = express();

// Enable CORS for frontend Vite client (port 5173 / localhost / production domains)
app.use(cors({
  origin: '*', // We can restrict to specific domains in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Bind webhook-friendly payment routes before parsing json
app.use('/api/payments', paymentRouter);

// Parse body requests
app.use(express.json());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 300 : 2000, // Limit each IP in production, 2000 in dev
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', limiter);

// Bind Route Handlers
app.use('/api/auth', authRouter);
app.use('/api/learn', learnRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/promo-codes', promoRouter);
app.use('/api/admin', adminRouter);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`GramGo Backend API Server running on port ${PORT}`);
  
  // Run schema migrations/initialization asynchronously without blocking PORT binding
  initDb().then(() => {
    console.log('PostgreSQL DB schema ready.');
  }).catch((err) => {
    console.warn('Database init notice:', err.message);
  });
});
