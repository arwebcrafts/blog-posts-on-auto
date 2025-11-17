# Railway Deployment Guide for ContentFlow AI

## Architecture

This is a monorepo with:
- **Frontend**: Next.js 14 (runs on port 3000 in production)
- **Backend**: Express.js API (runs on port 5000 in production)
- **Database**: PostgreSQL
- **Cache**: Redis

Both frontend and backend run concurrently in a single Railway service.

## Prerequisites

Before deploying, add these services from Railway marketplace:
1. **PostgreSQL** - For database
2. **Redis** - For caching and job queues

## Environment Variables

### Required Variables:

```bash
# Database (copy from your PostgreSQL service)
DATABASE_URL=postgresql://user:password@host:port/database

# Redis (copy from your Redis service)
REDIS_URL=redis://host:port

# Security
JWT_SECRET=<generate-a-strong-random-secret-minimum-32-characters>
NODE_ENV=production

# CORS (set to your Railway frontend URL)
CORS_ORIGIN=https://your-app.up.railway.app

# Frontend API URL (set to your Railway backend URL)
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

### Optional (for full features):

```bash
# OpenAI (for AI content generation)
OPENAI_API_KEY=sk-proj-...

# Replicate (for AI image generation)  
REPLICATE_API_KEY=r8_...

# Stripe (for payment processing)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SEO APIs (optional)
VALUESERP_API_KEY=your_key
DATAFORSEO_LOGIN=your_login
DATAFORSEO_PASSWORD=your_password
```

## Deployment Steps

### 1. Connect GitHub Repository

1. Go to Railway dashboard
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `blog-posts-on-auto` repository
4. Railway will automatically detect the configuration

### 2. Add Database Services

1. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Click **"+ New"** → **"Database"** → **"Add Redis"**
3. Wait for both services to initialize

### 3. Configure Environment Variables

1. Go to your main service (the one running the app)
2. Click **"Variables"** tab
3. Add all required environment variables listed above
4. Important: Copy `DATABASE_URL` and `REDIS_URL` from their respective services

### 4. Deploy

1. Railway will automatically trigger a deployment
2. The build process will:
   - Install all dependencies
   - Generate Prisma client
   - Build frontend (Next.js)
   - Build backend (TypeScript → JavaScript)
3. Both frontend and backend will start together

### 5. Verify Deployment

Check these endpoints after deployment:
- **Frontend**: `https://your-app.up.railway.app`
- **Backend Health**: `https://your-app.up.railway.app/api/health`
- **Backend API**: `https://your-app.up.railway.app/api/...`

## Build Configuration

The deployment uses `nixpacks.toml` which:
1. Installs Node.js 18 and npm
2. Installs all workspace dependencies
3. Generates Prisma client
4. Builds frontend and backend separately
5. Starts both services concurrently

## Troubleshooting

### Build Fails

**Error: "Prisma client not generated"**
- Solution: The `nixpacks.toml` handles this automatically
- If still failing, check that `DATABASE_URL` is set before build

**Error: "TypeScript compilation failed"**
- Solution: Pull latest code with all build fixes
- Check build logs for specific TypeScript errors

**Error: "Module not found"**
- Solution: Make sure all dependencies are in package.json
- Try adding `--legacy-peer-deps` flag if peer dependency conflicts exist

### Runtime Errors

**Error: "Cannot connect to database"**
- Check `DATABASE_URL` environment variable is set correctly
- Ensure PostgreSQL service is running
- Verify database credentials

**Error: "Redis connection failed"**
- Check `REDIS_URL` environment variable
- Ensure Redis service is running

**Frontend shows blank page**
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check that backend is running (visit `/api/health`)

**CORS errors**
- Ensure `CORS_ORIGIN` in backend matches your frontend URL
- Format: `https://your-app.up.railway.app` (no trailing slash)

### Logs

View logs in Railway dashboard:
1. Click on your service
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. View **Build Logs** and **Deploy Logs**

## Post-Deployment

### Database Migrations

If you need to run migrations:
1. Go to Railway dashboard → Your service → Settings
2. Add a deploy command: `cd backend && npx prisma migrate deploy`
3. Or run migrations manually using Railway CLI

### Scaling

Railway automatically handles:
- Auto-scaling based on traffic
- Zero-downtime deployments
- Health checks and auto-restarts

### Monitoring

Monitor your application:
- Railway dashboard shows metrics (CPU, Memory, Network)
- Check logs for errors
- Set up error tracking (e.g., Sentry) for production

## Local Development

To run locally matching Railway environment:

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Generate Prisma client
cd backend && npx prisma generate && cd ..

# Run migrations
cd backend && npx prisma migrate dev && cd ..

# Start both services
npm run dev
```

## Support

- **Railway Documentation**: https://docs.railway.app
- **Deployment Issues**: Check build/deploy logs in Railway dashboard
- **Application Issues**: Check application logs and browser console
