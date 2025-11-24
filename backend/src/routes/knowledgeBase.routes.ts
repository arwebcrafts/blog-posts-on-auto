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

// Save business information
router.post('/business-info', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { businessType, industry, targetAudience, brandVoice, products, services, values } = req.body;

    // Check if business info already exists
    const existing = await prisma.knowledgeBase.findFirst({
      where: {
        userId: req.userId,
        type: 'business_info'
      }
    });

    const businessData = {
      businessType,
      industry,
      targetAudience,
      brandVoice,
      products,
      services,
      values
    };

    let item;
    if (existing) {
      // Update existing
      item = await prisma.knowledgeBase.update({
        where: { id: existing.id },
        data: {
          content: JSON.stringify(businessData),
          metadata: businessData as any
        }
      });
    } else {
      // Create new
      item = await prisma.knowledgeBase.create({
        data: {
          userId: req.userId!,
          type: 'business_info',
          content: JSON.stringify(businessData),
          metadata: businessData as any
        }
      });
    }

    res.json(item);
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
