'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { postAPI } from '@/lib/api'

export default function ContentLibraryPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchQuery, statusFilter])

  const loadPosts = async () => {
    try {
      const response = await postAPI.list()
      setPosts(response.data)
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = [...posts]

    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((post) => post.status === statusFilter)
    }

    setFilteredPosts(filtered)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(filteredPosts.map((p) => p.id))
    } else {
      setSelectedPosts([])
    }
  }

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId])
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId))
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedPosts.length} posts?`)) return

    try {
      await Promise.all(selectedPosts.map((id) => postAPI.delete(id)))
      await loadPosts()
      setSelectedPosts([])
      alert('Posts deleted successfully')
    } catch (error) {
      alert('Failed to delete posts')
    }
  }

  const handleBulkPublish = async () => {
    try {
      await Promise.all(
        selectedPosts.map((id) => postAPI.publish(id))
      )
      await loadPosts()
      setSelectedPosts([])
      alert('Posts published successfully')
    } catch (error) {
      alert('Failed to publish posts')
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-gray-200 text-gray-800' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-200 text-blue-800' },
      published: { label: 'Published', className: 'bg-green-200 text-green-800' },
      failed: { label: 'Failed', className: 'bg-red-200 text-red-800' },
    }
    const config = variants[status] || variants.draft
    return <Badge className={config.className}>{config.label}</Badge>
  }

  if (loading) {
    return <div>Loading posts...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">
            Manage all your blog posts in one place
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/create')}>
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="failed">Failed</option>
          </Select>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
            </span>
            <Button variant="outline" size="sm" onClick={handleBulkPublish}>
              Publish Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-700"
            >
              Delete Selected
            </Button>
          </div>
        </Card>
      )}

      {/* Posts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredPosts.length > 0 &&
                    selectedPosts.length === filteredPosts.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SEO Score</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">
                    {posts.length === 0
                      ? 'No posts yet. Create your first post!'
                      : 'No posts match your filters.'}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onChange={(e) => handleSelectPost(post.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${
                        post.seoScore >= 80
                          ? 'text-green-600'
                          : post.seoScore >= 60
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {post.seoScore || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/create?id=${post.id}`)}
                      >
                        Edit
                      </Button>
                      {post.status !== 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            if (confirm('Publish this post now?')) {
                              try {
                                await postAPI.publish(post.id)
                                alert('Post published successfully!')
                                await loadPosts()
                              } catch (error) {
                                alert('Failed to publish post')
                              }
                            }
                          }}
                          className="text-green-600"
                        >
                          Publish
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (confirm('Delete this post?')) {
                            await postAPI.delete(post.id)
                            await loadPosts()
                          }
                        }}
                        className="text-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
