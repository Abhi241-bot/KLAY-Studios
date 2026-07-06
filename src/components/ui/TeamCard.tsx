'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { TeamMember } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface TeamCardProps {
  member: TeamMember
  delay?: number
  isLarge?: boolean
}

export function TeamCard({ member, delay = 0, isLarge = false }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <TextReveal delay={delay}>
        <div className={`group ${isLarge ? '' : ''}`}>
          {/* Photo */}
          <div
            className={`relative overflow-hidden cursor-pointer ${isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}
            onClick={() => setExpanded(true)}
            aria-label={`Read bio: ${member.name}`}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setExpanded(true)}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes={isLarge ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 50vw, 25vw'}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay with "more" */}
            <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 flex items-center justify-center transition-all duration-400">
              <span className="opacity-0 group-hover:opacity-100 text-white text-label tracking-label font-display transition-opacity duration-300">
                READ BIO +
              </span>
            </div>
          </div>

          {/* Name + divider + role */}
          <div className="pt-4">
            <p className="font-display font-semibold text-ink-900 text-base">
              {member.name}
            </p>
            <div className="w-8 h-px bg-terracotta-500 my-2" />
            <p className="text-label tracking-label text-ink-500 font-display">
              {member.role}
            </p>
            {isLarge && member.education && (
              <p className="text-xs text-ink-300 font-body mt-1">{member.education}</p>
            )}
          </div>
        </div>
      </TextReveal>

      {/* Bio modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <div className="absolute inset-0 bg-ink-900/70" />
            <motion.div
              className="relative bg-white max-w-lg w-full p-8 md:p-12 z-10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close bio"
                className="absolute top-6 right-6 text-ink-300 hover:text-ink-900 transition-colors"
              >
                <X size={20} />
              </button>
              <p className="font-display font-semibold text-ink-900 text-lg mb-1">{member.name}</p>
              <div className="w-8 h-px bg-terracotta-500 my-3" />
              <p className="text-label tracking-label text-terracotta-500 font-display mb-1">{member.role}</p>
              {member.education && (
                <p className="text-xs text-ink-300 font-body mb-6">{member.education}</p>
              )}
              <p className="text-body text-ink-700 font-body leading-relaxed">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link mt-6 inline-flex"
                >
                  LINKEDIN →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
