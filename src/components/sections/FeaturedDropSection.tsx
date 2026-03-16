'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { Button } from '@/components/atoms/Button';
import { MOCK_FEATURED_DROP } from '@/lib/mockData';

/* ─────────────────────────────────────────────
   FeaturedDropSection — Act 2 & 3: Drop Theatre

   Full-bleed editorial image with:
   - Live countdown timer to drop time
   - Scroll-driven parallax on image
   - Limited qty badge
   ───────────────────────────────────────────── */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetISO: string): TimeLeft {
  const calculate = (): TimeLeft => {
    const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function CountdownTimer({ targetISO }: { targetISO: string }) {
  const time = useCountdown(targetISO);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div
      className="flex items-center gap-md"
      aria-label={mounted ? `Time until drop: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds` : "Calculating time until drop"}
      role="timer"
    >
      {[
        { value: mounted ? time.days : null, label: 'DD' },
        { value: mounted ? time.hours : null, label: 'HH' },
        { value: mounted ? time.minutes : null, label: 'MM' },
        { value: mounted ? time.seconds : null, label: 'SS' },
      ].map(({ value, label }, i) => (
        <span key={label} className="flex items-start gap-md">
          <span className="flex flex-col items-center">
            <MonoLabel className="text-2xl md:text-4xl text-primary tabular-nums leading-none min-w-[2.5ch] text-center">
              {value !== null ? pad(value) : '--'}
            </MonoLabel>
            <MonoLabel muted className="text-xs mt-xs">
              {label}
            </MonoLabel>
          </span>
          {i < 3 && (
            <MonoLabel className="text-2xl md:text-4xl text-muted leading-none select-none">
              :
            </MonoLabel>
          )}
        </span>
      ))}
    </div>
  );
}

export function FeaturedDropSection() {
  const ref = useRef<HTMLElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const productImages = [
    "/images/sneakers/air-jordan-1-chicago/side.webp",
    "/images/sneakers/air-jordan-1-chicago/side_second.webp",
    "/images/sneakers/air-jordan-1-chicago/back.webp",
    "/images/sneakers/air-jordan-1-chicago/top.webp"
  ];

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <section
      ref={ref}
      aria-labelledby="drop-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* Interactive Background Image Gallery */}
      <div 
        className="absolute inset-0 z-0 touch-none overscroll-none" 
        aria-hidden="true"
        onWheel={(e) => {
          if (e.deltaY > 0) nextImage();
          else prevImage();
        }}
      >
        <div className="relative overflow-hidden w-full h-full z-10">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={productImages[imageIndex]}
              src={productImages[imageIndex]}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="object-contain w-full h-full absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -120) nextImage();
                else if (offset.x > 120) prevImage();
              }}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {imageIndex > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Dark vignette — left-heavy for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-void via-void/75 to-void/20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-void to-transparent pointer-events-none" />
      </div>

      {/* Content overlay */}
      <div className="relative z-30 max-w-7xl mx-auto px-10 py-32 flex flex-col items-start justify-center h-full w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col w-full pointer-events-auto"
        >
          {/* Live drop badge */}
          <div className="text-xs tracking-[0.35em] uppercase opacity-70 mb-6 flex items-center">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            Live Drop
          </div>

          {/* Product name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="drop-heading"
              className="font-display text-[56px] md:text-[72px] tracking-tight leading-[1.05] text-primary mb-10"
            >
              {MOCK_FEATURED_DROP.productName}
            </h2>
          </motion.div>

          <div className="mb-6">
            <MonoLabel muted className="block uppercase tracking-[0.25em] text-sm opacity-80">
              {MOCK_FEATURED_DROP.colorway}
            </MonoLabel>
          </div>

          {/* Countdown */}
          <div className="mb-8">
            <MonoLabel muted className="block mb-4 tracking-[0.25em] text-sm uppercase opacity-80">
              Drops in
            </MonoLabel>
            <CountdownTimer targetISO={MOCK_FEATURED_DROP.dropAt} />
          </div>

          {/* Divider animation */}
          <motion.div 
            className="w-full h-px bg-border/50 mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ originX: 0 }}
          />

          {/* Stats row */}
          <div className="flex flex-wrap gap-12 mb-10">
            <div className="tracking-[0.25em] text-sm opacity-80 uppercase">
              <div className="mb-2 text-white/50">Quantity</div>
              <div className="text-scarce">{MOCK_FEATURED_DROP.totalQty} pairs</div>
            </div>
            <div className="tracking-[0.25em] text-sm opacity-80 uppercase">
              <div className="mb-2 text-white/50">Price</div>
              <div className="text-white">${MOCK_FEATURED_DROP.price}</div>
            </div>
            <div className="tracking-[0.25em] text-sm opacity-80 uppercase">
              <div className="mb-2 text-white/50">Condition</div>
              <div className="text-verified">DS — Deadstock</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <Link href={`/product/${MOCK_FEATURED_DROP.slug}`}>
              <Button variant="gold" size="lg">
                View Drop
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              className="cursor-not-allowed opacity-70"
              aria-disabled="true"
              onClick={(e) => {
                e.preventDefault();
                alert('Drop notifications coming soon.');
              }}
            >
              Notify Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
