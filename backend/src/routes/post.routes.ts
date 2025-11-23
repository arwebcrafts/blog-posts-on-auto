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
    const { websiteId, keyword, count = 5 } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

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

    // Use AI to generate titles based on keyword
    const { AIAnalysisService } = await import('../services/aiAnalysis.service');
    const aiService = new AIAnalysisService();

    try {
      const titleSuggestions = await aiService.generateTitles(
        website.businessType || 'business',
        keyword, // Use keyword as industry/topic
        count
      );

      // Extract just the titles
      const titles = titleSuggestions.map(t => t.title);

      res.json({ titles });
    } catch (aiError: any) {
      console.error('AI title generation error:', aiError.message);

      // Fallback to keyword-based titles if AI fails
      const fallbackTitles = [
        `The Ultimate Guide to ${keyword}`,
        `How to Master ${keyword}: A Complete Guide`,
        `${keyword}: Everything You Need to Know in 2024`,
        `Top 10 ${keyword} Strategies That Actually Work`,
        `${keyword} for Beginners: Complete Tutorial`,
        `Advanced ${keyword} Techniques for Better Results`
      ].slice(0, count);

      res.json({ titles: fallbackTitles });
    }
  } catch (error) {
    next(error);
  }
});

// Generate full post content
router.post('/generate', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, title, keyword, wordCount, tone } = req.body;

    if (!title || !keyword) {
      return res.status(400).json({ error: 'Title and keyword are required' });
    }

    // Get website for business context
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: req.userId
      }
    });

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    // Use AI to generate content
    const { AIAnalysisService } = await import('../services/aiAnalysis.service');
    const aiService = new AIAnalysisService();

    let content: string;
    let metaDescription: string;
    let actualWordCount = wordCount || 1200;

    try {
      const businessContext = `${website.businessType || 'business'} in the ${website.industry || 'general'} industry`;

      const generated = await aiService.generateBlogPost({
        title,
        keyword,
        wordCount: actualWordCount,
        tone: tone || 'professional',
        businessContext
      });

      content = generated.content;
      metaDescription = generated.metaDescription;

      // Calculate actual word count
      const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      actualWordCount = plainText.split(' ').length;

    } catch (aiError: any) {
      console.error('AI content generation error:', aiError.message);

      // Fallback to template content if AI fails
      content = `<h2>Introduction</h2>
<p>Welcome to this comprehensive guide about ${keyword}. In this article, we'll explore everything you need to know about ${keyword} and how it can benefit your ${website.industry || 'business'}.</p>

<h2>What is ${keyword}?</h2>
<p>${keyword} is an important topic in the ${website.industry || 'industry'} sector. Understanding ${keyword} can help you achieve better results and stay competitive.</p>

<h2>Key Benefits of ${keyword}</h2>
<ul>
  <li>Improved efficiency and productivity</li>
  <li>Better results and outcomes</li>
  <li>Competitive advantage in your industry</li>
  <li>Cost-effective solutions</li>
</ul>

<h2>How to Get Started with ${keyword}</h2>
<p>Getting started with ${keyword} is easier than you might think. Follow these steps to begin your journey.</p>

<h2>Best Practices for ${keyword}</h2>
<p>To get the most out of ${keyword}, it's important to follow industry best practices and stay up-to-date with the latest trends.</p>

<h2>Conclusion</h2>
<p>Understanding ${keyword} is essential for success in today's competitive landscape. By implementing the strategies discussed in this guide, you'll be well on your way to achieving your goals.</p>`;

      metaDescription = `Learn everything about ${keyword} in this comprehensive guide. Discover best practices, benefits, and how to get started with ${keyword} today.`;
    }

    // Create post record with generated content
    const post = await prisma.post.create({
      data: {
        userId: req.userId!,
        websiteId,
        title,
        primaryKeyword: keyword,
        keywords: keyword ? [keyword] : [],
        content,
        metaDescription,
        status: 'draft',
        seoScore: 75,
        wordCount: actualWordCount,
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

    // Debug: Log website info
    console.log('Publishing post to website:', {
      websiteId: post.website.id,
      websiteUrl: post.website.url,
      platform: post.website.platform,
      hasUsername: !!post.website.apiUsername,
      hasApiKey: !!post.website.apiKey
    });

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
        details: error.message,
        websiteInfo: {
          url: post.website.url,
          platform: post.website.platform,
          hasUsername: !!post.website.apiUsername,
          hasApiKey: !!post.website.apiKey
        }
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
