'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={{
          hidden: { opacity: 0 },
          enter: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          exit: { opacity: 0, transition: { duration: 0.25, ease: [0.87, 0, 0.13, 1] } },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
