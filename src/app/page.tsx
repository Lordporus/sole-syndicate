import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedDropSection } from "@/components/sections/FeaturedDropSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { BrandStorySection } from "@/components/sections/BrandStorySection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Sole Syndicate — Where Rarity Meets Ritual",
  description:
    "The only destination that treats sneakers like art. Rare, authenticated pairs presented with the precision they deserve.",
};

/**
 * Home Page — Server Component (no interactivity at this level)
 *
 * Section order mirrors the brand blueprint's "Homepage Experience":
 *   1. Hero (Act 1: Arrival)
 *   2. Featured Drop (Act 2 & 3: Context + Drop Theatre)
 *   3. Editorial Collections (editorial strip)
 *   4. Brand Story (manifesto block)
 *   5. Community / The Syndicate (social proof + membership)
 *   6. CTA / Newsletter
 */
export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────── */}
      {/*
        Full-screen, Three.js canvas with a slow-rotating 3D sneaker.
        Single word "SYNDICATE" fades in. No scroll cues initially.
        Rendered as a header landmark for screen readers.
      */}
      <HeroSection />

      {/* ── 2. Featured Drop ─────────────────────────────────── */}
      {/*
        Full-bleed editorial photography with live countdown timer
        and limited quantity badge. Camera zooms on scroll via GSAP.
      */}
      <FeaturedDropSection />

      {/* ── 3. Editorial Collections ─────────────────────────── */}
      {/*
        Horizontal scroll strip: 3 featured silhouettes on desktop.
        Masonry grid on mobile. Animated product cards.
      */}
      <CollectionsSection />

      {/* ── 4. Brand Story ───────────────────────────────────── */}
      {/*
        Single large typographic block on dark background.
        Pull quote in Cormorant Garamond Italic.
        Scroll-reveal on entry.
      */}
      <BrandStorySection />

      {/* ── 5. Community — The Syndicate ─────────────────────── */}
      {/*
        Membership tier teaser. Dark UI, exclusive badge system.
        Rolling ticker of recent authenticated pairs.
        Locked content peek.
      */}
      <CommunitySection />

      {/* ── 6. CTA ───────────────────────────────────────────── */}
      {/*
        Newsletter / access request form.
        Minimal, no marketing language — just the ask.
      */}
      <CtaSection />
    </>
  );
}
