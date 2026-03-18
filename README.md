# Sole Syndicate

A premium sneaker e-commerce storefront built with Next.js 16 and React 19. The site puts a strong emphasis on visual quality — smooth animations, an interactive 3D hero, per-product image galleries, and a cart/checkout flow backed by real Stripe payments and Supabase auth.

This started as a personal project to build something that actually felt like a real luxury sneaker brand, not just another CRUD shop demo.

---

## Tech Stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| 3D | React Three Fiber + Drei |
| State | Zustand |
| Backend / Auth | Supabase |
| Payments | Stripe |

---

## Features

- **3D Hero** — interactive sneaker model rendered with React Three Fiber
- **Product gallery** — multi-angle image viewer per product with smooth transitions
- **Cart drawer** — slide-in cart with live item count, persistent via Zustand
- **Stripe checkout** — real payment flow via `/api/checkout` route handler
- **Supabase auth** — sign in / sign up on the `/authentication` page
- **Syndicate membership** — tiered membership pages (`/syndicate`, `/join/[tier]`)
- **Collections & Drops pages** — curated browsing views
- **SEO ready** — `sitemap.ts` and `robots.ts` auto-generated, per-page metadata
- **Page transitions** — Framer Motion `AnimatePresence` wrappers on every route
- **Accessibility** — `useReducedMotion` hook respected throughout animations

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up your environment variables (see below)
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

You'll need to set these in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── product/[slug]/   # Dynamic product detail pages
│   ├── collections/      # Collections listing
│   ├── drops/            # Featured drops
│   ├── syndicate/        # Membership program pages
│   ├── authentication/   # Login / sign up
│   └── api/checkout/     # Stripe payment route handler
├── components/
│   ├── atoms/            # Button, Badge, MonoLabel, ScarcityDot
│   ├── molecules/        # SneakerCard, ProductGrid
│   ├── organisms/        # Navbar, Footer, CartDrawer, ProductGallery
│   ├── sections/         # HeroSection, FeaturedDropSection, CollectionsSection, etc.
│   ├── three/            # Hero3D (React Three Fiber)
│   └── animations/       # PageTransition, AnimatePresenceWrapper
├── lib/
│   ├── store/            # Zustand cart store
│   ├── hooks/            # useReducedMotion
│   ├── products.ts       # Product data helpers
│   ├── mockData.ts       # Static seed data
│   ├── supabaseClient.ts # Supabase client setup
│   └── types.ts          # Shared TypeScript types
public/
└── images/sneakers/      # Per-product webp image sets
```

---

## Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## Deployment

The app is deployed on Vercel. Every push to `main` triggers a new production deployment automatically. See [`deployment.md`](./deployment.md) for manual steps or custom domain setup.

---

## License

MIT
