import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import prisma from '../config/database';

// Create Redis connection
const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});

// ============================================
// QUEUES
// ============================================

export const publishQueue = new Queue('publish-posts', { connection });
export const scanQueue = new Queue('scan-websites', { connection });
export const bulkPostQueue = new Queue('bulk-posts', { connection });
export const backlinkQueue = new Queue('backlinks', { connection });

// ============================================
// JOB TYPES
// ============================================

export interface PublishJobData {
  postId: string;
  userId: string;
}

export interface ScanJobData {
  websiteId: string;
  userId: string;
  url: string;
}

export interface BulkPostJobData {
  userId: string;
  websiteId: string;
  keywords: string[];
  wordCount: number;
  tone: string;
  generateImages: boolean;
  schedule: {
    frequency: string; // daily, every-2-days, weekly
    startDate: Date;
    time: string;
  };
}

export interface BacklinkJobData {
  userId: string;
  domain: string;
}

// ============================================
// QUEUE SERVICE CLASS
// ============================================

export class QueueService {
  /**
   * Schedule a post for publishing
   */
  static async schedulePost(postId: string, userId: string, scheduledAt: Date) {
    const delay = scheduledAt.getTime() - Date.now();

    if (delay < 0) {
      throw new Error('Cannot schedule post in the past');
    }

    const job = await publishQueue.add(
      'publish-post',
      { postId, userId },
      {
        delay,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: false,
        removeOnFail: false,
      }
    );

    // Update post with job ID
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'scheduled' }
    });

    return job;
  }

  /**
   * Schedule website scan
   */
  static async scheduleWebsiteScan(websiteId: string, userId: string, url: string) {
    const job = await scanQueue.add(
      'scan-website',
      { websiteId, userId, url },
      {
        attempts: 2,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      }
    );

    // Update website status
    await prisma.website.update({
      where: { id: websiteId },
      data: { scanStatus: 'scanning' }
    });

    return job;
  }

  /**
   * Schedule bulk post creation
   */
  static async scheduleBulkPosts(data: BulkPostJobData) {
    const job = await bulkPostQueue.add(
      'bulk-posts',
      data,
      {
        attempts: 1, // Don't retry bulk operations
      }
    );

    return job;
  }

  /**
   * Schedule backlink check
   */
  static async scheduleBacklinkCheck(userId: string, domain: string) {
    const job = await backlinkQueue.add(
      'check-backlinks',
      { userId, domain },
      {
        attempts: 2,
      }
    );

    return job;
  }

  /**
   * Cancel a scheduled post
   */
  static async cancelScheduledPost(postId: string) {
    const jobs = await publishQueue.getJobs(['delayed', 'waiting']);

    for (const job of jobs) {
      if (job.data.postId === postId) {
        await job.remove();

        // Update post status
        await prisma.post.update({
          where: { id: postId },
          data: { status: 'draft' }
        });

        return true;
      }
    }

    return false;
  }

  /**
   * Reschedule a post
   */
  static async reschedulePost(postId: string, userId: string, newScheduledAt: Date) {
    // Cancel existing job
    await this.cancelScheduledPost(postId);

    // Schedule new job
    return this.schedulePost(postId, userId, newScheduledAt);
  }

  /**
   * Get job status
   */
  static async getJobStatus(jobId: string, queueName: string) {
    const queue = this.getQueue(queueName);
    const job = await queue.getJob(jobId);

    if (!job) {
      return null;
    }

    const state = await job.getState();
    const progress = job.progress;

    return {
      id: job.id,
      state,
      progress,
      data: job.data,
      returnValue: job.returnvalue,
      failedReason: job.failedReason,
    };
  }

  /**
   * Get queue by name
   */
  private static getQueue(queueName: string) {
    switch (queueName) {
      case 'publish-posts':
        return publishQueue;
      case 'scan-websites':
        return scanQueue;
      case 'bulk-posts':
        return bulkPostQueue;
      case 'backlinks':
        return backlinkQueue;
      default:
        throw new Error(`Unknown queue: ${queueName}`);
    }
  }
}

export default QueueService;
