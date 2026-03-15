'use client';

import { clsx } from 'clsx';

/* ─────────────────────────────────────────────
   MonoLabel — Metadata, codes, prices, dates
   Uses JetBrains Mono, uppercase, tracked.
   Sole Syndicate uses this for authentication
   numbers, release dates, and price display.
   ───────────────────────────────────────────── */

interface MonoLabelProps {
  children: React.ReactNode;
  /** Muted = secondary color; default = primary */
  muted?: boolean;
  className?: string;
  as?: 'span' | 'p' | 'time' | 'data';
}

export function MonoLabel({
  children,
  muted = false,
  className,
  as: Tag = 'span',
}: MonoLabelProps) {
  return (
    <Tag
      className={clsx(
        'text-mono-label',
        muted ? 'text-secondary' : 'text-primary',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   PriceDisplay — Large price in mono font.
   No decimals per design spec.
   ───────────────────────────────────────────── */

interface PriceDisplayProps {
  priceUsd: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-4xl font-medium',
};

export function PriceDisplay({ priceUsd, size = 'md', className }: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceUsd);

  return (
    <span
      className={clsx('font-mono text-primary tabular-nums', sizeMap[size], className)}
      aria-label={`Price: ${formatted}`}
    >
      {formatted}
    </span>
  );
}
