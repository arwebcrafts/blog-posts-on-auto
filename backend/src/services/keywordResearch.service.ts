import axios from 'axios';

export interface KeywordData {
  keyword: string;
  searchVolume?: number;
  difficulty?: number;
  competition?: string;
  opportunityScore?: number;
}

export interface SERPResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  domain: string;
}

export interface SERPAnalysis {
  keyword: string;
  topResults: SERPResult[];
  commonHeadings: string[];
  avgWordCount: number;
  relatedSearches: string[];
}

export class KeywordResearchService {
  private apiKey: string;
  private baseUrl: string = 'https://api.valueserp.com/search';

  constructor() {
    this.apiKey = process.env.VALUESERP_API_KEY || '';
  }

  /**
   * Perform SERP analysis for a keyword
   */
  async analyzeSERP(keyword: string, location: string = 'United States'): Promise<SERPAnalysis> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          api_key: this.apiKey,
          q: keyword,
          location: location,
          google_domain: 'google.com',
          gl: 'us',
          hl: 'en',
          num: 10,
        }
      });

      const data = response.data;
      const organicResults = data.organic_results || [];

      // Extract top 10 results
      const topResults: SERPResult[] = organicResults.slice(0, 10).map((result: any, index: number) => ({
        position: index + 1,
        title: result.title || '',
        link: result.link || '',
        snippet: result.snippet || '',
        domain: this.extractDomain(result.link || '')
      }));

      // Extract related searches
      const relatedSearches = (data.related_searches || [])
        .map((rs: any) => rs.query)
        .filter((q: string) => q && q.length > 0)
        .slice(0, 10);

      return {
        keyword,
        topResults,
        commonHeadings: [], // Will be populated by crawling
        avgWordCount: 0, // Will be estimated
        relatedSearches
      };
    } catch (error) {
      console.error('Error analyzing SERP:', error);
      throw new Error('Failed to analyze SERP');
    }
  }

  /**
   * Get keyword suggestions based on seed keyword
   */
  async getKeywordSuggestions(seedKeyword: string): Promise<KeywordData[]> {
    try {
      // Use ValueSERP to get related searches
      const response = await axios.get(this.baseUrl, {
        params: {
          api_key: this.apiKey,
          q: seedKeyword,
          location: 'United States',
          google_domain: 'google.com',
        }
      });

      const relatedSearches = response.data.related_searches || [];
      const peopleAlsoAsk = response.data.related_questions || [];

      const keywords: KeywordData[] = [];

      // Add related searches
      relatedSearches.forEach((rs: any) => {
        if (rs.query) {
          keywords.push({
            keyword: rs.query,
            difficulty: this.estimateDifficulty(rs.query),
            opportunityScore: this.calculateOpportunityScore(undefined, this.estimateDifficulty(rs.query))
          });
        }
      });

      // Add questions from "People also ask"
      peopleAlsoAsk.forEach((q: any) => {
        if (q.question) {
          keywords.push({
            keyword: q.question,
            difficulty: this.estimateDifficulty(q.question),
            opportunityScore: this.calculateOpportunityScore(undefined, this.estimateDifficulty(q.question))
          });
        }
      });

      return keywords.slice(0, 20);
    } catch (error) {
      console.error('Error getting keyword suggestions:', error);
      throw new Error('Failed to get keyword suggestions');
    }
  }

  /**
   * Estimate keyword difficulty (simple heuristic)
   * In production, you'd use DataForSEO API for accurate data
   */
  private estimateDifficulty(keyword: string): number {
    // Simple heuristic based on keyword length and word count
    const words = keyword.split(' ').length;

    if (words === 1) return 75; // Single word = hard
    if (words === 2) return 55; // Two words = medium
    if (words === 3) return 35; // Three words = easier
    return 25; // Long-tail = easiest
  }

  /**
   * Calculate opportunity score
   */
  private calculateOpportunityScore(searchVolume?: number, difficulty?: number): number {
    if (!searchVolume) {
      // Without volume data, use difficulty inverse
      return difficulty ? 100 - difficulty : 50;
    }

    // Formula: High volume + Low difficulty = High opportunity
    const volumeScore = Math.min((searchVolume / 1000) * 10, 50);
    const difficultyScore = difficulty ? 50 - (difficulty / 2) : 25;

    return Math.round(volumeScore + difficultyScore);
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  }

  /**
   * Get search volume and difficulty from DataForSEO
   * This is a placeholder - implement when DataForSEO integration is added
   */
  async getKeywordMetrics(keywords: string[]): Promise<Map<string, { volume: number; difficulty: number }>> {
    // TODO: Implement DataForSEO API call
    // For now, return estimated values
    const metricsMap = new Map();

    keywords.forEach(keyword => {
      metricsMap.set(keyword, {
        volume: this.estimateVolume(keyword),
        difficulty: this.estimateDifficulty(keyword)
      });
    });

    return metricsMap;
  }

  /**
   * Estimate search volume (placeholder)
   */
  private estimateVolume(keyword: string): number {
    const words = keyword.split(' ').length;
    if (words === 1) return 10000; // High volume
    if (words === 2) return 2400;
    if (words === 3) return 880;
    return 320; // Long-tail
  }
}

export default KeywordResearchService;
