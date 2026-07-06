'use client'

import Link from 'next/link'
import { Marquee } from '@/components/animations/Marquee'
import { KlayLogo } from '@/components/ui/KlayLogo'
import { ArrowRight } from 'lucide-react'

const navCols = [
  {
    heading: 'Studio',
    links: [
      { href: '/expertise', label: 'Expertise' },
      { href: '/about', label: 'About' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { href: '/projects', label: 'Projects' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '#', label: 'Instagram' },
      { href: '#', label: 'LinkedIn' },
      { href: '#', label: 'Behance' },
    ],
  },
]

const partnerLogos = [
  'Four Seasons', 'Hyatt', 'Louis Vuitton', 'Marriott',
  'Nobu', 'Raffles', 'Ritz-Carlton', 'W Hotels',
]

export function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden pb-16"
      style={{
        paddingTop: 'clamp(60px, 10vw, 160px)',
        backgroundColor: '#241A15',
      }}
    >
      {/* Parallax terracotta decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 100%, var(--color-terracotta-500) 0%, transparent 70%)',
          }}
        />
        {/* Arch silhouette layer */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.05]" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300V180C0 180 200 0 400 0C600 0 800 180 800 180V300H0Z" fill="#C1592E" />
        </svg>
      </div>

      <div className="container-site relative z-10">
        {/* Top divider */}
        <div className="w-full h-px bg-white/10 mb-16" />

        {/* Logo */}
        <KlayLogo className="text-white mb-14 h-8 w-auto" />

        {/* Nav columns + newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {navCols.map(col => (
            <div key={col.heading}>
              <p className="text-label tracking-label text-white/40 font-display mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-terracotta-300 transition-colors duration-300 text-sm font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p className="text-label tracking-label text-white/40 font-display mb-5">
              NEWSLETTER
            </p>
            <form className="flex items-end border-b border-white/20 pb-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                aria-label="Subscribe to newsletter"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm font-body outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-terracotta-300 hover:text-terracotta-500 transition-colors duration-300 pl-3"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 pb-16 border-t border-white/10">
          <p className="text-white/30 text-xs font-body tracking-wide">
            © 2026 KLAY INTERIORS. ALL RIGHTS RESERVED.
          </p>
          <Link
            href="/privacy"
            className="text-white/30 hover:text-white/60 text-xs font-body transition-colors duration-300"
          >
            Data Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
