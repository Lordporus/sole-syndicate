import { supabase } from '@/lib/supabaseClient';
import { MOCK_PRODUCTS, MOCK_FEATURED_DROP } from '@/lib/mockData';
import type { Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   Products Service — Data access layer.

   Attempts to fetch from Supabase. If the table doesn't
   exist or env vars are missing, it gracefully falls
   back to the local mock data.
   ───────────────────────────────────────────── */

/**
 * Return all products.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Product[];
  } catch {
    // Console log suppressed in production for clean fallback
  }
  return MOCK_PRODUCTS;
}

/**
 * Return a single product by slug, or null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (!error && data) return data as Product;
  } catch {
    // Fallback
  }
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/**
 * Return products filtered by brand.
 */
export async function getProductsByBrand(brand: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*').ilike('brand', brand);
    if (!error && data && data.length > 0) return data as Product[];
  } catch {
    // Fallback
  }
  return MOCK_PRODUCTS.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

/**
 * Return all unique slugs — used for generateStaticParams.
 */
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from('products').select('slug');
    if (!error && data) return data.map((d) => d.slug);
  } catch {
    // Fallback
  }
  return MOCK_PRODUCTS.map((p) => p.slug);
}

/**
 * Return the featured drop for the homepage.
 * Example of extending the schema for specific marketing slots.
 */
export async function getFeaturedDrop() {
  // In a real database, you might fetch from a 'drops' table.
  // For now, we return the mock structure.
  return MOCK_FEATURED_DROP;
}

/**
 * Return upcoming drops.
 */
export async function getDrops(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('drop_tag', 'upcoming').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Product[];
  } catch {
    // Fallback
  }
  // Mock fallback: first 4 products
  return MOCK_PRODUCTS.slice(0, 4);
}

/**
 * Return archived drops.
 */
export async function getArchivedDrops(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('drop_tag', 'archived').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Product[];
  } catch {
    // Fallback
  }
  // Mock fallback: last 4 products
  return MOCK_PRODUCTS.slice(4);
}
