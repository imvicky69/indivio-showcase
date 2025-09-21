# Indivio — EdTech Website & Management Portal

![Indivio banner](public/indivio.png)

A modern, responsive showcase application for Indivio — a school website and management portal. This repository contains the Next.js frontend (App Router) and client-side Firebase integration used for authentication and bookings.

---

## 🚀 Project Structure

```
├── config/              # Configuration files
│   ├── components.json   # Shadcn/UI components config
│   ├── firebase.json     # Firebase hosting/functions config
│   └── next-sitemap.config.js # Sitemap generation config
├── docs/                 # Documentation
│   ├── DEVELOPER.md      # Developer guidelines
│   ├── FIRESTORE_BRIDGE.md # Firestore integration docs
│   └── SCRIPTS.md        # Scripts documentation
├── public/              # Static assets
├── scripts/             # Custom build/sync scripts
├── src/                 # Source code
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── data/           # Static data files
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries
│   └── types/          # TypeScript type definitions
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Payments**: PhonePe Integration
- **Animations**: GSAP
- **Deployment**: Vercel/Firebase Hosting

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase project setup
- PhonePe merchant account (for payments)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd indivio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. **Run development server**

```bash
npm run dev
```

5. **Open in browser**
   Navigate to `http://localhost:3000`

---

## 📝 Environment Setup

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other variables
```

> ⚠️ **Never commit** `.env.local` or any file containing real secrets to version control.

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run push         # Quick git add, commit, and push
```

---

## 📁 Key Directories

### `/src/components`

- **UI components**: Reusable design system components
- **Page components**: Page-specific components organized by route
- **Icons**: Custom SVG icon components

### `/src/app`

- Next.js App Router pages and layouts
- API routes in `/api` subdirectory

### `/config`

- All configuration files moved from root
- Keeps root directory clean and organized

### `/docs`

- Comprehensive project documentation
- Developer guidelines and API documentation

---

## 🔥 Firebase Integration

This project uses Firebase for:

- **Firestore**: Data storage and real-time updates
- **Authentication**: User management
- **Hosting**: Static file deployment

Configuration files are located in `/config/firebase.json`.

---

## 💳 Payment Integration

PhonePe integration for seamless payment processing:

- IFrame mode for better UX
- Secure transaction handling
- Real-time payment status updates

---

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- [Developer Guide](docs/DEVELOPER.md)
- [Firestore Bridge](docs/FIRESTORE_BRIDGE.md)
- [Scripts Documentation](docs/SCRIPTS.md)

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass and code is properly linted
4. Submit a pull request

---

## 📄 License

This project is private and proprietary to Indivio.

---

## 🆘 Support

For development questions, refer to the documentation in `/docs` or contact the development team.

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_BACKEND_API_URL=https://us-central1-.../api/payment
```

Server-side keys (Cloud Functions / backend) should be stored in your cloud secret manager.

---

## Project structure (short)

- `src/app/` — Next pages & routing
- `src/components/` — UI components, split into `checkout`, `home`, `ui`, `imports`
- `src/lib/` — firebase init, plan helpers, centralized types (`types.ts`)
- `components.json` — shadcn UI config
- `DEVELOPER.md` — developer-oriented documentation

---

## Contribution & security notes

- This repo is private. When deploying public demos, ensure:
  - No secrets are committed
  - `NEXT_PUBLIC_` env vars are not sensitive credentials (only public keys)
  - Server-side secrets are stored in cloud provider secret manager
- Payment flow critical notes:
  - Backend must implement provider webhook (server-to-server) and verify signature
  - Treat webhook-updated order status as authoritative

---

## How to deploy

Deployment depends on your provider (Vercel, Netlify, or custom). General steps:

- Set environment variables in the hosting provider
- Build and publish using the standard Next.js build step
  - `npm run build` then `npm run start` or use provider's continuous deployment

---

## Troubleshooting

- If `Booking Failed` appears on the success page:
  - Confirm `NEXT_PUBLIC_BACKEND_API_URL` is set in the client environment and reachable
  - Check Firestore `orders` collection for payment status
  - Inspect network requests to `/status/:orderId`

- If GSAP animations don't run:
  - Ensure `gsap` is installed
  - Confirm components using DOM APIs are marked with `"use client"`

---

## Mantainer / Contact

If you're maintaining this repo, add your contact info here and note how you rotate secrets and monitoring for payment webhooks.

---

Thank you — create issues or reach out if you'd like me to generate component-level docs under `docs/` or add CI smoke tests.
