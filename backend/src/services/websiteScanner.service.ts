import { chromium, Browser, Page } from 'playwright';
import { URL } from 'url';
import * as cheerio from 'cheerio';

export interface ScanResult {
  url: string;
  businessType?: string;
  industry?: string;
  targetAudience?: string;
  brandVoice?: string;
  mainServices: string[];
  suggestedTopics: string[];
  suggestedKeywords: string[];
  extractedContent: {
    titles: string[];
    headings: string[];
    paragraphs: string[];
    navigation: string[];
    callsToAction: string[];
  };
}

export class WebsiteScannerService {
  private browser: Browser | null = null;
  private visitedUrls: Set<string> = new Set();
  private maxPages: number = 15; // Scan up to 15 pages
  private baseUrl: string = '';

  /**
   * Main method to scan entire website
   */
  async scanWebsite(url: string): Promise<ScanResult> {
    try {
      // Normalize URL
      this.baseUrl = this.normalizeUrl(url);
      this.visitedUrls.clear();

      // Launch browser
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const extractedContent = {
        titles: [] as string[],
        headings: [] as string[],
        paragraphs: [] as string[],
        navigation: [] as string[],
        callsToAction: [] as string[]
      };

      // Start crawling from homepage
      await this.crawlPage(this.baseUrl, extractedContent);

      // Get all internal links from homepage
      const links = await this.getInternalLinks(this.baseUrl);

      // Prioritize important pages
      const priorityPages = this.prioritizePages(links);

      // Crawl priority pages
      for (const link of priorityPages.slice(0, this.maxPages - 1)) {
        if (!this.visitedUrls.has(link)) {
          await this.crawlPage(link, extractedContent);
        }
      }

      // Close browser
      await this.browser?.close();

      // Analyze extracted content
      const result: ScanResult = {
        url: this.baseUrl,
        mainServices: this.extractServices(extractedContent),
        extractedContent,
        suggestedTopics: [],
        suggestedKeywords: [],
      };

      return result;
    } catch (error) {
      await this.browser?.close();
      throw error;
    }
  }

  /**
   * Crawl a single page and extract content
   */
  private async crawlPage(url: string, extractedContent: ScanResult['extractedContent']): Promise<void> {
    if (this.visitedUrls.has(url) || this.visitedUrls.size >= this.maxPages) {
      return;
    }

    try {
      this.visitedUrls.add(url);

      const page = await this.browser!.newPage();

      // Navigate with timeout
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Get page content
      const html = await page.content();
      const $ = cheerio.load(html);

      // Extract page title
      const title = $('title').text().trim();
      if (title) extractedContent.titles.push(title);

      // Extract meta description
      const metaDescription = $('meta[name="description"]').attr('content');
      if (metaDescription) {
        extractedContent.paragraphs.push(metaDescription);
      }

      // Extract headings
      $('h1, h2, h3').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 3 && text.length < 200) {
          extractedContent.headings.push(text);
        }
      });

      // Extract paragraphs
      $('p').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 20 && text.length < 500) {
          extractedContent.paragraphs.push(text);
        }
      });

      // Extract navigation items
      $('nav a, header a, .menu a, .navigation a').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 2 && text.length < 50) {
          extractedContent.navigation.push(text);
        }
      });

      // Extract CTAs (buttons, links with common CTA text)
      $('button, .btn, .cta, a[class*="button"]').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 2 && text.length < 100) {
          extractedContent.callsToAction.push(text);
        }
      });

      // Extract lists (services/features)
      $('ul li, ol li').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 5 && text.length < 200) {
          extractedContent.paragraphs.push(text);
        }
      });

      await page.close();
    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
      // Continue with other pages
    }
  }

  /**
   * Get all internal links from a page
   */
  private async getInternalLinks(url: string): Promise<string[]> {
    try {
      const page = await this.browser!.newPage();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      const links = await page.$$eval('a[href]', (anchors, baseUrl) => {
        return anchors
          .map(a => a.getAttribute('href'))
          .filter(href => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
          .map(href => {
            try {
              // Convert relative URLs to absolute
              if (href!.startsWith('/')) {
                return new URL(href!, baseUrl).href;
              } else if (!href!.startsWith('http')) {
                return new URL(href!, baseUrl).href;
              }
              return href;
            } catch {
              return null;
            }
          })
          .filter(href => href !== null) as string[];
      }, this.baseUrl);

      await page.close();

      // Filter to only internal links
      const baseDomain = new URL(this.baseUrl).hostname;
      const internalLinks = links.filter(link => {
        try {
          const linkDomain = new URL(link).hostname;
          return linkDomain === baseDomain;
        } catch {
          return false;
        }
      });

      // Remove duplicates
      return Array.from(new Set(internalLinks));
    } catch (error) {
      console.error('Error getting internal links:', error);
      return [];
    }
  }

  /**
   * Prioritize pages to scan (about, services, products, blog)
   */
  private prioritizePages(links: string[]): string[] {
    const priorityKeywords = [
      'about', 'services', 'products', 'what-we-do', 'solutions',
      'features', 'pricing', 'how-it-works', 'blog', 'contact'
    ];

    const prioritized = links.sort((a, b) => {
      const aScore = priorityKeywords.reduce((score, keyword) => {
        return score + (a.toLowerCase().includes(keyword) ? 10 : 0);
      }, 0);

      const bScore = priorityKeywords.reduce((score, keyword) => {
        return score + (b.toLowerCase().includes(keyword) ? 10 : 0);
      }, 0);

      return bScore - aScore;
    });

    return prioritized;
  }

  /**
   * Extract services from content
   */
  private extractServices(extractedContent: ScanResult['extractedContent']): string[] {
    const services: Set<string> = new Set();

    // Look for common service indicators in navigation
    extractedContent.navigation.forEach(navItem => {
      if (navItem.length > 3 && navItem.length < 50) {
        services.add(navItem);
      }
    });

    // Look for services in headings
    extractedContent.headings.forEach(heading => {
      // Filter out common non-service headings
      const lowerHeading = heading.toLowerCase();
      if (!lowerHeading.includes('welcome') &&
          !lowerHeading.includes('latest') &&
          !lowerHeading.includes('blog') &&
          heading.length < 100) {
        services.add(heading);
      }
    });

    return Array.from(services).slice(0, 20);
  }

  /**
   * Normalize URL
   */
  private normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return `${parsed.protocol}//${parsed.hostname}`;
    } catch {
      throw new Error('Invalid URL format');
    }
  }
}

export default WebsiteScannerService;
