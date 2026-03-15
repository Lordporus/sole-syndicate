'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState, useId } from 'react';
import { Button } from '@/components/atoms/Button';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

/* ─────────────────────────────────────────────
   Authentication Page — Sign In / Sign Up
   Client Component (form state).

   Supabase auth hooks are stubbed as TODO comments
   so they can be wired up when ready.
   ───────────────────────────────────────────── */

// Metadata cannot be exported from 'use client' files.
// Add the title via the parent layout or a separate generateMetadata export.
// Title: "Sign In | Sole Syndicate"

type Tab = 'signin' | 'signup';

function PasswordInput({
  id,
  label,
  name,
  autoComplete,
}: {
  id: string;
  label: string;
  name: string;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);
  const toggleId = `${id}-toggle`;

  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="font-mono text-xs text-secondary tracking-widest uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete ?? 'current-password'}
          required
          className="w-full bg-void border border-border text-primary px-md py-3 pr-12 text-sm focus:outline-none focus:border-gold transition-colors duration-fast placeholder:text-muted"
          placeholder="••••••••"
        />
        <button
          id={toggleId}
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

function TextField({
  id,
  label,
  type = 'text',
  name,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="font-mono text-xs text-secondary tracking-widest uppercase">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="w-full bg-void border border-border text-primary px-md py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-fast placeholder:text-muted"
        placeholder={placeholder}
      />
    </div>
  );
}

function SignInForm() {
  const uid = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      // TODO: wire Supabase auth
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      // router.push('/');
      console.log('Sign in:', { email, password: '***' });
      await new Promise((r) => setTimeout(r, 600)); // stub delay
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Sign in form" className="flex flex-col gap-md">
      <TextField id={`${uid}-email`} name="email" label="Email" type="email" autoComplete="email" placeholder="your@email.com" />
      <PasswordInput id={`${uid}-password`} name="password" label="Password" autoComplete="current-password" />

      {error && (
        <p role="alert" className="text-sm text-red-400 font-mono">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end">
        <button type="button" className="text-xs font-mono text-muted hover:text-gold transition-colors">
          Forgot password?
        </button>
      </div>

      <Button type="submit" variant="gold" size="lg" isLoading={isLoading} className="w-full mt-sm">
        Sign In
      </Button>
    </form>
  );
}

function SignUpForm() {
  const uid = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value;
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: wire Supabase auth
      // const { error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;
      console.log('Sign up attempted');
      await new Promise((r) => setTimeout(r, 600));
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Create account form" className="flex flex-col gap-md">
      <TextField id={`${uid}-email`} name="email" label="Email" type="email" autoComplete="email" placeholder="your@email.com" />
      <PasswordInput id={`${uid}-password`} name="password" label="Password" autoComplete="new-password" />
      <PasswordInput id={`${uid}-confirm`} name="confirm" label="Confirm Password" autoComplete="new-password" />

      {error && (
        <p role="alert" className="text-sm text-red-400 font-mono">
          {error}
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" isLoading={isLoading} className="w-full mt-sm">
        Create Account
      </Button>

      <p className="text-xs text-center text-muted font-mono">
        By creating an account you agree to our{' '}
        <Link href="/terms" className="text-gold hover:text-primary transition-colors">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-gold hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

export default function AuthenticationPage() {
  const [tab, setTab] = useState<Tab>('signin');

  return (
    <main
      id="main-content"
      className="min-h-screen bg-void flex flex-col items-center justify-center px-md py-24"
    >
      {/* Back link */}
      <div className="w-full max-w-md mb-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-xs font-mono text-xs text-muted hover:text-gold transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Sole Syndicate
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md border border-border bg-surface p-2xl">
        {/* Logo */}
        <div className="text-center mb-xl">
          <Link
            href="/"
            className="font-display text-2xl tracking-widest text-primary hover:text-gold transition-colors"
            aria-label="Sole Syndicate — Home"
          >
            SOLE<span className="text-gold">·</span>SYNDICATE
          </Link>
          <p className="font-mono text-xs text-muted mt-xs tracking-widest uppercase">
            Vault Access
          </p>
        </div>

        {/* Tab switcher */}
        <div role="tablist" aria-label="Authentication options" className="grid grid-cols-2 border border-border mb-xl">
          {(['signin', 'signup'] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              id={`tab-${t}`}
              onClick={() => setTab(t)}
              className={clsx(
                'py-3 text-xs font-mono tracking-widest uppercase transition-colors duration-fast',
                tab === t
                  ? 'bg-gold text-void'
                  : 'bg-void text-muted hover:text-primary'
              )}
            >
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div
          id="panel-signin"
          role="tabpanel"
          aria-labelledby="tab-signin"
          hidden={tab !== 'signin'}
        >
          {tab === 'signin' && <SignInForm />}
        </div>
        <div
          id="panel-signup"
          role="tabpanel"
          aria-labelledby="tab-signup"
          hidden={tab !== 'signup'}
        >
          {tab === 'signup' && <SignUpForm />}
        </div>

        {/* Divider and social auth placeholder */}
        <div className="mt-xl flex items-center gap-md">
          <div className="flex-1 border-t border-border" />
          <span className="font-mono text-xs text-muted">OR</span>
          <div className="flex-1 border-t border-border" />
        </div>
        <Button variant="ghost" size="md" className="w-full mt-md h-11" disabled>
          Continue with Google (coming soon)
        </Button>
      </div>
    </main>
  );
}
