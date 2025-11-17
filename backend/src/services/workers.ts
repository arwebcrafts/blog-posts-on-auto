import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import prisma from '../config/database';
import WebsiteScannerService from './websiteScanner.service';
import AIAnalysisService from './aiAnalysis.service';
import ImageGenerationService from './imageGeneration.service';
import SEOScoringService from './seoScoring.service';
import { PublishJobData, ScanJobData, BulkPostJobData, BacklinkJobData } from './queue.service';
import IntegrationService from './integration.service';

// Create Redis connection for workers
const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});

// ============================================
// PUBLISH POST WORKER
// ============================================

const publishWorker = new Worker(
  'publish-posts',
  async (job: Job<PublishJobData>) => {
    const { postId, userId } = job.data;

    try {
      // Get post details
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { website: true }
      });

      if (!post) {
        throw new Error('Post not found');
      }

      // Publish to platform
      const integrationService = new IntegrationService();
      const externalPostId = await integrationService.publishPost(post);

      // Update post status
      await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'published',
          publishedAt: new Date(),
          externalPostId
        }
      });

      return { success: true, externalPostId };
    } catch (error: any) {
      // Mark post as failed
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'failed' }
      });

      throw error;
    }
  },
  { connection, concurrency: 5 }
);

publishWorker.on('completed', (job) => {
  console.log(`✅ Post ${job.data.postId} published successfully`);
});

publishWorker.on('failed', (job, err) => {
  console.error(`❌ Failed to publish post ${job?.data.postId}:`, err.message);
});

// ============================================
// WEBSITE SCAN WORKER
// ============================================

const scanWorker = new Worker(
  'scan-websites',
  async (job: Job<ScanJobData>) => {
    const { websiteId, url } = job.data;

    try {
      // Scan website
      const scanner = new WebsiteScannerService();
      const scanResult = await scanner.scanWebsite(url);

      // Analyze with AI
      const aiAnalysis = new AIAnalysisService();
      const analysis = await aiAnalysis.analyzeWebsite(scanResult);

      // Update website in database
      await prisma.website.update({
        where: { id: websiteId },
        data: {
          lastScanned: new Date(),
          scanStatus: 'completed',
          businessType: analysis.businessType,
          industry: analysis.industry,
          targetAudience: analysis.targetAudience,
          brandVoice: analysis.brandVoice,
          mainServices: scanResult.mainServices,
          suggestedTopics: analysis.suggestedTopics,
          suggestedKeywords: analysis.suggestedKeywords,
        }
      });

      // Save knowledge base entry
      await prisma.knowledgeBase.create({
        data: {
          userId: job.data.userId,
          type: 'website_scan',
          content: JSON.stringify(scanResult.extractedContent),
          extractedText: scanResult.extractedContent.paragraphs.join('\n\n'),
          metadata: {
            businessType: analysis.businessType,
            industry: analysis.industry,
            targetAudience: analysis.targetAudience,
          }
        }
      });

      return { success: true, analysis };
    } catch (error: any) {
      // Mark scan as failed
      await prisma.website.update({
        where: { id: websiteId },
        data: { scanStatus: 'failed' }
      });

      throw error;
    }
  },
  { connection, concurrency: 2 } // Limit concurrent scans
);

scanWorker.on('completed', (job) => {
  console.log(`✅ Website ${job.data.websiteId} scanned successfully`);
});

scanWorker.on('failed', (job, err) => {
  console.error(`❌ Failed to scan website ${job?.data.websiteId}:`, err.message);
});

// ============================================
// BULK POST CREATION WORKER
// ============================================

const bulkPostWorker = new Worker(
  'bulk-posts',
  async (job: Job<BulkPostJobData>) => {
    const { userId, websiteId, keywords, wordCount, tone, generateImages, schedule } = job.data;

    try {
      const aiService = new AIAnalysisService();
      const imageService = new ImageGenerationService();
      const seoService = new SEOScoringService();

      const createdPosts = [];
      let currentDate = new Date(schedule.startDate);

      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i];

        // Update progress
        await job.updateProgress((i / keywords.length) * 100);

        // Generate title
        const titles = await aiService.generateTitles('business', 'general', 1);
        const title = titles[0]?.title || `Complete Guide to ${keyword}`;

        // Generate content
        const { content, metaDescription } = await aiService.generateBlogPost({
          title,
          keyword,
          wordCount,
          tone
        });

        // Generate image if requested
        let featuredImageUrl = null;
        let featuredImageAlt = null;

        if (generateImages) {
          featuredImageUrl = await imageService.generateFeaturedImage({ postTitle: title });
          featuredImageAlt = await aiService.generateImageAltText(title, keyword);
        }

        // Calculate SEO score
        const seoScore = seoService.calculateScore(content, title, metaDescription, keyword);

        // Create post
        const post = await prisma.post.create({
          data: {
            userId,
            websiteId,
            title,
            content,
            metaDescription,
            featuredImageUrl,
            featuredImageAlt,
            primaryKeyword: keyword,
            keywords: [keyword],
            seoScore: seoScore.score,
            seoRecommendations: seoScore as any,
            wordCount,
            tone,
            status: 'scheduled',
            scheduledAt: currentDate,
          }
        });

        createdPosts.push(post);

        // Calculate next schedule date
        const daysToAdd = schedule.frequency === 'daily' ? 1 :
                          schedule.frequency === 'every-2-days' ? 2 :
                          schedule.frequency === 'weekly' ? 7 : 1;

        currentDate = new Date(currentDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
      }

      return { success: true, count: createdPosts.length, posts: createdPosts };
    } catch (error: any) {
      throw error;
    }
  },
  { connection, concurrency: 1 } // Process one bulk operation at a time
);

bulkPostWorker.on('completed', (job) => {
  console.log(`✅ Bulk posts created: ${job.returnvalue.count} posts`);
});

bulkPostWorker.on('failed', (job, err) => {
  console.error(`❌ Failed to create bulk posts:`, err.message);
});

bulkPostWorker.on('progress', (job, progress) => {
  console.log(`📊 Bulk post creation progress: ${progress}%`);
});

// ============================================
// BACKLINK CHECK WORKER
// ============================================

const backlinkWorker = new Worker(
  'backlinks',
  async (job: Job<BacklinkJobData>) => {
    const { userId, domain } = job.data;

    try {
      // This would integrate with BacklinkAnalysisService
      // For now, placeholder
      console.log(`Checking backlinks for ${domain}`);

      return { success: true };
    } catch (error: any) {
      throw error;
    }
  },
  { connection, concurrency: 3 }
);

// ============================================
// EXPORT WORKERS
// ============================================

export const workers = {
  publishWorker,
  scanWorker,
  bulkPostWorker,
  backlinkWorker,
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing workers...');
  await publishWorker.close();
  await scanWorker.close();
  await bulkPostWorker.close();
  await backlinkWorker.close();
  process.exit(0);
});

export default workers;
