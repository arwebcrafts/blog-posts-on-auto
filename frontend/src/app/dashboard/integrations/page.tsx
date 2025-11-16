'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { integrationAPI } from '@/lib/api'

const platformConfigs = {
  wordpress: {
    name: 'WordPress',
    icon: '📝',
    description: 'Connect your WordPress website',
    fields: [
      { name: 'url', label: 'WordPress URL', type: 'url' },
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'applicationPassword', label: 'Application Password', type: 'password' },
    ],
  },
  shopify: {
    name: 'Shopify',
    icon: '🛍️',
    description: 'Connect your Shopify store blog',
    fields: [
      { name: 'shopUrl', label: 'Shop URL', type: 'url' },
      { name: 'accessToken', label: 'Access Token', type: 'password' },
    ],
  },
  wix: {
    name: 'Wix',
    icon: '🌐',
    description: 'Connect your Wix website',
    fields: [
      { name: 'siteId', label: 'Site ID', type: 'text' },
      { name: 'apiKey', label: 'API Key', type: 'password' },
    ],
  },
  blogger: {
    name: 'Blogger',
    icon: '📰',
    description: 'Connect your Blogger blog',
    fields: [
      { name: 'blogId', label: 'Blog ID', type: 'text' },
      { name: 'apiKey', label: 'API Key', type: 'password' },
    ],
  },
  custom: {
    name: 'Custom Website',
    icon: '⚙️',
    description: 'Connect via webhook or API',
    fields: [
      { name: 'webhookUrl', label: 'Webhook URL', type: 'url' },
      { name: 'apiKey', label: 'API Key (optional)', type: 'password' },
    ],
  },
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      const response = await integrationAPI.list()
      setIntegrations(response.data)
    } catch (error) {
      console.error('Failed to load integrations:', error)
    }
  }

  const handleOpenDialog = (platform: string) => {
    setSelectedPlatform(platform)
    setFormData({})
    setShowAddDialog(true)
  }

  const handleConnect = async () => {
    if (!selectedPlatform) return

    setLoading(true)
    try {
      await integrationAPI.connect({
        websiteId: 'default', // In real app, get from website selection
        platform: selectedPlatform,
        credentials: formData,
      })
      await loadIntegrations()
      setShowAddDialog(false)
      alert('Integration connected successfully!')
    } catch (error) {
      alert('Failed to connect integration')
    } finally {
      setLoading(false)
    }
  }

  const handleTest = async (id: string) => {
    try {
      await integrationAPI.test(id)
      alert('Connection test successful!')
    } catch (error) {
      alert('Connection test failed')
    }
  }

  const handleDisconnect = async (id: string) => {
    if (!confirm('Disconnect this integration?')) return

    try {
      await integrationAPI.disconnect(id)
      await loadIntegrations()
      alert('Integration disconnected')
    } catch (error) {
      alert('Failed to disconnect integration')
    }
  }

  const connectedPlatforms = integrations.map((i) => i.platform)
  const availablePlatforms = Object.entries(platformConfigs).filter(
    ([key]) => !connectedPlatforms.includes(key)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your websites and publishing platforms
        </p>
      </div>

      {/* Connected Integrations */}
      {integrations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => {
              const config = platformConfigs[integration.platform as keyof typeof platformConfigs]
              return (
                <Card key={integration.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{config.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{config.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {integration.config?.url || integration.config?.shopUrl || 'Connected'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-green-200 text-green-800">
                            Active
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Connected{' '}
                            {new Date(integration.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTest(integration.id)}
                    >
                      Test Connection
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDisconnect(integration.id)}
                      className="text-red-600"
                    >
                      Disconnect
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Available Platforms */}
      {availablePlatforms.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Platforms</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availablePlatforms.map(([key, config]) => (
              <Card key={key} className="p-6">
                <div className="text-4xl mb-3">{config.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{config.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {config.description}
                </p>
                <Button
                  onClick={() => handleOpenDialog(key)}
                  className="w-full"
                  variant="outline"
                >
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Integration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Connect{' '}
              {selectedPlatform
                ? platformConfigs[selectedPlatform as keyof typeof platformConfigs].name
                : ''}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to connect this platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedPlatform &&
              platformConfigs[selectedPlatform as keyof typeof platformConfigs].fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                </div>
              ))}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={loading}>
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold mb-2">Need Help Setting Up?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Check out our integration guides for step-by-step instructions
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            WordPress Guide
          </Button>
          <Button variant="outline" size="sm">
            Shopify Guide
          </Button>
          <Button variant="outline" size="sm">
            View All Guides
          </Button>
        </div>
      </Card>
    </div>
  )
}
