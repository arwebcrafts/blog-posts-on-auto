# Railway Deployment Guide

## 🚂 Deploying ContentFlow AI to Railway

This guide explains how to deploy your ContentFlow AI application to Railway with automatic database migrations.

## ✅ What's Already Configured

I've updated the project to automatically handle database migrations on Railway:

1. **✅ `nixpacks.toml`** - Updated to run `prisma migrate deploy` on startup
2. **✅ `Procfile`** - Configured with release and web processes  
3. **✅ `backend/package.json`** - Added `start:migrate` and `postbuild` scripts
4. **✅ `backend/prisma/schema.prisma`** - Set to use PostgreSQL (Railway's default)

## 🔧 How It Works

### Build Process
```bash
1. npm install --legacy-peer-deps
2. cd backend && npx prisma generate
3. cd frontend && npm run build
4. cd backend && npm run build (includes postbuild: prisma generate)
```

### Deployment Process
```bash
1. cd backend && npx prisma migrate deploy  # Runs all pending migrations
2. Start backend server on port 5000
3. Start frontend server on port 8080
```

## 📦 Railway Setup - Environment Variables

### Required Variables
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
OPENAI_API_KEY=sk-your-actual-openai-key
DATABASE_URL=postgresql://...  (automatically set by Railway PostgreSQL)
```

### Recommended Variables
```env
FRONTEND_URL=https://your-app.railway.app
API_URL=https://your-app.railway.app
CORS_ORIGIN=https://your-app.railway.app
```

## 🗄️ Database Migrations

### How It Works
- **First Deploy**: `prisma migrate deploy` creates all tables from migrations
- **Future Deploys**: Only pending migrations are applied
- **No Data Loss**: Existing data is preserved

### Creating New Migrations
```bash
# 1. Update schema.prisma locally
# 2. Create migration
cd backend
npx prisma migrate dev --name your_migration_name

# 3. Commit and push
git add prisma/migrations
git commit -m "feat: add new fields"
git push

# 4. Railway automatically applies the migration on next deploy
```

## 🚨 First Deployment - Create Initial Migration

Before deploying to Railway for the first time, create an initial migration:

```bash
cd backend
npx prisma migrate dev --name init
git add prisma/migrations
git commit -m "feat: add initial database migration"
git push
```

This creates the migration files that Railway will use to set up the database.

## 🎯 Deployment Checklist

- [ ] PostgreSQL database added in Railway
- [ ] Initial migration created (`prisma migrate dev --name init`)
- [ ] Migration files committed to git
- [ ] Environment variables set (JWT_SECRET, OPENAI_API_KEY, etc.)
- [ ] Push to trigger deployment

## 📊 Expected Deployment Flow

```
1. Push code to GitHub
   ↓
2. Railway builds application
   ↓
3. Prisma client generated
   ↓
4. Database migrations applied (prisma migrate deploy)
   ↓
5. Servers start
   ↓
6. ✅ Application live!
```

---

**Your app is now configured for automatic database migrations on Railway!** 🚀
