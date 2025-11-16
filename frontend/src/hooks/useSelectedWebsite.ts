'use client'

import { useState, useEffect } from 'react'
import { websiteAPI } from '@/lib/api'

interface Website {
  id: string
  name: string | null
  url: string
  platform?: string | null
}

export function useSelectedWebsite() {
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSelectedWebsite()

    // Listen for website changes
    const handleWebsiteChange = (event: CustomEvent) => {
      setSelectedWebsite(event.detail)
    }

    window.addEventListener('websiteChanged', handleWebsiteChange as EventListener)

    return () => {
      window.removeEventListener('websiteChanged', handleWebsiteChange as EventListener)
    }
  }, [])

  const loadSelectedWebsite = async () => {
    try {
      setLoading(true)
      const storedWebsiteId = localStorage.getItem('selectedWebsiteId')

      if (storedWebsiteId) {
        // Try to get the specific website
        try {
          const response = await websiteAPI.get(storedWebsiteId)
          setSelectedWebsite(response.data)
          setLoading(false)
          return
        } catch (error) {
          // If that fails, fall back to getting all websites
          console.error('Failed to load stored website:', error)
        }
      }

      // Load all websites and select the first one
      const response = await websiteAPI.list()
      const websites = response.data

      if (websites.length > 0) {
        const website = websites[0]
        setSelectedWebsite(website)
        localStorage.setItem('selectedWebsiteId', website.id)
      }
    } catch (error) {
      console.error('Failed to load selected website:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshWebsite = () => {
    loadSelectedWebsite()
  }

  return {
    selectedWebsite,
    loading,
    refreshWebsite,
  }
}
