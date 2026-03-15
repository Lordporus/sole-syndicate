'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { useCartStore } from '@/lib/store/cartStore';

/* ─────────────────────────────────────────────
   Success Page — Order Confirmation
   ───────────────────────────────────────────── */

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isMock = searchParams.get('mock');
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear the local cart on successful checkout
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md mx-auto flex flex-col items-center text-center gap-lg"
    >
      <div className="w-16 h-16 bg-verified/20 text-verified rounded-full flex items-center justify-center mb-sm">
        <CheckCircle size={32} />
      </div>

      <h1 className="font-display text-4xl text-primary">Order Confirmed</h1>

      <div className="space-y-sm text-secondary text-base leading-relaxed">
        <p>Your authentication process has begun.</p>
        <p>
          We will email your tracking details once the vault verifies your pair.
        </p>
      </div>

      {(sessionId || isMock) && (
        <div className="bg-surface border border-border rounded-sm p-4 w-full mt-sm">
          <MonoLabel muted className="text-xs mb-1">Order Reference</MonoLabel>
          <MonoLabel className="text-sm truncate">
            {sessionId || 'EXT-MOCK-99420-ALF'}
          </MonoLabel>
        </div>
      )}

      <div className="mt-xl w-full">
        <Link href="/">
          <Button variant="gold" size="lg" className="w-full">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-void flex flex-col items-center justify-center px-md pt-24 pb-32"
    >
      <Suspense fallback={<div className="text-secondary text-sm font-mono">Verifying details...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
