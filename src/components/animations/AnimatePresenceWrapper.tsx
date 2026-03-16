'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Wrap in AnimatePresence with mode="wait"
  // The motion.div with key={pathname} forces AnimatePresence to detect route exits
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="flex-1 flex flex-col w-full">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
