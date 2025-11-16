'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { postAPI, websiteAPI } from '@/lib/api'

export default function BulkCreatePage() {
  const [step, setStep] = useState<'keywords' | 'configure' | 'progress'>('keywords')
  const [keywords, setKeywords] = useState('')
  const [websites, setWebsites] = useState<any[]>([])
  const [selectedWebsite, setSelectedWebsite] = useState('')
  const [wordCount, setWordCount] = useState('1200')
  const [tone, setTone] = useState('professional')
  const [scheduleType, setScheduleType] = useState('immediate')
  const [scheduleDays, setScheduleDays] = useState('7')
  const [progress, setProgress] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [createdPosts, setCreatedPosts] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadWebsites()
  }, [])

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

  const keywordList = keywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k.length > 0)

  const handleConfigure = () => {
    if (keywordList.length === 0) {
      alert('Please enter at least one keyword')
      return
    }
    setTotalPosts(keywordList.length)
    setStep('configure')
  }

  const handleGenerate = async () => {
    setLoading(true)
    setStep('progress')
    setCreatedPosts(0)
    setProgress(0)

    try {
      const response = await postAPI.bulkCreate({
        keywords: keywordList,
        websiteId: selectedWebsite,
        wordCount: parseInt(wordCount),
        tone,
        generateImages: true,
        schedule: {
          frequency: scheduleType === 'spread' ? 'daily' : 'immediate',
          startDate: new Date().toISOString(),
          time: '09:00',
        },
      })

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
        setCreatedPosts((prev) => {
          if (prev >= keywordList.length) {
            return keywordList.length
          }
          return prev + 1
        })
      }, 500)

      alert('Bulk post generation started! Posts will be created in the background.')
    } catch (error) {
      alert('Failed to start bulk generation')
      setStep('configure')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Bulk Post Creation</h1>
        <p className="text-muted-foreground">
          Generate multiple blog posts at once with AI
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${step === 'keywords' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'keywords' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="text-sm font-medium">Enter Keywords</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 ${step === 'configure' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'configure' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="text-sm font-medium">Configure</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 ${step === 'progress' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'progress' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="text-sm font-medium">Generate</span>
        </div>
      </div>

      {/* Step 1: Keywords */}
      {step === 'keywords' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Enter Keywords (One per line)</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Textarea
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={15}
                placeholder="digital marketing tips&#10;social media strategy&#10;content marketing guide&#10;SEO best practices&#10;email marketing automation"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {keywordList.length} keyword{keywordList.length !== 1 ? 's' : ''} entered
              </p>
            </div>

            <Button
              onClick={handleConfigure}
              disabled={keywordList.length === 0}
              className="w-full"
            >
              Continue to Configuration
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Configure */}
      {step === 'configure' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configure Bulk Generation</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
              You're about to generate <strong>{totalPosts}</strong> blog posts
            </div>

            <div>
              <Label htmlFor="website">Target Website</Label>
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

            <div>
              <Label htmlFor="scheduleType">Scheduling</Label>
              <Select
                id="scheduleType"
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
              >
                <option value="immediate">Save as drafts</option>
                <option value="spread">Spread over time</option>
              </Select>

              {scheduleType === 'spread' && (
                <div className="mt-3">
                  <Label htmlFor="scheduleDays">Spread over (days)</Label>
                  <Input
                    id="scheduleDays"
                    type="number"
                    value={scheduleDays}
                    onChange={(e) => setScheduleDays(e.target.value)}
                    min="1"
                    max="365"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Posts will be scheduled evenly over {scheduleDays} days
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setStep('keywords')}>
                Back
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Starting...' : 'Start Bulk Generation'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Progress */}
      {step === 'progress' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generating Posts...</h2>

          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-2xl font-bold mb-2">
                {createdPosts} / {totalPosts}
              </p>
              <p className="text-muted-foreground">Posts created</p>
            </div>

            <Progress value={progress} />

            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
              <p className="font-semibold mb-1">Processing in background</p>
              <p className="text-sm">
                Posts are being generated by AI. You can close this page and check
                the Content Library later.
              </p>
            </div>

            {progress >= 100 && (
              <Button
                onClick={() => window.location.href = '/dashboard/content'}
                className="w-full"
              >
                View Created Posts
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
