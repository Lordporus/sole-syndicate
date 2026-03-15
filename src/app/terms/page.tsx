import type { Metadata } from 'next';

/* ─────────────────────────────────────────────
   Terms of Service Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Sole Syndicate and purchasing authenticated sneakers.',
  openGraph: {
    title: 'Terms of Service | Sole Syndicate',
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

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void px-md pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-16 border-b border-border pb-8">
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display text-5xl text-primary mb-4">Terms of Service</h1>
          <p className="text-secondary text-sm font-mono">Last updated: March 2026</p>
        </header>

        <Section title="Introduction">
          <p>
            By accessing and using Sole Syndicate, you accept and agree to be bound by the terms
            and provision of this agreement. These Terms of Service govern your use of our website
            and our services.
          </p>
          <p>
            If you do not agree to abide by these terms, you are not authorised to use or access
            this website.
          </p>
        </Section>

        <Section title="Use of Website">
          <p>
            You agree to use our website only for lawful purposes and in a way that does not
            infringe the rights of, restrict, or inhibit anyone else&rsquo;s use and enjoyment of the website.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>You must be at least 18 years old to make purchases.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree not to use the site for any fraudulent or abusive activity.</li>
          </ul>
        </Section>

        <Section title="Product Availability">
          <p>
            All products are subject to availability. We reserve the right to discontinue or alter
            the specification of any product without notice. Product images are for illustrative
            purposes only and may vary slightly from the actual product.
          </p>
        </Section>

        <Section title="Payments">
          <p>
            All prices are listed in USD and are inclusive of applicable taxes unless otherwise stated.
            We use Stripe as our payment processor. By completing a purchase, you agree to
            Stripe&rsquo;s terms of service in addition to our own.
          </p>
          <p>
            We reserve the right to refuse or cancel any order at our discretion, including in
            cases of suspected fraud or pricing errors.
          </p>
        </Section>

        <Section title="Returns & Refunds">
          <p>
            Due to the nature of authenticated luxury goods, all sales are final once authentication
            has been verified. If you receive a product that does not match our authentication
            standards, please contact us within 48 hours of receipt.
          </p>
          <p>
            Sole Syndicate&rsquo;s authenticity guarantee protects you against receiving counterfeit goods.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Sole Syndicate shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including loss of
            profits, data, or goodwill, arising out of or in connection with your use of our website
            or services.
          </p>
        </Section>
      </div>
    </main>
  );
}
