import express from 'express';
import { signup, login, getMe, updateProfile, changePassword } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { strictRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Public routes
router.post('/signup', strictRateLimiter, signup);
router.post('/login', strictRateLimiter, login);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, strictRateLimiter, changePassword);

export default router;
