import type { Metadata } from 'next';
import { ShieldCheck, Microscope, BadgeCheck, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────
   Authenticity Guarantee Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Authenticity Guarantee',
  description:
    'Every sneaker sold on Sole Syndicate undergoes rigorous expert authentication. We guarantee every pair is 100% genuine.',
  openGraph: {
    title: 'Authenticity Guarantee | Sole Syndicate',
  },
};

const steps = [
  {
    icon: Microscope,
    title: 'Detailed Physical Inspection',
    body: 'Our team of specialist authenticators inspects every pair using both the naked eye and magnification. We examine stitching, labels, box details, insoles, and hardware for even the smallest deviations from manufacture standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Multi-Point Digital Verification',
    body: 'We cross-reference production batch codes, factory release dates, and retailer serial numbers against our proprietary database of over 50,000 verified release records.',
  },
  {
    icon: BadgeCheck,
    title: 'Certification & Tagging',
    body: 'Every authenticated pair receives a tamper-evident Sole Syndicate Verified tag with a QR code linking to its unique authentication record. This tag must be intact for the guarantee to apply.',
  },
  {
    icon: Zap,
    title: 'Instant Dispute Resolution',
    body: 'If at any point you or a third-party expert disputes the authenticity of a pair purchased from us, we guarantee a full refund after re-inspection — no questions asked.',
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl text-primary mb-4 tracking-wide">{title}</h2>
      <div className="space-y-4 text-secondary leading-relaxed">{children}</div>
    </section>
  );
}

export default function AuthenticityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void px-md pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-16 border-b border-border pb-8">
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Our Promise</p>
          <h1 className="font-display text-5xl text-primary mb-4">Authenticity Guarantee</h1>
          <p className="text-secondary text-base max-w-2xl leading-relaxed">
            Every pair sold through Sole Syndicate has passed a rigorous, multi-stage expert
            authentication process. We stake our reputation on every single item in our vault.
          </p>
        </header>

        {/* Process Steps */}
        <Section title="Our Authentication Process">
          <p>
            Authentication is not a checkbox — it is a craft. Our verification process was developed
            in collaboration with industry experts with decades of combined experience inspecting
            grail sneakers. Here is how every pair earns its Verified status:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {steps.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border border-border rounded-sm p-6 bg-surface flex flex-col gap-4"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gold/10 text-gold">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-sans font-semibold text-primary text-sm">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Verified Sneakers">
          <p>
            Sneakers marked with the{' '}
            <span className="text-verified font-semibold">VERIFIED</span> badge in our store have
            passed all four stages of our authentication process. This badge is only applied after
            the physical item has been inspected by our team — never based on seller claims alone.
          </p>
        </Section>

        <Section title="Guarantee Policy">
          <p>
            Our guarantee is simple: if a pair authenticated by Sole Syndicate is proven to be
            non-genuine, you receive a full refund plus a credit to your Syndicate account equal to
            10% of the purchase price.
          </p>
          <p>
            This guarantee applies only to pairs that retain their Sole Syndicate Verified tag
            intact and have not been worn, modified, or resold since purchase.
          </p>
          <p>
            To initiate a dispute, contact{' '}
            <a
              href="mailto:authenticate@solesyndicate.com"
              className="text-gold underline hover:text-primary transition-colors duration-fast"
            >
              authenticate@solesyndicate.com
            </a>
            {' '}with your order reference and the third-party report.
          </p>
        </Section>
      </div>
    </main>
  );
}
