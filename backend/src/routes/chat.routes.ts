import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
});

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
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
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

    // Get conversation history
    const conversationHistory = await prisma.chatMessage.findMany({
      where: { sessionId: session!.id },
      orderBy: { createdAt: 'asc' },
      take: 10 // Last 10 messages for context
    });

    // Get user's knowledge base for context
    const knowledgeBase = await prisma.knowledgeBase.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get user's websites for context
    const websites = await prisma.website.findMany({
      where: { userId: req.userId },
      select: {
        url: true,
        businessType: true,
        industry: true,
        targetAudience: true,
        brandVoice: true,
        suggestedTopics: true,
        suggestedKeywords: true
      }
    });

    // Get recent posts for context
    const posts = await prisma.post.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        title: true,
        primaryKeyword: true,
        seoScore: true,
        status: true
      }
    });

    // Build context
    let contextInfo = '';

    if (websites.length > 0) {
      const website = websites[0];
      contextInfo += `User's Website Information:
- Business Type: ${website.businessType || 'Not specified'}
- Industry: ${website.industry || 'Not specified'}
- Target Audience: ${website.targetAudience || 'Not specified'}
- Brand Voice: ${website.brandVoice || 'professional'}
- Suggested Topics: ${website.suggestedTopics?.slice(0, 5).join(', ') || 'None'}
- Keywords: ${website.suggestedKeywords?.slice(0, 10).join(', ') || 'None'}

`;
    }

    if (posts.length > 0) {
      contextInfo += `Recent Blog Posts:
${posts.map(p => `- "${p.title}" (${p.primaryKeyword || 'no keyword'}, SEO: ${p.seoScore}/100, Status: ${p.status})`).join('\n')}

`;
    }

    if (knowledgeBase.length > 0) {
      contextInfo += `Knowledge Base:\n`;
      knowledgeBase.forEach(kb => {
        if (kb.type === 'business_info') {
          contextInfo += `- Business Info: ${kb.content?.substring(0, 200)}...\n`;
        }
      });
    }

    try {
      // Check if OpenAI is configured
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      // Build conversation messages
      const messages: any[] = [
        {
          role: 'system',
          content: `You are an AI content strategy assistant for ContentFlow AI. You help users with:
- Content strategy and topic suggestions
- SEO optimization advice
- Keyword research
- Content planning and scheduling
- Blog post improvement suggestions

${contextInfo}

Provide helpful, actionable advice based on the user's website and content. Be concise but thorough.`
        },
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Call OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500
      });

      const aiResponseText = response.choices[0].message.content || 'Sorry, I could not generate a response.';

      // Save AI response
      const aiResponse = await prisma.chatMessage.create({
        data: {
          sessionId: session!.id,
          role: 'assistant',
          content: aiResponseText
        }
      });

      res.json({ ...aiResponse, sessionId: session!.id });
    } catch (error: any) {
      console.error('OpenAI chat error:', error.message);

      // Fallback response
      const fallbackResponse = await prisma.chatMessage.create({
        data: {
          sessionId: session!.id,
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble connecting to the AI service right now. Please make sure your OpenAI API key is configured, or try again later.'
        }
      });

      res.json({ ...fallbackResponse, sessionId: session!.id });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
