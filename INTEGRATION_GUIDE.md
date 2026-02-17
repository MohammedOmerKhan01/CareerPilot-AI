# Integration Guide

This guide explains how to integrate your existing applications into the unified platform.

## Architecture Overview

The platform uses a **wrapper architecture** with Git submodules:

```
Unified Platform (Next.js)
├── Wrapper Shell (Navigation + Layout)
└── Modules (Git Submodules)
    ├── KodNest Careers (Original Code)
    ├── Placement Readiness (Original Code)
    └── AI Resume Builder (Original Code)
```

## Key Principles

1. **No Code Modification**: Original repositories remain unchanged
2. **Git Submodules**: Each app is a separate Git submodule
3. **Wrapper Integration**: Platform provides navigation and layout
4. **Independent Operation**: Each module runs independently

## Setup Steps

### 1. Initialize the Platform

```bash
# Clone the unified platform
git clone <unified-platform-repo>
cd unified-career-platform

# Install dependencies
npm install
```

### 2. Add Modules as Submodules

```bash
# Add KodNest Careers
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers

# Add Placement Readiness
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness

# Add AI Resume Builder
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder

# Initialize and update submodules
git submodule update --init --recursive
```

### 3. Build Each Module

```bash
# Build KodNest Careers
cd modules/kodnest-careers
npm install
npm run build
cd ../..

# Build Placement Readiness
cd modules/placement-readiness
npm install
npm run build
cd ../..

# Build AI Resume Builder
cd modules/ai-resume-builder
npm install
npm run build
cd ../..
```

### 4. Configure Module Paths

Update `next.config.mjs` if needed to serve module assets:

```javascript
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/modules/:path*',
        destination: '/modules/:path*',
      },
    ];
  },
};
```

### 5. Run the Platform

```bash
npm run dev
```

Open http://localhost:3000

## Module Integration Methods

### Method 1: IFrame Integration (Current)

Each module loads in an iframe, maintaining complete isolation:

```typescript
<iframe
  src={`/modules/${modulePath}/index.html`}
  className="w-full h-full"
  title={moduleName}
/>
```

**Pros**:
- Complete isolation
- No code changes needed
- Easy to implement

**Cons**:
- Limited communication between modules
- Separate contexts

### Method 2: Component Integration (Advanced)

For tighter integration, import modules as React components:

```typescript
// In module wrapper
import { CareersApp } from '../../../modules/kodnest-careers/src/App';

export function CareersWrapper() {
  return (
    <div className="module-container">
      <CareersApp />
    </div>
  );
}
```

**Requirements**:
- Modules must export their main component
- Shared dependencies must be compatible
- May require minor module adjustments

### Method 3: Micro-Frontend (Production)

Use Module Federation for production:

```javascript
// webpack.config.js in each module
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'careersModule',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
    }),
  ],
};
```

## Updating Modules

### Update a Single Module

```bash
cd modules/kodnest-careers
git pull origin main
cd ../..
git add modules/kodnest-careers
git commit -m "Update kodnest-careers module"
```

### Update All Modules

```bash
git submodule update --remote --merge
git add modules/
git commit -m "Update all modules"
```

## Module Communication

### Shared State (Optional)

If modules need to share state:

```typescript
// src/lib/shared-state.ts
export const sharedState = {
  user: null,
  theme: 'light',
};

// Pass to modules via postMessage
window.postMessage({ type: 'USER_UPDATE', user }, '*');
```

### Event Bus (Optional)

```typescript
// src/lib/event-bus.ts
export class EventBus {
  private listeners = new Map();

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event: string, data: any) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach((cb: Function) => cb(data));
  }
}
```

## Deployment

### Vercel Deployment

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial unified platform"
git push origin main
```

2. **Configure Vercel**:
   - Connect repository
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install && git submodule update --init --recursive`

3. **Environment Variables**:
   Add any required environment variables in Vercel dashboard

4. **Deploy**:
   Vercel will automatically deploy on push

### Build Script for Deployment

Create `scripts/build-all.sh`:

```bash
#!/bin/bash

echo "Building unified platform..."

# Update submodules
git submodule update --init --recursive

# Build each module
for module in modules/*; do
  if [ -d "$module" ]; then
    echo "Building $module..."
    cd "$module"
    npm install
    npm run build
    cd ../..
  fi
done

# Build main platform
npm run build

echo "Build complete!"
```

Make it executable:
```bash
chmod +x scripts/build-all.sh
```

## Troubleshooting

### Submodule Not Found

```bash
git submodule update --init --recursive
```

### Module Build Fails

```bash
cd modules/[module-name]
rm -rf node_modules
npm install
npm run build
```

### Module Not Loading

1. Check if module is built
2. Verify path in wrapper component
3. Check browser console for errors
4. Ensure module exports are correct

### CORS Issues

If using iframe integration, ensure modules are served from same origin or configure CORS:

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/modules/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};
```

## Best Practices

1. **Keep Modules Independent**: Don't create dependencies between modules
2. **Version Control**: Tag module versions for stability
3. **Documentation**: Document any module-specific setup
4. **Testing**: Test each module independently
5. **Updates**: Regularly update submodules
6. **Backup**: Keep original repositories as source of truth

## Module Development Workflow

1. **Develop in Original Repo**: Make changes in the original repository
2. **Test Standalone**: Ensure module works independently
3. **Update Submodule**: Pull latest changes into unified platform
4. **Test Integration**: Verify module works in unified platform
5. **Deploy**: Push changes to production

## Support

For issues:
1. Check module's original repository
2. Review integration documentation
3. Check browser console for errors
4. Verify submodule is up to date
