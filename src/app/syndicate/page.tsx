import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

/* ─────────────────────────────────────────────
   Syndicate Membership Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'The Syndicate | Sole Syndicate',
  description:
    'Explore the Sole Syndicate membership tiers. Gain priority drop access, vault exclusives, and direct sourcing privileges.',
  openGraph: {
    title: 'The Syndicate | Sole Syndicate',
  },
};

interface Tier {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  isFeatured?: boolean;
}

const TIERS: Tier[] = [
  {
    slug: 'scout',
    name: 'Scout',
    tagline: 'Entry Level',
    description: 'Your first step into the vault. Access to the public catalogue and early drop notifications.',
    benefits: [
      'Early drop notifications (15 min)',
      'Access to public catalogue',
      'Syndicate newsletter',
      'Verified purchase badge',
    ],
  },
  {
    slug: 'member',
    name: 'Member',
    tagline: 'Core Community',
    description: 'Proven collectors who have earned their place. Priority queue access and member-only discounts.',
    benefits: [
      'All Scout benefits',
      'Priority drop queue (30 min)',
      'Member-only 5% discount',
      'Access to Member Sale events',
      'Dedicated chat support',
    ],
  },
  {
    slug: 'collector',
    name: 'Collector',
    tagline: 'Curated Tier',
    isFeatured: true,
    description: 'For the serious buyer. Access to rare vault pulls, pre-release previews, and concierge sourcing.',
    benefits: [
      'All Member benefits',
      'Vault pre-release access',
      'Concierge sourcing requests',
      'Invited to private events',
      'Personal account manager',
      'Free authentication on trade-ins',
    ],
  },
  {
    slug: 'inner-circle',
    name: 'Inner Circle',
    tagline: 'Elite — Invite Only',
    description:
      'The top tier. Reserved for industry insiders, serious investors, and the most prolific collectors.',
    benefits: [
      'All Collector benefits',
      'Vault first access (60 min)',
      'White-glove delivery service',
      'Co-creation drops with Syndicate',
      'Annual private dinner',
      'Dedicated sourcing fund',
    ],
  },
];

export default function SyndicatePage() {
  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-md md:px-xl">
        {/* ── Hero ── */}
        <section className="mb-24 text-center">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">Membership</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            Join the <span className="text-secondary italic font-serif">Syndicate.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-secondary text-lg leading-relaxed">
            The Syndicate is a tiered membership system designed to reward collectors who are
            serious about the culture. The higher your tier, the deeper your vault access.
          </p>
        </section>

        {/* ── Tier Grid ── */}
        <section aria-label="Membership tiers">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-xl">
            {TIERS.map((tier) => (
              <div
                key={tier.slug}
                className={clsx(
                  'relative flex flex-col border p-xl transition-colors duration-normal',
                  tier.isFeatured
                    ? 'border-gold bg-surface shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)]'
                    : 'border-border bg-surface hover:border-gold/40'
                )}
              >
                {/* Featured badge */}
                {tier.isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-void text-xs font-mono px-md py-0.5 tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-lg pb-lg border-b border-border/50">
                  <MonoLabel muted className="text-xs mb-xs">
                    {tier.tagline}
                  </MonoLabel>
                  <h2 className="font-display text-3xl text-primary">{tier.name}</h2>
                  <p className="text-secondary text-sm leading-relaxed mt-sm">{tier.description}</p>
                </div>

                {/* Benefits */}
                <ul className="flex flex-col gap-sm mb-xl flex-1" role="list" aria-label={`${tier.name} benefits`}>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-sm">
                      <Check
                        size={14}
                        className="text-gold mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={`/join/${tier.slug}`} aria-label={`Apply for ${tier.name} membership`}>
                  <Button
                    variant={tier.isFeatured ? 'gold' : 'ghost'}
                    size="lg"
                    className="w-full"
                  >
                    {tier.slug === 'inner-circle' ? 'Request Invite' : 'Apply Now'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ callout ── */}
        <section className="mt-24 border border-border p-2xl grid md:grid-cols-2 gap-xl items-center">
          <div>
            <h3 className="font-display text-2xl text-primary mb-sm">
              Already have an account?
            </h3>
            <p className="text-secondary">
              Sign in to manage your membership, view your tier status, and access exclusive drops.
            </p>
          </div>
          <div className="flex gap-md">
            <Link href="/authentication">
              <Button variant="gold" size="lg">Sign In</Button>
            </Link>
            <Link href="/authentication">
              <Button variant="ghost" size="lg">Create Account</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
