import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ContentFlow AI
          </Link>
          <nav className="flex gap-6">
            <Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Start Free Trial</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Empowering Content Creators with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            ContentFlow AI is on a mission to democratize SEO content creation, making it accessible to businesses of all sizes through cutting-edge artificial intelligence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-20">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  ContentFlow AI was born from a simple observation: creating high-quality, SEO-optimized content is time-consuming and expensive. Small businesses and solopreneurs struggle to compete with larger companies that have dedicated content teams.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believed there had to be a better way. By combining advanced AI models with deep SEO expertise, we created a platform that generates professional blog content in minutes—not hours or days.
                </p>
                <p className="text-muted-foreground">
                  Today, ContentFlow AI helps thousands of businesses publish consistent, optimized content that drives organic traffic and grows their online presence.
                </p>
              </div>
              <Card className="p-8 bg-gradient-to-br from-blue-100 to-cyan-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-4xl font-bold mb-2">10,000+</p>
                  <p className="text-muted-foreground">Blog Posts Generated</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Our Mission */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <Card className="p-8 max-w-3xl mx-auto">
              <p className="text-xl leading-relaxed">
                "To empower every business with AI-driven content tools that level the playing field, enabling anyone to create professional, SEO-optimized content that ranks and converts."
              </p>
            </Card>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We prioritize content quality over quantity. Every AI-generated post is designed to be engaging, accurate, and valuable to readers.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                <p className="text-muted-foreground">
                  Your data is yours. We employ industry-leading security practices and never share your information without permission.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our AI models and platform features to stay ahead of SEO trends and user needs.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3">Customer Success</h3>
                <p className="text-muted-foreground">
                  Your success is our success. We provide exceptional support and resources to help you achieve your content goals.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
                <p className="text-muted-foreground">
                  We believe time is precious. Our platform automates repetitive tasks so you can focus on strategy and growth.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  Professional content creation shouldn't be limited to enterprises. We make it affordable for businesses of all sizes.
                </p>
              </Card>
            </div>
          </section>

          {/* Technology */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">🤖 Advanced AI Models</h3>
                <p className="text-muted-foreground">
                  We leverage state-of-the-art language models (GPT-4) and image generation AI (Stable Diffusion) to create comprehensive blog content with visuals.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">📊 SEO Intelligence</h3>
                <p className="text-muted-foreground">
                  Our platform integrates real-time SEO data, keyword research, and SERP analysis to ensure every post is optimized for search engines.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">🔗 Platform Integrations</h3>
                <p className="text-muted-foreground">
                  Seamlessly publish to WordPress, Shopify, Wix, Blogger, and custom websites with our robust integration system.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">⚙️ Automation</h3>
                <p className="text-muted-foreground">
                  Schedule posts, bulk generate content, and automate publishing workflows to maintain consistent content output.
                </p>
              </Card>
            </div>
          </section>

          {/* Team (Optional - can be customized) */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">Built by Experts</h2>
            <Card className="p-8 text-center max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                ContentFlow AI is developed and maintained by <strong>ARWebCrafts</strong>, a team of experienced developers and SEO specialists passionate about creating tools that make a real difference for businesses.
              </p>
              <a href="https://arwebcrafts.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                Learn more about ARWebCrafts →
              </a>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of businesses using ContentFlow AI to create SEO content that ranks.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/integrations">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:support@contentflow.ai">Contact</a></li>
                <li><Link href="/dashboard/help">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 ContentFlow AI. All rights reserved. Powered by <a href="https://arwebcrafts.com" className="hover:text-primary">ARWebCrafts.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
