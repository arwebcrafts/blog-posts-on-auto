'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { authAPI, stripeAPI, websiteAPI } from '@/lib/api'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  const [user, setUser] = useState<any>(null)
  const [websites, setWebsites] = useState<any[]>([])
  const [showAddWebsite, setShowAddWebsite] = useState(false)
  const [newWebsite, setNewWebsite] = useState({
    url: '',
    name: '',
  })
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [preferences, setPreferences] = useState({
    defaultWordCount: '1200',
    defaultTone: 'professional',
    autoPublish: false,
    emailNotifications: true,
    weeklyReports: true,
  })
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUser()
    loadWebsites()
  }, [])

  const loadWebsites = async () => {
    try {
      const response = await websiteAPI.list()
      setWebsites(response.data)
    } catch (error) {
      console.error('Failed to load websites:', error)
    }
  }

  const loadUser = async () => {
    try {
      const userData = localStorage.getItem('user')
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setAccountData({
          ...accountData,
          name: parsedUser.name,
          email: parsedUser.email,
        })
      }

      const response = await authAPI.getMe()
      setSubscription(response.data.subscription)
    } catch (error) {
      console.error('Failed to load user:', error)
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      await authAPI.updateProfile({
        name: accountData.name,
        email: accountData.email,
      })
      localStorage.setItem('user', JSON.stringify({ ...user, name: accountData.name, email: accountData.email }))
      alert('Profile updated successfully!')
    } catch (error) {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await authAPI.changePassword({
        currentPassword: accountData.currentPassword,
        newPassword: accountData.newPassword,
      })
      setAccountData({
        ...accountData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      alert('Password changed successfully!')
    } catch (error) {
      alert('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return

    setLoading(true)
    try {
      await stripeAPI.cancelSubscription()
      alert('Subscription cancelled. You can continue using the service until the end of your billing period.')
      await loadUser()
    } catch (error) {
      alert('Failed to cancel subscription')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenBillingPortal = async () => {
    try {
      const response = await stripeAPI.getBillingPortal()
      window.location.href = response.data.url
    } catch (error) {
      alert('Failed to open billing portal')
    }
  }

  const handleAddWebsite = async () => {
    if (!newWebsite.url.trim()) {
      alert('Please enter a website URL')
      return
    }

    setLoading(true)
    try {
      await websiteAPI.create({
        url: newWebsite.url,
        name: newWebsite.name || null,
      })
      setNewWebsite({ url: '', name: '' })
      setShowAddWebsite(false)
      await loadWebsites()
      alert('Website added successfully!')

      // Trigger website switcher refresh
      window.dispatchEvent(new CustomEvent('websiteListChanged'))
    } catch (error) {
      alert('Failed to add website')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWebsite = async (id: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return

    setLoading(true)
    try {
      await websiteAPI.delete(id)
      await loadWebsites()

      // Clear selected website if it was deleted
      const selectedWebsiteId = localStorage.getItem('selectedWebsiteId')
      if (selectedWebsiteId === id) {
        localStorage.removeItem('selectedWebsiteId')
      }

      // Trigger website switcher refresh
      window.dispatchEvent(new CustomEvent('websiteListChanged'))

      alert('Website deleted successfully!')
    } catch (error) {
      alert('Failed to delete website')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="whitelabel">White Label</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={accountData.name}
                    onChange={(e) =>
                      setAccountData({ ...accountData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) =>
                      setAccountData({ ...accountData, email: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleUpdateProfile} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={accountData.currentPassword}
                    onChange={(e) =>
                      setAccountData({
                        ...accountData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={accountData.newPassword}
                    onChange={(e) =>
                      setAccountData({ ...accountData, newPassword: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={accountData.confirmPassword}
                    onChange={(e) =>
                      setAccountData({
                        ...accountData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <Button onClick={handleChangePassword} disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Websites Tab */}
        <TabsContent value="websites">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Your Websites</h2>
                <p className="text-sm text-muted-foreground">
                  Manage websites for content creation
                </p>
              </div>
              <Button onClick={() => setShowAddWebsite(true)}>
                + Add Website
              </Button>
            </div>

            {showAddWebsite && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium mb-3">Add New Website</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="websiteUrl">Website URL *</Label>
                    <Input
                      id="websiteUrl"
                      placeholder="https://example.com"
                      value={newWebsite.url}
                      onChange={(e) =>
                        setNewWebsite({ ...newWebsite, url: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="websiteName">Website Name (Optional)</Label>
                    <Input
                      id="websiteName"
                      placeholder="My Blog"
                      value={newWebsite.name}
                      onChange={(e) =>
                        setNewWebsite({ ...newWebsite, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddWebsite} disabled={loading}>
                      {loading ? 'Adding...' : 'Add Website'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddWebsite(false)
                        setNewWebsite({ url: '', name: '' })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {websites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No websites added yet.</p>
                  <p className="text-sm">Add your first website to get started!</p>
                </div>
              ) : (
                websites.map((website) => (
                  <div
                    key={website.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {website.name || 'Unnamed Website'}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {website.url}
                          </p>
                        </div>
                      </div>
                      {website.platform && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {website.platform}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWebsite(website.id)}
                      disabled={loading}
                      className="flex-shrink-0 ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Subscription & Billing</h2>

            {subscription ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-lg">
                      {subscription.plan || 'Starter'} Plan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${subscription.price || '29'}/month
                    </p>
                  </div>
                  <Badge className="bg-green-200 text-green-800">Active</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Billing Period
                    </p>
                    <p className="font-medium">Monthly</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Next Billing Date
                    </p>
                    <p className="font-medium">
                      {subscription.renewsAt
                        ? new Date(subscription.renewsAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Posts Generated
                    </p>
                    <p className="font-medium">
                      {subscription.usage || 0} / {subscription.limit || 30}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Websites
                    </p>
                    <p className="font-medium">
                      {subscription.websites || 0} /{' '}
                      {subscription.websiteLimit || 1}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleOpenBillingPortal}>
                    Manage Billing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    disabled={loading}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No active subscription
                </p>
                <Button onClick={() => (window.location.href = '/pricing')}>
                  View Plans
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Content Preferences</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="defaultWordCount">Default Word Count</Label>
                <Select
                  id="defaultWordCount"
                  value={preferences.defaultWordCount}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      defaultWordCount: e.target.value,
                    })
                  }
                >
                  <option value="600">600 words</option>
                  <option value="800">800 words</option>
                  <option value="1200">1200 words</option>
                  <option value="1500">1500 words</option>
                  <option value="2000">2000 words</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="defaultTone">Default Tone</Label>
                <Select
                  id="defaultTone"
                  value={preferences.defaultTone}
                  onChange={(e) =>
                    setPreferences({ ...preferences, defaultTone: e.target.value })
                  }
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="conversational">Conversational</option>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-publish Posts</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish posts after generation
                  </p>
                </div>
                <Switch
                  checked={preferences.autoPublish}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, autoPublish: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email when posts are published
                  </p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Get weekly performance reports
                  </p>
                </div>
                <Switch
                  checked={preferences.weeklyReports}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, weeklyReports: checked })
                  }
                />
              </div>

              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <p className="text-muted-foreground mb-6">
              Invite team members to collaborate on content
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="email@example.com" />
                <Button>Invite</Button>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <p>No team members yet. Invite your first team member above.</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* White Label Tab */}
        <TabsContent value="whitelabel">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">White Label Settings</h2>
            <p className="text-muted-foreground mb-6">
              Customize the branding for your clients
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Your Company Name" />
              </div>

              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" placeholder="https://example.com/logo.png" />
              </div>

              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input id="primaryColor" type="color" defaultValue="#3b82f6" />
              </div>

              <Button>Save White Label Settings</Button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ White label features are available on Agency plan only
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Access</h2>
            <p className="text-muted-foreground mb-6">
              Generate and manage API keys for programmatic access
            </p>

            <div className="space-y-4">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value="sk_live_•••••••••••••••••••••••••"
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Keep your API key secret. Don't share it publicly.
                </p>
              </div>

              <Button variant="outline">Generate New Key</Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm font-semibold mb-2">API Documentation</p>
              <p className="text-sm text-muted-foreground">
                View our API docs to learn how to integrate ContentFlow AI
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                View API Docs
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
