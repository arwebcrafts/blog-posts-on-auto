import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
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
              <Link href="/integrations" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Integrations
              </Link>
              <Link href="/about" className="text-sm font-medium text-blue-600">
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
                We're Building the Future of <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Content Marketing</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                ContentFlow AI democratizes professional content creation, making SEO-optimized blog posts accessible to businesses of all sizes through cutting-edge artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Story</h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    ContentFlow AI was born from a simple observation: creating high-quality, SEO-optimized content is time-consuming, expensive, and out of reach for most small businesses. Companies with dedicated content teams dominate search results, while solopreneurs and startups struggle to compete.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We believed there had to be a better way. By combining advanced AI language models with deep SEO expertise, we created a platform that generates professional blog content in minutes—not hours or days.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    What started as an internal tool for our web development agency quickly became something bigger. Today, ContentFlow AI helps businesses worldwide publish consistent, optimized content that drives organic traffic and grows their online presence.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-12 text-center">
                  <div className="space-y-8">
                    <div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                      <div className="text-gray-700">Blog Posts Generated</div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
                      <div className="text-gray-700">Active Users</div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
                      <div className="text-gray-700">Countries Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <p className="text-2xl text-gray-800 leading-relaxed font-medium">
                  "To empower every business with AI-driven content tools that level the playing field, enabling anyone to create professional, SEO-optimized content that ranks on Google and converts visitors into customers."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Core Values</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Quality First</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We prioritize content quality over quantity. Every AI-generated post is designed to be engaging, accurate, and valuable to readers. No generic fluff—just content that serves a purpose.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Privacy & Security</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your data is yours. We employ industry-leading security practices, encrypt all sensitive information, and never share your data without explicit permission. Your trust is our foundation.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Continuous Innovation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    SEO and AI are constantly evolving. We continuously improve our models, update our algorithms, and add new features to stay ahead of trends and serve your needs better.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-100">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Customer Success</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your success is our success. We provide exceptional support, comprehensive documentation, and genuine guidance to help you achieve your content marketing goals.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Time Efficiency</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Time is your most valuable resource. Our platform automates repetitive content tasks so you can focus on strategy, growth, and what you do best—running your business.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-100">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Accessibility</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Professional content creation shouldn't be limited to enterprises with big budgets. We make powerful content tools affordable and accessible for businesses of all sizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">The Technology Behind ContentFlow AI</h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                We leverage cutting-edge AI technology combined with proven SEO principles to deliver content that performs.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Advanced Language Models</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use OpenAI's GPT-4o-mini, one of the most advanced language models available. Our AI understands context, maintains consistency, and generates content that reads naturally—not like a robot wrote it.
                  </p>
                  <p className="text-sm text-gray-600">
                    Powered by: OpenAI GPT-4o-mini
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">AI Image Generation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Every blog post gets a unique featured image created by Stable Diffusion 3.5. No stock photos, no licensing fees—just original artwork tailored to your content.
                  </p>
                  <p className="text-sm text-gray-600">
                    Powered by: Stable Diffusion 3.5 via Replicate
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Real-Time SEO Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform integrates with ValueSERP for real-time keyword research and SERP analysis. Get accurate search volume, competition data, and opportunity scores for every keyword.
                  </p>
                  <p className="text-sm text-gray-600">
                    Powered by: ValueSERP API
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Backlink Intelligence</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Track your backlink profile and analyze competitors with DataForSEO integration. Monitor link quality, discover new opportunities, and measure domain authority growth.
                  </p>
                  <p className="text-sm text-gray-600">
                    Powered by: DataForSEO API
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Multi-Platform Publishing</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Seamlessly publish to WordPress, Shopify, Wix, Blogger, and custom websites. Our integration system handles authentication, formatting, and publishing automatically.
                  </p>
                  <p className="text-sm text-gray-600">
                    Supports: WordPress, Shopify, Wix, Blogger, Custom Sites
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Intelligent Automation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Background job processing with BullMQ ensures reliable content generation, scheduling, and publishing. Set it and forget it—our system handles the rest.
                  </p>
                  <p className="text-sm text-gray-600">
                    Powered by: BullMQ, Redis, PostgreSQL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Built by Experts</h2>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 border border-blue-100">
                <p className="text-xl text-gray-800 leading-relaxed mb-6">
                  ContentFlow AI is developed and maintained by <strong className="text-blue-600">ARWebCrafts</strong>, a team of experienced developers, SEO specialists, and content strategists passionate about creating tools that make a real difference for businesses.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  With years of experience in web development, digital marketing, and AI integration, we understand the challenges businesses face in creating consistent, high-quality content. ContentFlow AI is our solution to those challenges.
                </p>
                <a
                  href="https://arwebcrafts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-lg"
                >
                  Learn more about ARWebCrafts →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Content Strategy?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join businesses worldwide using ContentFlow AI to create SEO content that ranks, engages, and converts.
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
                7-day free trial • No credit card required • Cancel anytime
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
