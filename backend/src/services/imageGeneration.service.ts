import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export class ImageGenerationService {
  /**
   * Generate featured image for blog post
   */
  async generateFeaturedImage(options: {
    postTitle: string;
    customPrompt?: string;
  }): Promise<string> {
    const { postTitle, customPrompt } = options;

    try {
      // Build image generation prompt
      const prompt = customPrompt || this.buildImagePrompt(postTitle);

      // Generate image using Stable Diffusion 3.5
      const output = await replicate.run(
        "stability-ai/stable-diffusion-3.5-large" as any,
        {
          input: {
            prompt: prompt,
            aspect_ratio: "16:9",
            output_format: "png",
            output_quality: 90,
            negative_prompt: "text, watermark, logo, signature, blurry, low quality, distorted, ugly"
          }
        }
      ) as any;

      // Output is an array of image URLs
      const imageUrl = Array.isArray(output) ? output[0] : output;

      if (!imageUrl) {
        throw new Error('No image generated');
      }

      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }

  /**
   * Build image generation prompt from post title
   */
  private buildImagePrompt(postTitle: string): string {
    // Extract key concepts from title
    const cleanTitle = postTitle
      .replace(/how to/gi, '')
      .replace(/the ultimate guide to/gi, '')
      .replace(/\d+/g, '')
      .replace(/[^\w\s]/g, '');

    return `Professional, modern, high-quality featured image for blog post about ${cleanTitle}.
Clean design, minimalist style, tech-focused aesthetic, vibrant colors, 16:9 aspect ratio.
No text, no watermarks, photorealistic or clean illustration style.`;
  }

  /**
   * Generate multiple images and return the best one
   * (for users who want options)
   */
  async generateMultipleOptions(postTitle: string, count: number = 1): Promise<string[]> {
    const images: string[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const imageUrl = await this.generateFeaturedImage({ postTitle });
        images.push(imageUrl);
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
      }
    }

    return images;
  }
}

export default ImageGenerationService;
