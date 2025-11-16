import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BlogPage() {
  const blogPosts = [
    {
      title: "10 SEO Best Practices for 2025",
      excerpt: "Stay ahead of the curve with these essential SEO strategies that will help your content rank higher in search engines.",
      category: "SEO",
      date: "January 15, 2025",
      readTime: "5 min read",
      author: "ContentFlow AI Team",
    },
    {
      title: "How AI is Revolutionizing Content Creation",
      excerpt: "Discover how artificial intelligence is transforming the way businesses create and optimize content for their audience.",
      category: "AI & Technology",
      date: "January 10, 2025",
      readTime: "7 min read",
      author: "ContentFlow AI Team",
    },
    {
      title: "WordPress vs Shopify: Which Platform is Right for Your Blog?",
      excerpt: "A comprehensive comparison of the two most popular platforms for content management and e-commerce.",
      category: "Platforms",
      date: "January 5, 2025",
      readTime: "6 min read",
      author: "ContentFlow AI Team",
    },
    {
      title: "Keyword Research 101: Finding the Right Topics",
      excerpt: "Learn the fundamentals of keyword research and how to identify high-value topics for your content strategy.",
      category: "SEO",
      date: "December 28, 2024",
      readTime: "8 min read",
      author: "ContentFlow AI Team",
    },
    {
      title: "The Ultimate Guide to Content Automation",
      excerpt: "Automate your content workflow and save hours every week with these proven strategies and tools.",
      category: "Automation",
      date: "December 20, 2024",
      readTime: "10 min read",
      author: "ContentFlow AI Team",
    },
    {
      title: "Building Backlinks: Strategies That Actually Work",
      excerpt: "Effective backlinking strategies to improve your domain authority and search engine rankings.",
      category: "SEO",
      date: "December 15, 2024",
      readTime: "9 min read",
      author: "ContentFlow AI Team",
    },
  ]

  const categories = ["All", "SEO", "AI & Technology", "Platforms", "Automation", "Marketing"]

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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">ContentFlow AI Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tips, and best practices for SEO, content marketing, and AI-powered automation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Featured Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-6xl">📝</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>

                  <Button variant="ghost" className="w-full mt-4">
                    Read More →
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>

          {/* Newsletter Signup */}
          <Card className="p-8 mt-16 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest SEO tips, content strategies, and platform updates delivered to your inbox weekly.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </Card>
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
