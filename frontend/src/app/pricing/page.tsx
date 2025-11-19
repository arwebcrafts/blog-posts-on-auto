'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual bloggers and small businesses starting with content marketing',
      monthlyPrice: 29,
      annualPrice: 290,
      features: {
        posts: '10 blog posts per month',
        images: '10 AI-generated images',
        websites: '1 website connection',
        keywords: '50 keyword research queries per day',
        integrations: 'WordPress & Shopify integration',
        wordCount: '600-2000 words per post',
        seo: 'SEO scoring and recommendations',
        scheduling: 'Basic post scheduling',
        support: 'Email support',
        included: true
      },
      notIncluded: ['Bulk content creation', 'Priority support', 'Team collaboration', 'Advanced analytics']
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses and content marketers who need consistent publishing',
      monthlyPrice: 49,
      annualPrice: 490,
      popular: true,
      features: {
        posts: '40 blog posts per month',
        images: '40 AI-generated images',
        websites: '1 website connection',
        keywords: '200 keyword research queries per day',
        integrations: 'All platform integrations (WordPress, Shopify, Wix, Blogger, Custom)',
        wordCount: '600-2000 words per post',
        seo: 'Advanced SEO scoring with detailed recommendations',
        scheduling: 'Advanced scheduling and automation',
        backlinks: 'Backlink monitoring and analysis',
        bulk: 'Bulk content creation (generate multiple posts at once)',
        support: 'Priority email support',
        included: true
      },
      notIncluded: ['Team collaboration']
    },
    {
      name: 'Agency',
      description: 'Built for agencies and businesses managing multiple client websites',
      monthlyPrice: 99,
      annualPrice: 990,
      features: {
        posts: '150 blog posts per month',
        images: '150 AI-generated images',
        websites: '3 website connections',
        keywords: '1000 keyword research queries per day',
        integrations: 'All platform integrations (WordPress, Shopify, Wix, Blogger, Custom)',
        wordCount: '600-2000 words per post',
        seo: 'Advanced SEO scoring with detailed recommendations',
        scheduling: 'Advanced scheduling and automation',
        backlinks: 'Backlink monitoring and analysis',
        bulk: 'Bulk content creation (generate multiple posts at once)',
        team: 'Team collaboration with 5 user accounts',
        priority: 'Priority support with faster response times',
        included: true
      },
      notIncluded: []
    }
  ]

  const featureComparison = [
    {
      category: 'Content Generation',
      features: [
        { name: 'Blog posts per month', starter: '10', pro: '40', agency: '150' },
        { name: 'AI-generated images', starter: '10', pro: '40', agency: '150' },
        { name: 'Word count per post', starter: '600-2000', pro: '600-2000', agency: '600-2000' },
        { name: 'Bulk content creation', starter: false, pro: true, agency: true },
        { name: 'Custom tone and style', starter: true, pro: true, agency: true }
      ]
    },
    {
      category: 'SEO & Keywords',
      features: [
        { name: 'Keyword research queries per day', starter: '50', pro: '200', agency: '1000' },
        { name: 'SEO scoring (100-point scale)', starter: true, pro: true, agency: true },
        { name: 'Keyword tracking', starter: true, pro: true, agency: true },
        { name: 'SERP analysis', starter: true, pro: true, agency: true },
        { name: 'Backlink monitoring', starter: false, pro: true, agency: true },
        { name: 'Competitor analysis', starter: false, pro: true, agency: true }
      ]
    },
    {
      category: 'Publishing & Integrations',
      features: [
        { name: 'Website connections', starter: '1', pro: '1', agency: '3' },
        { name: 'WordPress integration', starter: true, pro: true, agency: true },
        { name: 'Shopify integration', starter: true, pro: true, agency: true },
        { name: 'Wix integration', starter: false, pro: true, agency: true },
        { name: 'Blogger integration', starter: false, pro: true, agency: true },
        { name: 'Custom site integration (JavaScript SDK)', starter: false, pro: true, agency: true },
        { name: 'Advanced scheduling', starter: false, pro: true, agency: true }
      ]
    },
    {
      category: 'Team & Support',
      features: [
        { name: 'User accounts', starter: '1', pro: '1', agency: '5' },
        { name: 'Team collaboration', starter: false, pro: false, agency: true },
        { name: 'Email support', starter: true, pro: true, agency: true },
        { name: 'Priority support', starter: false, pro: true, agency: true }
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
              <Link href="/pricing" className="text-sm font-medium text-blue-600">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
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
                Simple Pricing for <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Every Business</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Choose the perfect plan for your content needs. Start with a 7-day free trial. No credit card required.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md mb-12">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'annual'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual <span className="text-xs">(Save 17%)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl relative ring-4 ring-blue-200'
                      : 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className={`text-sm mt-2 ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                        ${(plan.annualPrice / 12).toFixed(2)} per month, billed annually
                      </p>
                    )}
                  </div>

                  <Link href="/signup">
                    <Button
                      className={`w-full py-6 text-lg font-semibold mb-8 ${
                        plan.popular
                          ? 'bg-white text-blue-600 hover:bg-gray-100'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                      }`}
                    >
                      Start 7-Day Free Trial
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    <div className={`text-sm font-semibold mb-3 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      What's included:
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.posts}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.images}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.websites}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.keywords}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.wordCount}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.integrations}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {plan.features.seo}
                        </span>
                      </div>

                      {plan.features.backlinks && (
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'bg-white/20' : 'bg-blue-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                            {plan.features.backlinks}
                          </span>
                        </div>
                      )}

                      {plan.features.bulk && (
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'bg-white/20' : 'bg-blue-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                            {plan.features.bulk}
                          </span>
                        </div>
                      )}

                      {plan.features.team && (
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'bg-white/20' : 'bg-blue-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                            {plan.features.team}
                          </span>
                        </div>
                      )}

                      {plan.features.priority && (
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'bg-white/20' : 'bg-blue-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-white' : 'bg-blue-600'}`} />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                            {plan.features.priority}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Detailed Feature Comparison</h2>
                <p className="text-xl text-gray-600">
                  Compare all features across our pricing plans
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {featureComparison.map((category, categoryIndex) => (
                  <div key={category.category} className={categoryIndex > 0 ? 'border-t-2 border-gray-200' : ''}>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4">
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {category.features.map((feature, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 px-8 py-4 hover:bg-gray-50 transition-colors">
                          <div className="col-span-1 font-medium text-gray-900">
                            {feature.name}
                          </div>
                          <div className="text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <div className="inline-block w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )
                            ) : (
                              <span className="text-gray-700 font-semibold">{feature.starter}</span>
                            )}
                          </div>
                          <div className="text-center">
                            {typeof feature.pro === 'boolean' ? (
                              feature.pro ? (
                                <div className="inline-block w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )
                            ) : (
                              <span className="text-gray-700 font-semibold">{feature.pro}</span>
                            )}
                          </div>
                          <div className="text-center">
                            {typeof feature.agency === 'boolean' ? (
                              feature.agency ? (
                                <div className="inline-block w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )
                            ) : (
                              <span className="text-gray-700 font-semibold">{feature.agency}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 px-8 py-6 bg-gray-100 border-t-2 border-gray-200 font-bold text-gray-900 sticky top-0">
                  <div className="col-span-1">Feature</div>
                  <div className="text-center">Starter</div>
                  <div className="text-center">Professional</div>
                  <div className="text-center">Agency</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Pricing FAQs</h2>
                <p className="text-xl text-gray-600">
                  Common questions about our pricing and plans
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">What happens when I exceed my monthly post limit?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your post generation will pause until your next billing cycle. You can upgrade your plan at any time to get more posts immediately, and we'll pro-rate the difference.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Can I change plans later?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately with pro-rated billing. Downgrades take effect at your next billing cycle.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Do unused posts roll over to the next month?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No, post credits reset each month on your billing date. However, any posts you've already generated remain in your account forever.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Is there a contract or can I cancel anytime?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    There are no contracts or commitments. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We accept all major credit cards (Visa, MasterCard, American Express) and debit cards through our secure payment processor, Stripe.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Is there a discount for annual billing?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! Annual billing saves you 17% compared to monthly billing. That's roughly 2 months free per year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Start your 7-day free trial today. No credit card required. Cancel anytime.
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all">
                  Start Your Free Trial
                </Button>
              </Link>
              <p className="text-sm mt-6 text-blue-100">
                Have questions? <a href="mailto:support@contentflow.ai" className="underline hover:text-white">Contact our sales team</a>
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
