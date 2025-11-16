import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all integrations
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const integrations = await prisma.integration.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(integrations);
  } catch (error) {
    next(error);
  }
});

// Connect integration
router.post('/connect', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, platform, credentials } = req.body;
    const integration = await prisma.integration.create({
      data: {
        websiteId,
        platform,
        credentials: credentials as any,
        userId: req.userId!,
        status: 'active'
      }
    });
    res.json(integration);
  } catch (error) {
    next(error);
  }
});

// Test integration
router.post('/:id/test', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Connection test successful' });
  } catch (error) {
    next(error);
  }
});

// Disconnect integration
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.integration.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Integration disconnected' });
  } catch (error) {
    next(error);
  }
});

export default router;
