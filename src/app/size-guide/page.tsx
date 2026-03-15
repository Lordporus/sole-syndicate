import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Size Guide | Sole Syndicate',
  description: 'Understand sizing across different sneaker brands and models.',
};

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-void pt-32 pb-24 flex items-center justify-center">
      <Container className="text-center max-w-2xl">
        <MonoLabel className="text-gold mb-4 uppercase tracking-widest">Reference</MonoLabel>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">
          Size Guide
        </h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Sneaker sizing can vary wildly between brands and even specific models. 
          Our comprehensive sizing charts are being updated to reflect the latest fits.
        </p>
        
        <div className="bg-surface border border-border p-8 mb-8 text-left">
          <h3 className="font-display text-xl text-primary mb-4">Coming Soon</h3>
          <p className="text-secondary text-sm">
            We're compiling detailed, authenticated fit data for Jordan, Nike, New Balance, and luxury designers. 
            Check back shortly for the full reference guide.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="ghost" size="lg">Return Home</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
