import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all backlinks
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const backlinks = await prisma.backlink.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(backlinks);
  } catch (error) {
    next(error);
  }
});

// Get backlink summary
router.get('/summary', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const summary = {
      totalBacklinks: 0,
      referringDomains: 0,
      domainAuthority: 0,
      newThisMonth: 0
    };
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

export default router;
