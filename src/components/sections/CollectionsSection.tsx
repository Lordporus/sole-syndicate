'use client';

import { motion } from 'framer-motion';
import { SneakerCard } from '@/components/molecules/SneakerCard';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { MOCK_PRODUCTS } from '@/lib/mockData';

/* ─────────────────────────────────────────────
   CollectionsSection — Editorial strip.

   Horizontal scroll on desktop (with scroll-snap).
   Responsive 2-col grid on mobile.
   ───────────────────────────────────────────── */

export function CollectionsSection() {
  return (
    <section aria-labelledby="collections-heading" className="py-28 overflow-hidden">
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-end justify-between mb-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <MonoLabel muted className="block mb-8">
            Current Selection
          </MonoLabel>
          <h2
            id="collections-heading"
            className="font-display text-[32px] md:text-[48px] lg:text-[72px] leading-none tracking-tight text-primary mb-6"
          >
            The Archive
          </h2>
        </motion.div>
        <a
          href="/collections"
          className="text-mono-label text-gold hover:text-gold-dim transition-colors duration-fast hidden md:block"
        >
          View all →
        </a>
      </div>

      {/* ── Desktop: horizontal scroll strip with snap ── */}
      <div
        className="hidden md:flex gap-10 overflow-x-auto scrollbar-hide px-6 md:px-10 lg:px-16 pb-sm max-w-[1440px] mx-auto"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {MOCK_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-72"
            style={{ scrollSnapAlign: 'start' }}
          >
            <SneakerCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: 2-col grid ── */}
      <div className="grid grid-cols-2 gap-6 px-6 md:px-10 lg:px-16 md:hidden max-w-[1440px] mx-auto">
        {MOCK_PRODUCTS.slice(0, 6).map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <SneakerCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Mobile view-all link */}
      <div className="mt-xl px-6 md:px-10 lg:px-16 md:hidden max-w-[1440px] mx-auto">
        <a
          href="/collections"
          className="text-mono-label text-gold hover:text-gold-dim transition-colors duration-fast"
        >
          View all →
        </a>
      </div>
    </section>
  );
}
