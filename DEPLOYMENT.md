# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account
- Vercel account
- All submodules added and committed

### Step 1: Prepare Repository

```bash
# Ensure all submodules are added
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder

# Commit everything
git add .
git commit -m "Add unified platform with submodules"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the unified-career-platform repository

### Step 3: Configure Build Settings

**Framework Preset**: Next.js

**Build Command**:
```bash
git submodule update --init --recursive && npm run build
```

**Output Directory**: `.next`

**Install Command**:
```bash
npm install
```

### Step 4: Environment Variables

Add any required environment variables:

```
NEXT_PUBLIC_API_URL=your-api-url
# Add module-specific variables as needed
```

### Step 5: Deploy

Click "Deploy" and wait for the build to complete.

## Alternative: Manual Build Script

Create `vercel-build.sh`:

```bash
#!/bin/bash
set -e

echo "Initializing submodules..."
git submodule update --init --recursive

echo "Installing dependencies..."
npm install

echo "Building modules..."
for module in modules/*; do
  if [ -d "$module" ] && [ -f "$module/package.json" ]; then
    echo "Building $module..."
    cd "$module"
    npm install
    if grep -q "\"build\"" package.json; then
      npm run build
    fi
    cd ../..
  fi
done

echo "Building main platform..."
npm run build

echo "Deployment build complete!"
```

Update `package.json`:

```json
{
  "scripts": {
    "vercel-build": "bash vercel-build.sh"
  }
}
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Initialize submodules
RUN apk add --no-cache git
RUN git submodule update --init --recursive

# Build modules
RUN for module in modules/*; do \
      if [ -d "$module" ] && [ -f "$module/package.json" ]; then \
        cd "$module" && npm install && npm run build && cd ../..; \
      fi \
    done

# Build main app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/modules ./modules

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build
docker build -t unified-career-platform .

# Run
docker run -p 3000:3000 unified-career-platform
```

## GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build modules
        run: |
          for module in modules/*; do
            if [ -d "$module" ] && [ -f "$module/package.json" ]; then
              cd "$module"
              npm install
              npm run build
              cd ../..
            fi
          done

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Check all navigation links
3. Verify each module loads correctly
4. Test module functionality

### Monitor

- Check Vercel dashboard for errors
- Monitor build logs
- Set up error tracking (Sentry, etc.)

### Update Modules

```bash
# Update submodules
git submodule update --remote

# Commit and push
git add modules/
git commit -m "Update modules"
git push origin main
```

Vercel will automatically redeploy.

## Troubleshooting

### Submodules Not Loading

Ensure build command includes:
```bash
git submodule update --init --recursive
```

### Module Build Fails

Check module's package.json for build script:
```json
{
  "scripts": {
    "build": "..."
  }
}
```

### Out of Memory

Increase Node memory in build command:
```bash
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

### CORS Issues

Configure headers in `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/modules/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

## Performance Optimization

1. **Enable Caching**: Configure Vercel caching
2. **Optimize Images**: Use Next.js Image component
3. **Code Splitting**: Lazy load modules
4. **CDN**: Use Vercel's global CDN

## Security

1. **Environment Variables**: Never commit secrets
2. **HTTPS**: Enabled by default on Vercel
3. **Security Headers**: Configure in next.config.mjs
4. **Dependencies**: Regularly update and audit

## Monitoring

Set up monitoring:
- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring

## Rollback

If deployment fails:

```bash
# Vercel CLI
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push origin main
```

## Support

For deployment issues:
1. Check Vercel build logs
2. Review module build outputs
3. Verify submodule initialization
4. Check environment variables
