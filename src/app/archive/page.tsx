import type { Metadata } from 'next';
import { getArchivedDrops } from '@/lib/products';
import { ProductGrid } from '@/components/molecules/ProductGrid';
import { MonoLabel } from '@/components/atoms/MonoLabel';

export const metadata: Metadata = {
  title: 'Sneaker Archive | Sole Syndicate',
  description: 'Explore the Sole Syndicate vault of past sneaker releases and legendary drops.',
  openGraph: {
    title: 'Sneaker Archive | Sole Syndicate',
  },
};

/* Filter UI Placeholder */
function ArchiveFilters() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-md mb-xl p-md border border-border bg-surface">
      <div className="flex items-center gap-lg overflow-x-auto w-full md:w-auto overflow-y-hidden pb-2 md:pb-0">
        <div className="flex items-center gap-sm shrink-0">
          <MonoLabel muted>Brand:</MonoLabel>
          <select className="bg-void border border-border text-primary text-sm px-3 py-1.5 focus:outline-none focus:border-gold">
            <option>All Brands</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>New Balance</option>
          </select>
        </div>
        <div className="flex items-center gap-sm shrink-0">
          <MonoLabel muted>Release Year:</MonoLabel>
          <select className="bg-void border border-border text-primary text-sm px-3 py-1.5 focus:outline-none focus:border-gold">
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>Pre-2023</option>
          </select>
        </div>
        <div className="flex items-center gap-sm shrink-0">
          <MonoLabel muted>Price:</MonoLabel>
          <select className="bg-void border border-border text-primary text-sm px-3 py-1.5 focus:outline-none focus:border-gold">
            <option>Any Price</option>
            <option>Under $300</option>
            <option>$300 - $600</option>
            <option>Over $600</option>
          </select>
        </div>
      </div>
      <div className="shrink-0 text-sm font-mono text-gold cursor-pointer hover:text-primary transition-colors">
        [ Reset Filters ]
      </div>
    </div>
  );
}

export default async function ArchivePage() {
  // Fetch products with drop_tag = 'archived'
  const archived = await getArchivedDrops();

  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-md md:px-xl">
        
        {/* ── Hero Section ── */}
        <section className="mb-16 border-b border-border pb-16">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">The Vault</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            Drop <span className="text-secondary italic font-serif">Archive.</span>
          </h1>
          <p className="max-w-2xl text-secondary leading-relaxed">
            History certified. Browse our extensive catalogue of previously released holy grails and 
            limited collaborations. Some archival pairs may still be available in highly limited sizes.
          </p>
        </section>

        {/* ── Filtering System (UI ONLY) ── */}
        <ArchiveFilters />

        {/* ── Archive Grid ── */}
        <section>
          {archived.length > 0 ? (
            <ProductGrid products={archived} wide />
          ) : (
            <div className="py-24 text-center border border-border border-dashed">
              <p className="text-secondary font-mono text-sm uppercase tracking-widest">No Items in Archive</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
