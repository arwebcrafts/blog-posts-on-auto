'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { postAPI } from '@/lib/api'

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week'>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await postAPI.list()
      setPosts(response.data.filter((p: any) => p.scheduledFor))
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getPostsForDate = (date: Date | null) => {
    if (!date) return []
    return posts.filter((post) => {
      const postDate = new Date(post.scheduledFor)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  if (loading) {
    return <div>Loading calendar...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your scheduled posts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            onClick={() => setView('month')}
            size="sm"
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            onClick={() => setView('week')}
            size="sm"
          >
            Week
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={previousMonth}>
            ← Previous
          </Button>
          <h2 className="text-xl font-semibold">{monthName}</h2>
          <Button variant="ghost" onClick={nextMonth}>
            Next →
          </Button>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-sm py-2">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {getDaysInMonth().map((date, index) => {
            const dayPosts = getPostsForDate(date)
            const isToday =
              date &&
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={index}
                className={`min-h-24 p-2 border rounded-lg ${
                  !date ? 'bg-gray-50' : isToday ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                {date && (
                  <>
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-blue-700' : ''
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className="text-xs p-1 bg-green-100 text-green-800 rounded truncate"
                          title={post.title}
                        >
                          {post.title}
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming Posts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Scheduled Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No scheduled posts. Schedule posts from the Create Post page.
          </p>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, 10).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for{' '}
                    {new Date(post.scheduledFor).toLocaleDateString('default', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
