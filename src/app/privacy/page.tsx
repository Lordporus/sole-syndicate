import type { Metadata } from 'next';

/* ─────────────────────────────────────────────
   Privacy Policy Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Sole Syndicate collects, uses, and protects your personal data.',
  openGraph: {
    title: 'Privacy Policy | Sole Syndicate',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl text-primary mb-4 tracking-wide">{title}</h2>
      <div className="space-y-4 text-secondary leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void px-md pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-16 border-b border-border pb-8">
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display text-5xl text-primary mb-4">Privacy Policy</h1>
          <p className="text-secondary text-sm font-mono">Last updated: March 2026</p>
        </header>

        {/* Sections */}
        <Section title="Introduction">
          <p>
            Sole Syndicate (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website.
          </p>
          <p>
            Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong className="text-primary">Personal Data:</strong> Name, email address, billing address, and payment information provided during checkout.</li>
            <li><strong className="text-primary">Usage Data:</strong> Browser type, IP address, pages visited, time spent, and referring URLs.</li>
            <li><strong className="text-primary">Device Data:</strong> Device type, operating system, and unique device identifiers.</li>
          </ul>
        </Section>

        <Section title="How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Process transactions and send order confirmations.</li>
            <li>Send promotional and marketing communications (with your consent).</li>
            <li>Improve our website experience and product offerings.</li>
            <li>Comply with legal obligations and resolve disputes.</li>
          </ul>
        </Section>

        <Section title="Cookies & Tracking">
          <p>
            We use cookies and similar tracking technologies to monitor activity on our website.
            You can instruct your browser to refuse all cookies. Please refer to our{' '}
            <a href="/cookies" className="text-gold underline hover:text-primary transition-colors duration-fast">
              Cookie Policy
            </a>{' '}
            for more details.
          </p>
        </Section>

        <Section title="Third Party Services">
          <p>
            We may share your data with third-party vendors who assist in operating our website,
            conducting business, or servicing you, so long as those parties agree to keep your
            information confidential. These include payment processors (Stripe) and analytics
            providers.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@solesyndicate.com" className="text-gold underline hover:text-primary transition-colors duration-fast">
              privacy@solesyndicate.com
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}
