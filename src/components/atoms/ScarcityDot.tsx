'use client';

import { clsx } from 'clsx';
import type { ScarcityLevel } from '@/lib/types';

/* ─────────────────────────────────────────────
   ScarcityDot — Real-time stock indicator dot
   Red = 1 pair left (critical)
   Yellow = 2–3 pairs left (low)
   Green = 4+ pairs (available)
   ───────────────────────────────────────────── */

interface ScarcityDotProps {
  level: ScarcityLevel;
  /** Show a text label beside the dot */
  showLabel?: boolean;
  className?: string;
}

const dotConfig: Record<ScarcityLevel, { color: string; label: string; ariaLabel: string }> = {
  critical: {
    color: 'bg-drop',
    label: '1 left',
    ariaLabel: 'Critical stock — only 1 pair remaining',
  },
  low: {
    color: 'bg-scarce',
    label: 'Few left',
    ariaLabel: 'Low stock — a few pairs remaining',
  },
  available: {
    color: 'bg-verified',
    label: 'Available',
    ariaLabel: 'In stock',
  },
};

export function ScarcityDot({ level, showLabel = false, className }: ScarcityDotProps) {
  const config = dotConfig[level];

  return (
    <span
      className={clsx('inline-flex items-center gap-xs', className)}
      role="status"
      aria-label={config.ariaLabel}
    >
      {/* Animated pulse for critical + low states */}
      <span className="relative inline-flex h-2 w-2">
        {level !== 'available' && (
          <span
            className={clsx(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-60',
              config.color
            )}
            aria-hidden="true"
          />
        )}
        <span
          className={clsx('relative inline-flex rounded-full h-2 w-2', config.color)}
          aria-hidden="true"
        />
      </span>

      {showLabel && (
        <span className="text-mono-label text-secondary">{config.label}</span>
      )}
    </span>
  );
}
