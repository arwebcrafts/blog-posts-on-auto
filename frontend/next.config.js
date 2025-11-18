/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'replicate.delivery', 'api.contentflow.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  async rewrites() {
    // In production on Railway, both frontend and backend run in same container
    // Always proxy to localhost:5000 where backend is running
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
      {
        source: '/health',
        destination: 'http://localhost:5000/health',
      },
    ];
  },
}

module.exports = nextConfig
