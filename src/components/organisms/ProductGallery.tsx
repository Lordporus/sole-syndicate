'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import type { ProductImage } from '@/lib/types';

const BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c+bMfwAJoAHwov6H3gAAAABJRU5ErkJggg==';

/* ─────────────────────────────────────────────
   ProductGallery — Image carousel + thumbnail strip.

   This sits on the left 60% of the product detail page (desktop).
   The Three.js 3D viewer is rendered separately as a sibling.

   Features:
   - Accessible carousel with aria-live announcements
   - Thumbnail strip for quick jumping
   - Keyboard arrow navigation
   - Zoom hint on hover
   ───────────────────────────────────────────── */

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  productSlug: string;
}

export function ProductGallery({ images, productName, productSlug }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, goTo]);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, goTo]);

  if (!images.length) return null;

  const currentImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-md">
      {/* ── Main Image ── */}
      <figure
        className="relative aspect-square bg-void rounded-card overflow-hidden group"
        role="img"
        aria-label={`${productName} — image ${activeIndex + 1} of ${images.length}`}
      >
        {/* Animated image swap */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            layoutId={activeIndex === 0 ? `product-image-${productSlug}` : undefined}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-contain p-xl transition-opacity duration-300"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint — appears on hover */}
        <div
          className="absolute top-sm right-sm opacity-0 group-hover:opacity-100 transition-opacity duration-fast text-secondary"
          aria-hidden="true"
        >
          <ZoomIn size={18} />
        </div>

        {/* Navigation arrows (only when multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-sm top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-surface/80 text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-fast hover:bg-surface"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-sm top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-surface/80 text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-fast hover:bg-surface"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}

        {/* Live region for screen reader announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {currentImage.alt}
        </div>
      </figure>

      {/* ── Thumbnail Strip ── */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="flex gap-sm overflow-x-auto scrollbar-hide pb-xs"
        >
          {images.map((img, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View image ${index + 1}: ${img.alt}`}
              onClick={() => goTo(index)}
              className={clsx(
                'relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-fast',
                index === activeIndex
                  ? 'border-gold'
                  : 'border-border hover:border-muted'
              )}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="64px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                className="object-contain p-xs bg-void transition-opacity duration-300"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
