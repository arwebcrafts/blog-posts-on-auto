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
    // In production, proxy API requests to the backend server
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendUrl}/health`,
      },
    ];
  },
}

module.exports = nextConfig
