'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   HeroSection — Act 1: Arrival

   Full-screen. R3F scene in background.
   Orchestrated title reveal (staggered per letter).
   Scroll-driven opacity fade on the content as you scroll down.
   Static image fallback when prefers-reduced-motion.
   ───────────────────────────────────────────── */

/* Load Three.js hero dynamically — client-only, no SSR */
const Hero3D = dynamic(() => import('@/components/three/Hero3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" aria-hidden="true" />,
});

/* ── Per-letter stagger reveal ── */
const TITLE = 'SYNDICATE';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.5,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ── Reduced-motion fallback (static backdrop) ── */
function StaticHeroFallback() {
  return (
    <div
      className="absolute inset-0 bg-void"
      style={{
        background:
          'radial-gradient(ellipse at 50% 70%, rgba(197,164,58,0.08) 0%, transparent 65%)',
      }}
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Fade content out as user scrolls away from the hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-12%']);

  return (
    <header
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background: 3D scene or static fallback ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {reduced ? <StaticHeroFallback /> : <Hero3D />}
      </div>

      {/* ── Vignette overlays ── */}
      {/* Bottom gradient → next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-void to-transparent z-10"
        aria-hidden="true"
      />
      {/* Subtle center radial glow behind text */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(197,164,58,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main content — fades/rises on scroll ── */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center gap-8 px-md w-full max-w-4xl mx-auto"
        style={{
          opacity: reduced ? 1 : contentOpacity,
          y: reduced ? 0 : contentY,
        }}
      >
        {/* Pre-title label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <MonoLabel muted className="text-xs tracking-[0.3em] uppercase">
            Est. 2024 · Authenticated Pairs
          </MonoLabel>
        </motion.div>

        {/* ── Staggered letter reveal ── */}
        <motion.h1
          id="hero-heading"
          variants={reduced ? {} : container}
          initial="hidden"
          animate="show"
          aria-label="SYNDICATE"
          className="font-display text-[clamp(4rem,16vw,10rem)] leading-none text-primary relative"
          style={{ perspective: '600px' }}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={reduced ? {} : letterVariant}
              className="inline-block"
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.6 }}
          className="font-serif italic text-lg md:text-xl text-secondary max-w-sm leading-relaxed"
        >
          The rarest pairs. Presented properly.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 2.0 }}
          className="flex items-center gap-6 mt-2"
        >
          <Link href="/collections">
            <Button variant="gold" size="lg">
              Enter Collection
            </Button>
          </Link>
          <Link href="/drops">
            <Button variant="ghost" size="lg">
              View Drops
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0.3 : 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-mono-label text-muted text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-linear-to-b from-muted to-transparent"
        />
      </motion.div>
    </header>
  );
}
