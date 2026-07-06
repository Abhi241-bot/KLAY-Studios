'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return (
    <div ref={ref} className="reveal-wrap" style={{ overflow: 'hidden' }}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { y: '100%', opacity: 0 },
          visible: {
            y: '0%',
            opacity: 1,
            transition: {
              duration: 0.9,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Staggered word reveal
export function WordReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const words = text.split(' ')

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.35em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.span
            aria-hidden="true"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: {
                  duration: 0.85,
                  delay: delay + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  )
}
