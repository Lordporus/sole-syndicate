import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { Footer } from "@/components/organisms/Footer";
import { AnimatePresenceWrapper } from "@/components/animations/AnimatePresenceWrapper";

/* ── Font Declarations ──────────────────────────────────────── */
// Primary sans-serif — body text and headings
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace — authentication codes, labels, prices
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Serif — pull quotes, brand statements
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/* ── Site Metadata ──────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Sole Syndicate — Where Rarity Meets Ritual",
    template: "%s | Sole Syndicate",
  },
  description:
    "The only destination that treats sneakers like art. Rare, authenticated pairs presented with the precision they deserve.",
  keywords: ["sneakers", "rare kicks", "authenticated sneakers", "limited drops", "sneaker culture"],
  authors: [{ name: "Sole Syndicate" }],
  creator: "Sole Syndicate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solesyndicate.com",
    siteName: "Sole Syndicate",
    title: "Sole Syndicate — Where Rarity Meets Ritual",
    description:
      "The only destination that treats sneakers like art. Rare, authenticated pairs presented with the precision they deserve.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sole Syndicate",
    description: "The only destination that treats sneakers like art.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Dark mode is default — 'theme-light' class can be toggled via JS
      className={`${inter.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-void text-primary antialiased min-h-screen flex flex-col">
        {/* 
          Skip link for keyboard/screen reader users — WCAG 2.4.1 compliance.
          Must be the first interactive element in the DOM. 
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-void focus:text-sm focus:font-medium focus:rounded"
        >
          Skip to main content
        </a>

        {/* Primary navigation — fixed at top, 64px height */}
        <Navbar />

        {/* Slide-in cart drawer — rendered at root so it overlays all content */}
        <CartDrawer />

        {/* Page content */}
        <main id="main-content" tabIndex={-1} className="outline-none flex-1 flex flex-col w-full">
            <AnimatePresenceWrapper>
              {children}
            </AnimatePresenceWrapper>
        </main>

        {/* Site footer */}
        <Footer />
      </body>
    </html>
  );
}
