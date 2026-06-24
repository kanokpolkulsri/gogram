import admin from 'firebase-admin';
import { FIREBASE_PROJECT_ID } from '../config.js';

// Initialize firebase admin once
try {
  admin.initializeApp({
    projectId: FIREBASE_PROJECT_ID
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.warn('Firebase Admin SDK initialization skipped or failed:', error.message);
}

// Authentication Middleware
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split('Bearer ')[1];

  // Development bypass helper
  if (process.env.NODE_ENV !== 'production' && token.startsWith('mock-')) {
    const mockUid = token.replace('mock-', '');
    req.user = {
      uid: mockUid,
      email: `${mockUid}@gogram.com`,
      isMock: true
    };
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    console.error('Firebase Auth Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid or expired Firebase Auth token' });
  }
};

// Authorization Middleware (Requires Admin Role)
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if req.user.role is admin (populated by a DB query or passed along)
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  next();
};
