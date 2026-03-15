import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/molecules/ProductGrid';
import { MonoLabel } from '@/components/atoms/MonoLabel';

/* ─────────────────────────────────────────────
   Collections Page — /collections

   Server Component — fetches all products and
   renders them in the full 4-column ProductGrid.
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Collections — Sole Syndicate',
  description:
    'Browse every authenticated pair in the Sole Syndicate archive. Rare, deadstock, and vault-pulled silhouettes.',
};

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <main id="main-content" className="min-h-screen bg-void pt-24 pb-5xl">
      <div className="px-md md:px-xl max-w-screen-xl mx-auto">
        {/* Page header */}
        <header className="mb-2xl">
          <MonoLabel muted className="block mb-sm">
            {products.length} pairs available
          </MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary leading-none">
            THE ARCHIVE
          </h1>
        </header>

        {/* Product grid */}
        <ProductGrid products={products} wide />
      </div>
    </main>
  );
}
