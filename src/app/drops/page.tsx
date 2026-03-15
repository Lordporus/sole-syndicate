import type { Metadata } from 'next';
import { getDrops } from '@/lib/products';
import { ProductGrid } from '@/components/molecules/ProductGrid';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export const metadata: Metadata = {
  title: 'Sneaker Drops | Sole Syndicate',
  description: 'Upcoming and recent sneaker releases, highly curated, authenticated, and secured.',
  openGraph: {
    title: 'Sneaker Drops | Sole Syndicate',
  },
};

/* Next Drop Countdown Placeholder */
function NextDropCountdown() {
  return (
    <div className="flex justify-center gap-md my-xl border-y border-border py-lg">
      <div className="text-center">
        <div className="font-display text-4xl text-primary">02</div>
        <MonoLabel muted className="text-xs">DAYS</MonoLabel>
      </div>
      <div className="font-display text-4xl text-primary">:</div>
      <div className="text-center">
        <div className="font-display text-4xl text-primary">14</div>
        <MonoLabel muted className="text-xs">HRS</MonoLabel>
      </div>
      <div className="font-display text-4xl text-primary">:</div>
      <div className="text-center">
        <div className="font-display text-4xl text-primary">30</div>
        <MonoLabel muted className="text-xs">MIN</MonoLabel>
      </div>
      <div className="font-display text-4xl text-primary">:</div>
      <div className="text-center">
        <div className="font-display text-4xl text-primary">00</div>
        <MonoLabel muted className="text-xs">SEC</MonoLabel>
      </div>
    </div>
  );
}

export default async function DropsPage() {
  // Fetch products with drop_tag = 'upcoming'
  const drops = await getDrops();
  
  // Choose one for the featured banner
  const featured = drops[0] || null;

  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-md md:px-xl">
        
        {/* ── Hero Section ── */}
        <section className="mb-16 text-center">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">Release Radar</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            Upcoming <span className="text-secondary italic font-serif">Drops.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-secondary leading-relaxed">
            The vault opens strictly on schedule. Browse our upcoming curated releases below.
            Syndicate members receive 15-minute priority access to all drops.
          </p>
          
          <NextDropCountdown />
        </section>

        {/* ── Featured Drop Banner ── */}
        {featured && (
          <section className="mb-24 relative overflow-hidden group border border-border bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-square lg:aspect-auto">
                <Image
                  src={featured.images[0]?.url || '/images/sneakers/air-jordan-1-chicago/side.webp'}
                  alt={`Release photo of ${featured.brand} ${featured.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-slow group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-xl md:p-3xl bg-surface/80 backdrop-blur-md">
                <MonoLabel className="text-gold mb-md">Headline Drop</MonoLabel>
                <h2 className="font-display text-4xl text-primary mb-sm">{featured.brand} {featured.model}</h2>
                <p className="font-sans text-xl text-secondary mb-xl">{featured.colorway}</p>
                <p className="text-secondary leading-relaxed mb-xl max-w-md">
                  {featured.heritage || 'Prepare for one of the most highly anticipated vault releases of the season. Guaranteed authentic context.'}
                </p>
                <div className="flex items-center gap-md">
                  <Link href={`/product/${featured.slug}`}>
                    <Button variant="gold" size="lg">Preview Drop</Button>
                  </Link>
                  <MonoLabel>Est. ${featured.price}</MonoLabel>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Upcoming Drops Grid ── */}
        <section>
          <div className="flex items-end justify-between border-b border-border pb-lg mb-xl">
            <h2 className="font-display text-3xl text-primary">The Schedule</h2>
            <MonoLabel muted>{drops.length} Scheduled</MonoLabel>
          </div>
          
          {drops.length > 0 ? (
            <ProductGrid products={drops} wide />
          ) : (
            <div className="py-24 text-center border border-border border-dashed">
              <p className="text-secondary font-mono text-sm uppercase tracking-widest">No Drops Scheduled</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
