import express from 'express';
import { authenticate } from '../middleware/auth';
const router = express.Router();
router.get('/', authenticate, (req, res) => res.json({ message: 'Website routes' }));
export default router;
