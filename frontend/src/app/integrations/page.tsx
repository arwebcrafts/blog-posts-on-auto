import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'WordPress',
      description: 'Install our plugin and auto-publish posts to your WordPress site',
      steps: ['Download plugin', 'Upload to WordPress', 'Activate & copy API key', 'Paste in ContentFlow'],
    },
    {
      name: 'Shopify',
      description: 'Connect your Shopify store blog via custom app',
      steps: ['Create custom app', 'Copy Admin API token', 'Paste in ContentFlow', 'Start publishing'],
    },
    {
      name: 'Wix',
      description: 'Connect via Wix Blog API for seamless publishing',
      steps: ['Enable Developer Mode', 'Authorize API access', 'Copy credentials', 'Connect in dashboard'],
    },
    {
      name: 'Custom Sites',
      description: 'Use our JavaScript SDK or REST API for any website',
      steps: ['Get API key', 'Add SDK to site', 'Configure', 'Done!'],
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
            <Link href="/pricing"><Button variant="ghost">Pricing</Button></Link>
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/signup"><Button>Start Free Trial</Button></Link>
          </nav>
        </div>
      </header>

      <main className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Works With Every Platform. Zero Hassle.</h1>
          <p className="text-xl text-muted-foreground">Connect your website in 60 seconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {integrations.map((integration) => (
            <div key={integration.name} className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">{integration.name}</h3>
              <p className="text-muted-foreground mb-4">{integration.description}</p>
              <ol className="space-y-2">
                {integration.steps.map((step, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-semibold">{i + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/signup"><Button size="lg">Get Started Free</Button></Link>
        </div>
      </main>
    </div>
  )
}
