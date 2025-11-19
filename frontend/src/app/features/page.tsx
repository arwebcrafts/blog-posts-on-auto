import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
  const features = [
    {
      title: 'AI Content Generation',
      subtitle: 'Create authentic, brand-aligned blog posts automatically',
      description: 'ContentFlow AI doesn\'t just generate generic content. Our AI studies your existing website to understand your business, products, services, and unique brand voice. Then it creates blog posts that sound like they were written by your team—not a robot.',
      details: [
        {
          heading: 'Website Learning',
          text: 'When you connect your website, our AI scans up to 15 pages including your homepage, about page, service pages, and product descriptions. It analyzes writing style, terminology, tone, and brand positioning to build a comprehensive understanding of your business.'
        },
        {
          heading: 'Natural Language Processing',
          text: 'Using OpenAI\'s GPT-4o-mini model, we generate content that maintains your brand voice across every post. The AI understands context, industry-specific language, and your target audience to create content that resonates.'
        },
        {
          heading: 'Customizable Parameters',
          text: 'Control word count (600-2000 words), tone (professional, casual, friendly, authoritative, conversational), and focus keywords for every post. Generate content that matches your exact requirements.'
        },
        {
          heading: 'Quality Assurance',
          text: 'Every post goes through multiple AI review stages to ensure coherence, accuracy, and relevance. The content is structured with proper headings, paragraphs, and transitions for maximum readability.'
        }
      ]
    },
    {
      title: 'Advanced SEO Scoring',
      subtitle: 'Get a 100-point SEO score for every blog post',
      description: 'ContentFlow AI uses a proprietary SEO scoring algorithm that analyzes 10 critical ranking factors. Every blog post receives a comprehensive score with actionable recommendations to improve your search engine rankings.',
      details: [
        {
          heading: '10-Factor Analysis',
          text: 'Our algorithm evaluates keyword density, title optimization, meta description quality, header structure, content length, readability score, internal linking, image optimization, keyword prominence, and content uniqueness. Each factor is weighted based on current SEO best practices.'
        },
        {
          heading: 'Keyword Optimization',
          text: 'The AI ensures your target keyword appears in strategic locations: title tag, first paragraph, headers, meta description, and naturally throughout the content at optimal density (1-2% for primary keywords, 0.5-1% for secondary keywords).'
        },
        {
          heading: 'Readability Analysis',
          text: 'Content is analyzed for readability using industry-standard metrics. We optimize sentence length, paragraph structure, and vocabulary to ensure your content is accessible to your target audience while maintaining authority.'
        },
        {
          heading: 'Actionable Recommendations',
          text: 'Get specific suggestions to improve your score: "Add 2 more internal links," "Include keyword in H2 heading," "Reduce paragraph length for better readability." Each recommendation directly correlates to ranking improvements.'
        }
      ]
    },
    {
      title: 'Intelligent Keyword Research',
      subtitle: 'Discover high-opportunity keywords with SERP analysis',
      description: 'Finding the right keywords is crucial for content success. Our keyword research tool integrates with ValueSERP to provide real-time search data, competition analysis, and opportunity scoring so you can target keywords that actually drive traffic.',
      details: [
        {
          heading: 'Search Volume & Trends',
          text: 'Get accurate monthly search volume data for any keyword. Track seasonal trends and search pattern changes over time to identify the best times to publish content on specific topics.'
        },
        {
          heading: 'SERP Difficulty Scoring',
          text: 'Our algorithm analyzes the top 10 search results to calculate keyword difficulty on a 100-point scale. We examine domain authority, page authority, content length, backlink profiles, and social signals of ranking pages to determine your chances of ranking.'
        },
        {
          heading: 'Competitor Analysis',
          text: 'See which websites currently rank for your target keywords. Analyze their content strategies, identify content gaps, and discover opportunities to create better, more comprehensive content that outranks the competition.'
        },
        {
          heading: 'Opportunity Score',
          text: 'Our proprietary opportunity score combines search volume, keyword difficulty, and relevance to your business. High-opportunity keywords have good search volume, manageable competition, and strong alignment with your content strategy.'
        }
      ]
    },
    {
      title: 'Multi-Platform Publishing',
      subtitle: 'Publish to WordPress, Shopify, Wix, Blogger, and custom sites',
      description: 'ContentFlow AI integrates with all major content platforms, allowing you to publish blog posts with a single click. No manual copying and pasting, no formatting issues—just seamless, automated publishing.',
      details: [
        {
          heading: 'WordPress Integration',
          text: 'Connect your WordPress site using our official plugin. Authenticate once, and ContentFlow AI can publish posts directly to your blog as drafts or live content. Supports custom post types, categories, tags, and featured images. Works with self-hosted WordPress and WordPress.com.'
        },
        {
          heading: 'Shopify Blog Publishing',
          text: 'Integrate with your Shopify store blog through OAuth authentication. Publish product-related content, buying guides, and SEO articles directly to your Shopify blog. Automatically format content to match your theme styling.'
        },
        {
          heading: 'Wix & Blogger Support',
          text: 'Connect Wix and Blogger platforms using secure API authentication. ContentFlow AI handles all formatting, image embedding, and metadata to ensure your posts look professional on every platform.'
        },
        {
          heading: 'Custom Site Integration',
          text: 'For custom-built websites, use our lightweight JavaScript SDK. Embed a simple code snippet on your site, and ContentFlow AI can publish content directly to your custom CMS. Perfect for headless CMS architectures, static site generators, and proprietary platforms.'
        }
      ]
    },
    {
      title: 'AI Image Generation',
      subtitle: 'Custom featured images for every blog post',
      description: 'Every blog post needs a compelling visual. ContentFlow AI uses Stable Diffusion 3.5 to generate unique, high-quality featured images that perfectly complement your content. No stock photos, no licensing fees—just original artwork.',
      details: [
        {
          heading: 'Stable Diffusion 3.5',
          text: 'We use the latest Stable Diffusion model via Replicate to generate photorealistic images, illustrations, and graphics. The AI analyzes your blog post title and content to create contextually relevant imagery that captures attention.'
        },
        {
          heading: 'Automated Alt Text',
          text: 'Every generated image includes SEO-optimized alt text automatically. The AI describes the image content accurately while incorporating relevant keywords for improved image search rankings and accessibility compliance.'
        },
        {
          heading: 'Web-Optimized Format',
          text: 'Images are automatically compressed and optimized for web performance. We deliver WebP format with fallback to JPEG, ensuring fast page load times without sacrificing visual quality. Typical file sizes are 50-150KB.'
        },
        {
          heading: 'Consistent Brand Style',
          text: 'Once you\'ve established a visual style, our AI maintains consistency across all future images. Whether you prefer minimalist illustrations, photorealistic scenes, or abstract graphics, every image aligns with your brand aesthetic.'
        }
      ]
    },
    {
      title: 'Backlink Monitoring',
      subtitle: 'Track your link profile and analyze competitors',
      description: 'Building authority requires understanding your backlink profile. ContentFlow AI integrates with DataForSEO to monitor incoming links, analyze link quality, and identify new link-building opportunities that strengthen your domain authority.',
      details: [
        {
          heading: 'Backlink Discovery',
          text: 'Automatically discover new backlinks pointing to your website. Track when they appear, where they\'re coming from, and what anchor text they use. Get alerts when high-authority sites link to your content.'
        },
        {
          heading: 'Link Quality Assessment',
          text: 'Not all backlinks are created equal. Our system evaluates link quality based on domain authority, page relevance, link placement (editorial vs. sidebar), and traffic potential. Identify which links actually move the needle for your SEO.'
        },
        {
          heading: 'Competitor Backlink Analysis',
          text: 'Analyze your competitors\' backlink profiles to identify link-building opportunities. See where they\'re getting links, what content attracts the most backlinks, and discover untapped linking domains in your industry.'
        },
        {
          heading: 'Domain Authority Tracking',
          text: 'Monitor your overall domain authority as it changes over time. Understand how your link-building efforts and content publishing impact your site\'s authority. Track progress toward your SEO goals with historical data and trend analysis.'
        }
      ]
    },
    {
      title: 'Bulk Content Creation',
      subtitle: 'Generate multiple blog posts simultaneously',
      description: 'Need to populate a new blog quickly or plan content months in advance? Our bulk creation feature lets you generate multiple blog posts in a single operation. Define your topics, keywords, and parameters, then let the AI create an entire content calendar.',
      details: [
        {
          heading: 'Batch Processing',
          text: 'Submit up to 10 blog post topics at once. Our queue system processes each post individually while you continue working. Get notifications when each post completes, or wait for the entire batch to finish.'
        },
        {
          heading: 'Consistent Quality',
          text: 'Bulk-generated content maintains the same quality as individually created posts. Each article gets full SEO analysis, proper structure, and brand voice alignment. No corners cut for speed.'
        },
        {
          heading: 'Scheduling Integration',
          text: 'Schedule your entire batch of content to publish over days, weeks, or months. Set up a consistent publishing cadence—like every Monday and Thursday—and ContentFlow AI automatically distributes your content according to your schedule.'
        },
        {
          heading: 'Content Calendar Planning',
          text: 'Use bulk creation to plan quarterly or annual content strategies. Generate pillar content, supporting articles, and topic clusters all at once. Maintain a steady flow of fresh content without the manual workload.'
        }
      ]
    },
    {
      title: 'Advanced Scheduling',
      subtitle: 'Automate your publishing calendar',
      description: 'Consistency is key to content marketing success. Our advanced scheduling system lets you plan posts weeks or months in advance, set up recurring publishing patterns, and maintain a predictable content flow that keeps your audience engaged.',
      details: [
        {
          heading: 'Flexible Scheduling Options',
          text: 'Schedule posts for specific dates and times, or set up recurring patterns (every Monday at 9 AM, twice per week, monthly on the 1st, etc.). The system handles timezone conversions and daylight saving time automatically.'
        },
        {
          heading: 'Queue Management',
          text: 'View your entire content queue in a visual calendar. Drag and drop to reschedule posts, see gaps in your publishing schedule, and ensure consistent content flow. Filter by website, status, or topic to manage large content volumes.'
        },
        {
          heading: 'Automatic Publishing',
          text: 'When the scheduled time arrives, ContentFlow AI automatically publishes your content to your chosen platform. No manual intervention required. You can review and approve posts before scheduling for quality control.'
        },
        {
          heading: 'Publishing Notifications',
          text: 'Receive email notifications when posts go live. Get summary reports of published content, including links, SEO scores, and performance data. Stay informed about your content marketing without constant monitoring.'
        }
      ]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                ContentFlow AI
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-sm font-medium text-blue-600">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Integrations
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Automate Content Marketing</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                From keyword research to publishing, ContentFlow AI handles your entire content workflow with precision, authenticity, and SEO optimization.
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all">
                  Start Your 7-Day Free Trial
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • Full feature access
              </p>
            </div>
          </div>
        </section>

        {/* Features Detail Sections */}
        {features.map((feature, index) => (
          <section
            key={index}
            className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                {/* Feature Header */}
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
                    {feature.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Feature Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  {feature.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {detail.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {detail.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Start your 7-day free trial today. Get instant access to all features with no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-white text-white hover:bg-white/10 transition-all">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm mt-6 text-blue-100">
                Questions? <a href="mailto:support@contentflow.ai" className="underline hover:text-white">Contact our team</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@contentflow.ai" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><Link href="/dashboard/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 ContentFlow AI. All rights reserved.</p>
            <p className="mt-2">
              Powered by <a href="https://arwebcrafts.com" className="text-blue-400 hover:text-blue-300 transition-colors">ARWebCrafts.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
