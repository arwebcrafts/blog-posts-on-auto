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
import { authAPI, stripeAPI } from '@/lib/api'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  const [user, setUser] = useState<any>(null)
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
  }, [])

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
