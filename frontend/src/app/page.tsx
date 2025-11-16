import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ContentFlow AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/integrations" className="text-sm font-medium hover:text-primary transition-colors">
              Integrations
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button>Start Free Trial</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Stop Writing Blog Posts.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Let AI Do It While You Sleep.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered SEO content that understands your business. Generate, schedule, and publish authentic blog posts to any platform—automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8">
                  Start 7-Day Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Cancel anytime during trial. No lock-in contracts.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Writing 20+ SEO blog posts every month is exhausting
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">4-6 hours per post</h3>
                <p className="text-muted-foreground text-sm">
                  Research, writing, editing, and SEO optimization takes forever
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Generic AI content that Google hates</h3>
                <p className="text-muted-foreground text-sm">
                  ChatGPT outputs sound robotic and don't rank
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Juggling 5+ tools for content + SEO</h3>
                <p className="text-muted-foreground text-sm">
                  Keyword research, writing, editing, publishing—all separate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">One Platform. Authentic Content. Complete Automation.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ContentFlow AI scans your website, learns your business, and creates SEO-optimized content that sounds like you—automatically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: '🔍',
                  title: 'Scans Your Website',
                  description: 'AI learns your business, products, and voice from your existing content'
                },
                {
                  icon: '💡',
                  title: 'Suggests Topics',
                  description: 'Trending blog ideas tailored to your niche and audience'
                },
                {
                  icon: '🎯',
                  title: 'Researches Keywords',
                  description: 'Find high-opportunity keywords with SERP analysis automatically'
                },
                {
                  icon: '✍️',
                  title: 'Writes SEO Content',
                  description: '600-2000 word posts optimized for Google ranking'
                },
                {
                  icon: '🎨',
                  title: 'Creates Images',
                  description: 'AI-generated featured images with perfect alt text'
                },
                {
                  icon: '🚀',
                  title: 'Publishes Everywhere',
                  description: 'WordPress, Shopify, Wix, custom sites—one click'
                },
              ].map((feature, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/50 py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Connect Your Website',
                  description: 'We scan and understand your business in 5 minutes. No complex setup required.'
                },
                {
                  step: '2',
                  title: 'AI Creates Content',
                  description: 'Generate posts, schedule publishing, go hands-free. Set it and forget it.'
                },
                {
                  step: '3',
                  title: 'Watch Traffic Grow',
                  description: 'SEO-optimized posts go live automatically. Sit back and watch your rankings climb.'
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
            <p className="text-center text-muted-foreground mb-12">Start with a 7-day free trial. Cancel anytime.</p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Starter', price: '$29', posts: '10 posts/month' },
                { name: 'Professional', price: '$49', posts: '40 posts/month', popular: true },
                { name: 'Agency', price: '$99', posts: '150 posts/month' },
              ].map((plan) => (
                <div key={plan.name} className={`border rounded-lg p-6 text-center ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-muted-foreground text-sm mb-6">{plan.posts}</p>
                  <Link href="/signup">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-primary hover:underline">
                See full pricing & features →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Start Publishing SEO Content Today</h2>
            <p className="text-lg mb-8 opacity-90">
              7-day free trial. No lock-in contracts. Cancel anytime.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <p className="text-sm mt-4 opacity-75">
              Setup in 5 minutes. First post live in 10.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 ContentFlow AI. All rights reserved. Powered by <a href="https://arwebcrafts.com" className="hover:text-primary">ARWebCrafts.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
