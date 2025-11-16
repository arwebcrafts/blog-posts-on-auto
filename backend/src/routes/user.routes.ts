import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Placeholder - will be implemented
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'User routes - Coming soon' });
});

export default router;
