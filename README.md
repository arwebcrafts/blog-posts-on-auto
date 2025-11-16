# ContentFlow AI - Full Stack SaaS Platform

**AI-Powered SEO Blog Post Generator**

ContentFlow AI is a complete SaaS platform that automatically generates, schedules, and publishes SEO-optimized blog posts to any website using advanced AI technology.

**Developed by:** [ARWebCrafts.com](https://arwebcrafts.com)

---

## 🚀 Features

### Core Features
- ✅ **Full Website Scanning** - Crawls entire websites to understand business context
- ✅ **Knowledge Base Training** - Upload documents and train AI on your business
- ✅ **AI Content Generation** - GPT-4o-mini powered blog post creation
- ✅ **AI Image Generation** - Stable Diffusion 3.5 for featured images
- ✅ **SEO Scoring** - Real-time SEO analysis with actionable recommendations
- ✅ **Keyword Research** - ValueSERP integration for SERP analysis
- ✅ **Backlink Analysis** - DataForSEO integration for link tracking
- ✅ **Scheduled Publishing** - BullMQ queue system for automated posting
- ✅ **Multi-Platform Publishing** - WordPress, Shopify, Wix, Blogger, Custom sites
- ✅ **Bulk Post Creation** - Generate multiple posts at once
- ✅ **AI Chat Agent** - Conversational AI for content strategy
- ✅ **7-Day Free Trial** - Stripe integration with trial period

### Platform Integrations
- **WordPress** - Custom plugin (see `/docs/wordpress-plugin/`)
- **Shopify** - Admin API integration
- **Wix** - Wix Blog API integration
- **Blogger** - Google Blogger API
- **Custom Sites** - JavaScript SDK + REST API

---

## 📁 Project Structure

```
blog-posts-on-auto/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── controllers/        # API controllers
│   │   ├── services/           # Business logic
│   │   │   ├── websiteScanner.service.ts
│   │   │   ├── aiAnalysis.service.ts
│   │   │   ├── imageGeneration.service.ts
│   │   │   ├── keywordResearch.service.ts
│   │   │   ├── backlinkAnalysis.service.ts
│   │   │   ├── seoScoring.service.ts
│   │   │   ├── stripe.service.ts
│   │   │   ├── integration.service.ts
│   │   │   ├── queue.service.ts
│   │   │   └── workers.ts
│   │   ├── middleware/         # Auth, error handling, rate limiting
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration files
│   │   └── index.ts            # Server entry point
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── public/
│   │   └── sdk.js              # JavaScript SDK for custom sites
│   ├── .env.example            # Environment variables template
│   └── package.json
│
├── frontend/                   # Next.js 14 application
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   └── lib/                # Utilities and helpers
│   ├── .env.example
│   └── package.json
│
├── docs/                       # Documentation
│   ├── wordpress-plugin/       # WordPress plugin specs
│   └── api/                    # API documentation
│
└── README.md                   # This file
```

---

## 🛠 Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Caching:** Redis
- **Queue:** BullMQ (job scheduling)
- **Authentication:** JWT tokens

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 + TailwindCSS + shadcn/ui
- **State:** Zustand
- **Forms:** React Hook Form + Zod

### AI & APIs
- **Content Generation:** OpenAI GPT-4o-mini
- **Image Generation:** Replicate Stable Diffusion 3.5
- **SERP Analysis:** ValueSERP API
- **Backlink Data:** DataForSEO API
- **Payments:** Stripe

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway / Render
- **File Storage:** AWS S3 / Cloudflare R2
- **Email:** SendGrid / Amazon SES

---

## 📋 Prerequisites

Before setting up the project, ensure you have:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Redis** 6+ ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/))

### Required API Keys

You'll need to sign up for these services and obtain API keys:

