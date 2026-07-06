'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'

interface ExpertiseSection {
  number: string
  title: string
  pullQuote: string
  body: string
  services: string[]
  images: { src: string; alt: string }[]
}

export function ExpertisePinnedSection({ sections }: { sections: ExpertiseSection[] }) {
  return (
    <div className="bg-bg">
      {sections.map((section, i) => (
        <ExpertiseItem key={section.title} section={section} index={i} />
      ))}
    </div>
  )
}

function ExpertiseItem({ section, index }: { section: ExpertiseSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <div
      ref={ref}
      className="section-spacing border-t border-line"
      id={`expertise-${index + 1}`}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left — number + title (sticky on desktop) */}
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <TextReveal>
              <span className="font-display text-terracotta-500 font-semibold" style={{ fontSize: '4rem' }}>
                {section.number}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-display font-semibold text-h2 text-ink-900 mt-2 mb-8">
                {section.title}
              </h2>
            </TextReveal>
            <TextReveal delay={0.15}>
              <blockquote className="text-body-lg text-ink-700 font-body leading-relaxed italic border-l-2 border-terracotta-500 pl-5">
                &ldquo;{section.pullQuote}&rdquo;
              </blockquote>
            </TextReveal>
          </div>

          {/* Right — services + images */}
          <div className="md:col-span-8 flex flex-col gap-12">
            <TextReveal delay={0.2}>
              <p className="text-body text-ink-700 font-body leading-relaxed">{section.body}</p>
            </TextReveal>

            {/* Services list */}
            <ul className="flex flex-col">
              {section.services.map((service, si) => (
                <TextReveal key={service} delay={0.25 + si * 0.05}>
                  <li className="py-4 border-b border-line text-ink-700 font-body flex items-center justify-between">
                    <span>{service}</span>
                    <span className="text-label tracking-label text-ink-300 font-display">0{si + 1}</span>
                  </li>
                </TextReveal>
              ))}
            </ul>

            {/* Image pair */}
            <div className="grid grid-cols-2 gap-4">
              {section.images.map((img, ii) => (
                <motion.div
                  key={img.src}
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ y: ii % 2 !== 0 ? y : undefined }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
