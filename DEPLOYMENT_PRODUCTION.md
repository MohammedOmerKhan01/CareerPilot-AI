# CareerPilot AI - Production Deployment Guide

## Overview

This guide explains how to deploy the CareerPilot AI unified platform to Vercel, integrating your three deployed applications.

## Prerequisites

- All three applications already deployed on Vercel:
  - KodNest Careers
  - Placement Readiness Platform
  - AI Resume Builder
- Vercel account
- GitHub repository for this unified platform

## Step 1: Get Your Deployed URLs

First, get the production URLs for each of your deployed applications:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find each project and copy its production URL
3. URLs will look like:
   - `https://kodnest-careers-xxx.vercel.app`
   - `https://placement-readiness-xxx.vercel.app`
   - `https://ai-resume-builder-xxx.vercel.app`

## Step 2: Configure Environment Variables Locally

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_CAREERS_URL=https://your-kodnest-careers.vercel.app
NEXT_PUBLIC_READINESS_URL=https://your-placement-readiness.vercel.app
NEXT_PUBLIC_RESUME_URL=https://your-ai-resume-builder.vercel.app
```

Replace with your actual Vercel URLs.

## Step 3: Test Locally

```bash
npm install
npm run dev
```

Open http://localhost:3001 and verify:
- ✅ All three modules load correctly
- ✅ Navigation works
- ✅ All routes and assets load properly
- ✅ No console errors

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Configure CareerPilot AI with deployed URLs"
git push origin main
```

## Step 5: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable:
     ```
     NEXT_PUBLIC_CAREERS_URL = https://your-kodnest-careers.vercel.app
     NEXT_PUBLIC_READINESS_URL = https://your-placement-readiness.vercel.app
     NEXT_PUBLIC_RESUME_URL = https://your-ai-resume-builder.vercel.app
     ```
   - Make sure to add them for all environments (Production, Preview, Development)

6. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_CAREERS_URL
vercel env add NEXT_PUBLIC_READINESS_URL
vercel env add NEXT_PUBLIC_RESUME_URL

# Deploy to production
vercel --prod
```

## Step 6: Verify Deployment

After deployment:

1. Visit your CareerPilot AI URL (e.g., `https://careerpilot-ai.vercel.app`)
2. Test each module:
   - ✅ KodNest Careers loads and functions correctly
   - ✅ Placement Readiness loads and functions correctly
   - ✅ AI Resume Builder loads and functions correctly
3. Test navigation between modules
4. Test all routes within each module
5. Verify assets load correctly

## Important Notes

### CORS and iframe Considerations

If you encounter issues with modules not loading in iframes:

1. **Check X-Frame-Options**: Your deployed apps should allow iframe embedding
2. **Update Headers**: In each app's `vercel.json` or `next.config.js`, ensure:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "ALLOWALL"
           }
         ]
       }
     ]
   }
   ```

### Alternative: Open in New Tab

If iframe embedding is restricted, users can click "Open in New Tab" button to access modules directly.

## Troubleshooting

### Module Not Loading

**Problem**: Module shows configuration screen  
**Solution**: Verify environment variables are set correctly in Vercel dashboard

### CORS Errors

**Problem**: Console shows CORS errors  
**Solution**: Update X-Frame-Options in the source application's deployment

### Assets Not Loading

**Problem**: Images or styles missing  
**Solution**: Ensure the deployed apps use absolute URLs or proper base paths

### Routing Issues

**Problem**: Routes don't work within modules  
**Solution**: This is handled by the deployed apps themselves - no changes needed in CareerPilot AI

## Updating Modules

When you update one of your source applications:

1. Deploy the update to that application's Vercel project
2. CareerPilot AI will automatically load the updated version (no redeployment needed)
3. Users may need to refresh their browser to see changes

## Custom Domain (Optional)

To use a custom domain:

1. Go to your CareerPilot AI project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `careerpilot.ai`)
4. Follow Vercel's DNS configuration instructions

## Monitoring

Monitor your deployment:

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Check Vercel logs for errors
3. **Performance**: Monitor loading times

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to Git
2. **HTTPS**: All URLs should use HTTPS
3. **Content Security Policy**: Configure if needed
4. **Rate Limiting**: Consider adding if needed

## Support

For issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test each module's deployed URL directly
4. Check browser console for errors

## Success Checklist

Before going live:

- [ ] All three modules deployed to Vercel
- [ ] Environment variables configured
- [ ] CareerPilot AI deployed successfully
- [ ] All modules load correctly
- [ ] Navigation works smoothly
- [ ] All routes accessible
- [ ] Assets load properly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable

---

**Deployment Status**: Ready for Production  
**Platform**: Vercel  
**Framework**: Next.js 14  
**Integration Method**: iframe with deployed URLs  
