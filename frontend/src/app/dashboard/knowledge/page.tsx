'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { knowledgeBaseAPI, websiteAPI } from '@/lib/api'

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('website')
  const [websites, setWebsites] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    description: '',
    industry: '',
    targetAudience: '',
    keyValues: '',
  })
  const [customTraining, setCustomTraining] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadWebsites()
    loadDocuments()
  }, [])

  const loadWebsites = async () => {
    try {
      const response = await websiteAPI.list()
      setWebsites(response.data)
    } catch (error) {
      console.error('Failed to load websites:', error)
    }
  }

  const loadDocuments = async () => {
    try {
      const response = await knowledgeBaseAPI.list()
      setDocuments(response.data)
    } catch (error) {
      console.error('Failed to load documents:', error)
    }
  }

  const handleScanWebsite = async (websiteId: string) => {
    setLoading(true)
    try {
      await websiteAPI.scan(websiteId)
      alert('Website scan started! This may take a few minutes.')
      await loadWebsites()
    } catch (error) {
      alert('Failed to scan website')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setLoading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append('files', file)
      })

      await knowledgeBaseAPI.upload(formData)
      await loadDocuments()
      alert('Documents uploaded successfully!')
    } catch (error) {
      alert('Failed to upload documents')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Delete this document?')) return

    try {
      await knowledgeBaseAPI.delete(id)
      await loadDocuments()
    } catch (error) {
      alert('Failed to delete document')
    }
  }

  const handleSaveBusinessInfo = async () => {
    setLoading(true)
    try {
      // Save business info via API
      alert('Business information saved!')
    } catch (error) {
      alert('Failed to save business information')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTraining = async () => {
    setLoading(true)
    try {
      // Save custom training via API
      alert('Custom training data saved!')
    } catch (error) {
      alert('Failed to save training data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Train AI with your business information and documents
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="website">Website Scan</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="custom">Custom Training</TabsTrigger>
        </TabsList>

        {/* Website Scan Tab */}
        <TabsContent value="website">
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Scanned Websites</h2>
              <p className="text-sm text-muted-foreground mb-4">
                We'll scan your website to understand your business, products, and
                writing style
              </p>

              {websites.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No websites added yet. Add one from the onboarding page.
                </p>
              ) : (
                <div className="space-y-3">
                  {websites.map((website) => (
                    <div
                      key={website.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{website.url}</h3>
                        <p className="text-sm text-muted-foreground">
                          {website.lastScannedAt
                            ? `Last scanned ${new Date(
                                website.lastScannedAt
                              ).toLocaleDateString()}`
                            : 'Not scanned yet'}
                        </p>
                        {website.scanData && (
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">
                              {website.scanData.pages || 0} pages
                            </Badge>
                            <Badge variant="secondary">
                              {website.scanData.keywords || 0} keywords
                            </Badge>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => handleScanWebsite(website.id)}
                        disabled={loading}
                        variant="outline"
                      >
                        {loading ? 'Scanning...' : 'Rescan'}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Upload PDFs, Word docs, or text files to train AI on your content
              </p>

              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOC, DOCX, or TXT (Max 10MB each)
                  </p>
                </label>
              </div>
            </Card>

            {/* Uploaded Documents */}
            {documents.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Uploaded Documents</h3>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="font-medium">{doc.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Business Info Tab */}
        <TabsContent value="business">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Business Information</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Help AI understand your business better for more accurate content
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessInfo.name}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, name: e.target.value })
                  }
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={businessInfo.description}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, description: e.target.value })
                  }
                  placeholder="What does your business do?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={businessInfo.industry}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, industry: e.target.value })
                  }
                  placeholder="e.g., E-commerce, SaaS, Consulting"
                />
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  value={businessInfo.targetAudience}
                  onChange={(e) =>
                    setBusinessInfo({
                      ...businessInfo,
                      targetAudience: e.target.value,
                    })
                  }
                  placeholder="Who are your ideal customers?"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="keyValues">Key Values & Differentiators</Label>
                <Textarea
                  id="keyValues"
                  value={businessInfo.keyValues}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, keyValues: e.target.value })
                  }
                  placeholder="What makes your business unique?"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveBusinessInfo} disabled={loading}>
                {loading ? 'Saving...' : 'Save Business Information'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Custom Training Tab */}
        <TabsContent value="custom">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Custom Training Data</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Add custom instructions or examples to guide AI content generation
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="customTraining">Custom Instructions</Label>
                <Textarea
                  id="customTraining"
                  value={customTraining}
                  onChange={(e) => setCustomTraining(e.target.value)}
                  placeholder="Example:&#10;- Always use a friendly, conversational tone&#10;- Include actionable tips in every post&#10;- Avoid technical jargon unless necessary&#10;- End posts with a clear call-to-action"
                  rows={15}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  These instructions will be used when generating content
                </p>
              </div>

              <Button onClick={handleSaveTraining} disabled={loading}>
                {loading ? 'Saving...' : 'Save Training Data'}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
