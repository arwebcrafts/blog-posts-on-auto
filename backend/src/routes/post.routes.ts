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

// Generate title ideas
router.post('/generate-titles', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, count = 5 } = req.body;

    // Get website for context
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: req.userId
      }
    });

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    // Generate sample titles (in production, use OpenAI)
    const titles = [
      `How to Grow Your ${website.industry || 'Business'} in 2024`,
      `Top 10 ${website.industry || 'Business'} Strategies That Work`,
      `The Ultimate Guide to ${website.industry || 'Success'}`,
      `${website.industry || 'Business'} Trends You Can't Ignore`,
      `Boost Your ${website.industry || 'Business'} with These Tips`
    ].slice(0, count);

    res.json({ titles });
  } catch (error) {
    next(error);
  }
});

// Generate full post content
router.post('/generate', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, title, keyword, wordCount, tone } = req.body;

    // Create post record
    const post = await prisma.post.create({
      data: {
        userId: req.userId!,
        websiteId,
        title,
        primaryKeyword: keyword,
        keywords: keyword ? [keyword] : [],
        content: `# ${title}\n\nThis is a sample blog post about ${keyword}.\n\n## Introduction\n\nSample content generated for ${title}. In production, this would use OpenAI to generate high-quality SEO content.\n\n## Key Points\n\n- Point 1 about ${keyword}\n- Point 2 about ${keyword}\n- Point 3 about ${keyword}\n\n## Conclusion\n\nThis concludes our discussion on ${keyword}.`,
        status: 'draft',
        seoScore: 75,
        wordCount: wordCount || 1200,
        tone: tone || 'professional'
      }
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Update post
router.put('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, status, keyword, seoScore } = req.body;

    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        status,
        primaryKeyword: keyword,
        keywords: keyword ? [keyword] : undefined,
        seoScore
      }
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Publish post immediately
router.post('/:id/publish', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Fetch post with website information
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { website: true }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Import IntegrationService
    const { IntegrationService } = await import('../services/integration.service');
    const integrationService = new IntegrationService();

    // Publish to external platform (e.g., WordPress)
    let externalPostId: string | undefined;
    try {
      externalPostId = await integrationService.publishPost(post as any);
    } catch (error: any) {
      console.error('Failed to publish to external platform:', error.message);

      // Update post status to failed
      await prisma.post.update({
        where: { id: req.params.id },
        data: {
          status: 'failed'
        }
      });

      return res.status(500).json({
        error: 'Failed to publish post to WordPress',
        details: error.message
      });
    }

    // Update post status to published
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        status: 'published',
        publishedAt: new Date(),
        externalPostId,
        platform: post.website?.platform || undefined
      }
    });

    res.json({
      message: 'Post published successfully to WordPress',
      post: updatedPost,
      externalPostId
    });
  } catch (error) {
    next(error);
  }
});

// Bulk create posts
router.post('/bulk-create', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, keywords, wordCount, tone } = req.body;

    // Create posts for each keyword
    const posts = await Promise.all(
      keywords.map((keyword: string) =>
        prisma.post.create({
          data: {
            userId: req.userId!,
            websiteId,
            title: `Ultimate Guide to ${keyword}`,
            primaryKeyword: keyword,
            keywords: [keyword],
            content: `Sample content for ${keyword}`,
            status: 'draft',
            seoScore: 70,
            wordCount: wordCount || 1200,
            tone: tone || 'professional'
          }
        })
      )
    );

    res.json({ message: `${posts.length} posts created`, posts });
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
