import type { Metadata } from 'next';

/* ─────────────────────────────────────────────
   Cookie Policy Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how Sole Syndicate uses cookies to enhance your browsing experience.',
  openGraph: {
    title: 'Cookie Policy | Sole Syndicate',
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

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    description: 'Required for the website to function properly. These cannot be disabled.',
    examples: 'Session cookies, authentication tokens, cart state.',
  },
  {
    name: 'Performance & Analytics',
    description: 'Help us understand how visitors interact with our site.',
    examples: 'Page view counts, traffic sources, bounce rates.',
  },
  {
    name: 'Functional',
    description: 'Enable personalisation and remembered preferences.',
    examples: 'Language preferences, regional settings.',
  },
  {
    name: 'Marketing & Targeting',
    description: 'Used to deliver relevant advertisements and track ad campaign effectiveness.',
    examples: 'Ad impression tracking, retargeting pixels.',
  },
];

export default function CookiesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void px-md pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-16 border-b border-border pb-8">
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display text-5xl text-primary mb-4">Cookie Policy</h1>
          <p className="text-secondary text-sm font-mono">Last updated: March 2026</p>
        </header>

        <Section title="What Are Cookies?">
          <p>
            Cookies are small text files placed on your device when you visit a website. They allow
            the website to recognise your device and store some information about your preferences
            or past actions.
          </p>
          <p>
            Cookies do not contain personally identifiable information and cannot be used to run
            programs or deliver viruses to your computer.
          </p>
        </Section>

        <Section title="Types of Cookies We Use">
          <p>We use the following categories of cookies on Sole Syndicate:</p>
          <div className="mt-6 space-y-4">
            {cookieTypes.map((type) => (
              <div
                key={type.name}
                className="border border-border rounded-sm p-5 bg-surface"
              >
                <h3 className="font-sans font-semibold text-primary text-sm mb-2">{type.name}</h3>
                <p className="text-secondary text-sm mb-1">{type.description}</p>
                <p className="font-mono text-xs text-muted">e.g. {type.examples}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Managing Cookies">
          <p>
            You can control and manage cookies in your browser settings. All modern browsers allow
            you to review, delete, and block cookies. Note that disabling certain cookies may
            affect the functionality of our website.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline hover:text-primary transition-colors duration-fast"
              >
                Google Chrome Cookie Settings
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline hover:text-primary transition-colors duration-fast"
              >
                Mozilla Firefox Cookie Settings
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline hover:text-primary transition-colors duration-fast"
              >
                Apple Safari Cookie Settings
              </a>
            </li>
          </ul>
        </Section>

        <Section title="Contact">
          <p>
            For questions about our use of cookies, contact us at{' '}
            <a
              href="mailto:privacy@solesyndicate.com"
              className="text-gold underline hover:text-primary transition-colors duration-fast"
            >
              privacy@solesyndicate.com
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
