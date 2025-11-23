import OpenAI from 'openai';
import { ScanResult } from './websiteScanner.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 90000, // 90 seconds timeout for AI requests
  maxRetries: 2,
});

export interface BusinessAnalysis {
  businessType: string;
  industry: string;
  targetAudience: string;
  brandVoice: string;
  suggestedTopics: string[];
  suggestedKeywords: string[];
}

export class AIAnalysisService {
  /**
   * Analyze scanned website content to extract business intelligence
   */
  async analyzeWebsite(scanResult: ScanResult): Promise<BusinessAnalysis> {
    const prompt = this.buildAnalysisPrompt(scanResult);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a business and marketing analyst. Analyze website content and provide insights about the business, target audience, and content opportunities. Always respond in valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      const analysis = JSON.parse(content);

      return {
        businessType: analysis.businessType || 'Unknown',
        industry: analysis.industry || 'General',
        targetAudience: analysis.targetAudience || 'General audience',
        brandVoice: analysis.brandVoice || 'professional',
        suggestedTopics: analysis.suggestedTopics || [],
        suggestedKeywords: analysis.suggestedKeywords || [],
      };
    } catch (error) {
      console.error('Error analyzing website:', error);
      throw new Error('Failed to analyze website content');
    }
  }

  /**
   * Build prompt for website analysis
   */
  private buildAnalysisPrompt(scanResult: ScanResult): string {
    const { extractedContent, mainServices } = scanResult;

    // Sample content to keep prompt size manageable
    const sampleHeadings = extractedContent.headings.slice(0, 20).join('\n- ');
    const sampleParagraphs = extractedContent.paragraphs.slice(0, 15).join('\n\n');
    const sampleNav = extractedContent.navigation.slice(0, 10).join(', ');

    return `Analyze this website and provide business insights in JSON format.

Website Content:

Page Titles:
${extractedContent.titles.join('\n')}

Main Headings:
- ${sampleHeadings}

Navigation Items:
${sampleNav}

Main Services/Offerings:
${mainServices.join(', ')}

Sample Content:
${sampleParagraphs}

Please provide a JSON response with the following structure:
{
  "businessType": "e.g., SaaS company, E-commerce store, Marketing agency, Professional services, etc.",
  "industry": "e.g., Technology, Healthcare, E-commerce, Marketing, Finance, etc.",
  "targetAudience": "Describe the primary target audience (e.g., Small business owners, Enterprise companies, B2C consumers, etc.)",
  "brandVoice": "One of: professional, casual, technical, friendly",
  "suggestedTopics": [
    "20 blog post topic ideas relevant to this business, formatted as compelling titles",
    "Focus on topics that would interest their target audience",
    "Include how-to guides, industry insights, best practices, etc."
  ],
  "suggestedKeywords": [
    "30 relevant SEO keywords for this business",
    "Include both short-tail and long-tail keywords",
    "Focus on keywords related to their services, industry, and target audience pain points"
  ]
}

Ensure all arrays contain the specified number of items.`;
  }

  /**
   * Generate blog title suggestions based on business context
   */
  async generateTitles(
    businessContext: string,
    industry: string,
    count: number = 6
  ): Promise<Array<{ title: string; keyword: string; difficulty: number }>> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert. Generate compelling, SEO-optimized blog post titles. Respond in valid JSON format.'
          },
          {
            role: 'user',
            content: `Generate ${count} SEO-optimized blog post titles for a ${businessContext} business in the ${industry} industry.

Requirements:
- Titles should be 50-60 characters
- Compelling and click-worthy
- Include relevant keywords naturally
- Address target audience pain points or interests

Respond with JSON:
{
  "titles": [
    {
      "title": "The blog post title",
      "keyword": "primary keyword for this title",
      "difficulty": estimated SEO difficulty (1-100, where 100 is most difficult)
    }
  ]
}`
          }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      const result = JSON.parse(content);
      return result.titles || [];
    } catch (error) {
      console.error('Error generating titles:', error);
      throw new Error('Failed to generate titles');
    }
  }

  /**
   * Generate blog content
   */
  async generateBlogPost(options: {
    title: string;
    keyword: string;
    wordCount: number;
    tone: string;
    businessContext?: string;
    serpData?: any;
    guestLink?: { url: string; anchor: string; placements: number };
  }): Promise<{ content: string; metaDescription: string }> {
    const { title, keyword, wordCount, tone, businessContext, serpData, guestLink } = options;

    const prompt = this.buildContentPrompt({
      title,
      keyword,
      wordCount,
      tone,
      businessContext,
      serpData,
      guestLink
    });

    try {
      console.log('Calling OpenAI API for blog post generation...');

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert SEO content writer. Write engaging, SEO-optimized blog posts in HTML format. Use proper heading tags (h2, h3), paragraphs, and maintain a ${tone} tone.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: Math.min(Math.ceil(wordCount * 1.5), 4000), // Cap at 4000 tokens
      });

      console.log('OpenAI API call completed successfully');

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      // Extract meta description (first 160 chars of intro)
      const tempDiv = content.substring(0, 500);
      const metaDescription = this.extractMetaDescription(content, keyword);

      return {
        content,
        metaDescription
      };
    } catch (error: any) {
      console.error('Error generating blog post:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        type: error.type,
        code: error.code
      });

      if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        throw new Error('Network error: Unable to reach OpenAI API');
      }

      if (error.status === 401) {
        throw new Error('OpenAI API authentication failed. Please check your API key.');
      }

      if (error.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      }

      throw new Error(`Failed to generate blog content: ${error.message}`);
    }
  }

  /**
   * Build prompt for content generation
   */
  private buildContentPrompt(options: {
    title: string;
    keyword: string;
    wordCount: number;
    tone: string;
    businessContext?: string;
    serpData?: any;
    guestLink?: { url: string; anchor: string; placements: number };
  }): string {
    const { title, keyword, wordCount, tone, businessContext, serpData, guestLink } = options;

    let prompt = `Write a comprehensive, SEO-optimized blog post with the following requirements:

Title: ${title}
Primary Keyword: ${keyword}
Word Count: Approximately ${wordCount} words
Tone: ${tone}
${businessContext ? `Business Context: ${businessContext}` : ''}

Requirements:
1. Include the keyword "${keyword}" naturally throughout (1-3% density)
2. Use the keyword in:
   - The first 100 words
   - At least 2 H2 headings
   - Naturally in the content body
3. Structure:
   - Engaging introduction (hook the reader)
   - 4-6 main H2 sections
   - 2-4 H3 subsections under each H2
   - Conclusion with call-to-action
4. Format in clean HTML:
   - Use <h2> and <h3> tags for headings
   - Use <p> tags for paragraphs
   - Use <ul> and <li> for lists where appropriate
   - Use <strong> for emphasis (sparingly)
5. Writing style:
   - ${tone} tone throughout
   - Conversational and engaging
   - Avoid fluff and generic content
   - Provide actionable insights
   - Use examples where relevant
`;

    if (serpData && serpData.topHeadings) {
      prompt += `\n6. SERP Competitive Analysis:\nTop-ranking articles use these headings:\n${serpData.topHeadings.slice(0, 10).join('\n')}\nIncorporate similar topics but with unique angles.\n`;
    }

    if (guestLink) {
      prompt += `\n7. Include this link exactly ${guestLink.placements} time(s) naturally in the content:\n   URL: ${guestLink.url}\n   Anchor text: "${guestLink.anchor}"\n   Place it contextually where it makes sense.\n`;
    }

    prompt += `\nReturn ONLY the HTML content (no meta description or title in the response, just the blog post HTML starting from the introduction).`;

    return prompt;
  }

  /**
   * Extract or generate meta description
   */
  private extractMetaDescription(content: string, keyword: string): string {
    // Remove HTML tags for plain text
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // Get first 155 characters and include keyword if not present
    let description = plainText.substring(0, 155);

    // Ensure keyword is included
    if (!description.toLowerCase().includes(keyword.toLowerCase()) && description.length < 140) {
      description = `${keyword}: ${description}`;
    }

    // Truncate at word boundary
    const lastSpace = description.lastIndexOf(' ');
    if (lastSpace > 100) {
      description = description.substring(0, lastSpace) + '...';
    }

    return description;
  }

  /**
   * Generate image alt text
   */
  async generateImageAltText(postTitle: string, keyword: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Generate SEO-optimized alt text for featured images. Keep it under 125 characters and include the keyword naturally.'
          },
          {
            role: 'user',
            content: `Generate alt text for a featured image for a blog post titled: "${postTitle}". Include the keyword "${keyword}" naturally.`
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      });

      const altText = response.choices[0].message.content?.trim() || `Featured image for ${postTitle}`;
      return altText.substring(0, 125);
    } catch (error) {
      return `Featured image for ${postTitle}`.substring(0, 125);
    }
  }
}

export default AIAnalysisService;
