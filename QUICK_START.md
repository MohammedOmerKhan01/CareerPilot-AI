# CareerPilot AI - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your Vercel URLs

Find your deployed application URLs from Vercel Dashboard:

1. KodNest Careers: `https://your-app.vercel.app`
2. Placement Readiness: `https://your-app.vercel.app`
3. AI Resume Builder: `https://your-app.vercel.app`

### Step 2: Configure Environment

Create `.env.local` file:

```bash
NEXT_PUBLIC_CAREERS_URL=https://your-kodnest-careers.vercel.app
NEXT_PUBLIC_READINESS_URL=https://your-placement-readiness.vercel.app
NEXT_PUBLIC_RESUME_URL=https://your-ai-resume-builder.vercel.app
```

### Step 3: Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3001

### Step 4: Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial CareerPilot AI setup"
git push origin main

# Deploy via Vercel Dashboard
# 1. Import GitHub repo
# 2. Add environment variables
# 3. Deploy
```

## ✅ That's It!

Your unified platform is ready. All three applications load from their deployed URLs with:
- ✅ Original UI/UX preserved
- ✅ All routes working
- ✅ All assets loading correctly
- ✅ No code modifications needed

## 📚 More Information

- [Full Deployment Guide](DEPLOYMENT_PRODUCTION.md)
- [Troubleshooting](DEPLOYMENT_PRODUCTION.md#troubleshooting)
- [Custom Domain Setup](DEPLOYMENT_PRODUCTION.md#custom-domain-optional)
