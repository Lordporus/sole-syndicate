import type { Metadata } from 'next';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { ArrowUpRight, Download } from 'lucide-react';

/* ─────────────────────────────────────────────
   Press Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Latest news, press mentions, and the official media kit for Sole Syndicate.',
  openGraph: {
    title: 'Press | Sole Syndicate',
  },
};

const pressMentions = [
  {
    publication: 'HYPEBEAST',
    headline: 'Sole Syndicate Reimagines the Premium Aftermarket',
    date: '2025.11.12',
    link: '#',
  },
  {
    publication: 'Complex',
    headline: 'How This New Sneaker Vault is Guaranteeing 100% Authenticity',
    date: '2025.10.04',
    link: '#',
  },
  {
    publication: 'Highsnobiety',
    headline: 'The Art of the Grail: Inside Sole Syndicate\'s Archive',
    date: '2025.08.22',
    link: '#',
  },
  {
    publication: 'GQ',
    headline: 'Why Serious Collectors Are Moving to Closed-Loop Ecosystems',
    date: '2025.07.15',
    link: '#',
  },
];

const mediaKitItems = [
  { label: 'Brand Guidelines', format: 'PDF (2.4MB)' },
  { label: 'Logo Pack', format: 'ZIP - SVG/PNG' },
  { label: 'Vault Photography', format: 'ZIP - Hi-Res JPG' },
  { label: 'Founder Headshots', format: 'ZIP - Hi-Res JPG' },
];

export default function PressPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      {/* Container: max-w-6xl */}
      <div className="max-w-6xl mx-auto px-md md:px-xl">
        
        {/* ── Press Hero ── */}
        <section className="mb-24 border-b border-border pb-16">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">Media Relations</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            In the <span className="text-secondary italic font-serif">Headlines.</span>
          </h1>
          <p className="max-w-2xl text-secondary text-lg leading-relaxed">
            For press inquiries, interview requests, or high-resolution assets, 
            please contact our communications desk at <a href="mailto:press@solesyndicate.com" className="text-gold underline hover:text-primary transition-colors">press@solesyndicate.com</a>.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4xl">
          
          {/* ── Press Mentions (Span 2) ── */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-primary mb-xl">Selected Coverage</h2>
            <ul className="flex flex-col divide-y divide-border" role="list">
              {pressMentions.map((item, idx) => (
                <li key={idx} className="py-xl group">
                  <a href={item.link} className="flex flex-col sm:flex-row sm:items-start justify-between gap-md" aria-label={`Read article from ${item.publication}: ${item.headline}`}>
                    <div className="flex flex-col gap-sm">
                      <MonoLabel muted className="text-xs group-hover:text-gold transition-colors">{item.publication} — {item.date}</MonoLabel>
                      <h3 className="font-sans font-bold text-xl text-primary group-hover:text-gold transition-colors duration-fast max-w-lg">
                        {item.headline}
                      </h3>
                    </div>
                    <div className="hidden sm:flex w-10 h-10 border border-border items-center justify-center rounded-sm text-secondary group-hover:bg-gold group-hover:text-void group-hover:border-gold transition-all duration-fast shrink-0">
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Media Kit (Span 1) ── */}
          <aside>
            <div className="bg-surface border border-border p-xl sticky top-32">
              <h2 className="font-display text-2xl text-primary mb-sm">Media Kit</h2>
              <p className="text-secondary text-sm mb-lg leading-relaxed">
                Download official brand assets for press placement. Usage is subject to our brand guidelines.
              </p>
              
              <ul className="flex flex-col gap-md mb-xl" role="list">
                {mediaKitItems.map((asset) => (
                  <li key={asset.label} className="flex items-center justify-between py-xs border-b border-border/50 group cursor-pointer">
                    <span className="text-sm font-sans text-primary group-hover:text-gold transition-colors">{asset.label}</span>
                    <span className="flex items-center gap-xs font-mono text-xs text-muted">
                      {asset.format}
                      <Download size={14} className="group-hover:text-gold transition-colors" aria-hidden="true" />
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant="gold" size="lg" className="w-full h-[56px]">
                Download Complete Kit
              </Button>
            </div>
          </aside>
          
        </div>

      </div>
    </main>
  );
}
