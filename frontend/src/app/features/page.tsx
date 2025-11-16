import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
  const features = [
    { icon: '🔍', title: 'Website Scanning', description: 'AI crawls your entire website to understand your business, products, and brand voice' },
    { icon: '📚', title: 'Knowledge Base Training', description: 'Upload PDFs and documents to train AI on your specific business context' },
    { icon: '💡', title: 'AI Title Suggestions', description: '4-6 SEO-optimized titles per query with keyword difficulty estimates' },
    { icon: '🎯', title: 'Keyword Research', description: 'Discover high-opportunity keywords with search volume and competition data' },
    { icon: '📊', title: 'SERP Analysis', description: 'Analyze top 10 Google results to create better content' },
    { icon: '✍️', title: 'AI Content Generation', description: '600-2000 word SEO-optimized posts in your brand voice' },
    { icon: '🎨', title: 'AI Image Generation', description: 'Auto-create featured images with SEO-optimized alt text' },
    { icon: '📈', title: 'SEO Scoring', description: 'Real-time 100-point SEO score with actionable recommendations' },
    { icon: '🔗', title: 'Guest Post Links', description: 'Insert custom links for guest posting and backlink campaigns' },
    { icon: '⚡', title: 'Bulk Post Creation', description: 'Generate 10-50 posts at once and schedule automatically' },
    { icon: '📅', title: 'Calendar Scheduling', description: 'Visual calendar with drag-and-drop post scheduling' },
    { icon: '🚀', title: 'Multi-Platform Publishing', description: 'WordPress, Shopify, Wix, Blogger, custom sites—all supported' },
  ]

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ContentFlow AI
          </Link>
          <nav className="flex gap-4">
            <Link href="/pricing"><Button variant="ghost">Pricing</Button></Link>
            <Link href="/integrations"><Button variant="ghost">Integrations</Button></Link>
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/signup"><Button>Start Free Trial</Button></Link>
          </nav>
        </div>
      </header>

      <main className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Every Feature You Need to Dominate SEO Content</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">From website scanning to automated publishing—all in one platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/signup"><Button size="lg">Start Free Trial</Button></Link>
        </div>
      </main>
    </div>
  )
}
