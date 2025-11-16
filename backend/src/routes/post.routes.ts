import express from 'express';
import { authenticate } from '../middleware/auth';
const router = express.Router();
router.get('/', authenticate, (req, res) => res.json({ message: '${route} routes' }));
export default router;
