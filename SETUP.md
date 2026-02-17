# Setup Guide

Quick start guide to get the unified platform running.

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account access to your repositories

## Quick Setup

### 1. Clone the Platform

```bash
git clone <your-unified-platform-repo>
cd unified-career-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Your Modules

```bash
# Add all three modules as submodules
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder

# Initialize submodules
git submodule update --init --recursive
```

### 4. Build Modules (Optional)

If your modules need building:

```bash
# Build each module
cd modules/kodnest-careers && npm install && npm run build && cd ../..
cd modules/placement-readiness && npm install && npm run build && cd ../..
cd modules/ai-resume-builder && npm install && npm run build && cd ../..
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Automated Setup Script

Create `setup.sh`:

```bash
#!/bin/bash

echo "🚀 Setting up Unified Career Platform..."

# Install main dependencies
echo "📦 Installing dependencies..."
npm install

# Add submodules
echo "📥 Adding submodules..."
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers 2>/dev/null || echo "kodnest-careers already exists"
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness 2>/dev/null || echo "placement-readiness already exists"
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder 2>/dev/null || echo "ai-resume-builder already exists"

# Initialize submodules
echo "🔄 Initializing submodules..."
git submodule update --init --recursive

# Build modules
echo "🔨 Building modules..."
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

echo "✅ Setup complete!"
echo "Run 'npm run dev' to start the development server"
```

Make it executable:

```bash
chmod +x setup.sh
./setup.sh
```

## Verification

After setup, verify:

1. **Dependencies Installed**:
```bash
ls node_modules
```

2. **Submodules Added**:
```bash
git submodule status
```

3. **Modules Present**:
```bash
ls modules/
```

4. **Server Runs**:
```bash
npm run dev
```

## Troubleshooting

### Submodule Already Exists

```bash
git submodule deinit -f modules/[module-name]
rm -rf .git/modules/modules/[module-name]
git rm -f modules/[module-name]
# Then add again
```

### Permission Denied

```bash
chmod +x setup.sh
```

### Module Build Fails

```bash
cd modules/[module-name]
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

## Next Steps

1. **Customize**: Update branding and colors
2. **Configure**: Set up environment variables
3. **Test**: Verify all modules load correctly
4. **Deploy**: Follow DEPLOYMENT.md

## Project Structure

After setup:

```
unified-career-platform/
├── modules/                    # Your original apps (submodules)
│   ├── kodnest-careers/
│   ├── placement-readiness/
│   └── ai-resume-builder/
├── src/                        # Wrapper platform code
│   ├── app/                    # Next.js pages
│   └── components/             # Shared components
├── scripts/                    # Setup scripts
└── package.json
```

## Development Workflow

1. **Start Server**: `npm run dev`
2. **Make Changes**: Edit wrapper code in `src/`
3. **Update Modules**: Pull changes in `modules/`
4. **Test**: Verify in browser
5. **Commit**: Push changes

## Support

For setup issues:
- Check error messages
- Review logs
- Verify Git access to repositories
- Ensure Node.js version is 18+
