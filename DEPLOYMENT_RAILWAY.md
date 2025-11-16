# ContentFlow AI - Railway Deployment Guide

**Complete deployment guide for deploying the entire ContentFlow AI stack on Railway**

---

## 🚂 Railway Deployment - Everything in One Platform

Railway will host:
- ✅ **Backend API** (Express.js + Node.js)
- ✅ **Frontend** (Next.js 14)
- ✅ **PostgreSQL Database**
- ✅ **Redis** (for BullMQ job queue)

---

## Prerequisites

1. **Railway Account** - Sign up at [railway.app](https://railway.app)
2. **GitHub Repository** - Your code pushed to GitHub
3. **API Keys** - All required API keys ready (see below)

---

## Step 1: Create New Railway Project

1. Go to [railway.app/new](https://railway.app/new)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your `blog-posts-on-auto` repository

---

## Step 2: Add PostgreSQL Database

1. In your Railway project dashboard
2. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
3. Railway automatically creates the database
4. The `DATABASE_URL` environment variable is auto-generated

---

## Step 3: Add Redis

1. Click **"+ New"** → **"Database"** → **"Add Redis"**
2. Railway creates Redis instance
3. The `REDIS_URL` environment variable is auto-generated

---

## Step 4: Deploy Backend

### 4.1 Create Backend Service

1. Click **"+ New"** → **"GitHub Repo"** → Select your repo
2. Railway will detect it's a monorepo
3. Click **"Add Service"**
4. Name it: `contentflow-backend`

### 4.2 Configure Backend Build

In the backend service settings:

**Root Directory:** `backend`

**Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
npm start
```

**Watch Paths:** `backend/**`

### 4.3 Add Backend Environment Variables

Go to **Variables** tab and add:

```bash
# Node Environment
NODE_ENV=production
PORT=5000

# Database (auto-filled by Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Redis (auto-filled by Railway)
REDIS_URL=${{Redis.REDIS_URL}}
REDIS_HOST=${{Redis.REDIS_HOST}}
REDIS_PORT=${{Redis.REDIS_PORT}}

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend URL (will be filled after frontend deploy)
FRONTEND_URL=https://your-frontend.railway.app
CORS_ORIGIN=https://your-frontend.railway.app

# API URL (Railway provides this)
API_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_STARTER=price_starter_id
STRIPE_PRICE_PROFESSIONAL=price_professional_id
STRIPE_PRICE_AGENCY=price_agency_id

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Replicate
REPLICATE_API_TOKEN=r8_your_replicate_token

# ValueSERP
VALUESERP_API_KEY=your_valueserp_key

# DataForSEO
DATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@contentflow.ai

# AWS S3 (or Cloudflare R2)
AWS_S3_ACCESS_KEY_ID=your_access_key
AWS_S3_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=contentflow-ai-uploads
AWS_S3_REGION=us-east-1

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4.4 Run Database Migrations

1. Go to backend service
2. Click **"Deployments"** tab
3. After first deploy, go to **"Settings"** → **"Deploy"**
4. Add a **one-time migration script**:
   ```bash
   npx prisma migrate deploy
   ```
5. Or run manually in Railway CLI:
   ```bash
   railway run npx prisma migrate deploy
   ```

---

## Step 5: Deploy Frontend

### 5.1 Create Frontend Service

1. Click **"+ New"** → **"GitHub Repo"** → Select same repo
2. Name it: `contentflow-frontend`

### 5.2 Configure Frontend Build

**Root Directory:** `frontend`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Watch Paths:** `frontend/**`

### 5.3 Add Frontend Environment Variables

```bash
# API URL (from backend service)
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# NextAuth
NEXTAUTH_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
NEXTAUTH_SECRET=your-nextauth-secret-change-this

# Stripe (public key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Step 6: Configure Custom Domains (Optional)

### Backend Domain

1. Go to backend service → **Settings** → **Domains**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Recommended: `api.contentflow.ai`

### Frontend Domain

1. Go to frontend service → **Settings** → **Domains**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Recommended: `contentflow.ai` or `app.contentflow.ai`

---

## Step 7: Set Up Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://your-backend.railway.app/api/stripe/webhook`
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy webhook signing secret
6. Add to backend environment variables as `STRIPE_WEBHOOK_SECRET`

---

## Step 8: Create Stripe Products

1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Create 3 products:

**Product 1: Starter Plan**
- Name: ContentFlow AI - Starter
- Price: $29/month (recurring)
- Copy Price ID → `STRIPE_PRICE_STARTER`

**Product 2: Professional Plan**
- Name: ContentFlow AI - Professional
- Price: $49/month (recurring)
- Copy Price ID → `STRIPE_PRICE_PROFESSIONAL`

**Product 3: Agency Plan**
- Name: ContentFlow AI - Agency
- Price: $99/month (recurring)
- Copy Price ID → `STRIPE_PRICE_AGENCY`

3. Add all 3 Price IDs to backend environment variables

---

## Step 9: Start Worker Processes

The backend workers process background jobs. Railway auto-starts them with the main server.

**Verify workers are running:**
1. Check backend logs
2. Look for:
   ```
   ✅ Post {id} published successfully
   ✅ Website {id} scanned successfully
   ```

---

## Step 10: Test the Deployment

### Test Backend API

```bash
curl https://your-backend.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-16T...",
  "environment": "production"
}
```

### Test Frontend

Visit: `https://your-frontend.railway.app`

You should see the homepage loading.

### Test Sign Up Flow

1. Go to `/signup`
2. Create account
3. Enter payment details (use Stripe test card: `4242 4242 4242 4242`)
4. Complete onboarding
5. Verify user created in database

---

## Environment Variables Summary

### Required for Backend (27 variables)

| Variable | Where to Get |
|----------|--------------|
| `DATABASE_URL` | Auto-filled by Railway |
| `REDIS_URL` | Auto-filled by Railway |
| `JWT_SECRET` | Generate random string |
| `STRIPE_SECRET_KEY` | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhooks |
| `STRIPE_PRICE_*` | Stripe Products (3 IDs) |
| `OPENAI_API_KEY` | OpenAI Platform |
| `REPLICATE_API_TOKEN` | Replicate |
| `VALUESERP_API_KEY` | ValueSERP |
| `DATAFORSEO_LOGIN` | DataForSEO |
| `DATAFORSEO_PASSWORD` | DataForSEO |
| `SENDGRID_API_KEY` | SendGrid |
| `AWS_S3_*` | AWS Console (3 vars) |

### Required for Frontend (4 variables)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Backend Railway URL |
| `NEXTAUTH_SECRET` | Generate random string |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard |
| `NEXTAUTH_URL` | Frontend Railway URL |

---

## Monitoring & Logs

### View Logs

1. Go to service (backend or frontend)
2. Click **"Deployments"** tab
3. Click on latest deployment
4. View real-time logs

### Common Issues

**Database connection failed:**
- Check `DATABASE_URL` is set correctly
- Run `npx prisma migrate deploy`

**Redis connection failed:**
- Check `REDIS_URL` is set
- Verify Redis service is running

**API calls failing:**
- Check CORS settings (`CORS_ORIGIN`)
- Verify `FRONTEND_URL` matches actual frontend URL

**Stripe webhooks not working:**
- Verify webhook endpoint URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard

---

## Costs Estimate (Railway)

| Service | Monthly Cost |
|---------|--------------|
| Backend (Hobby) | $5 |
| Frontend (Hobby) | $5 |
| PostgreSQL | $5 |
| Redis | $5 |
| **Total Railway** | **$20/mo** |

**+ External APIs:** ~$190-695/mo (see PROJECT_STATUS.md)

**Total Operating Cost:** ~$210-715/mo

---

## Scaling on Railway

### Hobby Plan → Pro Plan

When you hit ~100 users:

1. Upgrade to **Pro Plan** ($20/service/mo)
2. Benefits:
   - More CPU/RAM
   - Better uptime SLA
   - Priority support
   - Custom domains included

### Horizontal Scaling

For 1000+ users:

1. **Backend:** Add more instances (load balancing)
2. **Database:** Upgrade to larger PostgreSQL plan
3. **Redis:** Upgrade for more memory
4. **Workers:** Separate worker processes

---

## Backup & Recovery

### Database Backups

Railway automatically backs up PostgreSQL daily.

**Manual backup:**
```bash
railway run pg_dump $DATABASE_URL > backup.sql
```

**Restore:**
```bash
railway run psql $DATABASE_URL < backup.sql
```

### Environment Variables Backup

1. Go to each service → **Variables**
2. Click **"Download as .env"**
3. Store securely (1Password, etc.)

---

## Security Checklist

- [ ] All API keys are in environment variables (not code)
- [ ] `JWT_SECRET` is strong random string
- [ ] `NEXTAUTH_SECRET` is strong random string
- [ ] Stripe webhook secret is configured
- [ ] CORS is set to frontend URL only
- [ ] Rate limiting is enabled (default: 100 req/15min)
- [ ] Database backups are enabled
- [ ] SSL/HTTPS is enabled (auto by Railway)

---

## Going Live Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and loading
- [ ] Database migrated successfully
- [ ] Redis connected
- [ ] All environment variables set
- [ ] Stripe webhooks configured
- [ ] Stripe products created
- [ ] Test signup flow works
- [ ] Test creating a post works
- [ ] Test Stripe trial billing works
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

---

## Support

**Railway Issues:**
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Railway Docs: [docs.railway.app](https://docs.railway.app)

**ContentFlow AI Issues:**
- Check logs in Railway dashboard
- Review `README.md` and `PROJECT_STATUS.md`
- Ensure all API keys are valid

---

**You're ready to deploy! 🚀**

Follow these steps in order and your ContentFlow AI platform will be live in ~30 minutes.
