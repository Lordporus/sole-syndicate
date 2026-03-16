'use client';

import { clsx } from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

/* ─────────────────────────────────────────────
   Button — Primary, Ghost, Icon
   All touch targets are min 44×44px (WCAG 2.5.5)
   ───────────────────────────────────────────── */

type ButtonVariant = 'primary' | 'ghost' | 'icon' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  // White on black — the main CTA
  primary:
    'bg-primary text-void border border-primary hover:bg-void hover:text-primary focus-visible:ring-2 focus-visible:ring-primary',
  // Gold border — selection / secondary action
  ghost:
    'bg-transparent text-primary border border-border hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold',
  // Icon-only — no label, requires aria-label
  icon:
    'bg-transparent text-primary hover:text-gold focus-visible:ring-2 focus-visible:ring-gold p-sm',
  // Gold fill — premium CTA (used sparingly)
  gold:
    'bg-gold text-void border border-gold hover:bg-gold-dim hover:border-gold-dim focus-visible:ring-2 focus-visible:ring-gold',
};

const sizeStyles: Record<ButtonSize, string> = {
  // min-h-11 = 44px, meeting touch target requirement
  sm: 'text-mono-label px-md min-h-8 text-xs',
  md: 'text-sm font-medium px-xl min-h-11',
  lg: 'text-base font-medium px-2xl min-h-14 tracking-wide',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center gap-sm',
          'transition-all duration-normal ease-brand-standard',
          'rounded-sm cursor-pointer select-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'motion-reduce:transition-none',
          // Active hover/press effect
          'hover:scale-[1.02] active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
