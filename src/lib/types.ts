/* ─────────────────────────────────────────────
   Sole Syndicate — Shared Type Definitions
   ───────────────────────────────────────────── */

export interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  colorway: string;
  releaseYear: number;
  price: number;
  /** DS = Deadstock, VNDS = Very Near Deadstock, USED = Pre-owned */
  condition: "DS" | "VNDS" | "USED";
  /** Available sizes (US Men's) */
  availableSizes: number[];
  /** Total pairs left across all sizes */
  totalPairsLeft: number;
  /** Short cultural blurb */
  heritage?: string;
  /** Featured model images */
  images: ProductImage[];
  /** Path to the .glb 3D model if available */
  modelUrl?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  /** Designates the main hero image */
  isPrimary?: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

export interface Drop {
  id: string;
  product: Product;
  /** ISO string for when the drop goes live */
  dropAt: string;
  /** Is this drop currently live? */
  isLive: boolean;
  totalQuantity: number;
  remainingQuantity: number;
}

export interface CollectionCategory {
  slug: string;
  label: string;
  heroImageUrl: string;
  productCount: number;
}

/** Scarcity level based on remaining stock */
export type ScarcityLevel = "critical" | "low" | "available";

export function getScarcityLevel(pairsLeft: number): ScarcityLevel {
  if (pairsLeft <= 1) return "critical";
  if (pairsLeft <= 3) return "low";
  return "available";
}