1. **OpenAI** - [Get API Key](https://platform.openai.com/api-keys)
2. **Replicate** - [Get API Token](https://replicate.com/account/api-tokens)
3. **ValueSERP** - [Get API Key](https://www.valueserp.com/signup)
4. **DataForSEO** - [Get Credentials](https://app.dataforseo.com/api-access)
5. **Stripe** - [Get API Keys](https://dashboard.stripe.com/apikeys)
6. **AWS S3** or **Cloudflare R2** - For file storage
7. **SendGrid** or **Amazon SES** - For email

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blog-posts-on-auto
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Using psql
createdb contentflow_ai

# Or using PostgreSQL client
psql -U postgres
CREATE DATABASE contentflow_ai;
\q
```

### 4. Set Up Redis

Start Redis server:

```bash
# On macOS (via Homebrew)
brew services start redis

# On Linux
sudo systemctl start redis

# On Windows
# Download and install from: https://github.com/microsoftarchive/redis/releases
redis-server
```

### 5. Configure Environment Variables

#### Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and fill in your API keys:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/contentflow_ai?schema=public"

# Server
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
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
DATAFORSEO_LOGIN=your_login
DATAFORSEO_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@contentflow.ai

# AWS S3
AWS_S3_ACCESS_KEY_ID=your_access_key
AWS_S3_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=contentflow-ai-uploads
AWS_S3_REGION=us-east-1
```

#### Frontend Environment

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### 6. Initialize Database with Prisma

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 7. Set Up Stripe Products & Prices

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create 3 products with recurring prices:
   - **Starter Plan:** $29/month
   - **Professional Plan:** $49/month
   - **Agency Plan:** $99/month
3. Copy the Price IDs and add them to your `backend/.env`:
   ```env
   STRIPE_PRICE_STARTER=price_xxxxxxxxxxxxx
   STRIPE_PRICE_PROFESSIONAL=price_xxxxxxxxxxxxx
   STRIPE_PRICE_AGENCY=price_xxxxxxxxxxxxx
   ```

### 8. Start the Development Servers

```bash
# From the root directory
npm run dev

# This will start both:
# - Backend API: http://localhost:5000
# - Frontend: http://localhost:3000
```

Alternatively, run them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 9. Verify Installation

- **Backend API:** http://localhost:5000/health
- **Frontend:** http://localhost:3000

You should see:
- Backend: `{"status":"ok","timestamp":"...","environment":"development"}`
- Frontend: Landing page

---

## 🚢 Production Deployment

### Backend Deployment (Railway/Render)

#### Option 1: Railway

1. Create account at [Railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL database
4. Add Redis database
5. Deploy backend:
   ```bash
   railway login
   railway init
   railway up
   ```
6. Add environment variables in Railway dashboard
7. Note your deployment URL (e.g., `https://your-app.railway.app`)

#### Option 2: Render

1. Create account at [Render.com](https://render.com)
2. Create PostgreSQL database
3. Create Redis instance
4. Create Web Service:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
5. Add environment variables
6. Deploy

### Frontend Deployment (Vercel)

1. Create account at [Vercel.com](https://vercel.com)
2. Import repository
3. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Install Command: `npm install`
4. Add environment variables
5. Deploy

### Set Up Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-api-url.com/api/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret and update `STRIPE_WEBHOOK_SECRET`

---

## 📖 API Documentation

### Authentication

All API endpoints (except public ones) require JWT authentication:

```
Authorization: Bearer <your-jwt-token>
```

Get token by logging in:
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

### Core Endpoints

#### Website Scanning
```bash
POST /api/websites
{
  "url": "https://example.com",
  "platform": "wordpress"
}
```

#### Generate Blog Post
```bash
POST /api/posts/generate
{
  "websiteId": "xxx",
  "title": "Blog Post Title",
  "keyword": "SEO keyword",
  "wordCount": 2000,
  "tone": "professional",
  "generateImage": true
}
```

#### Schedule Post
```bash
POST /api/posts/:id/schedule
{
  "scheduledAt": "2025-11-20T10:00:00Z",
  "platform": "wordpress"
}
```

Full API documentation: `/docs/api/`

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 🔒 Security

- All API endpoints use JWT authentication
- Rate limiting on all routes (100 req/15min)
- Input validation with Zod
- SQL injection prevention via Prisma
- XSS protection with helmet.js
- CORS properly configured
- Stripe webhooks verified with signatures

---

## 📝 License

MIT License - See LICENSE file for details

---

## 💡 Support

For issues or questions:
- **Email:** support@contentflow.ai
- **Documentation:** https://docs.contentflow.ai
- **GitHub Issues:** [Create an issue](repository-url/issues)

---

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md first.

---

## 🙏 Credits

- **AI:** OpenAI GPT-4o-mini, Replicate Stable Diffusion
- **APIs:** ValueSERP, DataForSEO
- **Framework:** Next.js, Express.js
- **UI:** shadcn/ui, TailwindCSS
- **Database:** PostgreSQL, Prisma
- **Queue:** BullMQ

---

**Built with ❤️ by ARWebCrafts.com**
