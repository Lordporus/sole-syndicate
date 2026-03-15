import { clsx } from 'clsx';
import { SneakerCard } from '@/components/molecules/SneakerCard';
import type { Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   ProductGrid — Responsive masonry-style grid
   of SneakerCard components.

   Layout:
   - Mobile: 2 columns
   - Tablet (md): 2 columns, larger gap
   - Desktop (lg): 3 columns
   - XL: 4 columns (collections page)

   This is a Server Component — receives products
   passed from a parent Server Component or page.
   ───────────────────────────────────────────── */

interface ProductGridProps {
  products: Product[];
  /** Show 4 columns at xl breakpoint (for /collections page) */
  wide?: boolean;
  className?: string;
}

export function ProductGrid({ products, wide = false, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5xl text-center">
        <p className="font-serif italic text-2xl text-secondary mb-md">
          Nothing here yet.
        </p>
        <p className="text-mono-label text-muted">Check back when the next drop lands.</p>
      </div>
    );
  }

  return (
    <section
      aria-label="Product grid"
      className={clsx(
        'grid gap-6 lg:gap-10',
        // Column layout
        'grid-cols-2',
        wide ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3',
        className
      )}
    >
      {products.map((product) => (
        <SneakerCard key={product.id} product={product} />
      ))}
    </section>
  );
}
