import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function PrivacyPage() {
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

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-8 prose prose-slate max-w-none">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <p className="font-semibold mb-2">Your Privacy Matters</p>
              <p className="text-sm text-muted-foreground">
                At ContentFlow AI, we are committed to protecting your privacy and handling your data with care and transparency.
              </p>
            </Card>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-2">Account Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Name and email address</li>
                <li>Password (encrypted)</li>
                <li>Payment information (processed securely via Stripe)</li>
                <li>Company name and business information (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Website URLs you connect</li>
                <li>Blog posts you generate</li>
                <li>Keywords you track</li>
                <li>Integration credentials (encrypted)</li>
                <li>Platform usage analytics</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>IP address and location</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and features used</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our AI content generation services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send service updates and important notifications</li>
                <li>Analyze usage patterns to enhance features</li>
                <li>Provide customer support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Third Parties</h2>
              <p className="text-muted-foreground mb-4">We share your data only with:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>AI Service Providers:</strong> OpenAI (content generation), Replicate (image generation)</li>
                <li><strong>Payment Processor:</strong> Stripe (payment processing)</li>
                <li><strong>Analytics:</strong> Anonymous usage data for platform improvements</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We <strong>never</strong> sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">We implement industry-standard security measures:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Encrypted data transmission (SSL/TLS)</li>
                <li>Encrypted database storage</li>
                <li>Secure password hashing (bcrypt)</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Correction:</strong> Update inaccurate information</li>
                <li><strong>Deletion:</strong> Request account and data deletion</li>
                <li><strong>Export:</strong> Download your data in portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@contentflow.ai" className="text-primary hover:underline">privacy@contentflow.ai</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your data for as long as your account is active or as needed to provide services. After account deletion, we retain minimal data for 30 days for recovery purposes, then permanently delete all personal information. Some data may be retained longer for legal or security purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Authentication and session management</li>
                <li>User preferences</li>
                <li>Analytics and performance monitoring</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground">
                ContentFlow AI is not intended for users under 18 years of age. We do not knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your data may be processed in the United States or other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <Card className="p-6">
                <p className="mb-4">For privacy-related questions or requests:</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:privacy@contentflow.ai" className="text-primary hover:underline">privacy@contentflow.ai</a></p>
                <p className="mb-2"><strong>Support:</strong> <a href="mailto:support@contentflow.ai" className="text-primary hover:underline">support@contentflow.ai</a></p>
                <p><strong>Website:</strong> <a href="https://contentflow.ai" className="text-primary hover:underline">contentflow.ai</a></p>
              </Card>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 ContentFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
