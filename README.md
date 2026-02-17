# Unified Career Platform

A unified platform that integrates three independent career development applications using a **wrapper architecture** with Git submodules. **No original code is modified.**

## 🎯 Overview

This platform provides a single interface to access:
1. **KodNest Careers** - Job tracking and notification system
2. **Placement Readiness Platform** - JD analysis and readiness scoring
3. **AI Resume Builder** - ATS-optimized resume creation

## ✨ Key Features

- ✅ **No Code Modification** - Original repositories remain completely unchanged
- ✅ **Git Submodules** - Each app maintains its own repository
- ✅ **Unified Navigation** - Consistent sidebar and header across all modules
- ✅ **Independent Operation** - Each module runs independently
- ✅ **Easy Updates** - Pull latest changes from original repos
- ✅ **Vercel Ready** - Optimized for deployment

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   Unified Platform (Next.js Wrapper)    │
│  ┌───────────────────────────────────┐  │
│  │  Navigation Shell                 │  │
│  │  • Sidebar                        │  │
│  │  • Header                         │  │
│  │  • Routing                        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│     Git Submodules (Original Apps)      │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │ Careers  │ │Readiness │ │ Resume  │ │
│  │(Unchanged)│(Unchanged)│(Unchanged)│ │
│  └──────────┘ └──────────┘ └─────────┘ │
└─────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Git
- Access to your GitHub repositories

### Setup (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Add your repositories as submodules
git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers
git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness
git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder

# 3. Initialize submodules
git submodule update --init --recursive

# 4. Run the platform
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Automated Setup

```bash
chmod +x setup.sh
./setup.sh
```

## 📁 Project Structure

```
unified-career-platform/
├── modules/                    # Git submodules (your original apps)
│   ├── kodnest-careers/       # Submodule 1 (unchanged)
│   ├── placement-readiness/   # Submodule 2 (unchanged)
│   └── ai-resume-builder/     # Submodule 3 (unchanged)
├── src/                        # Wrapper platform code
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Dashboard home
│   │   ├── careers/           # Careers module wrapper
│   │   ├── readiness/         # Readiness module wrapper
│   │   └── resume/            # Resume module wrapper
│   └── components/
│       ├── layout/            # Sidebar, Header
│       └── wrappers/          # Module wrapper components
├── scripts/                    # Setup scripts
└── Documentation files
```

## 🔄 How It Works

### 1. Git Submodules

Each application is added as a Git submodule, creating a reference to the original repository without copying code.

### 2. Module Wrapper

The `ModuleWrapper` component:
- Checks if module exists
- Loads module (iframe or component)
- Provides setup instructions if needed
- Maintains complete module independence

### 3. Unified Navigation

Consistent sidebar provides:
- Dashboard home
- Links to all three modules
- Easy module switching
- Professional user experience

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | This file - overview and quick start |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | Complete integration guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment instructions |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Comprehensive project summary |
| [STATUS.md](STATUS.md) | Current project status |

## 🔧 Development

### Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint

# Module Management
git submodule update --remote              # Update all modules
git submodule update --remote <module>     # Update specific module
```

### Update a Module

```bash
cd modules/kodnest-careers
git pull origin main
cd ../..
git add modules/kodnest-careers
git commit -m "Update careers module"
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Configure build command:
   ```bash
   git submodule update --init --recursive && npm run build
   ```
4. Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Docker

```bash
docker build -t unified-career-platform .
docker run -p 3000:3000 unified-career-platform
```

## 🎨 Customization

### Update Branding

Edit `src/components/layout/Sidebar.tsx`:
```typescript
<h1 className="text-xl font-bold text-blue-600">Your Brand</h1>
```

### Modify Colors

Edit `src/app/globals.css` to change the color scheme.

### Add More Modules

```bash
git submodule add <repo-url> modules/<module-name>
```

Then create a wrapper page in `src/app/<module-name>/page.tsx`.

## 🔒 Constraints Satisfied

✅ **No Code Modification** - Original repositories unchanged  
✅ **Wrapper Architecture** - Platform provides shell only  
✅ **Independent Modules** - Each app runs separately  
✅ **Git Submodules** - Proper version control  
✅ **Unified Navigation** - Consistent UI  
✅ **Vercel Compatible** - Ready for deployment  
✅ **Scalable** - Easy to add more modules  
✅ **Maintainable** - Clean separation of concerns  

## 📊 Benefits

### For Development
- No code conflicts between modules
- Independent development workflows
- Easy to update individual modules
- Clean version control

### For Users
- Single platform for all tools
- Consistent navigation
- Seamless user experience
- Professional interface

### For Deployment
- Vercel-optimized
- Docker-ready
- CI/CD friendly
- Easy to scale

## 🆘 Troubleshooting

### Submodules Not Loading

```bash
git submodule update --init --recursive
```

### Module Not Found

1. Verify submodule is added: `git submodule status`
2. Check module path in wrapper component
3. Ensure module is built (if required)

### Port Already in Use

```bash
npm run dev -- -p 3001
```

See [SETUP.md](SETUP.md) for more troubleshooting tips.

## 📝 License

Each module retains its original license. The wrapper platform code is provided as-is.

## 🤝 Contributing

To update a module:
1. Make changes in the original repository
2. Update the submodule reference in this project
3. Test the integration
4. Deploy

## 📞 Support

For issues:
1. Check documentation files
2. Review error messages
3. Verify submodule setup
4. Check module builds

## ✅ Status

- **Platform**: ✅ Complete and ready
- **Dependencies**: ✅ Installed (385 packages)
- **Documentation**: ✅ Comprehensive
- **Deployment Config**: ✅ Ready
- **Action Required**: Add your repositories as submodules

## 🎯 Next Steps

1. **Add Submodules** (see Quick Start above)
2. **Run Platform** (`npm run dev`)
3. **Test Integration** (verify all modules load)
4. **Deploy** (follow DEPLOYMENT.md)

---

**Created**: February 2026  
**Version**: 1.0.0  
**Architecture**: Wrapper + Git Submodules  
**Status**: ✅ Ready for Integration  

**Start now**: Run the commands in Quick Start section above! 🚀
