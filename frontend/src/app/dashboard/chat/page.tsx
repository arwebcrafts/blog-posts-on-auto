'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatAPI } from '@/lib/api'

export default function AIChatPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadSessions()
  }, [])

  useEffect(() => {
    if (currentSession) {
      loadMessages(currentSession)
    }
  }, [currentSession])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadSessions = async () => {
    try {
      const response = await chatAPI.getSessions()
      setSessions(response.data)
      if (response.data.length > 0 && !currentSession) {
        setCurrentSession(response.data[0].id)
      }
    } catch (error) {
      console.error('Failed to load sessions:', error)
    }
  }

  const loadMessages = async (sessionId: string) => {
    try {
      const response = await chatAPI.getMessages(sessionId)
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages([...messages, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await chatAPI.sendMessage(currentSession, userMessage)

      setMessages((prev) => [...prev, response.data])

      // If this was a new session, update the current session ID
      if (!currentSession && response.data.sessionId) {
        setCurrentSession(response.data.sessionId)
        await loadSessions() // Refresh session list
      }
    } catch (error: any) {
      console.error('Chat error:', error)
      alert(error.response?.data?.error || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleNewSession = () => {
    setCurrentSession(null)
    setMessages([])
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Sidebar - Chat Sessions */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <Button size="sm" onClick={handleNewSession}>
              New Chat
            </Button>
          </div>

          <div className="space-y-2">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={`p-3 cursor-pointer transition-colors ${
                  currentSession === session.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentSession(session.id)}
              >
                <p className="font-medium text-sm truncate">
                  {session.title || 'New Chat'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}

            {sessions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No chat history yet
              </p>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="col-span-9 flex flex-col">
          <Card className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Ask questions about your content, SEO, keywords, and more
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ask me anything about your content strategy
                  </p>
                  <div className="grid gap-3 max-w-2xl mx-auto">
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() =>
                        setInput('What topics should I write about next?')
                      }
                    >
                      <div className="text-left">
                        <div className="font-semibold">
                          What topics should I write about?
                        </div>
                        <div className="text-xs opacity-70">
                          Get content suggestions based on your website
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() =>
                        setInput('How can I improve my SEO score?')
                      }
                    >
                      <div className="text-left">
                        <div className="font-semibold">
                          How can I improve my SEO?
                        </div>
                        <div className="text-xs opacity-70">
                          Get personalized SEO recommendations
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() =>
                        setInput('Suggest keywords for my niche')
                      }
                    >
                      <div className="text-left">
                        <div className="font-semibold">
                          Suggest keywords for my niche
                        </div>
                        <div className="text-xs opacity-70">
                          Discover high-value keyword opportunities
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="resize-none"
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()}>
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
