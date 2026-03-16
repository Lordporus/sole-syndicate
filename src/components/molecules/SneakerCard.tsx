'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { Badge } from '@/components/atoms/Badge';
import { ScarcityDot } from '@/components/atoms/ScarcityDot';
import { PriceDisplay } from '@/components/atoms/MonoLabel';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { getScarcityLevel, type Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   SneakerCard — Core product card component.

   Interaction behaviour per brand blueprint:
   - Magnetic 3D tilt on hover (max 6deg)
   - Secondary image crossfade reveal
   - Micro-zoom and subtle lighting effect
   - Elevated drop shadow and translation on hover
   ───────────────────────────────────────────── */

interface SneakerCardProps {
  product: Product;
  /** Show a larger editorial style card */
  featured?: boolean;
  className?: string;
  /** Index for staggered reveal animation */
  index?: number;
}

export function SneakerCard({ product, featured = false, className, index = 0 }: SneakerCardProps) {
  const scarcityLevel = getScarcityLevel(product.totalPairsLeft);
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const secondaryImage = product.images.length > 1 ? product.images.find((img) => img !== primaryImage) : primaryImage;

  const [isHoverable, setIsHoverable] = useState(false);
  useEffect(() => {
    setIsHoverable(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Magnetic hover state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isHoverable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isHoverable ? { rotateX, rotateY, transformPerspective: 1000 } : {}}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.08, // Stagger of ~80ms 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'group relative flex flex-col',
        'bg-surface border border-border rounded-card',
        'overflow-hidden cursor-pointer shadow-sm',
        // Card depth
        'transition-all duration-300 ease-out',
        'hover:shadow-xl md:hover:-translate-y-[6px]',
        // Gold ring on keyboard focus
        'focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-1 focus-within:ring-offset-void',
        featured ? 'min-h-96' : '',
        className
      )}
      aria-labelledby={`product-name-${product.id}`}
    >
      {/* ── Image Area ── */}
      <figure className="relative aspect-square overflow-hidden bg-void shrink-0 z-0">
        {/* Radial highlight lighting effect */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          aria-hidden="true"
        />

        {primaryImage ? (
          <motion.div layoutId={`product-image-${product.slug}`} className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
              className="object-contain p-6 transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-0 motion-reduce:transition-none relative"
            />
            {secondaryImage && (
              <Image
                src={secondaryImage.url}
                alt={`${primaryImage.alt} - Alternate View`}
                fill
                sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
                className="object-contain p-6 transition-all duration-300 ease-out opacity-0 scale-95 group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none absolute inset-0"
              />
            )}
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-muted text-mono-label">No Image</span>
          </div>
        )}

        {/* ── Overlaid Badges ── */}
        <div className="absolute top-sm left-sm flex flex-col gap-xs z-20" aria-hidden="true">
          {product.condition === 'DS' && (
            <Badge variant="condition">DS</Badge>
          )}
          {product.condition === 'VNDS' && (
            <Badge variant="condition">VNDS</Badge>
          )}
        </div>

        {/* ── Scarcity dot — top right ── */}
        <div className="absolute top-sm right-sm z-20">
          <ScarcityDot level={scarcityLevel} showLabel />
        </div>
      </figure>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-6 gap-xs relative z-10 bg-surface">
        {/* Brand */}
        <MonoLabel muted className="text-xs">
          {product.brand}
        </MonoLabel>

        {/* Model Name — the primary link */}
        <h3
          id={`product-name-${product.id}`}
          className="font-sans font-medium text-primary text-base leading-tight"
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

        {/* ── Footer: year + price (Transforms on Hover) ── */}
        <div className="mt-auto pt-sm flex items-center justify-between border-t border-border opacity-70 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <MonoLabel muted className="text-xs">
            {product.releaseYear}
          </MonoLabel>
          <PriceDisplay priceUsd={product.price} size="sm" />
        </div>
      </div>
    </motion.article>
  );
}
