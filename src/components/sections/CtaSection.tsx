'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';

/* ─────────────────────────────────────────────
   CtaSection — Newsletter / drop list signup.

   Minimal. No marketing language. Just the ask.
   "The drop list. No noise."
   ───────────────────────────────────────────── */

export function CtaSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    // TODO: Wire to email service (Resend / Mailchimp / etc.)
    await new Promise((r) => setTimeout(r, 1000)); // mock delay
    setStatus('success');
    setEmail('');
  };

  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 px-6 md:px-10 lg:px-16 w-full max-w-[1440px] mx-auto bg-void border-t border-border"
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-lg"
        >
          <MonoLabel muted className="mb-8">The drop list</MonoLabel>

          <h2
            id="cta-heading"
            className="font-display text-[32px] md:text-[48px] lg:text-[72px] leading-none tracking-tight text-primary mb-6"
          >
            NO NOISE.
          </h2>

          <p className="font-serif italic text-secondary text-lg leading-[30px] max-w-[640px] mx-auto mb-8">
            First to know. No spam. Unsubscribe any time.
          </p>

          {status === 'success' ? (
            <p className="text-mono-label text-verified py-lg">
              You&rsquo;re on the list.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full flex gap-sm"
              aria-label="Email signup for drop notifications"
            >
              <div className="flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  className="w-full bg-surface border border-border text-primary text-sm px-md py-3 rounded-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:border-gold transition-colors duration-fast min-h-11"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="md"
                isLoading={status === 'submitting'}
                className="shrink-0"
              >
                Join
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-mono-label text-drop" role="alert">
              Something went wrong. Try again.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
