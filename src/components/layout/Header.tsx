'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { HoverSwapLink } from '@/components/animations/HoverSwapText'
import { FullscreenMenu } from './FullscreenMenu'
import { KlayLogo } from '@/components/ui/KlayLogo'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  // Pages with dark video/image hero sections at the top
  const hasDarkHero =
    pathname === '/' ||
    pathname === '/about' ||
    pathname.startsWith('/projects/')

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      setHidden(currentY > 200 && currentY > lastScrollY.current)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
        style={{ paddingInline: 'clamp(24px, 5vw, 80px)', paddingBlock: '28px' }}
        animate={{
          y: hidden && !menuOpen ? '-100%' : '0%',
          backgroundColor: scrolled && !menuOpen ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link href="/" aria-label="KLAY Interiors — Home">
          <KlayLogo
            className={`transition-colors duration-300 ${menuOpen ? 'text-white' : scrolled || !hasDarkHero ? 'text-ink-900' : 'text-white'}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
          <HoverSwapLink
            href="/expertise"
            className={`text-label tracking-label font-display font-medium transition-colors duration-300 ${menuOpen ? 'text-white/70' : scrolled || !hasDarkHero ? 'text-ink-500' : 'text-white/80'}`}
          >
            EXPERTISE
          </HoverSwapLink>
          <HoverSwapLink
            href="/projects"
            className={`text-label tracking-label font-display font-medium transition-colors duration-300 ${menuOpen ? 'text-white/70' : scrolled || !hasDarkHero ? 'text-ink-500' : 'text-white/80'}`}
          >
            PROJECTS
          </HoverSwapLink>
        </nav>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="fullscreen-menu"
          className={`flex flex-col gap-[5px] w-8 h-6 justify-center transition-colors duration-300 ${menuOpen ? 'text-white' : scrolled || !hasDarkHero ? 'text-ink-900' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            className="block h-px w-8 bg-current"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="block h-px w-5 bg-current self-end"
            animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-8 bg-current"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </motion.header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
