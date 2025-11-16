'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { websiteAPI } from '@/lib/api'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)

  const handleWebsiteSubmit = async () => {
    setLoading(true)
    try {
      const response = await websiteAPI.create({ url: website, platform: 'wordpress' })
      await websiteAPI.scan(response.data.id)
      setStep(2)
    } catch (error) {
      alert('Failed to scan website')
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="p-8 w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to ContentFlow AI!</h1>
          <p className="text-muted-foreground">Let's get you set up in 2 minutes</p>
          <Progress value={(step / 2) * 100} className="mt-4" />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="website">Enter Your Website URL</Label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
              />
              <p className="text-sm text-muted-foreground mt-2">
                We'll scan your website to understand your business
              </p>
            </div>

            <Button onClick={handleWebsiteSubmit} disabled={loading || !website}>
              {loading ? 'Scanning website...' : 'Continue'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
              ✓ Website scanned successfully!
            </div>

            <div>
              <h3 className="font-semibold mb-2">What we learned about your business:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Business type identified</li>
                <li>• Content style analyzed</li>
                <li>• 20+ blog topic suggestions generated</li>
                <li>• 30+ relevant keywords identified</li>
              </ul>
            </div>

            <Button onClick={handleFinish} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
