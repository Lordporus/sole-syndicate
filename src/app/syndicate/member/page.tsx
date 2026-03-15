import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';

export const metadata: Metadata = {
  title: 'Member Tier | Sole Syndicate',
  description: 'Become a Core Community Member at Sole Syndicate.',
};

export default function MemberTierPage() {
  return (
    <main className="min-h-screen bg-void pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <MonoLabel className="text-gold mb-4 uppercase tracking-widest">Core Community</MonoLabel>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">
          Member Tier
        </h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Proven collectors who have earned their place. Gain priority queue access, member-only discounts, and dedicated chat support.
        </p>
        
        <div className="bg-surface border border-border p-8 mb-8 text-left">
          <h3 className="font-display text-xl text-primary mb-4">Application Details</h3>
          <p className="text-secondary text-sm">
            To qualify for the Member Tier, you must have successfully purchased at least 3 authenticated pairs from Sole Syndicate or submit proof of your existing collection for review.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/authentication">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">Start Review</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">Return Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
