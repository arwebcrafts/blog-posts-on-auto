import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-8 prose prose-slate max-w-none">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <p className="font-semibold mb-2">Agreement to Terms</p>
              <p className="text-sm text-muted-foreground">
                By accessing or using ContentFlow AI, you agree to be bound by these Terms & Conditions. Please read them carefully.
              </p>
            </Card>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Service Description</h2>
              <p className="text-muted-foreground mb-4">
                ContentFlow AI is an AI-powered SaaS platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Automated SEO blog post generation using AI</li>
                <li>Content scheduling and publishing</li>
                <li>Website integration (WordPress, Shopify, Wix, etc.)</li>
                <li>Keyword research and tracking</li>
                <li>Backlink analysis and monitoring</li>
                <li>AI chat assistance for content strategy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
              <h3 className="text-xl font-semibold mb-2">Eligibility</h3>
              <p className="text-muted-foreground mb-4">
                You must be at least 18 years old and capable of forming a binding contract to use our services.
              </p>

              <h3 className="text-xl font-semibold mb-2">Account Responsibility</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You are responsible for maintaining account security</li>
                <li>You must provide accurate and complete information</li>
                <li>One account per person or organization</li>
                <li>You are responsible for all activities under your account</li>
                <li>Notify us immediately of unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Subscription and Billing</h2>
              <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
              <p className="text-muted-foreground mb-4">
                We offer a 7-day free trial for new users. You can cancel anytime during the trial without charge.
              </p>

              <h3 className="text-xl font-semibold mb-2">Paid Subscriptions</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Subscriptions are billed monthly or annually</li>
                <li>Payments are processed securely via Stripe</li>
                <li>Automatic renewal unless cancelled</li>
                <li>No refunds for partial months</li>
                <li>Price changes require 30 days notice</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Usage Limits</h3>
              <p className="text-muted-foreground">
                Each plan has monthly limits on posts, websites, and features. Exceeding limits may require upgrade or additional fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Generate illegal, harmful, or offensive content</li>
                <li>Spam or engage in abusive practices</li>
                <li>Violate intellectual property rights</li>
                <li>Reverse engineer or attempt to access our systems</li>
                <li>Share your account with unauthorized users</li>
                <li>Use the service for competitor analysis of our platform</li>
                <li>Generate content that violates third-party terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Content Ownership and License</h2>
              <h3 className="text-xl font-semibold mb-2">Your Content</h3>
              <p className="text-muted-foreground mb-4">
                You own all content you create using our service. We do not claim ownership of your generated blog posts, keywords, or data.
              </p>

              <h3 className="text-xl font-semibold mb-2">License to Us</h3>
              <p className="text-muted-foreground mb-4">
                You grant us a limited license to use your data to provide and improve our services.
              </p>

              <h3 className="text-xl font-semibold mb-2">AI-Generated Content</h3>
              <p className="text-muted-foreground">
                AI-generated content is provided as-is. You are responsible for reviewing, editing, and ensuring accuracy before publishing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Service Availability</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We strive for 99.9% uptime but do not guarantee uninterrupted service</li>
                <li>Scheduled maintenance will be announced in advance</li>
                <li>We reserve the right to modify or discontinue features</li>
                <li>Third-party API dependencies may affect availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                ContentFlow AI, including our logo, brand, platform code, and features, is protected by intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Copy, modify, or create derivative works</li>
                <li>Use our trademarks without permission</li>
                <li>Remove or alter copyright notices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
              <h3 className="text-xl font-semibold mb-2">By You</h3>
              <p className="text-muted-foreground mb-4">
                You may cancel your subscription at any time from your account settings. Service continues until the end of your billing period.
              </p>

              <h3 className="text-xl font-semibold mb-2">By Us</h3>
              <p className="text-muted-foreground mb-4">
                We may suspend or terminate your account for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violation of these terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment</li>
                <li>Abusive behavior toward our team or other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Disclaimers and Limitations</h2>
              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <p className="font-semibold mb-2">Service Provided "As Is"</p>
                <p className="text-sm text-muted-foreground mb-4">
                  ContentFlow AI is provided without warranties of any kind, express or implied.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>We do not guarantee SEO results or rankings</li>
                  <li>AI-generated content may contain errors or inaccuracies</li>
                  <li>We are not responsible for content published on your website</li>
                  <li>Third-party integrations are subject to their own terms</li>
                </ul>
              </Card>

              <h3 className="text-xl font-semibold mb-2 mt-4">Limitation of Liability</h3>
              <p className="text-muted-foreground">
                Our liability is limited to the amount you paid in the last 12 months. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless ContentFlow AI from claims arising from your use of the service, violation of these terms, or infringement of third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Privacy</h2>
              <p className="text-muted-foreground">
                Your use of ContentFlow AI is also governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms & Conditions periodically. Significant changes will be notified via email or platform notification 30 days in advance. Continued use constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms are governed by the laws of the United States. Any disputes will be resolved through binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact</h2>
              <Card className="p-6">
                <p className="mb-4">For questions about these terms:</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:legal@contentflow.ai" className="text-primary hover:underline">legal@contentflow.ai</a></p>
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
