'use client';

import { clsx } from 'clsx';

/* ─────────────────────────────────────────────
   Badge — Drop, Verified, Scarce, Condition
   Used as overlaid labels on product cards
   and in the product detail panel.
   ───────────────────────────────────────────── */

type BadgeVariant = 'drop' | 'verified' | 'scarce' | 'condition' | 'edition';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  drop: 'bg-drop text-white',
  verified: 'bg-verified text-void',
  scarce: 'bg-scarce text-void',
  condition: 'bg-surface border border-border text-primary',
  edition: 'bg-gold text-void',
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        // Base styles — monospace label aesthetic
        'inline-flex items-center text-mono-label px-sm py-xs rounded-sm font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
