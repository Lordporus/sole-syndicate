import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';

/* ─────────────────────────────────────────────
   Product Not Found — renders when getProductBySlug
   returns null. Re-uses standard Next.js not-found
   convention for the /product/[slug] route.
   ───────────────────────────────────────────── */

export default function ProductNotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-void flex flex-col items-center justify-center text-center px-md"
    >
      <MonoLabel muted className="block mb-md">
        404 — Product not found
      </MonoLabel>
      <h1 className="font-display text-5xl md:text-7xl text-primary mb-lg">
        This pair doesn&apos;t exist.
      </h1>
      <p className="font-serif italic text-secondary max-w-sm mb-2xl text-lg leading-relaxed">
        It may have sold, never dropped, or been pulled from the vault.
      </p>
      <Link href="/collections">
        <Button variant="gold" size="lg">
          Browse Available Pairs
        </Button>
      </Link>
    </main>
  );
}
