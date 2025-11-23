'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { postAPI, websiteAPI } from '@/lib/api'

export default function CreatePostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')

  const [step, setStep] = useState<'titles' | 'generate' | 'edit'>('titles')
  const [keyword, setKeyword] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [selectedTitle, setSelectedTitle] = useState('')
  const [websites, setWebsites] = useState<any[]>([])
  const [selectedWebsite, setSelectedWebsite] = useState('')
  const [wordCount, setWordCount] = useState('1200')
  const [tone, setTone] = useState('professional')
  const [generatedPost, setGeneratedPost] = useState<any>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [seoScore, setSeoScore] = useState(0)

  useEffect(() => {
    loadWebsites()
    if (postId) {
      loadPost()
    }
  }, [postId])

  const loadWebsites = async () => {
    try {
      const response = await websiteAPI.list()
      setWebsites(response.data)
      if (response.data.length > 0) {
        setSelectedWebsite(response.data[0].id)
      }
    } catch (error) {
      console.error('Failed to load websites:', error)
    }
  }

  const loadPost = async () => {
    try {
      const response = await postAPI.get(postId!)
      const post = response.data
      setSelectedTitle(post.title)
      setContent(post.content)
      setSeoScore(post.seoScore || 0)
      setStep('edit')
    } catch (error) {
      console.error('Failed to load post:', error)
    }
  }

  const handleGenerateTitles = async () => {
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const response = await postAPI.generateTitles({
        websiteId: selectedWebsite,
        keyword: keyword.trim(),
        count: 5,
      })
      setTitles(response.data.titles)
      setStep('generate')
    } catch (error) {
      alert('Failed to generate titles')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateContent = async () => {
    if (!selectedTitle) return

    setLoading(true)
    try {
      const response = await postAPI.generate({
        title: selectedTitle,
        keyword,
        websiteId: selectedWebsite,
        wordCount: parseInt(wordCount),
        tone,
      })
      setGeneratedPost(response.data)
      setContent(response.data.content)
      setSeoScore(response.data.seoScore || 0)
      // Store the generated post ID so we don't create duplicates
      if (response.data.id) {
        router.replace(`/dashboard/create?id=${response.data.id}`)
      }
      setStep('edit')
    } catch (error) {
      alert('Failed to generate content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (status: 'draft' | 'scheduled' | 'published') => {
    setLoading(true)
    try {
      if (postId || generatedPost?.id) {
        // Update existing post
        await postAPI.update(postId || generatedPost.id, {
          title: selectedTitle,
          content,
          status,
        })
      } else {
        // This shouldn't happen, but create if needed
        const response = await postAPI.generate({
          title: selectedTitle,
          keyword,
          websiteId: selectedWebsite,
          wordCount: parseInt(wordCount),
          tone,
        })
        if (response.data.id && status !== 'draft') {
          await postAPI.update(response.data.id, { status })
        }
      }
      alert(`Post ${status === 'draft' ? 'saved' : status}!`)
      router.push('/dashboard/content')
    } catch (error) {
      alert('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    setLoading(true)
    try {
      if (postId || generatedPost?.id) {
        await postAPI.publish(postId || generatedPost.id)
        alert('Post published successfully!')
        router.push('/dashboard/content')
      } else {
        alert('Please generate content first')
      }
    } catch (error) {
      alert('Failed to publish post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">
            Generate AI-powered SEO blog content
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push('/dashboard/content')}>
          Cancel
        </Button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${step === 'titles' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'titles' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="text-sm font-medium">Generate Titles</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 ${step === 'generate' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'generate' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="text-sm font-medium">Generate Content</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 ${step === 'edit' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="text-sm font-medium">Edit & Publish</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Generate Titles */}
          {step === 'titles' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Step 1: Generate Title Ideas</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="keyword">Target Keyword</Label>
                  <Input
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g., digital marketing tips"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the main keyword you want to rank for
                  </p>
                </div>

                <div>
                  <Label htmlFor="website">Select Website</Label>
                  <Select
                    id="website"
                    value={selectedWebsite}
                    onChange={(e) => setSelectedWebsite(e.target.value)}
                  >
                    {websites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.url}
                      </option>
                    ))}
                  </Select>
                </div>

                <Button
                  onClick={handleGenerateTitles}
                  disabled={loading || !keyword}
                  className="w-full"
                >
                  {loading ? 'Generating titles...' : 'Generate Title Ideas'}
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Select Title & Generate */}
          {step === 'generate' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Step 2: Select Title & Configure</h2>

              <div className="space-y-4">
                <div>
                  <Label>Choose a Title</Label>
                  <div className="space-y-2 mt-2">
                    {titles.map((title, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTitle(title)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTitle === title
                            ? 'border-blue-600 bg-blue-50'
                            : 'hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium">{title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="wordCount">Word Count</Label>
                    <Select
                      id="wordCount"
                      value={wordCount}
                      onChange={(e) => setWordCount(e.target.value)}
                    >
                      <option value="600">600 words</option>
                      <option value="800">800 words</option>
                      <option value="1200">1200 words</option>
                      <option value="1500">1500 words</option>
                      <option value="2000">2000 words</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="friendly">Friendly</option>
                      <option value="authoritative">Authoritative</option>
                      <option value="conversational">Conversational</option>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep('titles')}>
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerateContent}
                    disabled={loading || !selectedTitle}
                    className="flex-1"
                  >
                    {loading ? 'Generating content...' : 'Generate Content'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Edit Content */}
          {step === 'edit' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Edit & Publish</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedTitle}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {content.split(' ').length} words
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setStep('generate')}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSave('draft')}
                    disabled={loading}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSave('scheduled')}
                    disabled={loading}
                  >
                    Schedule Post
                  </Button>
                  <Button
                    onClick={handlePublish}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Publish Now
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* SEO Score */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">SEO Score</h3>
            <div className="text-center">
              <div className={`text-5xl font-bold ${
                seoScore >= 80 ? 'text-green-600' :
                seoScore >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {seoScore}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {seoScore >= 80 ? 'Excellent' :
                 seoScore >= 60 ? 'Good' :
                 'Needs Improvement'}
              </p>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3">SEO Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Include target keyword in title</li>
              <li>✓ Use keyword naturally 3-5 times</li>
              <li>✓ Add relevant headings (H2, H3)</li>
              <li>✓ Include internal & external links</li>
              <li>✓ Add meta description</li>
              <li>✓ Optimize images with alt text</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
