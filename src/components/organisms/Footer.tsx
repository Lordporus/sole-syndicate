'use client';

import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';
import { MonoLabel } from '@/components/atoms/MonoLabel';

/* ─────────────────────────────────────────────
   Footer — Site-wide footer.

   Layout:
   - Left: Logo + brand statement
   - Center: Nav columns (Products, Company, Legal)
   - Right: Social icons
   - Bottom: Copyright mono-label
   ───────────────────────────────────────────── */

const footerLinks = {
  Products: [
    { label: 'New Drops', href: '/drops' },
    { label: 'Collections', href: '/collections' },
    { label: 'Archive', href: '/archive' },
    { label: 'Authentication', href: '/authentication' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'The Syndicate', href: '/syndicate' },
    { label: 'Press', href: '/press' },
    { label: 'Careers', href: '/careers' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Authenticity Guarantee', href: '/authenticity' },
  ],
};

const socials = [
  { icon: Instagram, label: 'Sole Syndicate on Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'Sole Syndicate on X (Twitter)', href: 'https://x.com' },
  { icon: Github, label: 'Sole Syndicate on GitHub', href: 'https://github.com' },
];

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-void border-t border-border"
    >
      {/* ── Main grid ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2xl">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-lg">
            <Link
              href="/"
              className="font-display text-2xl tracking-widest text-primary hover:text-gold transition-colors duration-fast motion-reduce:transition-none w-fit"
              aria-label="Sole Syndicate — Home"
            >
              SOLE SYNDICATE
            </Link>
            <p className="font-serif italic text-secondary text-sm leading-relaxed max-w-xs">
              The only destination that treats sneakers like art. Rare, authenticated pairs presented with the precision they deserve.
            </p>

            {/* Social icons */}
            <div className="flex gap-md" role="list" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  role="listitem"
                  className="flex items-center justify-center w-10 h-10 rounded-sm border border-border text-secondary hover:text-gold hover:border-gold transition-all duration-fast motion-reduce:transition-none"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {(Object.entries(footerLinks) as [string, { label: string; href: string }[]][]).map(
            ([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <MonoLabel muted className="block mb-lg">
                  {category}
                </MonoLabel>
                <ul className="flex flex-col gap-md" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-secondary hover:text-primary hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-all duration-fast motion-reduce:transition-none block w-fit"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-md border-t border-border flex flex-col sm:flex-row items-center justify-between gap-sm">
        <MonoLabel muted>
          &copy; {new Date().getFullYear()} Sole Syndicate. All rights reserved.
        </MonoLabel>
        <MonoLabel muted>
          Every pair. Authenticated.
        </MonoLabel>
      </div>
    </footer>
  );
}
