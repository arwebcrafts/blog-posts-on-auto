# Railway Deployment Guide

## Prerequisites
1. PostgreSQL database (add from Railway marketplace)
2. Redis instance (add from Railway marketplace)

## Environment Variables

Add these environment variables to your Railway service:

### Required:
```
DATABASE_URL=<your-postgresql-url-from-railway>
REDIS_URL=<your-redis-url-from-railway>
JWT_SECRET=<generate-a-random-secret-key>
NODE_ENV=production
```

### Optional (for full functionality):
```
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI (for content generation)
OPENAI_API_KEY=sk-...

# Replicate (for image generation)
REPLICATE_API_KEY=r8_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Deployment Steps

1. **Add PostgreSQL** to your project from Railway marketplace
2. **Add Redis** to your project from Railway marketplace  
3. **Add your GitHub repository** as a new service
4. **Set environment variables** in Railway dashboard:
   - Copy `DATABASE_URL` from your PostgreSQL service
   - Copy `REDIS_URL` from your Redis service
   - Add `JWT_SECRET` (generate a strong random string)
   - Add `NODE_ENV=production`
5. **Deploy** - Railway will automatically build and deploy

## Post-Deployment

After successful deployment:

1. **Run database migrations:**
   - Railway will automatically run `prisma generate` during build
   - Migrations should run automatically on first deployment

2. **Access your app:**
   - Frontend: Railway will provide a public URL
   - Backend API: Same URL with /api endpoints

## Troubleshooting

### Build fails:
- Check build logs in Railway dashboard
- Ensure all dependencies are installed
- Verify TypeScript compiles without errors

### App doesn't start:
- Check environment variables are set correctly
- Verify DATABASE_URL is accessible
- Check logs for specific error messages

### Frontend shows blank page:
- Check browser console for errors
- Verify NEXT_PUBLIC_API_URL points to your Railway domain
- Ensure CORS_ORIGIN in backend matches your frontend URL
