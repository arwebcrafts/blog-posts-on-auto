import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get all chat sessions
router.get('/sessions', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

// Get messages for a session
router.get('/sessions/:id/messages', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId: req.params.id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// Send message
router.post('/send', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId, message } = req.body;

    // Create or get session
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    } else {
      session = await prisma.chatSession.create({
        data: {
          userId: req.userId!,
          title: 'New Chat'
        }
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session!.id,
        role: 'user',
        content: message
      }
    });

    // Mock AI response
    const aiResponse = await prisma.chatMessage.create({
      data: {
        sessionId: session!.id,
        role: 'assistant',
        content: 'This is a test response. Connect OpenAI API to get real AI responses.'
      }
    });

    res.json(aiResponse);
  } catch (error) {
    next(error);
  }
});

export default router;
