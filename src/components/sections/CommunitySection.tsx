'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { Badge } from '@/components/atoms/Badge';

/* ─────────────────────────────────────────────
   CommunitySection — Act 5: The Syndicate

   Members-only tier teaser.
   Dark UI, exclusive badge system.
   Rolling ticker of recent authenticated sales.
   Membership tier cards: Scout / Member / Syndicate
   ───────────────────────────────────────────── */

// TODO: Replace with live data from Supabase Realtime
const SALES_TICKER = [
  'AJ1 Chicago DS 10 — Authenticated ✓',
  'Yeezy 350 Zebra 9.5 — Authenticated ✓',
  'Nike Dunk Low Panda 11 — Authenticated ✓',
  'Air Max 90 Infrared 8 — Authenticated ✓',
  'Jordan 4 Bred 10.5 — Authenticated ✓',
  'NB 550 White Green 9 — Authenticated ✓',
  'Air Max 1 Anniversary 10 — Authenticated ✓',
];

const TIERS = [
  {
    name: 'Scout',
    badge: 'condition' as const,
    description: 'Community access. Early drop notifications. Verified purchase history.',
    perks: ['Drop alerts', 'Community forum', 'Basic auth checks'],
    price: 'Free',
    cta: 'Get Started',
    href: '/syndicate/scout',
    featured: false,
  },
  {
    name: 'Member',
    badge: 'verified' as const,
    description: '24hr early access. Authentication priority. Member-only listings.',
    perks: ['24-hr early access', 'Auth priority service', 'Member auction floor'],
    price: '$12 / mo',
    cta: 'Become a Member',
    href: '/syndicate/member',
    featured: false,
  },
  {
    name: 'Syndicate',
    badge: 'edition' as const,
    description: 'The inner circle. First at every drop. Invite-only events. Vault access.',
    perks: ['First access to all drops', 'Vault collection preview', 'Invite-only events', 'Dedicated concierge'],
    price: '$48 / mo',
    cta: 'Apply for Access',
    href: '/syndicate',
    featured: true,
  },
];

export function CommunitySection() {
  return (
    <aside
      aria-labelledby="syndicate-heading"
      className="py-4xl bg-surface border-t border-border overflow-hidden"
    >
      {/* ── Live ticker strip ── */}
      <div
        className="overflow-hidden py-md mb-3xl border-y border-border"
        aria-label="Recent authenticated sales"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="flex gap-3xl whitespace-nowrap motion-reduce:animate-none"
        >
          {/* Duplicate for seamless loop */}
          {[...SALES_TICKER, ...SALES_TICKER].map((sale, i) => (
            <span key={i} className="inline-flex items-center gap-sm shrink-0">
              <span className="w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
              <MonoLabel muted className="text-xs">
                {sale}
              </MonoLabel>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="px-md md:px-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-3xl"
        >
          <MonoLabel muted className="block mb-md">
            Members Only
          </MonoLabel>
          <h2
            id="syndicate-heading"
            className="font-display text-5xl md:text-6xl text-primary mb-lg"
          >
            THE SYNDICATE
          </h2>
          <p className="font-sans text-secondary text-base leading-relaxed max-w-lg">
            Authenticated by collectors, for collectors. Access early drops, exclusive
            pairs, and a private community of serious enthusiasts.
          </p>
        </motion.div>

        {/* ── Tier cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {TIERS.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-lg border rounded-card transition-shadow duration-normal ${
                tier.featured
                  ? 'bg-void border-gold shadow-glow-gold'
                  : 'bg-surface border-border hover:border-muted'
              }`}
            >
              {tier.featured && (
                <div className="absolute inset-0 rounded-card overflow-hidden pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-60" />
                </div>
              )}

              <div className="flex items-center justify-between mb-lg">
                <h3 className="font-display text-2xl text-primary">
                  {tier.name.toUpperCase()}
                </h3>
                <Badge variant={tier.badge}>{tier.name}</Badge>
              </div>

              <p className="font-serif italic text-sm text-secondary leading-relaxed mb-xl flex-1">
                {tier.description}
              </p>

              <ul className="space-y-sm mb-2xl" role="list">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-sm text-sm text-secondary">
                    <span
                      className={`w-1 h-1 rounded-full shrink-0 ${tier.featured ? 'bg-gold' : 'bg-muted'}`}
                      aria-hidden="true"
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <MonoLabel muted className="block mb-md">
                  {tier.price}
                </MonoLabel>
                <Link href={tier.href}>
                  <Button
                    variant={tier.featured ? 'gold' : 'ghost'}
                    size="md"
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </aside>
  );
}
