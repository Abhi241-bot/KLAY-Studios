'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { HoverSwapLink } from '@/components/animations/HoverSwapText'

const navLinks = [
  { href: '/expertise', label: 'EXPERTISE' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
]

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="fullscreen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[99] flex flex-col justify-end"
          style={{
            backgroundColor: '#241A15',
            paddingInline: 'clamp(24px, 5vw, 80px)',
            paddingBottom: 'clamp(48px, 8vw, 96px)',
          }}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Terracotta accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-terracotta-500" />

          {/* Nav links */}
          <nav aria-label="Full site navigation">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-white/10 py-5 md:py-6"
                >
                  <HoverSwapLink
                    href={link.href}
                    onClick={onClose}
                    className="text-white font-display font-semibold hover-swap"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' } as React.CSSProperties}
                  >
                    {link.label}
                  </HoverSwapLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer row */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-between gap-4 text-white/40 text-label tracking-label font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <span>© 2026 KLAY INTERIORS</span>
            <div className="flex gap-6">
              {['Instagram', 'LinkedIn', 'Behance'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="hover:text-terracotta-300 transition-colors duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
