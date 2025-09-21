# Indivio — Developer Guide

This document is a single-entry developer guide to the Indivio project. It explains the project's structure, key components, props/types, payment flow, backend endpoints, environment variables, and local development tasks.

> Keep this file up-to-date as the codebase evolves. Add pointers to new components, APIs, or infra changes.

---

## Table of Contents

- Project overview
- How to run locally
- Environment variables
- Folder structure
- Centralized types
- Important components (what they do and key props)
- Payment flow (frontend ↔ backend ↔ provider)
- Backend endpoints (what they expect and return)
- Debugging tips & common issues
- Contributing / coding conventions

---

## Project overview

This is a Next.js + TypeScript project that showcases Indivio — a website & management portal product. It uses:

- Next.js App Router (React 19)
- TypeScript
- Tailwind CSS
- Firebase (Firestore + Auth) on the client, Cloud Functions / Express on server
- GSAP for text and pixel animations

The app contains a checkout flow (wizard) that collects school details + account details and initiates payment using a payment gateway (PhonePe integration using an IFrame flow). After payment, the app verifies status with a backend endpoint and finalizes booking.

---

## How to run locally

1. Copy environment variables to `.env.local` (see "Environment variables" below).
2. Install dependencies:

```powershell
npm install
```

3. Start dev server:

```powershell
npm run dev
```

4. Open http://localhost:3000

---

## Environment variables

Create an `.env.local` file with the following keys (values depend on your Firebase & backend setup):

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_BACKEND_API_URL (e.g., https://us-central1-.../api/payment)

Keep secrets out of the repo. For server-side Cloud Functions, store credentials in your cloud provider secret manager.

---

## Folder structure (high level)

- `src/app/` — Next.js App Router pages and route handlers
- `src/components/` — Shared UI components
  - `components/checkout/` — checkout wizard steps & payment component
  - `components/home/` — landing page sections
  - `components/imports/` — shadcn/imported components (PixelTransition)
  - `components/ui/` — small UI primitives (Button, SplitText, etc.)
- `src/lib/` — utilities and centralized types
  - `src/lib/types.ts` — centralized types (Plan, BookingPayload, OrderStatusResponse, UI props)
  - `src/lib/firebase.ts` — firebase initialization (exports `db` and `auth`)
  - `src/lib/plans.ts` — plan fetching helpers
- `components.json` — shadcn config
- `DEVELOPER.md` — this document

---

## Centralized types

File: `src/lib/types.ts` — a single source of truth for commonly used interfaces:

- `Plan` — pricing plans
- `Offer` — discount offers
- `SchoolDetailsData` — step 2 form data
- `AccountDetailsData` — step 3 form data
- `BookingPayload` — combined booking data saved in sessionStorage as `indivioBookingData`
- `OrderStatusResponse` — response format from backend status endpoint
- `HeroImgProps`, `PixelTransitionProps`, `SplitTextProps` — UI props used by components

Why: Centralized types reduce duplication, improve autocompletion, and make cross-file refactors easier.

---

## Important components

Below are the key components you will likely edit when working on features:

- `src/components/checkout/CheckoutWizard.tsx`
  - Orchestrates checkout steps: Step1 Plan confirmation, Step2 School details, Step3 Create account, Step4 Payment
  - Important state shapes: `{ plan, schoolDetails, accountDetails }`

- `src/components/checkout/Step2_SchoolDetails.tsx`
  - Exports and re-uses `SchoolDetailsData` from `src/lib/types.ts`
  - Behavior: form fields, validation using `react-hook-form`

- `src/components/checkout/Step3_CreateAccount.tsx`
  - Uses Zod for validation; type aligned with `AccountDetailsData` (from `src/lib/types.ts`)

- `src/components/checkout/Step4_Payment.tsx`
  - Loads the provider's checkout script dynamically
  - Calls backend `/initiate` and uses PhonePeCheckout.transact({ tokenUrl, callback, type: 'IFRAME' })
  - Persists `indivioBookingData` and `indivioOrderId` to sessionStorage

- `src/app/success/page.tsx`
  - Reads `orderId` from query or sessionStorage
  - Calls `${NEXT_PUBLIC_BACKEND_API_URL}/status/${orderId}` to verify payment
  - Creates Firebase Auth user and saves booking to Firestore (falls back to saving booking even if auth fails)

- `src/components/imports/PixelTransition.tsx`
  - Client component using GSAP to animate a pixelated transition between two content nodes
  - Accepts `firstContent` and `secondContent` (both React nodes)

- `src/components/ui/SplitText.tsx`
  - Client component that uses GSAP SplitText for staggered text animations
  - Props: `text`, `delay`, `duration`, `splitType`, `tag`, `onLetterAnimationComplete`

- `src/components/home/HeroSection.tsx`
  - Uses `PixelTransition` and `SplitText` for the hero heading
  - Uses `HeroImgProps` (firstContent, secondContent)

---

## Payment flow (frontend ↔ backend ↔ provider)

1. Frontend POST to `/api/payment/initiate` with booking details
   - Backend should create an order record (status: PENDING) and call the provider's API to get a `checkoutUrl` and internal `orderId`.
2. Frontend receives `checkoutUrl` and `orderId` and opens the provider checkout in an IFrame (PhonePe). Also stores `indivioBookingData` and `indivioOrderId` in sessionStorage.
3. Provider completes payment and either redirects to `MERCHANT_REDIRECT_URL?orderId=...` or sends a server-to-server webhook to `/api/payment/callback`.
4. Backend webhook validates provider signature and updates the order in Firestore (status: SUCCESS/FAILED/COMPLETED).
5. Frontend `success` page calls `/api/payment/status/:orderId` to verify server-side status and finalize booking (create user + write booking doc).

Notes: For reliability, treat webhooks as authoritative and use `/status/:orderId` for final verification.

---

## Backend endpoints (what they expect)

- `POST /api/payment/initiate`
  - Body: `{ amount, userId?, ... }`
  - Returns: `{ success: true, checkoutUrl, orderId }`
  - Backend action: create order record with `merchantOrderId`, call provider's API, return redirect URL

- `GET /api/payment/status/:orderId`
  - Returns: `{ success: boolean, orderId, status, amount }`
  - Backend action: read order record from Firestore, optionally re-check provider status if PENDING

- `POST /api/payment/callback`
  - Provider webhook — validate signature, update order record

---

## Environment & infra notes

- Firebase is used on client. Server-side functions should use Admin SDK to access Firestore securely.
- Keep merchant credentials out of the frontend. Use environment variables and cloud provider secret management.

---

## Debugging tips & common issues

- If success page shows "Booking Failed":
  - Check that `NEXT_PUBLIC_BACKEND_API_URL` is set and reachable from the browser
  - Check Firestore `orders` doc for the `orderId` and `status`
  - Verify webhook logs — the provider may have failed to call your webhook
  - Look for `auth/configuration-not-found` — ensure firebase `auth` is initialized and `NEXT_PUBLIC_FIREBASE_...` env vars are set

- PixelTransition / GSAP animations not working:
  - Ensure components are client components (`"use client"`) when using DOM APIs or GSAP
  - Confirm `gsap` is installed and available in `package.json`

---

## Contributing / coding conventions

- Use `const` unless you need reassignment (prefer `const` for bindings)
- Keep components that use DOM/animation/GSAP as client components (add "use client" at top)
- Centralize shared types in `src/lib/types.ts` and import them across components
- Prefer `react-hook-form` + `zod` for validated forms
- Linting & formatting: `.vscode/settings.json` enables `prettier` + `eslint` auto-fix on save

---
