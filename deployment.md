# Deployment Guide

Sole Syndicate is built for Vercel, which provides native support for Next.js App Router and serverless edge functions.

## 1. Prerequisites
Ensure you have the following accounts set up:
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)

## 2. Environment Variables
In your Vercel project dashboard, navigate to **Settings > Environment Variables** and add:

```env
# URL of your production site (for Stripe redirects & SEO root)
NEXT_PUBLIC_SITE_URL=https://solesyndicate.yourdomain.com

# Supabase Database Keys
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe Payment Keys
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 3. Database Migration (Supabase)
Run this SQL snippet in your Supabase project's SQL Editor to instantiate the `products` table:

```sql
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  colorway text NOT NULL,
  "releaseYear" integer,
  price numeric NOT NULL,
  condition text,
  "availableSizes" jsonb,
  "totalPairsLeft" integer DEFAULT 0,
  heritage text,
  images jsonb,
  "modelUrl" text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```
*(You can then use the Supabase CSV importer to upload initial data based on the mock structured established in `src/lib/types.ts`.)*

## 4. Deploying
Link your GitHub repository to Vercel. 
The build settings should automatically detect Next.js.
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

Click **Deploy**.

## 5. Webhooks (Optional but Recommended)
For production order fulfillment, set up a Stripe Webhook endpoint (e.g., `/api/webhooks/stripe`) to listen for the `checkout.session.completed` event and update your own database's inventory count.
