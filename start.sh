#!/bin/bash
set -e

echo "🚀 Starting ContentFlow AI..."

# Navigate to backend and sync database schema
echo "📦 Syncing database schema..."
cd backend
npx prisma db push --accept-data-loss --skip-generate

# Start backend server in background
echo "🔧 Starting backend server..."
cd ..
BACKEND_PORT=5000 npm run start:backend &

# Wait for backend to be ready
echo "⏳ Waiting for backend to start..."
sleep 5

# Start frontend server
echo "🎨 Starting frontend server..."
PORT=8080 npm run start:frontend
