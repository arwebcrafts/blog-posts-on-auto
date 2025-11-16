'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { postAPI, websiteAPI } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    publishedPosts: 0,
    websites: 0,
  })
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [postsResponse, websitesResponse] = await Promise.all([
        postAPI.list(),
        websiteAPI.list(),
      ])

      const posts = postsResponse.data
      const websites = websitesResponse.data

      setStats({
        totalPosts: posts.length,
        scheduledPosts: posts.filter((p: any) => p.status === 'scheduled').length,
        publishedPosts: posts.filter((p: any) => p.status === 'published').length,
        websites: websites.length,
      })

      setRecentPosts(posts.slice(0, 5))
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Posts
              </p>
              <p className="text-2xl font-bold">{stats.totalPosts}</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Scheduled
              </p>
              <p className="text-2xl font-bold">{stats.scheduledPosts}</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Published
              </p>
              <p className="text-2xl font-bold">{stats.publishedPosts}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Websites
              </p>
              <p className="text-2xl font-bold">{stats.websites}</p>
            </div>
            <div className="text-3xl">🌐</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Button
            onClick={() => router.push('/dashboard/create')}
            className="justify-start h-auto py-4"
          >
            <div className="text-left">
              <div className="font-semibold">✏️ Create New Post</div>
              <div className="text-xs opacity-90">
                Generate AI-powered blog content
              </div>
            </div>
          </Button>

          <Button
            onClick={() => router.push('/dashboard/bulk')}
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <div className="text-left">
              <div className="font-semibold">📝 Bulk Create</div>
              <div className="text-xs opacity-70">
                Generate multiple posts at once
              </div>
            </div>
          </Button>

          <Button
            onClick={() => router.push('/dashboard/keywords')}
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <div className="text-left">
              <div className="font-semibold">🔑 Research Keywords</div>
              <div className="text-xs opacity-70">
                Find new content opportunities
              </div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link href="/dashboard/content">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No posts yet. Create your first post to get started!</p>
            <Button
              onClick={() => router.push('/dashboard/create')}
              className="mt-4"
            >
              Create Post
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.status === 'draft' && '📝 Draft'}
                    {post.status === 'scheduled' && '📅 Scheduled'}
                    {post.status === 'published' && '✅ Published'}
                    {' • '}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/dashboard/create?id=${post.id}`}>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* AI Suggestions */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <h2 className="text-lg font-semibold mb-2">💡 AI Suggestions</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your website and recent trends, here are some content ideas:
        </p>
        <ul className="space-y-2">
          <li className="text-sm">
            • Your competitors are ranking for "digital marketing trends 2025"
          </li>
          <li className="text-sm">
            • Trending topic in your niche: "AI automation tools"
          </li>
          <li className="text-sm">
            • Low competition keyword opportunity: "beginner SEO guide"
          </li>
        </ul>
        <Button
          onClick={() => router.push('/dashboard/keywords')}
          variant="outline"
          className="mt-4"
        >
          Explore Keywords
        </Button>
      </Card>
    </div>
  )
}
