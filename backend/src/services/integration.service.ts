import axios from 'axios';
import prisma from '../config/database';

type Post = Awaited<ReturnType<typeof prisma.post.findUnique>>;
type Website = Awaited<ReturnType<typeof prisma.website.findUnique>>;

export class IntegrationService {
  /**
   * Publish post to the appropriate platform
   */
  async publishPost(post: NonNullable<Post> & { website: NonNullable<Website> }): Promise<string> {
    const { website } = post;

    switch (website.platform) {
      case 'wordpress':
        return this.publishToWordPress(post, website);
      case 'shopify':
        return this.publishToShopify(post, website);
      case 'wix':
        return this.publishToWix(post, website);
      case 'blogger':
        return this.publishToBlogger(post, website);
      case 'custom':
        return this.publishToCustomSite(post, website);
      default:
        throw new Error(`Unknown platform: ${website.platform}`);
    }
  }

  /**
   * Publish to WordPress via REST API with Application Password
   */
  private async publishToWordPress(post: NonNullable<Post>, website: NonNullable<Website>): Promise<string> {
    if (!website.apiKey || !website.apiUsername) {
      throw new Error('WordPress integration not configured. Please provide username and application password.');
    }

    try {
      // Create Basic Auth token (username:applicationPassword)
      const authToken = Buffer.from(`${website.apiUsername}:${website.apiKey}`).toString('base64');

      // Prepare post data for WordPress REST API
      const postData: any = {
        title: post.title,
        content: post.content,
        status: 'publish'
      };

      // Add excerpt if meta description exists
      if (post.metaDescription) {
        postData.excerpt = post.metaDescription;
      }

      // Publish to WordPress REST API
      const response = await axios.post(
        `${website.url}/wp-json/wp/v2/posts`,
        postData,
        {
          headers: {
            'Authorization': `Basic ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.id.toString();
    } catch (error: any) {
      console.error('WordPress publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to WordPress: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Publish to Shopify via Admin API
   */
  private async publishToShopify(post: NonNullable<Post>, website: NonNullable<Website>): Promise<string> {
    if (!website.shopifyToken || !website.apiEndpoint) {
      throw new Error('Shopify integration not configured');
    }

    try {
      // Extract blog ID from apiEndpoint or use default
      const blogId = website.apiEndpoint || '0'; // User should provide blog ID

      const response = await axios.post(
        `https://${website.url.replace(/https?:\/\//, '')}/admin/api/2024-10/blogs/${blogId}/articles.json`,
        {
          article: {
            title: post.title,
            body_html: post.content,
            published_at: post.scheduledAt?.toISOString() || new Date().toISOString(),
            image: post.featuredImageUrl ? {
              src: post.featuredImageUrl,
              alt: post.featuredImageAlt || post.title
            } : undefined,
            metafields: [
              {
                namespace: 'seo',
                key: 'meta_description',
                value: post.metaDescription,
                type: 'single_line_text_field'
              }
            ]
          }
        },
        {
          headers: {
            'X-Shopify-Access-Token': website.shopifyToken,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.article.id.toString();
    } catch (error: any) {
      console.error('Shopify publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to Shopify: ${error.response?.data?.errors || error.message}`);
    }
  }

  /**
   * Publish to Wix via Wix Blog API
   */
  private async publishToWix(post: NonNullable<Post>, website: NonNullable<Website>): Promise<string> {
    if (!website.apiKey || !website.wixSiteId) {
      throw new Error('Wix integration not configured');
    }

    try {
      const response = await axios.post(
        'https://www.wixapis.com/v2/posts',
        {
          post: {
            title: post.title,
            content: post.content,
            coverImage: post.featuredImageUrl,
            excerpt: post.metaDescription,
            scheduledPublishDate: post.scheduledAt?.toISOString(),
            status: 'PUBLISHED'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${website.apiKey}`,
            'wix-site-id': website.wixSiteId,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.post.id;
    } catch (error: any) {
      console.error('Wix publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to Wix: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Publish to Blogger via Google Blogger API
   */
  private async publishToBlogger(post: NonNullable<Post>, website: NonNullable<Website>): Promise<string> {
    if (!website.apiKey || !website.bloggerBlogId) {
      throw new Error('Blogger integration not configured');
    }

    try {
      const response = await axios.post(
        `https://www.googleapis.com/blogger/v3/blogs/${website.bloggerBlogId}/posts/`,
        {
          kind: 'blogger#post',
          title: post.title,
          content: post.content,
        },
        {
          headers: {
            'Authorization': `Bearer ${website.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.id;
    } catch (error: any) {
      console.error('Blogger publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to Blogger: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Publish to custom site via webhook
   */
  private async publishToCustomSite(post: NonNullable<Post>, website: NonNullable<Website>): Promise<string> {
    if (!website.apiEndpoint) {
      throw new Error('Custom site webhook not configured');
    }

    try {
      const response = await axios.post(
        website.apiEndpoint,
        {
          title: post.title,
          content: post.content,
          featured_image_url: post.featuredImageUrl,
          featured_image_alt: post.featuredImageAlt,
          meta_description: post.metaDescription,
          keywords: post.keywords,
          schedule_date: post.scheduledAt?.toISOString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(website.apiKey && { 'X-API-Key': website.apiKey })
          }
        }
      );

      return response.data.id || response.data.post_id || 'custom';
    } catch (error: any) {
      console.error('Custom site publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to custom site: ${error.message}`);
    }
  }

  /**
   * Test integration connection
   */
  async testConnection(website: NonNullable<Website>): Promise<boolean> {
    try {
      if (!website.platform) {
        return false;
      }

      switch (website.platform) {
        case 'wordpress':
          if (!website.apiEndpoint || !website.apiKey) return false;
          await axios.get(`${website.apiEndpoint}/wp-json/contentflow/v1/test`, {
            headers: { 'X-API-Key': website.apiKey }
          });
          return true;

        case 'shopify':
          if (!website.shopifyToken) return false;
          await axios.get(`https://${website.url.replace(/https?:\/\//, '')}/admin/api/2024-10/shop.json`, {
            headers: { 'X-Shopify-Access-Token': website.shopifyToken }
          });
          return true;

        case 'wix':
          // Wix doesn't have a simple test endpoint, so we'll just verify the token format
          return !!(website.apiKey && website.wixSiteId);

        case 'blogger':
          return !!(website.apiKey && website.bloggerBlogId);

        case 'custom':
          // For custom sites, we can't test without a specific endpoint
          return !!website.apiEndpoint;

        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default IntegrationService;
