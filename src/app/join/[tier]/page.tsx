'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { use } from 'react';

/* ─────────────────────────────────────────────
   Membership Application Page — /join/[tier]

   Dynamic route that reads `tier` from params.
   Currently logs submissions; wire to Supabase
   when auth is ready.
   ───────────────────────────────────────────── */

interface TierConfig {
  name: string;
  tagline: string;
  benefits: string[];
}

const TIER_CONFIGS: Record<string, TierConfig> = {
  scout: {
    name: 'Scout',
    tagline: 'Entry Level',
    benefits: [
      'Early drop notifications (15 min)',
      'Access to public catalogue',
      'Syndicate newsletter',
      'Verified purchase badge',
    ],
  },
  member: {
    name: 'Member',
    tagline: 'Core Community',
    benefits: [
      'All Scout benefits',
      'Priority drop queue (30 min)',
      'Member-only 5% discount',
      'Access to Member Sale events',
      'Dedicated chat support',
    ],
  },
  collector: {
    name: 'Collector',
    tagline: 'Curated Tier',
    benefits: [
      'All Member benefits',
      'Vault pre-release access',
      'Concierge sourcing requests',
      'Invited to private events',
      'Personal account manager',
      'Free authentication on trade-ins',
    ],
  },
  'inner-circle': {
    name: 'Inner Circle',
    tagline: 'Elite — Invite Only',
    benefits: [
      'All Collector benefits',
      'Vault first access (60 min)',
      'White-glove delivery service',
      'Co-creation drops with Syndicate',
      'Annual private dinner',
      'Dedicated sourcing fund',
    ],
  },
};

function TextField({
  id,
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  required = true,
  multiline = false,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const commonClasses =
    'w-full bg-void border border-border text-primary px-md py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-fast placeholder:text-muted resize-none';

  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="font-mono text-xs text-secondary tracking-widest uppercase">
        {label}
        {required && <span className="text-gold ml-xs" aria-hidden="true">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={commonClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
    </div>
  );
}

function ApplicationForm({ tier }: { tier: string }) {
  const uid = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const data = {
      tier,
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      interests: (form.elements.namedItem('interests') as HTMLInputElement).value,
      social: (form.elements.namedItem('social') as HTMLInputElement).value,
      motivation: (form.elements.namedItem('motivation') as HTMLTextAreaElement).value,
    };

    // TODO: POST to /api/membership/apply or Supabase insert
    console.log('[Syndicate Application]', data);
    await new Promise((r) => setTimeout(r, 800)); // stub

    setIsLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-lg py-2xl border border-border bg-surface/60 p-xl">
        <CheckCircle2 size={40} className="text-gold" aria-hidden="true" />
        <div>
          <h3 className="font-display text-2xl text-primary mb-sm">Application Received</h3>
          <p className="text-secondary text-sm max-w-md">
            We review every application personally. You will hear from us within 72 hours if your
            profile aligns with the{' '}
            <span className="text-gold font-semibold capitalize">{tier}</span> tier.
          </p>
        </div>
        <Link href="/syndicate">
          <Button variant="ghost" size="md">View All Tiers</Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={`Application form for the ${tier} membership tier`}
      className="flex flex-col gap-lg"
    >
      <TextField
        id={`${uid}-fullName`}
        name="fullName"
        label="Full Name"
        autoComplete="name"
        placeholder="Your name as it appears on your ID"
      />
      <TextField
        id={`${uid}-email`}
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        placeholder="you@email.com"
      />
      <TextField
        id={`${uid}-interests`}
        name="interests"
        label="Sneaker Interests"
        placeholder="e.g. Jordans, New Balance, vintage NIKElab…"
        required={false}
      />
      <TextField
        id={`${uid}-social`}
        name="social"
        label="Instagram / Social Profile"
        placeholder="@handle or URL"
        required={false}
      />
      <TextField
        id={`${uid}-motivation`}
        name="motivation"
        label="Why do you want to join?"
        placeholder="Tell us about your collection and your relationship with the culture…"
        multiline
      />

      <p className="text-xs font-mono text-muted">
        <span className="text-gold">*</span> Required fields
      </p>

      <Button type="submit" variant="gold" size="lg" isLoading={isLoading} className="w-full">
        Submit Application
      </Button>
    </form>
  );
}

export default function JoinTierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier } = use(params);
  const config = TIER_CONFIGS[tier];

  if (!config) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-md md:px-xl">
        {/* Back link */}
        <div className="mb-xl">
          <Link
            href="/syndicate"
            className="inline-flex items-center gap-xs font-mono text-xs text-muted hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Membership Tiers
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2xl">
          {/* ── Sidebar: Tier Info ── */}
          <aside className="lg:col-span-2">
            <div className="border border-border bg-surface p-xl sticky top-32">
              <MonoLabel muted className="text-xs mb-sm">{config.tagline}</MonoLabel>
              <h1 className="font-display text-4xl text-primary mb-md">{config.name}</h1>
              <p className="text-secondary text-sm leading-relaxed mb-xl">
                What you get as a {config.name} member:
              </p>

              <ul className="flex flex-col gap-sm" role="list" aria-label={`${config.name} benefits`}>
                {config.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-sm">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Main: Application Form ── */}
          <div className="lg:col-span-3">
            <div className="mb-xl">
              <h2 className="font-display text-3xl text-primary mb-sm">Application</h2>
              <p className="text-secondary text-sm leading-relaxed">
                Membership applications are reviewed personally by the Syndicate team. Complete the
                form below and we will follow up within 72 hours.
              </p>
            </div>

            <ApplicationForm tier={tier} />
          </div>
        </div>
      </div>
    </main>
  );
}
