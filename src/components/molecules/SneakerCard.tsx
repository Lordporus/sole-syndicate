'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Badge } from '@/components/atoms/Badge';
import { ScarcityDot } from '@/components/atoms/ScarcityDot';
import { PriceDisplay } from '@/components/atoms/MonoLabel';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { getScarcityLevel, type Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   SneakerCard — Core product card component.

   Interaction behaviour per brand blueprint:
   - Slight 3D tilt on hover (via Framer Motion)
   - scale(1.02) max — never more
   - Scarcity dot + badge overlaid
   - Dark bg, focus ring in gold
   ───────────────────────────────────────────── */

interface SneakerCardProps {
  product: Product;
  /** Show a larger editorial style card */
  featured?: boolean;
  className?: string;
}

export function SneakerCard({ product, featured = false, className }: SneakerCardProps) {
  const scarcityLevel = getScarcityLevel(product.totalPairsLeft);
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];

  return (
    <motion.article
      // 3D tilt hover effect — max scale 1.02 per design spec
      whileHover={{ scale: 1.02, y: -4, rotateY: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      // motion-reduce: browser handles suppression via @media (prefers-reduced-motion)
      className={clsx(
        'group relative flex flex-col',
        'bg-surface border border-border rounded-card',
        'overflow-hidden cursor-pointer',
        // Gold ring on keyboard focus — WCAG visible focus
        'focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-1 focus-within:ring-offset-void',
        featured ? 'min-h-96' : '',
        className
      )}
      aria-labelledby={`product-name-${product.id}`}
    >
      {/* ── Image Area ── */}
      <figure className="relative aspect-square overflow-hidden bg-void shrink-0">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
            className="object-contain p-md transition-transform duration-slow group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          // Placeholder silhouette when no image provided
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted text-mono-label">No Image</span>
          </div>
        )}

        {/* ── Overlaid Badges ── */}
        <div className="absolute top-sm left-sm flex flex-col gap-xs" aria-hidden="true">
          {product.condition === 'DS' && (
            <Badge variant="condition">DS</Badge>
          )}
          {product.condition === 'VNDS' && (
            <Badge variant="condition">VNDS</Badge>
          )}
        </div>

        {/* ── Scarcity dot — top right ── */}
        <div className="absolute top-sm right-sm">
          <ScarcityDot level={scarcityLevel} showLabel />
        </div>
      </figure>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-md gap-xs">
        {/* Brand */}
        <MonoLabel muted className="text-xs">
          {product.brand}
        </MonoLabel>

        {/* Model Name — the primary link */}
        <h3
          id={`product-name-${product.id}`}
          className="font-sans font-semibold text-primary text-sm leading-tight"
        >
          <Link
            href={`/product/${product.slug}`}
            className="outline-none before:absolute before:inset-0 before:z-10"
            tabIndex={0}
          >
            {product.model}
          </Link>
        </h3>

        {/* Colorway */}
        <MonoLabel muted className="text-xs truncate">
          {product.colorway}
        </MonoLabel>

        {/* ── Footer: year + price ── */}
        <div className="mt-auto pt-sm flex items-center justify-between border-t border-border">
          <MonoLabel muted className="text-xs">
            {product.releaseYear}
          </MonoLabel>
          <PriceDisplay priceUsd={product.price} size="sm" />
        </div>
      </div>
    </motion.article>
  );
}
