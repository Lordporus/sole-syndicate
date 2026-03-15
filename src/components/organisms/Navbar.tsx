'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Button } from '@/components/atoms/Button';
import { useCartStore } from '@/lib/store/cartStore';

/* ─────────────────────────────────────────────
   Navbar — Fixed top navigation.

   Behaviour:
   - Transparent → opaque blur on scroll
   - Cart badge showing item count
   - Mobile: hamburger → full-screen menu slide-in
   - Desktop: inline links + cart icon
   ───────────────────────────────────────────── */

const navLinks = [
  { label: 'Drops', href: '/drops' },
  { label: 'Collections', href: '/collections' },
  { label: 'Archive', href: '/archive' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Darken navbar on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={clsx(
          'fixed top-0 inset-x-0 z-50',
          'flex items-center justify-between',
          'px-md md:px-xl',
          'h-16', // 64px — 8x grid
          'transition-all duration-normal motion-reduce:transition-none',
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        {/* ── Logo ── */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="font-display text-xl tracking-widest text-primary hover:text-gold transition-colors duration-fast motion-reduce:transition-none"
            aria-label="Sole Syndicate — Home"
          >
            SOLE SYNDICATE
          </Link>
        </div>

        {/* ── Desktop Links ── */}
        <ul
          className="hidden md:flex flex-none items-center justify-center gap-8"
          role="list"
          aria-label="Site pages"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-mono-label tracking-[0.25em] text-secondary hover:text-primary transition-colors duration-fast motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right: Cart + Mobile Toggle ── */}
        <div className="flex-1 flex items-center justify-end gap-sm">
          {/* Cart Toggle */}
          <button
            onClick={openCart}
            aria-label={`Open cart. ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            className="relative flex items-center justify-center w-11 h-11 text-secondary hover:text-primary transition-colors duration-fast motion-reduce:transition-none"
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-gold text-void text-mono-label text-xs rounded-full font-bold"
                aria-hidden="true"
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-11 h-11 text-secondary hover:text-primary"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center gap-xl"
          >
            <nav aria-label="Mobile navigation links">
              <ul className="flex flex-col items-center gap-xl" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-4xl text-primary hover:text-gold transition-colors duration-fast motion-reduce:transition-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button variant="gold" size="lg" className="mt-xl">
              Enter Collection
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
