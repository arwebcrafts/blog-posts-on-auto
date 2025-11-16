import * as cheerio from 'cheerio';

export interface SEOScore {
  score: number; // 0-100
  breakdown: {
    keywordInTitle: { score: number; max: number; passed: boolean };
    keywordDensity: { score: number; max: number; passed: boolean; density: number };
    metaDescription: { score: number; max: number; passed: boolean };
    keywordInFirst100Words: { score: number; max: number; passed: boolean };
    headingStructure: { score: number; max: number; passed: boolean };
    internalLinks: { score: number; max: number; passed: boolean; count: number };
    imageAltText: { score: number; max: number; passed: boolean };
    readability: { score: number; max: number; passed: boolean; fleschScore: number };
    wordCount: { score: number; max: number; passed: boolean; count: number };
    externalLinks: { score: number; max: number; passed: boolean; count: number };
  };
  recommendations: string[];
}

export class SEOScoringService {
  /**
   * Calculate comprehensive SEO score for blog post
   */
  calculateScore(content: string, title: string, metaDescription: string | null, keyword: string): SEOScore {
    const $ = cheerio.load(content);

    // Extract text content
    const textContent = $.text();
    const wordCount = this.countWords(textContent);
    const first100Words = textContent.split(/\s+/).slice(0, 100).join(' ');

    // Calculate individual scores
    const keywordInTitle = this.checkKeywordInTitle(title, keyword);
    const keywordDensity = this.calculateKeywordDensity(textContent, keyword);
    const metaDescriptionScore = this.checkMetaDescription(metaDescription, keyword);
    const keywordInFirst100 = this.checkKeywordInFirst100Words(first100Words, keyword);
    const headingStructure = this.checkHeadingStructure($);
    const internalLinks = this.checkInternalLinks($);
    const imageAltText = this.checkImageAltText($);
    const readability = this.calculateReadability(textContent);
    const wordCountScore = this.checkWordCount(wordCount);
    const externalLinks = this.checkExternalLinks($);

    // Calculate total score
    const totalScore =
      keywordInTitle.score +
      keywordDensity.score +
      metaDescriptionScore.score +
      keywordInFirst100.score +
      headingStructure.score +
      internalLinks.score +
      imageAltText.score +
      readability.score +
      wordCountScore.score +
      externalLinks.score;

    // Generate recommendations
    const recommendations = this.generateRecommendations({
      keywordInTitle,
      keywordDensity,
      metaDescription: metaDescriptionScore,
      keywordInFirst100,
      headingStructure,
      internalLinks,
      imageAltText,
      readability,
      wordCount: wordCountScore,
      externalLinks
    }, keyword);

    return {
      score: Math.round(totalScore),
      breakdown: {
        keywordInTitle,
        keywordDensity,
        metaDescription: metaDescriptionScore,
        keywordInFirst100Words: keywordInFirst100,
        headingStructure,
        internalLinks,
        imageAltText,
        readability,
        wordCount: wordCountScore,
        externalLinks
      },
      recommendations
    };
  }

  /**
   * Check if keyword is in title
   */
  private checkKeywordInTitle(title: string, keyword: string): { score: number; max: number; passed: boolean } {
    const passed = title.toLowerCase().includes(keyword.toLowerCase());
    return {
      score: passed ? 15 : 0,
      max: 15,
      passed
    };
  }

