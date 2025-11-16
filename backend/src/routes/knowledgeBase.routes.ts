import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all knowledge base items
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.knowledgeBase.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Upload document
router.post('/upload', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Mock upload - in production would handle file upload
    const item = await prisma.knowledgeBase.create({
      data: {
        userId: req.userId!,
        type: 'document',
        content: 'Sample document content',
        metadata: {} as any
      }
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Delete knowledge base item
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.knowledgeBase.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
