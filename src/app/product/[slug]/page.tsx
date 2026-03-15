import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

/* ─────────────────────────────────────────────
   Product Detail Page — Server Component.

   - Data fetched server-side via products service
   - generateStaticParams pre-renders all known slugs
   - ProductDetailClient handles all interactivity
     (gallery, size selection, add-to-cart)
   ───────────────────────────────────────────── */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found — Sole Syndicate' };

  return {
    title: `${product.model} "${product.colorway}" — Sole Syndicate`,
    description: product.heritage
      ? `${product.heritage} ${product.condition} · US sizes ${product.availableSizes.join(', ')} · $${product.price}`
      : `${product.brand} ${product.model} in ${product.colorway}. ${product.condition} condition. Available in sizes ${product.availableSizes.join(', ')}.`,
    openGraph: {
      title: `${product.model} "${product.colorway}"`,
      description: product.heritage ?? `${product.brand} ${product.model} ${product.colorway}`,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
