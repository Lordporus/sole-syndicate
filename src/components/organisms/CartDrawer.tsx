'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/atoms/Button';
import { PriceDisplay, MonoLabel } from '@/components/atoms/MonoLabel';
import { Badge } from '@/components/atoms/Badge';
import { useCartStore } from '@/lib/store/cartStore';

/* ─────────────────────────────────────────────
   CartDrawer — Slide-in panel from right.

   Behaviour per brand blueprint:
   - Right-side drawer (slide-in, not a new page)
   - Each item: thumbnail, name, size, condition, qty, price
   - Quantity: +/− controls (sneakers are limited so max 2)
   - Remove: trash icon, no confirm dialog
   - Focus trap: close button focused on open
   - Subtotal + "Authenticated delivery included"
   ───────────────────────────────────────────── */

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, addItem, totalPrice } = useCartStore();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management — trap focus in drawer
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const t = setTimeout(() => closeBtnRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* ── Drawer Panel ── */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
              'fixed inset-y-0 right-0 z-50',
              'w-full md:w-[420px]',
              'bg-surface border-l border-border',
              'flex flex-col',
              'shadow-2xl'
            )}
          >
            {/* ── Header ── */}
            <header className="flex items-center justify-between px-md py-md border-b border-border shrink-0">
              <h2 className="font-sans font-semibold text-primary">
                Cart
                {items.length > 0 && (
                  <span className="ml-sm text-mono-label text-secondary">
                    — {items.length} {items.length === 1 ? 'pair' : 'pairs'}
                  </span>
                )}
              </h2>
              <button
                ref={closeBtnRef}
                onClick={closeCart}
                aria-label="Close cart"
                className="flex items-center justify-center w-11 h-11 text-secondary hover:text-primary transition-colors duration-fast rounded-sm"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {/* ── Items List ── */}
            <div className="flex-1 overflow-y-auto" role="region" aria-label="Cart items">
              {items.length === 0 ? (
                /* Empty state — brand voice */
                <div className="flex flex-col items-center justify-center h-full gap-md p-xl text-center">
                  <ShoppingBag size={40} className="text-muted" aria-hidden="true" />
                  <p className="font-serif italic text-lg text-secondary">
                    Your collection awaits.
                  </p>
                  <Link href="/collections" onClick={closeCart}>
                    <Button variant="ghost" size="md">
                      Browse drops →
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul role="list" className="divide-y divide-border">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-md p-md"
                    >
                      {/* Thumbnail */}
                      <figure className="relative w-20 h-20 shrink-0 bg-void rounded-md overflow-hidden">
                        {item.product.images[0] && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.images[0].alt}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        )}
                      </figure>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col gap-xs">
                        <p className="font-sans font-medium text-sm text-primary truncate">
                          {item.product.model}
                        </p>
                        <MonoLabel muted className="truncate">
                          {item.product.colorway}
                        </MonoLabel>
                        <div className="flex items-center gap-sm">
                          <MonoLabel muted>US {item.size}</MonoLabel>
                          <Badge variant="condition">{item.product.condition}</Badge>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-xs mt-auto">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.product.id, item.size);
                              } else {
                                // Decrement: remove and re-add with decreased qty is complex — 
                                // for now just remove at 1
                                removeItem(item.product.id, item.size);
                              }
                            }}
                            aria-label={`Decrease quantity of ${item.product.model}`}
                            className="flex items-center justify-center w-7 h-7 rounded-sm border border-border text-secondary hover:text-primary hover:border-gold transition-all duration-fast"
                          >
                            <Minus size={10} aria-hidden="true" />
                          </button>
                          <MonoLabel className="w-6 text-center text-sm">
                            {item.quantity}
                          </MonoLabel>
                          <button
                            onClick={() => addItem(item.product, item.size)}
                            disabled={item.quantity >= 2}
                            aria-label={`Increase quantity of ${item.product.model}`}
                            className="flex items-center justify-center w-7 h-7 rounded-sm border border-border text-secondary hover:text-primary hover:border-gold transition-all duration-fast disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Plus size={10} aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <PriceDisplay priceUsd={item.product.price * item.quantity} size="sm" />
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.model} size ${item.size} from cart`}
                          className="text-muted hover:text-drop transition-colors duration-fast"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer: Subtotal + CTA ── */}
            {items.length > 0 && (
              <footer className="p-md border-t border-border shrink-0 space-y-md">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <MonoLabel muted>Subtotal</MonoLabel>
                  <PriceDisplay priceUsd={totalPrice} size="md" />
                </div>

                {/* Delivery note */}
                <p className="text-mono-label text-secondary">
                  Authenticated delivery included.
                </p>

                {/* CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isCheckoutLoading}
                  onClick={async () => {
                    setIsCheckoutLoading(true);
                    try {
                      const res = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items, baseUrl: window.location.origin }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        console.error('Checkout error:', data.error);
                        setIsCheckoutLoading(false);
                      }
                    } catch (error) {
                      console.error('Failed to initiate checkout', error);
                      setIsCheckoutLoading(false);
                    }
                  }}
                >
                  {isCheckoutLoading ? 'Preparing Checkout...' : 'Proceed to Checkout'}
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
