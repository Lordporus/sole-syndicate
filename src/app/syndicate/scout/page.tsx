import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';

export const metadata: Metadata = {
  title: 'Scout Membership | Sole Syndicate',
  description: 'Apply for Scout Membership at Sole Syndicate.',
};

export default function ScoutMembershipPage() {
  return (
    <main className="min-h-screen bg-void pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <MonoLabel className="text-gold mb-4 uppercase tracking-widest">Entry Level</MonoLabel>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">
          Scout Membership
        </h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Your first step into the vault. Access the public catalogue and get early drop notifications to secure your pair before the general public.
        </p>
        
        <div className="bg-surface border border-border p-8 mb-8 text-left">
          <h3 className="font-display text-xl text-primary mb-4">Application Pending</h3>
          <p className="text-secondary text-sm">
            Thank you for your interest. Membership applications for the Scout tier open shortly. Join our newsletter to get notified when applications go live.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/authentication">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">Notify Me</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">Return Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
