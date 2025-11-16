'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const categories = [
  {
    name: 'Getting Started',
    icon: '🚀',
    articles: [
      { title: 'How to create your first blog post', views: 1250 },
      { title: 'Setting up your website integration', views: 980 },
      { title: 'Understanding the dashboard', views: 750 },
      { title: 'Quick start guide', views: 2100 },
    ],
  },
  {
    name: 'Content Creation',
    icon: '✏️',
    articles: [
      { title: 'How to generate SEO-optimized titles', views: 890 },
      { title: 'Bulk post creation guide', views: 650 },
      { title: 'Customizing AI tone and style', views: 720 },
      { title: 'Using the content editor', views: 580 },
    ],
  },
  {
    name: 'Integrations',
    icon: '🔌',
    articles: [
      { title: 'WordPress setup guide', views: 1540 },
      { title: 'Shopify blog integration', views: 420 },
      { title: 'Custom webhook configuration', views: 310 },
      { title: 'Troubleshooting connection issues', views: 680 },
    ],
  },
  {
    name: 'SEO & Keywords',
    icon: '🔑',
    articles: [
      { title: 'Keyword research best practices', views: 950 },
      { title: 'Understanding SEO scores', views: 840 },
      { title: 'Tracking keyword rankings', views: 520 },
      { title: 'Competitor keyword analysis', views: 610 },
    ],
  },
  {
    name: 'Billing & Plans',
    icon: '💳',
    articles: [
      { title: 'Understanding pricing plans', views: 1120 },
      { title: 'How to upgrade or downgrade', views: 450 },
      { title: 'Cancellation and refunds', views: 380 },
      { title: 'Managing your subscription', views: 670 },
    ],
  },
  {
    name: 'Account & Settings',
    icon: '⚙️',
    articles: [
      { title: 'Managing team members', views: 340 },
      { title: 'Changing your password', views: 290 },
      { title: 'API access and keys', views: 510 },
      { title: 'White label customization', views: 220 },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = categories.map((category) => ({
    ...category,
    articles: category.articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.articles.length > 0)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-muted-foreground mb-6">
          Search our knowledge base or browse categories below
        </p>

        <div className="max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
      </div>

      {/* Quick Links */}
      {!searchQuery && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold mb-1">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Complete guide to all features
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">
              Chat with our support team
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground">
              Get help via email
            </p>
          </Card>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-8">
        {filteredCategories.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-semibold mb-2">No articles found</p>
            <p className="text-muted-foreground">
              Try searching with different keywords
            </p>
          </Card>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>

              <Card className="p-6">
                <div className="grid gap-3">
                  {category.articles.map((article, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{article.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {article.views} views
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Contact Support */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is ready to assist you
          </p>
          <div className="flex gap-3 justify-center">
            <Button>Contact Support</Button>
            <Button variant="outline">Schedule a Call</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
