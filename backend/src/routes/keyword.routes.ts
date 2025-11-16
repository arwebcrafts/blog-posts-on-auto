import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all keywords
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const keywords = await prisma.keyword.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(keywords);
  } catch (error) {
    next(error);
  }
});

// Add keyword
router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { keyword } = req.body;
    const newKeyword = await prisma.keyword.create({
      data: {
        keyword,
        userId: req.userId!
      }
    });
    res.json(newKeyword);
  } catch (error) {
    next(error);
  }
});

// Delete keyword
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.keyword.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Keyword deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
