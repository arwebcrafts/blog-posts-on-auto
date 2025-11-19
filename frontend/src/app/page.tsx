'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
        {/* Hero Section with Animation */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-32">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Trusted by content creators worldwide
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Your Content Marketing,
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                  Automated While You Focus on Growth
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                ContentFlow AI analyzes your website, understands your brand voice, and generates SEO-optimized blog posts that rank on Google. Publish to WordPress, Shopify, Wix, or any platform—completely hands-free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all">
                    Start Your 7-Day Free Trial
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-gray-50 transition-all">
                    Explore Features
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                No credit card required • Cancel anytime • 7-day free trial
              </p>
            </div>
          </div>

          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        </section>

        {/* Trust Bar */}
        <section className="py-8 bg-white border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>7-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Setup in 5 Minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Scale Your Content
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From keyword research to publishing, ContentFlow AI handles your entire content workflow with precision and authenticity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature 1: AI Content Generation */}
              <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-blue-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  AI Content Generation
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our AI scans your website to understand your business, products, and brand voice. Then generates 600-2000 word blog posts that sound authentically like you—not generic AI content.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Learns from your existing content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Maintains your brand voice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Customizable word count and tone</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2: SEO Scoring */}
              <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-green-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Advanced SEO Scoring
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every post gets a comprehensive 100-point SEO score based on 10 critical ranking factors. Get actionable recommendations to improve your content before publishing.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Keyword density analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Meta tag optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Readability and structure checks</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3: Keyword Research */}
              <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-purple-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Intelligent Keyword Research
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Discover high-opportunity keywords with built-in SERP analysis. Track keyword rankings, analyze search volume, and find low-competition topics your audience is searching for.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>SERP difficulty scoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Search volume tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Competitor keyword analysis</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4: Multi-Platform Publishing */}
              <div className="group p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-orange-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Automated Publishing
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Publish directly to WordPress, Shopify, Wix, Blogger, or any custom website. Schedule posts in advance and let ContentFlow AI handle the rest—completely hands-free.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>WordPress, Shopify, Wix, Blogger support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Custom site integration via JavaScript SDK</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Advanced scheduling and automation</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5: AI Image Generation */}
              <div className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-indigo-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Featured Image Creation
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every blog post gets a custom AI-generated featured image created with Stable Diffusion. Images are optimized for web performance and include SEO-friendly alt text automatically.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>AI-generated unique images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Automatic alt text generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Web-optimized format and size</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6: Backlink Monitoring */}
              <div className="group p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-teal-600 rounded-lg">
                    <div className="w-8 h-8 bg-white rounded" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Backlink Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Monitor your backlink profile and track link-building opportunities. Analyze competitor backlinks, identify high-authority linking domains, and measure your site's authority growth.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Backlink tracking and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Competitor backlink analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Domain authority metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                From Setup to Published in Three Simple Steps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                No complex configuration. No steep learning curve. Just results.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                    <h3 className="text-2xl font-bold mb-3 mt-4">Connect Your Website</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Simply enter your website URL. Our AI scans your existing content to understand your business, products, brand voice, and target audience. Takes less than 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                    <h3 className="text-2xl font-bold mb-3 mt-4">Generate Content</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Choose your keywords, word count, and tone. Our AI creates SEO-optimized blog posts complete with meta tags, headers, images, and internal links—ready to rank.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                    <h3 className="text-2xl font-bold mb-3 mt-4">Publish & Grow</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Schedule or publish immediately to your platform of choice. Watch your search rankings climb, traffic grow, and leads increase—all on autopilot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Save 20+ Hours Per Week on Content Creation
                  </h2>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Stop spending hours researching keywords, writing blog posts, and optimizing for SEO. ContentFlow AI handles everything while you focus on growing your business.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Reduce Content Costs by 80%</h4>
                        <p className="text-gray-600">No more expensive freelancers or content agencies. Get unlimited blog posts for one flat monthly fee.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Consistent Publishing Schedule</h4>
                        <p className="text-gray-600">Never miss a publishing deadline. Schedule content weeks or months in advance with automated publishing.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Improve Search Rankings</h4>
                        <p className="text-gray-600">SEO-optimized content built to rank. Every post is scored on 100 points and optimized for your target keywords.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-12 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-2">80%</div>
                    <div className="text-xl text-gray-700">Cost Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple Pricing, Powerful Results
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start with a 7-day free trial. No credit card required. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">$29</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>10 blog posts per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>10 AI-generated images</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>1 website connection</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>50 keyword research queries</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>WordPress & Shopify integration</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              {/* Professional */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-xl text-white relative hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">$49</span>
                    <span className="text-blue-100">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>40 blog posts per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>40 AI-generated images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>1 website connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>200 keyword research queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>All platform integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Bulk content creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              {/* Agency */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Agency</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">$99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>150 blog posts per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>150 AI-generated images</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>3 website connections</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>1000 keyword research queries</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>All platform integrations</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Bulk content creation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Team collaboration (5 users)</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/pricing" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                View detailed pricing comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about ContentFlow AI
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">How does the AI understand my brand voice?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you connect your website, our AI analyzes your existing content, product descriptions, and about pages to understand your writing style, tone, terminology, and brand positioning. It then generates new content that matches your unique voice.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Will the content rank on Google?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes. Every post is optimized for SEO with proper keyword placement, meta tags, headers, internal linking, and readability. Our SEO scoring algorithm ensures each post meets Google's ranking criteria. However, rankings also depend on your site's domain authority and backlink profile.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Can I edit the AI-generated content?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. Every post can be edited before publishing. You have full control to refine titles, adjust content, modify keywords, and make any changes you need. Think of the AI as your first draft writer.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Which platforms can I publish to?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We support WordPress, Shopify, Wix, Blogger, and any custom website via our JavaScript SDK. Simply connect your platform once, and ContentFlow AI can publish or schedule posts automatically.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">What happens after my trial ends?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your 7-day free trial gives you full access to all features. After the trial, you can choose a paid plan to continue or cancel anytime. No credit card is required to start your trial.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes. There are no lock-in contracts or cancellation fees. You can cancel your subscription at any time from your account settings, and you'll retain access until the end of your billing period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ready to Scale Your Content Marketing?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Join hundreds of businesses automating their blog content with ContentFlow AI. Start your 7-day free trial today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-white text-white hover:bg-white/10 transition-all">
                    Explore All Features
                  </Button>
                </Link>
              </div>
              <p className="text-sm mt-6 text-blue-100">
                Setup takes 5 minutes • First post published in 10 minutes • Cancel anytime
              </p>
            </div>
          </div>

          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
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
