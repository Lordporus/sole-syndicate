'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Award, Shield, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { MonoLabel, PriceDisplay } from '@/components/atoms/MonoLabel';
import { ScarcityDot } from '@/components/atoms/ScarcityDot';
import { useCartStore } from '@/lib/store/cartStore';
import { getScarcityLevel, type Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   ProductDetailClient — Interactive product
   detail panel. Receives pre-fetched product
   from the Server Component parent.

   Handles:
   - Size selection with keyboard nav
   - Add to cart (Zustand) with feedback
   - Cart drawer open after add
   ───────────────────────────────────────────── */

interface Props {
  product: Product;
}

const CONDITION_LABELS: Record<Product['condition'], string> = {
  DS: 'Deadstock — unworn, original laces and box',
  VNDS: 'Very Near Deadstock — tried on once, pristine',
  USED: 'Pre-owned — graded and authenticated',
};

export function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const { addItem, openCart } = useCartStore();
  const scarcityLevel = getScarcityLevel(product.totalPairsLeft);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      // Auto-clear error
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 900);
  };

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  return (
    <main id="main-content" className="min-h-screen bg-void pt-16">
      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="px-md md:px-xl py-md border-b border-border"
      >
        <ol className="flex items-center gap-xs text-mono-label text-muted" role="list">
          <li>
            <Link href="/" className="hover:text-primary transition-colors duration-fast">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={12} />
          </li>
          <li>
            <Link href="/collections" className="hover:text-primary transition-colors duration-fast">
              Collections
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={12} />
          </li>
          <li aria-current="page" className="text-secondary truncate max-w-[200px]">
            {product.model}
          </li>
        </ol>
      </nav>

      {/* ── Main layout: Gallery | Info panel ── */}
      <div className="px-md md:px-xl py-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl lg:gap-3xl max-w-screen-xl mx-auto">

          {/* ── LEFT: Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductGallery
              images={product.images}
              productName={`${product.model} ${product.colorway}`}
              productSlug={product.slug}
            />
          </motion.div>

          {/* ── RIGHT: Product Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-xl"
          >
            {/* Brand + condition */}
            <div className="flex items-center gap-sm flex-wrap">
              <MonoLabel muted className="text-xs tracking-widest uppercase">
                {product.brand}
              </MonoLabel>
              <Badge variant="condition">{product.condition}</Badge>
              <ScarcityDot level={scarcityLevel} showLabel />
            </div>

            {/* Product name */}
            <div>
              <h1 className="font-display text-[40px] md:text-[48px] font-medium leading-[1.1] tracking-tight text-primary mb-6">
                {product.model}
              </h1>
              <MonoLabel muted className="text-base">{product.colorway}</MonoLabel>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-md">
              <PriceDisplay priceUsd={product.price} size="lg" />
              <MonoLabel muted className="text-xs">
                · {product.releaseYear} release
              </MonoLabel>
            </div>

            {/* Heritage blurb */}
            {product.heritage && (
              <p className="font-serif italic text-secondary text-base leading-relaxed border-l-2 border-gold pl-md">
                &ldquo;{product.heritage}&rdquo;
              </p>
            )}

            {/* ── Size Selector ── */}
            <fieldset className="space-y-md">
              <legend className="flex items-center justify-between w-full mb-md">
                <MonoLabel className={clsx('text-sm', sizeError ? 'text-drop' : '')}>
                  {sizeError ? 'Please select a size' : 'Select Size (US Men\'s)'}
                </MonoLabel>
                <a
                  href="/size-guide"
                  className="text-mono-label text-gold text-xs hover:text-gold-dim transition-colors duration-fast"
                >
                  Size guide →
                </a>
              </legend>

              <div
                className="flex flex-wrap gap-sm"
                role="group"
                aria-label="Available sizes"
              >
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    aria-pressed={selectedSize === size}
                    aria-label={`Size US ${size}`}
                    className={clsx(
                      'min-w-[52px] h-12 px-sm font-mono text-sm font-medium',
                      'border rounded-sm transition-all duration-fast',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                      selectedSize === size
                        ? 'bg-gold text-void border-gold'
                        : sizeError
                          ? 'bg-transparent text-primary border-drop hover:border-gold'
                          : 'bg-transparent text-primary border-border hover:border-gold'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* ── Add to Cart ── */}
            <div className="flex flex-col sm:flex-row gap-md">
              <Button
                variant={added ? 'ghost' : 'gold'}
                size="lg"
                onClick={handleAddToCart}
                aria-label={
                  added
                    ? 'Added to cart'
                    : selectedSize
                      ? `Add size US ${selectedSize} to cart`
                      : 'Add to cart — select size first'
                }
                className="flex-1 flex items-center justify-center gap-sm"
              >
                <ShoppingBag size={16} aria-hidden="true" />
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </Button>

              <Button variant="ghost" size="lg" className="sm:w-auto">
                Notify Me
              </Button>
            </div>

            {/* ── Trust Signals ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm pt-lg border-t border-border">
              {[
                {
                  icon: Shield,
                  label: 'Authenticated',
                  sub: 'Every pair verified',
                },
                {
                  icon: Award,
                  label: 'Guaranteed DS',
                  sub: product.condition === 'DS' ? 'Never worn' : 'Graded condition',
                },
                {
                  icon: RotateCcw,
                  label: '7-day returns',
                  sub: 'Authenticated or exchange',
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-sm">
                  <Icon size={16} className="text-gold mt-xs shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-primary leading-tight">{label}</p>
                    <p className="text-mono-label text-muted text-xs mt-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Product Details Table ── */}
            <details className="group border-t border-border pt-lg">
              <summary
                className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-secondary hover:text-primary transition-colors duration-fast"
              >
                Product Details
                <ChevronRight
                  size={14}
                  className="transition-transform duration-fast group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <dl className="mt-md grid grid-cols-2 gap-y-sm gap-x-md">
                {[
                  { label: 'Brand', value: product.brand },
                  { label: 'Model', value: product.model },
                  { label: 'Colorway', value: product.colorway },
                  { label: 'Year', value: String(product.releaseYear) },
                  { label: 'Condition', value: product.condition },
                  { label: 'Pairs left', value: String(product.totalPairsLeft) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt>
                      <MonoLabel muted className="text-xs">{label}</MonoLabel>
                    </dt>
                    <dd>
                      <MonoLabel className="text-xs text-primary">{value}</MonoLabel>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Condition description */}
              <p className="mt-md text-xs font-serif italic text-secondary">
                {CONDITION_LABELS[product.condition]}
              </p>
            </details>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
