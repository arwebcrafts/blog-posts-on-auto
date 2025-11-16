import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all posts
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get single post
router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Delete post
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.post.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
