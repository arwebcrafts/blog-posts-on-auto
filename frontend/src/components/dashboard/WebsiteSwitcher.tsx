'use client'

import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { websiteAPI } from '@/lib/api'

interface Website {
  id: string
  name: string | null
  url: string
}

export default function WebsiteSwitcher() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWebsites()

    // Listen for website list changes
    const handleWebsiteListChange = () => {
      loadWebsites()
    }

    window.addEventListener('websiteListChanged', handleWebsiteListChange)

    return () => {
      window.removeEventListener('websiteListChanged', handleWebsiteListChange)
    }
  }, [])

  const loadWebsites = async () => {
    try {
      setLoading(true)
      const response = await websiteAPI.list()
      const websiteList = response.data

      setWebsites(websiteList)

      // Get stored website ID or use first website
      const storedWebsiteId = localStorage.getItem('selectedWebsiteId')
      let selected = null

      if (storedWebsiteId) {
        selected = websiteList.find((w: Website) => w.id === storedWebsiteId)
      }

      if (!selected && websiteList.length > 0) {
        selected = websiteList[0]
      }

      if (selected) {
        setSelectedWebsite(selected)
        localStorage.setItem('selectedWebsiteId', selected.id)
      }
    } catch (error) {
      console.error('Failed to load websites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectWebsite = (website: Website) => {
    setSelectedWebsite(website)
    localStorage.setItem('selectedWebsiteId', website.id)

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('websiteChanged', { detail: website }))
  }

  const handleAddWebsite = () => {
    // Redirect to settings to add a new website
    window.location.href = '/dashboard/settings'
  }

  if (loading) {
    return (
      <div className="px-3 py-2 text-sm text-gray-500">
        Loading...
      </div>
    )
  }

  if (websites.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddWebsite}
        className="text-sm"
      >
        + Add Website
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 max-w-[250px]"
        >
          <svg
            className="w-4 h-4 text-gray-500 flex-shrink-0"
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
          <span className="truncate text-sm">
            {selectedWebsite?.name || selectedWebsite?.url || 'Select Website'}
          </span>
          <svg
            className="w-4 h-4 text-gray-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Switch Website</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {websites.map((website) => (
          <DropdownMenuItem
            key={website.id}
            onClick={() => handleSelectWebsite(website)}
            className={`cursor-pointer ${
              selectedWebsite?.id === website.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                {selectedWebsite?.id === website.id && (
                  <svg
                    className="w-4 h-4 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium truncate">
                  {website.name || 'Unnamed Website'}
                </span>
              </div>
              <span className="text-xs text-gray-500 truncate ml-6">
                {website.url}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAddWebsite} className="cursor-pointer">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Website
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