  /**
   * Calculate keyword density
   */
  private calculateKeywordDensity(text: string, keyword: string): { score: number; max: number; passed: boolean; density: number } {
    const words = text.toLowerCase().split(/\s+/);
    const keywordWords = keyword.toLowerCase().split(/\s+/);

    let keywordCount = 0;
    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase === keyword.toLowerCase()) {
        keywordCount++;
      }
    }

    const density = (keywordCount / words.length) * 100;

    let score = 0;
    let passed = false;

    if (density >= 1 && density <= 3) {
      score = 20;
      passed = true;
    } else if ((density >= 0.5 && density < 1) || (density > 3 && density <= 5)) {
      score = 10;
      passed = false;
    }

    return { score, max: 20, passed, density };
  }

  /**
   * Check meta description
   */
  private checkMetaDescription(metaDescription: string | null, keyword: string): { score: number; max: number; passed: boolean } {
    if (!metaDescription) {
      return { score: 0, max: 10, passed: false };
    }

    const length = metaDescription.length;
    const hasKeyword = metaDescription.toLowerCase().includes(keyword.toLowerCase());

    if (length >= 150 && length <= 160 && hasKeyword) {
      return { score: 10, max: 10, passed: true };
    } else if (metaDescription.length > 0) {
      return { score: 5, max: 10, passed: false };
    }

    return { score: 0, max: 10, passed: false };
  }

  /**
   * Check if keyword is in first 100 words
   */
  private checkKeywordInFirst100Words(first100Words: string, keyword: string): { score: number; max: number; passed: boolean } {
    const passed = first100Words.toLowerCase().includes(keyword.toLowerCase());
    return {
      score: passed ? 10 : 0,
      max: 10,
      passed
    };
  }

  /**
   * Check heading structure
   */
  private checkHeadingStructure($: cheerio.CheerioAPI): { score: number; max: number; passed: boolean } {
    const h1Count = $('h1').length;
    const h2Count = $('h2').length;
    const h3Count = $('h3').length;

    let score = 0;

    if (h1Count >= 1) score += 5;
    if (h2Count >= 3) score += 5;
    if (h3Count > 0) score += 5;

    return {
      score,
      max: 15,
      passed: score === 15
    };
  }

  /**
   * Check internal links
   */
  private checkInternalLinks($: cheerio.CheerioAPI): { score: number; max: number; passed: boolean; count: number } {
    // Count links that don't have external domains
    const links = $('a[href]');
    let internalCount = 0;

    links.each((_, el) => {
      const href = $(el).attr('href') || '';
      if (!href.startsWith('http') || href.includes('INTERNAL_LINK')) {
        internalCount++;
      }
    });

    let score = 0;
    let passed = false;

    if (internalCount >= 2 && internalCount <= 3) {
      score = 10;
      passed = true;
    } else if (internalCount === 1) {
      score = 5;
    }

    return { score, max: 10, passed, count: internalCount };
  }

  /**
   * Check image alt text
   */
  private checkImageAltText($: cheerio.CheerioAPI): { score: number; max: number; passed: boolean } {
    const images = $('img');
    const totalImages = images.length;

    if (totalImages === 0) {
      return { score: 10, max: 10, passed: true }; // No images = pass
    }

    let imagesWithAlt = 0;
    images.each((_, el) => {
      const alt = $(el).attr('alt');
      if (alt && alt.trim().length > 0) {
        imagesWithAlt++;
      }
    });

    const passed = imagesWithAlt === totalImages;
    const score = passed ? 10 : (imagesWithAlt > 0 ? 5 : 0);

    return { score, max: 10, passed };
  }

  /**
   * Calculate readability (Flesch Reading Ease)
   */
  private calculateReadability(text: string): { score: number; max: number; passed: boolean; fleschScore: number } {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((sum, word) => sum + this.countSyllables(word), 0);

    const avgSentenceLength = words.length / sentences.length || 0;
    const avgSyllablesPerWord = syllables / words.length || 0;

    // Flesch Reading Ease formula
    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

    let score = 0;
    let passed = false;

    if (fleschScore >= 60 && fleschScore <= 70) {
      score = 10;
      passed = true;
    } else if ((fleschScore >= 50 && fleschScore < 60) || (fleschScore > 70 && fleschScore <= 80)) {
      score = 5;
    }

    return { score, max: 10, passed, fleschScore: Math.round(fleschScore) };
  }

  /**
   * Check word count
   */
  private checkWordCount(wordCount: number): { score: number; max: number; passed: boolean; count: number } {
    let score = 0;
    let passed = false;

    if (wordCount >= 2000) {
      score = 5;
      passed = true;
    } else if (wordCount >= 1000) {
      score = 3;
    }

    return { score, max: 5, passed, count: wordCount };
  }

  /**
   * Check external links
   */
  private checkExternalLinks($: cheerio.CheerioAPI): { score: number; max: number; passed: boolean; count: number } {
    const links = $('a[href]');
    let externalCount = 0;

    links.each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.startsWith('http') && !href.includes('INTERNAL_LINK')) {
        externalCount++;
      }
    });

    let score = 0;
    let passed = false;

    if (externalCount >= 1 && externalCount <= 2) {
      score = 5;
      passed = true;
    }

    return { score, max: 5, passed, count: externalCount };
  }

  /**
   * Count words in text
   */
  private countWords(text: string): number {
    return text.split(/\s+/).filter(w => w.length > 0).length;
  }

  /**
   * Count syllables in a word (approximate)
   */
  private countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;

    const vowels = 'aeiouy';
    let count = 0;
    let previousWasVowel = false;

    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        count++;
      }
      previousWasVowel = isVowel;
    }

    // Adjust for silent 'e'
    if (word.endsWith('e')) {
      count--;
    }

    return Math.max(1, count);
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(breakdown: any, keyword: string): string[] {
    const recommendations: string[] = [];

    if (!breakdown.keywordInTitle.passed) {
      recommendations.push(`Add keyword "${keyword}" to the title`);
    }

    if (breakdown.keywordDensity.density < 1) {
      recommendations.push(`Increase keyword density to 1-3% (currently ${breakdown.keywordDensity.density.toFixed(2)}%)`);
    } else if (breakdown.keywordDensity.density > 3) {
      recommendations.push(`Reduce keyword density to 1-3% (currently ${breakdown.keywordDensity.density.toFixed(2)}%)`);
    }

    if (!breakdown.metaDescription.passed) {
      recommendations.push('Add a meta description (150-160 characters) with the keyword');
    }

    if (!breakdown.keywordInFirst100Words.passed) {
      recommendations.push('Include keyword in the first 100 words');
    }

    if (!breakdown.headingStructure.passed) {
      recommendations.push('Improve heading structure (add H2/H3 headings)');
    }

    if (breakdown.internalLinks.count < 2) {
      recommendations.push(`Add ${2 - breakdown.internalLinks.count} more internal link(s)`);
    } else if (breakdown.internalLinks.count > 3) {
      recommendations.push('Reduce internal links to 2-3');
    }

    if (!breakdown.imageAltText.passed) {
      recommendations.push('Add alt text to all images');
    }

    if (!breakdown.readability.passed) {
      if (breakdown.readability.fleschScore < 60) {
        recommendations.push('Improve readability by using shorter sentences and simpler words');
      } else if (breakdown.readability.fleschScore > 70) {
        recommendations.push('Content may be too simple; consider adding more depth');
      }
    }

    if (breakdown.wordCount.count < 1000) {
      recommendations.push(`Add ${1000 - breakdown.wordCount.count} more words for better SEO`);
    }

    if (breakdown.externalLinks.count === 0) {
      recommendations.push('Add 1-2 authoritative external links');
    } else if (breakdown.externalLinks.count > 2) {
      recommendations.push('Reduce external links to 1-2');
    }

    return recommendations;
  }
}

export default SEOScoringService;
