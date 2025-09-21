# Development Setup Guide

## 🎯 Project Overview

Indivio is a modern Next.js application with a well-organized, scalable structure designed for maintainability and developer experience.

## 📁 Directory Structure

### Root Level Organization

```
├── config/              # 🔧 All configuration files
├── docs/                # 📚 Project documentation
├── public/              # 🌐 Static assets (images, icons)
├── scripts/             # ⚙️ Custom build and sync scripts
├── src/                 # 💻 Source code
├── .env.example         # 📝 Environment template
└── README.md            # 📖 Project overview
```

### Configuration Files (`/config`)

- `components.json` - Shadcn/UI components configuration
- `firebase.json` - Firebase project settings
- `next-sitemap.config.js` - Sitemap generation settings

### Documentation (`/docs`)

- `DEVELOPER.md` - Development guidelines and standards
- `FIRESTORE_BRIDGE.md` - Firebase integration documentation
- `SCRIPTS.md` - Custom scripts documentation

### Source Code (`/src`)

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── ui/             # Base UI components (buttons, inputs)
│   ├── icons/          # SVG icon components
│   └── [feature]/      # Feature-specific components
├── data/               # Static data and content
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

### 1. Environment Setup

```bash
# Copy the environment template
cp .env.example .env.local

# Edit with your actual values
code .env.local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

## 🔒 Security Best Practices

### Environment Variables

- ✅ Use `.env.example` as a template
- ✅ Keep secrets in `.env.local` (never commit)
- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables only
- ❌ Never commit real API keys or secrets

### Git Security

- The `.gitignore` is configured to exclude:
  - `node_modules/`
  - `.env*` files (except `.env.example`)
  - Build outputs (`.next/`, `dist/`)
  - IDE and OS files
  - Firebase keys and sensitive configs

## 🛠 Development Workflow

### Code Organization

1. **Components**: Place in appropriate feature folders
2. **Types**: Define in `/src/types/` for reusability
3. **Utilities**: Add to `/src/lib/` for shared functions
4. **Documentation**: Update relevant files in `/docs/`

### Git Workflow

```bash
# Quick development cycle
npm run push  # Adds, commits with "update", and pushes

# Proper workflow
git add .
git commit -m "descriptive message"
git push origin feature-branch
```

## 📊 Build and Deployment

### Build Commands

```bash
npm run build    # Production build with Turbopack
npm run start    # Start production server
npm run lint     # Check code quality
```

### Performance Features

- **Turbopack**: Faster builds and hot reloading
- **App Router**: Optimized routing and layouts
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first styling

## 🔧 Configuration Notes

### Next.js Configuration

- Uses TypeScript configuration (`next.config.ts`)
- Sitemap auto-generation after build
- Optimized for production deployments

### Firebase Integration

- Configuration moved to `/config/firebase.json`
- Firestore for data management
- Authentication for user management

## 📈 Performance Monitoring

### Key Metrics to Watch

- Build time improvements with Turbopack
- Bundle size optimization
- Core Web Vitals scores
- Firebase query performance

## 🤝 Contributing Guidelines

1. **Follow the established structure**
2. **Update documentation** when adding features
3. **Use TypeScript** for all new code
4. **Test locally** before committing
5. **Follow naming conventions** in existing code

## 🆘 Troubleshooting

### Common Issues

- **Build failures**: Check config paths after restructuring
- **Environment variables**: Ensure `.env.local` exists and is properly formatted
- **Import errors**: Update paths if files were moved during restructuring

### Getting Help

- Check documentation in `/docs/`
- Review existing code patterns
- Contact the development team

---

_This structure is designed to grow with your project while maintaining clarity and organization._
