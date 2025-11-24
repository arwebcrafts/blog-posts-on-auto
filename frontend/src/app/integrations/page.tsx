import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'WordPress',
      description: 'The world\'s most popular CMS. Install our official plugin and publish directly to your WordPress blog with a single click.',
      features: [
        'Official WordPress plugin',
        'Support for custom post types',
        'Automatic category and tag assignment',
        'Featured image upload',
        'SEO meta tag injection',
        'Works with self-hosted and WordPress.com'
      ],
      setup: [
        'Download the ContentFlow AI WordPress plugin',
        'Upload and activate in your WordPress admin panel',
        'Copy the API key from your WordPress plugin settings',
        'Paste the API key in your ContentFlow AI dashboard',
        'Start publishing blog posts with one click'
      ]
    },
    {
      name: 'Shopify',
      description: 'Grow your e-commerce store with SEO content. Connect your Shopify blog and publish product guides, buying tips, and educational content automatically.',
      features: [
        'OAuth authentication for secure connection',
        'Publish to Shopify blog posts',
        'Automatic formatting to match your theme',
        'SEO meta fields included',
        'Product integration support',
        'Scheduled publishing'
      ],
      setup: [
        'Go to your Shopify admin dashboard',
        'Navigate to Apps > Develop apps',
        'Create a custom app with blog permissions',
        'Copy your Admin API access token',
        'Connect in ContentFlow AI dashboard with your store URL and token',
        'Start publishing content to your Shopify blog'
      ]
    },
    {
      name: 'Wix',
      description: 'Beautiful websites deserve great content. Connect your Wix site and publish blog posts through the Wix Blog API with full formatting support.',
      features: [
        'Wix Blog API integration',
        'Automatic content formatting',
        'Image upload and optimization',
        'SEO metadata included',
        'Draft or publish directly',
        'Scheduling support'
      ],
      setup: [
        'Enable Developer Mode in your Wix account',
        'Create API credentials in Wix dashboard',
        'Authorize ContentFlow AI to access your Wix blog',
        'Copy your API credentials',
        'Connect in ContentFlow AI dashboard',
        'Begin automated publishing'
      ]
    },
    {
      name: 'Blogger',
      description: 'Google\'s free blogging platform. Connect your Blogger account and publish content using Google\'s official Blogger API.',
      features: [
        'Google OAuth authentication',
        'Blogger API v3 integration',
        'Multiple blog support',
        'Label (tag) assignment',
        'Image hosting on Google',
        'Draft and publish modes'
      ],
      setup: [
        'Sign in with your Google account',
        'Authorize ContentFlow AI to access Blogger',
        'Select which blog to publish to',
        'Configure default publishing settings',
        'Start generating and publishing posts',
        'Manage all posts from your dashboard'
      ]
    },
    {
      name: 'Custom Sites',
      description: 'Built your own website or using a custom CMS? Our lightweight JavaScript SDK and REST API make it easy to publish content to any platform.',
      features: [
        'REST API with full documentation',
        'Lightweight JavaScript SDK (<5KB)',
        'Headless CMS support',
        'Static site generator compatible',
        'Webhook notifications',
        'Complete publishing control'
      ],
      setup: [
        'Get your API key from ContentFlow AI dashboard',
        'Add our JavaScript SDK to your website (one line of code)',
        'Configure post endpoint in your CMS',
        'Set up webhook listener (optional)',
        'Publish posts via API or SDK',
        'Full documentation and code examples provided'
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
              <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm font-medium text-blue-600">
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
                Works With <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Every Platform</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Publish to WordPress, Shopify, Wix, Blogger, or any custom website. Connect once, publish forever. Setup takes less than 60 seconds.
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Integrations Detail Sections */}
        {integrations.map((integration, index) => (
          <section
            key={integration.name}
            className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                {/* Integration Header */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {integration.name}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {integration.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Features */}
                  <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">What's Included</h3>
                    <ul className="space-y-3">
                      {integration.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Setup Steps */}
                  <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">How to Connect</h3>
                    <ol className="space-y-4">
                      {integration.setup.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                            {stepIndex + 1}
                          </div>
                          <span className="text-gray-700 pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* SDK Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Developer-Friendly API & SDK
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Build custom integrations with our REST API or use our lightweight JavaScript SDK for seamless content publishing.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4">REST API</h3>
                  <p className="text-blue-100 mb-6">
                    Full-featured RESTful API with complete documentation. Authenticate with API keys, manage posts, schedule publishing, and more.
                  </p>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• JSON-based requests and responses</li>
                    <li>• Rate limiting: 1000 requests/hour</li>
                    <li>• Webhook support for events</li>
                    <li>• Comprehensive error handling</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4">JavaScript SDK</h3>
                  <p className="text-blue-100 mb-6">
                    Lightweight SDK (less than 5KB gzipped) for easy integration into any JavaScript application or static site.
                  </p>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• Zero dependencies</li>
                    <li>• TypeScript support included</li>
                    <li>• Promise-based async operations</li>
                    <li>• Works with React, Vue, Svelte, etc.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Start Example</h3>
                <pre className="bg-black/50 rounded-lg p-6 overflow-x-auto text-sm text-green-300">
{`// Install via npm or CDN
npm install contentflow-sdk

// Initialize and publish
import ContentFlow from 'contentflow-sdk';

const client = new ContentFlow('your-api-key');

await client.posts.create({
  title: 'My Blog Post',
  content: 'Post content here...',
  status: 'publish'
});`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Integration FAQs</h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Can I connect multiple websites?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! The Starter and Professional plans include 1 website connection. The Agency plan includes 3 website connections, perfect for managing multiple client sites or your own portfolio of blogs.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">What if my platform isn't listed?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Use our Custom Sites integration with the JavaScript SDK or REST API. As long as your platform supports custom code or has an API, you can integrate ContentFlow AI. We provide complete documentation and code examples.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Is the connection secure?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. All integrations use industry-standard authentication methods (OAuth 2.0, API keys) and data is transmitted over encrypted HTTPS connections. We never store your platform passwords.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Can I publish to multiple platforms simultaneously?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    With the Agency plan, you can connect up to 3 websites. You can generate content once and choose to publish it to one, two, or all connected sites with a single click.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">What happens if the connection breaks?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ContentFlow AI monitors all integrations and alerts you if a connection fails. You can easily reconnect from your dashboard. All generated content remains safe in your account even if a connection is temporarily broken.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Connect Your Platform?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Setup takes less than 60 seconds. Start publishing automated content today with your 7-day free trial.
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all">
                  Start Your Free Trial
                </Button>
              </Link>
              <p className="text-sm mt-6 text-blue-100">
                No credit card required • All integrations included • Cancel anytime
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
