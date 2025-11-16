'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { backlinkAPI } from '@/lib/api'

export default function BacklinksPage() {
  const [activeTab, setActiveTab] = useState('yours')
  const [backlinks, setBacklinks] = useState<any[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [checkUrl, setCheckUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadBacklinks()
    loadSummary()
  }, [])

  const loadBacklinks = async () => {
    try {
      const response = await backlinkAPI.list()
      setBacklinks(response.data)
    } catch (error) {
      console.error('Failed to load backlinks:', error)
    }
  }

  const loadSummary = async () => {
    try {
      // Get domain from checkUrl or use placeholder
      const domain = checkUrl || 'example.com'
      const response = await backlinkAPI.summary(domain)
      setSummary(response.data)
    } catch (error) {
      console.error('Failed to load summary:', error)
    }
  }

  const handleCheckBacklinks = async () => {
    if (!checkUrl.trim()) return

    setLoading(true)
    try {
      await backlinkAPI.check(checkUrl)
      await loadBacklinks()
      await loadSummary()
      alert('Backlink check started! Results will appear shortly.')
    } catch (error) {
      alert('Failed to check backlinks')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Backlinks Analysis</h1>
        <p className="text-muted-foreground">
          Monitor your backlinks and find new linking opportunities
        </p>
      </div>

      {/* Summary Stats */}
      {summary && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Backlinks
            </p>
            <p className="text-2xl font-bold">{summary.totalBacklinks || 0}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Referring Domains
            </p>
            <p className="text-2xl font-bold">{summary.referringDomains || 0}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Domain Authority
            </p>
            <p className="text-2xl font-bold">{summary.domainAuthority || 0}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              New This Month
            </p>
            <p className="text-2xl font-bold text-green-600">
              +{summary.newThisMonth || 0}
            </p>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="yours">Your Backlinks</TabsTrigger>
          <TabsTrigger value="competitor">Competitor Backlinks</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        {/* Your Backlinks Tab */}
        <TabsContent value="yours">
          <div className="space-y-6">
            {/* Check Backlinks */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Check Backlinks</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="checkUrl">Website URL</Label>
                  <Input
                    id="checkUrl"
                    placeholder="https://yourwebsite.com"
                    value={checkUrl}
                    onChange={(e) => setCheckUrl(e.target.value)}
                  />
                </div>
                <Button onClick={handleCheckBacklinks} disabled={loading}>
                  {loading ? 'Checking...' : 'Check Backlinks'}
                </Button>
              </div>
            </Card>

            {/* Backlinks Table */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source URL</TableHead>
                    <TableHead>Target URL</TableHead>
                    <TableHead>Domain Authority</TableHead>
                    <TableHead>Anchor Text</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlinks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No backlinks found yet. Check your website above.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    backlinks.map((backlink) => (
                      <TableRow key={backlink.id}>
                        <TableCell className="font-medium">
                          <a
                            href={backlink.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {backlink.sourceDomain}
                          </a>
                        </TableCell>
                        <TableCell>{backlink.targetUrl}</TableCell>
                        <TableCell>
                          <Badge>{backlink.domainAuthority || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell>{backlink.anchorText || 'No text'}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-200 text-green-800">
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </TabsContent>

        {/* Competitor Backlinks Tab */}
        <TabsContent value="competitor">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Competitor Backlink Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="competitorUrl">Competitor URL</Label>
                <Input
                  id="competitorUrl"
                  placeholder="https://competitor.com"
                />
              </div>
              <Button>Analyze Competitor Backlinks</Button>
            </div>

            <div className="mt-8 text-center text-muted-foreground">
              <p>
                Enter a competitor URL to see where they're getting backlinks from
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Link Opportunities</h2>
            <p className="text-muted-foreground mb-6">
              Discover websites that are likely to link to your content
            </p>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">
                  💡 Guest Posting Opportunities
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find websites in your niche that accept guest posts
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Find Opportunities
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">
                  🔗 Broken Link Building
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find broken links on competitor websites you can replace
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Find Broken Links
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📝 Unlinked Mentions</h3>
                <p className="text-sm text-muted-foreground">
                  Find pages that mention your brand but don't link to you
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Find Mentions
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
