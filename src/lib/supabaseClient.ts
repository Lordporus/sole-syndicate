import { createClient } from '@supabase/supabase-js';

/* ─────────────────────────────────────────────
   Supabase Client Initialization
   ───────────────────────────────────────────── */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If credentials are missing in dev, the queries will gracefully
// fall back to mock data (handled in src/lib/products.ts).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

/* ─────────────────────────────────────────────
   Database Schema Reference

   Table: products
   - id: uuid (primary key)
   - slug: text (unique)
   - brand: text
   - model: text
   - colorway: text
   - releaseYear: integer
   - price: numeric
   - condition: text ('DS', 'VNDS', 'USED')
   - availableSizes: jsonb (array of numbers)
   - totalPairsLeft: integer
   - heritage: text (nullable)
   - images: jsonb (array of ProductImage objects)
   - modelUrl: text (nullable)
   - created_at: timestamp with time zone
   ───────────────────────────────────────────── */
