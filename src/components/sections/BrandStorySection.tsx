'use client';

import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   BrandStorySection — Act 4: Brand Manifesto

   Single large typographic block on void bg.
   Pull quote in Cormorant Garamond Italic.
   Scroll-reveal animation on entry.
   ───────────────────────────────────────────── */

export function BrandStorySection() {
  return (
    <article
      aria-labelledby="brand-story-heading"
      className="py-5xl px-md md:px-xl bg-void border-t border-b border-border relative overflow-hidden"
    >
      {/* Faint gold accent line — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-gold opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-mono-label text-secondary mb-2xl"
        >
          Our Standard
        </motion.p>

        {/* Main heading — hidden, only for semantics */}
        <h2 id="brand-story-heading" className="sr-only">
          Brand Story
        </h2>

        {/* Pull quote — Cormorant Garamond Italic */}
        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif italic text-3xl md:text-5xl text-primary leading-relaxed mb-2xl"
        >
          &ldquo;We refused to build another marketplace. The greatest pairs in history
          don&rsquo;t belong in a resale feed. They belong in a space that respects their
          craft.&rdquo;
        </motion.blockquote>

        {/* Supporting body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="font-sans text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Sole Syndicate exists to give rare sneakers the presentation they deserve.
          Every pair authenticated. Every listing curated.
          No hype without substance.
        </motion.p>
      </div>
    </article>
  );
}
