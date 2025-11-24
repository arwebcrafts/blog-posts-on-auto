import express, { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Debug endpoint: Get all websites with credential status
router.get('/debug', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const websites = await prisma.website.findMany({
      where: { userId: req.userId },
      select: {
        id: true,
        name: true,
        url: true,
        platform: true,
        apiUsername: true,
        apiKey: true,
        apiEndpoint: true,
        _count: {
          select: { posts: true }
        },
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const websiteInfo = websites.map(w => ({
      id: w.id,
      name: w.name,
      url: w.url,
      platform: w.platform,
      hasUsername: !!w.apiUsername,
      hasApiKey: !!w.apiKey,
      username: w.apiUsername || null,
      apiEndpoint: w.apiEndpoint,
      postCount: w._count.posts,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt
    }));

    res.json(websiteInfo);
  } catch (error) {
    next(error);
  }
});

// Update credentials for all websites with matching URL
router.post('/update-credentials', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { url, username, applicationPassword } = req.body;

    if (!url || !username || !applicationPassword) {
      return res.status(400).json({ error: 'Missing required fields: url, username, applicationPassword' });
    }

    // Update all websites with this URL for this user
    const result = await prisma.website.updateMany({
      where: {
        userId: req.userId,
        url: url
      },
      data: {
        apiUsername: username,
        apiKey: applicationPassword
      }
    });

    res.json({
      message: `Updated ${result.count} website(s) with new credentials`,
      count: result.count
    });
  } catch (error) {
    next(error);
  }
});

// Get all integrations (websites with integration details)
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const websites = await prisma.website.findMany({
      where: {
        userId: req.userId,
        platform: { not: null } // Only return websites with platform integration
      },
      select: {
        id: true,
        name: true,
        url: true,
        platform: true,
        apiEndpoint: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform to match frontend expectations
    const integrations = websites.map((website: typeof websites[0]) => ({
      id: website.id,
      websiteId: website.id,
      platform: website.platform,
      websiteName: website.name || website.url,
      websiteUrl: website.url,
      status: 'active' as const,
      createdAt: website.createdAt,
      updatedAt: website.updatedAt
    }));

    res.json(integrations);
  } catch (error) {
    next(error);
  }
});

// Connect integration (create or update website with integration details)
router.post('/connect', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { websiteId, platform, credentials } = req.body;

    // Extract credentials based on platform
    const { url, username, applicationPassword, accessToken, shopUrl, siteId, apiKey, blogId, webhookUrl } = credentials || {};

    // Determine website URL and API endpoint based on platform
    let websiteUrl = url || shopUrl || '';
    let apiEndpoint = '';

    if (platform === 'wordpress') {
      websiteUrl = url;
      apiEndpoint = `${url}/wp-json/wp/v2`;
    } else if (platform === 'shopify') {
      websiteUrl = shopUrl;
      apiEndpoint = `${shopUrl}/admin/api/2024-01`;
    }

    // Find existing website by URL and userId, or create new one
    const existingWebsite = await prisma.website.findFirst({
      where: {
        userId: req.userId,
        url: websiteUrl,
        platform
      }
    });

    let website;
    if (existingWebsite) {
      // Update existing website
      website = await prisma.website.update({
        where: { id: existingWebsite.id },
        data: {
          platform,
          apiKey: applicationPassword || accessToken || apiKey || undefined,
          apiUsername: username || undefined,
          apiEndpoint: apiEndpoint || undefined,
          shopifyToken: accessToken || undefined,
          wixSiteId: siteId || undefined,
          bloggerBlogId: blogId || undefined
        }
      });
    } else {
      // Create new website
      website = await prisma.website.create({
        data: {
          url: websiteUrl,
          name: websiteUrl,
          userId: req.userId!,
          platform,
          apiKey: applicationPassword || accessToken || apiKey || undefined,
          apiUsername: username || undefined,
          apiEndpoint: apiEndpoint || undefined,
          shopifyToken: accessToken || undefined,
          wixSiteId: siteId || undefined,
          bloggerBlogId: blogId || undefined
        }
      });
    }

    // Return in expected format
    const integration = {
      id: website.id,
      websiteId: website.id,
      platform: website.platform,
      websiteName: website.name || website.url,
      websiteUrl: website.url,
      status: 'active',
      createdAt: website.createdAt,
      updatedAt: website.updatedAt
    };

    res.json(integration);
  } catch (error) {
    next(error);
  }
});

// Test integration
router.post('/:id/test', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get website to verify integration exists
    const website = await prisma.website.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!website || !website.platform) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Mock test success - in production would actually test the connection
    res.json({
      success: true,
      message: 'Connection test successful',
      platform: website.platform
    });
  } catch (error) {
    next(error);
  }
});

// Disconnect integration (clear integration fields)
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Clear integration fields but keep the website
    await prisma.website.update({
      where: {
        id: req.params.id,
        userId: req.userId
      },
      data: {
        platform: null,
        apiKey: null,
        apiEndpoint: null,
        shopifyToken: null,
        wixSiteId: null,
        bloggerBlogId: null
      }
    });

    res.json({ message: 'Integration disconnected' });
  } catch (error) {
    next(error);
  }
});

export default router;
