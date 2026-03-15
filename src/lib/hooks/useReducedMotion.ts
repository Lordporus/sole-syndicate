'use client';

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   useReducedMotion — Reactive hook that observes
   the prefers-reduced-motion media query.

   Returns true when the user prefers reduced motion.
   Use this to disable Three.js animations and
   heavy Framer Motion transitions.
   ───────────────────────────────────────────── */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    // Use addEventListener for modern browsers
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
