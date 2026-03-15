'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { days, hours, minutes, seconds } = useCountdown(targetISO);

  return (
    <div
      className="flex items-center gap-md"
      aria-label={`Time until drop: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      role="timer"
    >
      {[
        { value: days, label: 'DD' },
        { value: hours, label: 'HH' },
        { value: minutes, label: 'MM' },
        { value: seconds, label: 'SS' },
      ].map(({ value, label }, i) => (
        <span key={label} className="flex items-start gap-md">
          <span className="flex flex-col items-center">
            <MonoLabel className="text-2xl md:text-4xl text-primary tabular-nums leading-none">
              {pad(value)}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: image moves up slightly as you scroll down
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section
      ref={ref}
      aria-labelledby="drop-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 motion-reduce:transform-none"
        aria-hidden="true"
      >
        <Image
          src={MOCK_FEATURED_DROP.imageUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
          priority
        />
        {/* Dark vignette — left-heavy for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-void via-void/75 to-void/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-void to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16 py-32 w-full max-w-[1440px] mx-auto flex flex-col items-start justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-lg"
        >
          {/* Live drop badge */}
          <Badge variant="drop">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-xs animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            Live Drop
          </Badge>

          {/* Product name */}
          <div>
            <h2
              id="drop-heading"
              className="font-display text-[32px] md:text-[48px] lg:text-[72px] leading-none tracking-tight text-primary mb-6"
            >
              {MOCK_FEATURED_DROP.productName}
            </h2>
            <MonoLabel muted>{MOCK_FEATURED_DROP.colorway}</MonoLabel>
          </div>

          {/* Countdown */}
          <div>
            <MonoLabel muted className="block mb-md">
              Drops in
            </MonoLabel>
            <CountdownTimer targetISO={MOCK_FEATURED_DROP.dropAt} />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-lg pt-sm border-t border-border/50">
            <div>
              <MonoLabel muted className="block mb-xs">
                Quantity
              </MonoLabel>
              <MonoLabel className="text-lg text-scarce">
                {MOCK_FEATURED_DROP.totalQty} pairs
              </MonoLabel>
            </div>
            <div>
              <MonoLabel muted className="block mb-xs">
                Price
              </MonoLabel>
              <MonoLabel className="text-lg">${MOCK_FEATURED_DROP.price}</MonoLabel>
            </div>
            <div>
              <MonoLabel muted className="block mb-xs">
                Condition
              </MonoLabel>
              <MonoLabel className="text-lg text-verified">DS — Deadstock</MonoLabel>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-md flex-wrap">
            <Link href={`/product/${MOCK_FEATURED_DROP.slug}`}>
              <Button variant="gold" size="lg">
                View Drop
              </Button>
            </Link>
            <Button variant="ghost" size="lg">
              Notify Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
