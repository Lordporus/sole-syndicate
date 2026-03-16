import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { Users, ShieldCheck, Globe } from 'lucide-react';

const BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c+bMfwAJoAHwov6H3gAAAABJRU5ErkJggg==';

/* ─────────────────────────────────────────────
   About Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The philosophy and mission behind Sole Syndicate. We treat sneakers like art.',
  openGraph: {
    title: 'About Us | Sole Syndicate',
  },
};

const coreValues = [
  {
    icon: ShieldCheck,
    title: 'Uncompromising Authenticity',
    description: 'We believe provenance is everything. Our multi-point authentication process ensures every pair is certified genuine before it ever reaches our vault.',
  },
  {
    icon: Globe,
    title: 'Global Curation',
    description: 'Sourcing the rarest Grails from trusted collectors worldwide. We do not just sell sneakers; we curate museum-grade collections.',
  },
  {
    icon: Users,
    title: 'Syndicate Community',
    description: 'Built for those who understand the culture. We foster a network of collectors connected by a shared reverence for sneaker history.',
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void">
      {/* Container: max-w-7xl mx-auto px-8 py-32 */}
      <div className="max-w-7xl mx-auto px-8 py-32">

        {/* ── Hero Section ── */}
        <section className="mb-24 flex flex-col items-center text-center">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">Our Philosophy</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            More Than Footwear. <br />
            <span className="text-secondary italic font-serif">A Vested Asset.</span>
          </h1>
          <p className="max-w-2xl text-secondary text-lg leading-relaxed">
            Sole Syndicate was founded on a singular premise: sneakers are modern art.
            We provide a sanctuary for collectors who demand absolute authenticity,
            white-glove service, and access to the rarest silhouettes in existence.
          </p>
        </section>

        {/* ── Brand Story ── */}
        <section className="mb-24 flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          <div className="w-full md:w-[50%] lg:w-[55%] aspect-4/5 relative rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden group">
            <Image
              src="/images/sneakers/air-jordan-1-chicago/zoomedin.webp"
              alt="Air Jordan 1 Chicago detail — editorial close-up"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              loading="lazy"
              className="object-cover opacity-90 transition-transform duration-600ms ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 border border-gold/10 rounded-xl pointer-events-none" aria-hidden="true" />
          </div>
          <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            <h2 className="font-display text-[48px] md:text-[64px] tracking-tight leading-none text-primary mb-8">The Genesis</h2>
            <div className="text-[18px] leading-relaxed max-w-[520px] text-secondary">
              <p className="mb-6">
                Before Sole Syndicate, the secondary market was a gamble. Collectors spent as much time
                verifying their purchases as they did enjoying them. We saw a fractured landscape lacking
                the premium trust required for high-stakes transactions.
              </p>
              <p className="mb-6">
                In 2024, an alliance of industry veterans, authentication specialists, and lifelong
                collectors formed the Syndicate. Our objective was not to build another marketplace—it
                was to architect an institution.
              </p>
              <p className="mb-6">
                Today, every pair that passes through our doors is treated with archival reverence.
                We have eliminated the uncertainty of the aftermarket, replacing it with a guarantee
                backed by elite expertise.
              </p>
            </div>
          </div>
        </section>

        {/* ── Our Mission ── */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-primary mb-sm">Core Values</h2>
            <p className="text-secondary">The pillars that uphold the Syndicate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {coreValues.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-surface border border-border p-8 flex flex-col gap-sm hover:border-gold/50 transition-colors duration-normal">
                <Icon size={24} className="text-gold mb-xs" aria-hidden="true" />
                <h3 className="font-sans font-bold text-primary text-lg">{title}</h3>
                <p className="text-secondary leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Community Section ── */}
        <section className="mb-24 bg-surface border border-border py-4xl px-md text-center">
          <h2 className="font-display text-3xl text-primary mb-md">Built entirely for the culture.</h2>
          <p className="max-w-xl mx-auto text-secondary leading-relaxed mb-xl">
            We are not just facilitating transactions; we are archiving history.
            The Syndicate is a closed-loop ecosystem of individuals who recognize that
            what you wear tells the story of who you are.
          </p>
          <div className="flex justify-center flex-wrap gap-md">
            <Link href="/authentication">
              <Button variant="ghost" size="lg">Review Authentication</Button>
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center">
          <h2 className="font-display text-4xl text-primary mb-md">Become a Member</h2>
          <p className="text-secondary mb-xl">Unlock priority access to Vault drops and private sourcing.</p>
          <Link href="/syndicate">
            <Button variant="gold" size="lg">Join the Syndicate</Button>
          </Link>
        </section>

      </div>
    </main>
  );
}
