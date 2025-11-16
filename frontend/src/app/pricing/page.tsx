import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      features: ['10 posts/month', '10 images/month', '1 website', '50 keywords', 'WordPress + Shopify'],
    },
    {
      name: 'Professional',
      price: 49,
      popular: true,
      features: ['40 posts/month', '40 images/month', '3 websites', '200 keywords', 'All integrations', 'Bulk creation', 'AI chat'],
    },
    {
      name: 'Agency',
      price: 99,
      features: ['150 posts/month', '150 images/month', 'Unlimited websites', '1000 keywords', 'White-label', 'Team (5 users)', 'API access'],
    },
  ]

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ContentFlow AI
          </Link>
          <nav className="flex gap-4">
            <Link href="/features"><Button variant="ghost">Features</Button></Link>
            <Link href="/integrations"><Button variant="ghost">Integrations</Button></Link>
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/signup"><Button>Start Free Trial</Button></Link>
          </nav>
        </div>
      </header>

      <main className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple Pricing. Powerful Results.</h1>
          <p className="text-xl text-muted-foreground">7-day free trial. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`p-8 ${plan.popular ? 'border-primary shadow-xl' : ''}`}>
              {plan.popular && <Badge className="mb-4">MOST POPULAR</Badge>}
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              <Link href="/signup"><Button className="w-full mb-6">Start Free Trial</Button></Link>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm">✓ {feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
