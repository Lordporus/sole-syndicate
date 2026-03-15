import { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solesyndicate.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProductSlugs();

  const productPages = slugs.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productPages,
  ];
}
