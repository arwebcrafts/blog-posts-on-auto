import axios from 'axios';

export interface BacklinkData {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainAuthority?: number;
  firstSeen: Date;
  status: string;
}

export interface BacklinkSummary {
  totalBacklinks: number;
  referringDomains: number;
  newBacklinksThisMonth: number;
  lostBacklinks: number;
}

export class BacklinkAnalysisService {
  private login: string;
  private password: string;
  private baseUrl: string = 'https://api.dataforseo.com/v3';

  constructor() {
    this.login = process.env.DATAFORSEO_LOGIN || '';
    this.password = process.env.DATAFORSEO_PASSWORD || '';
  }

  /**
   * Get backlink summary for a domain
   */
  async getBacklinkSummary(domain: string): Promise<BacklinkSummary> {
    try {
      const auth = Buffer.from(`${this.login}:${this.password}`).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/backlinks/summary/live`,
        [{
          target: domain,
          internal_list_limit: 10,
          backlinks_status_type: 'all'
        }],
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;

      if (data.status_code !== 20000) {
        throw new Error('DataForSEO API error');
      }

      const result = data.tasks[0]?.result?.[0];

      if (!result) {
        return {
          totalBacklinks: 0,
          referringDomains: 0,
          newBacklinksThisMonth: 0,
          lostBacklinks: 0
        };
      }

      return {
        totalBacklinks: result.backlinks || 0,
        referringDomains: result.referring_domains || 0,
        newBacklinksThisMonth: result.backlinks_new || 0,
        lostBacklinks: result.backlinks_lost || 0
      };
    } catch (error) {
      console.error('Error getting backlink summary:', error);
      throw new Error('Failed to get backlink summary');
    }
  }

  /**
   * Get detailed backlink list for a domain
   */
  async getBacklinks(domain: string, limit: number = 100): Promise<BacklinkData[]> {
    try {
      const auth = Buffer.from(`${this.login}:${this.password}`).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/backlinks/backlinks/live`,
        [{
          target: domain,
          limit: limit,
          offset: 0,
          filters: ['dofollow', '=', true]
        }],
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;

      if (data.status_code !== 20000) {
        throw new Error('DataForSEO API error');
      }

      const items = data.tasks[0]?.result?.[0]?.items || [];

      return items.map((item: any) => ({
        sourceUrl: item.url_from || '',
        targetUrl: item.url_to || '',
        anchorText: item.anchor || '',
        domainAuthority: item.rank || 0,
        firstSeen: new Date(item.first_seen || Date.now()),
        status: item.is_lost ? 'lost' : 'live'
      }));
    } catch (error) {
      console.error('Error getting backlinks:', error);
      throw new Error('Failed to get backlinks');
    }
  }

  /**
   * Get referring domains
   */
  async getReferringDomains(domain: string, limit: number = 50): Promise<string[]> {
    try {
      const auth = Buffer.from(`${this.login}:${this.password}`).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/backlinks/referring_domains/live`,
        [{
          target: domain,
          limit: limit
        }],
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;
      const items = data.tasks[0]?.result?.[0]?.items || [];

      return items.map((item: any) => item.domain);
    } catch (error) {
      console.error('Error getting referring domains:', error);
      throw new Error('Failed to get referring domains');
    }
  }

  /**
   * Analyze competitor backlinks
   */
  async analyzeCompetitorBacklinks(competitorDomain: string, yourDomain: string): Promise<{
    competitorBacklinks: number;
    yourBacklinks: number;
    gap: number;
    opportunities: string[];
  }> {
    try {
      const [competitorSummary, yourSummary, competitorDomains, yourDomains] = await Promise.all([
        this.getBacklinkSummary(competitorDomain),
        this.getBacklinkSummary(yourDomain),
        this.getReferringDomains(competitorDomain, 100),
        this.getReferringDomains(yourDomain, 100)
      ]);

      // Find domains linking to competitor but not to you
      const yourDomainsSet = new Set(yourDomains);
      const opportunities = competitorDomains.filter(domain => !yourDomainsSet.has(domain));

      return {
        competitorBacklinks: competitorSummary.totalBacklinks,
        yourBacklinks: yourSummary.totalBacklinks,
        gap: competitorSummary.totalBacklinks - yourSummary.totalBacklinks,
        opportunities: opportunities.slice(0, 20)
      };
    } catch (error) {
      console.error('Error analyzing competitor backlinks:', error);
      throw new Error('Failed to analyze competitor backlinks');
    }
  }

  /**
   * Track backlinks for a domain (scheduled job)
   */
  async trackBacklinks(domain: string, existingBacklinks: BacklinkData[]): Promise<{
    newBacklinks: BacklinkData[];
    lostBacklinks: BacklinkData[];
  }> {
    try {
      const currentBacklinks = await this.getBacklinks(domain);

      const existingUrls = new Set(existingBacklinks.map(b => b.sourceUrl));
      const currentUrls = new Set(currentBacklinks.map(b => b.sourceUrl));

      // Find new backlinks
      const newBacklinks = currentBacklinks.filter(b => !existingUrls.has(b.sourceUrl));

      // Find lost backlinks
      const lostBacklinks = existingBacklinks.filter(b => !currentUrls.has(b.sourceUrl));

      return {
        newBacklinks,
        lostBacklinks
      };
    } catch (error) {
      console.error('Error tracking backlinks:', error);
      throw new Error('Failed to track backlinks');
    }
  }
}

export default BacklinkAnalysisService;
