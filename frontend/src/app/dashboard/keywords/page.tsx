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
import { keywordAPI } from '@/lib/api'

export default function KeywordsPage() {
  const [activeTab, setActiveTab] = useState('tracked')
  const [keywords, setKeywords] = useState<any[]>([])
  const [newKeyword, setNewKeyword] = useState('')
  const [researchKeyword, setResearchKeyword] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadKeywords()
  }, [])

  const loadKeywords = async () => {
    try {
      const response = await keywordAPI.list()
      setKeywords(response.data)
    } catch (error) {
      console.error('Failed to load keywords:', error)
    }
  }

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) return

    try {
      await keywordAPI.add(newKeyword)
      await loadKeywords()
      setNewKeyword('')
    } catch (error) {
      alert('Failed to add keyword')
    }
  }

  const handleResearch = async () => {
    if (!researchKeyword.trim()) return

    setLoading(true)
    try {
      const response = await keywordAPI.research(researchKeyword)
      setSuggestions(response.data.suggestions || [])
    } catch (error) {
      alert('Failed to research keyword')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this keyword?')) return

    try {
      await keywordAPI.delete(id)
      await loadKeywords()
    } catch (error) {
      alert('Failed to delete keyword')
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-200 text-green-800',
      medium: 'bg-yellow-200 text-yellow-800',
      hard: 'bg-red-200 text-red-800',
    }
    return (
      <Badge className={colors[difficulty] || colors.medium}>
        {difficulty || 'medium'}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Keywords Tracking</h1>
        <p className="text-muted-foreground">
          Track keywords, research opportunities, and analyze competitors
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tracked">Tracked Keywords</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
        </TabsList>

        {/* Tracked Keywords Tab */}
        <TabsContent value="tracked">
          <div className="space-y-6">
            {/* Add Keyword */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Keyword</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter keyword to track..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                />
                <Button onClick={handleAddKeyword}>Add Keyword</Button>
              </div>
            </Card>

            {/* Keywords Table */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Current Rank</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No keywords tracked yet. Add your first keyword above.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    keywords.map((keyword) => (
                      <TableRow key={keyword.id}>
                        <TableCell className="font-medium">
                          {keyword.keyword}
                        </TableCell>
                        <TableCell>{keyword.searchVolume || 'N/A'}</TableCell>
                        <TableCell>
                          {getDifficultyBadge(keyword.difficulty)}
                        </TableCell>
                        <TableCell>{keyword.currentRank || 'Not ranked'}</TableCell>
                        <TableCell>{keyword.postCount || 0}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(keyword.id)}
                            className="text-red-600"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research">
          <div className="space-y-6">
            {/* Research Form */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Keyword Research</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="researchKeyword">Seed Keyword</Label>
                  <Input
                    id="researchKeyword"
                    placeholder="e.g., digital marketing"
                    value={researchKeyword}
                    onChange={(e) => setResearchKeyword(e.target.value)}
                  />
                </div>
                <Button onClick={handleResearch} disabled={loading}>
                  {loading ? 'Researching...' : 'Find Keyword Opportunities'}
                </Button>
              </div>
            </Card>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Search Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>CPC</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suggestions.map((suggestion, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {suggestion.keyword}
                        </TableCell>
                        <TableCell>{suggestion.searchVolume}</TableCell>
                        <TableCell>
                          {getDifficultyBadge(suggestion.difficulty)}
                        </TableCell>
                        <TableCell>${suggestion.cpc || '0.00'}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              await keywordAPI.add(suggestion.keyword)
                              await loadKeywords()
                              alert('Keyword added to tracking!')
                            }}
                          >
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Competitor Analysis Tab */}
        <TabsContent value="competitor">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Competitor Analysis</h2>
            <p className="text-muted-foreground mb-4">
              Analyze which keywords your competitors are ranking for
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="competitorUrl">Competitor URL</Label>
                <Input
                  id="competitorUrl"
                  placeholder="https://competitor.com"
                />
              </div>
              <Button>Analyze Competitor</Button>
            </div>

            <div className="mt-8 text-center text-muted-foreground">
              <p>Enter a competitor URL to see their top ranking keywords</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
