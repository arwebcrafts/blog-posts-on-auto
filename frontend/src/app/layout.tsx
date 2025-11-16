import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ContentFlow AI - AI-Powered SEO Blog Post Generator',
  description: 'Automatically generate, schedule, and publish SEO-optimized blog posts to any website using advanced AI technology.',
  keywords: 'AI, SEO, blog, content generation, WordPress, Shopify, automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
