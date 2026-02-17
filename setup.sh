#!/bin/bash

echo "🚀 Setting up Unified Career Platform..."

# Install main dependencies
echo "📦 Installing dependencies..."
npm install

# Add submodules
echo "📥 Adding submodules..."
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers 2>/dev/null || echo "✓ kodnest-careers already exists"
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness 2>/dev/null || echo "✓ placement-readiness already exists"
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder 2>/dev/null || echo "✓ ai-resume-builder already exists"

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

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Navigate to each module to verify integration"
