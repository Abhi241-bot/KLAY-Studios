import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/projects'
import { TextReveal, WordReveal } from '@/components/animations/TextReveal'
import { Marquee } from '@/components/animations/Marquee'
import { ScrollDownCue } from '@/components/ui/ScrollDownCue'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KLAY Interiors — Where Space Becomes Experience',
}

const expertiseItems = ['DESIGN', 'BUILD', 'DESIGN + BUILD']

export default function HomePage() {
  const featured = getProjects().slice(0, 6)

  return (
    <>
      {/* ============================================
          HERO — full-bleed video
          ============================================ */}
      <section
        className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden"
        aria-label="Hero"
      >
        {/* Video / fallback image */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-cover"
            poster="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
            aria-hidden="true"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-ink-900/50" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container-site pb-16 md:pb-20 flex flex-col gap-6">
          <WordReveal
            text="WHERE SPACE BECOMES EXPERIENCE"
            className="font-display font-semibold text-white text-hero leading-none tracking-tight"
          />
          <TextReveal delay={0.4}>
            <p className="text-white/60 text-body-lg max-w-xl font-body">
              A luxury interior studio crafting timeless spaces rooted in material craft and spatial precision.
            </p>
          </TextReveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollDownCue />
        </div>
      </section>

      {/* ============================================
          EXPERTISE TEASER
          ============================================ */}
      <section className="section-spacing bg-bg-warm">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <TextReveal>
                <p className="text-label tracking-label text-terracotta-500 font-display mb-5">
                  EXPERTISE
                </p>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h2 className="font-display font-semibold text-h2 text-ink-900 leading-tight mb-6">
                  Every line is a decision.<br />Every decision is a feeling.
                </h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-body text-ink-700 leading-relaxed max-w-md mb-8">
                  Design begins with an idea — a possibility shaped through exploration and intent. We translate that idea into spaces that endure.
                </p>
              </TextReveal>
              <Link
                href="/expertise"
                className="arrow-link"
                aria-label="Explore our expertise"
              >
                MORE DETAIL <ArrowRight size={16} />
              </Link>
            </div>

            {/* Expertise pills */}
            <div className="flex flex-col gap-0 mt-4 md:mt-16">
              {expertiseItems.map((item, i) => (
                <div key={item} className="py-5 border-b border-line flex items-center justify-between group cursor-default">
                  <TextReveal delay={0.1 + i * 0.08}>
                    <span className="font-display font-medium text-h2 text-ink-900 group-hover:text-terracotta-500 transition-colors duration-400">
                      {item}
                    </span>
                  </TextReveal>
                  <span className="text-label tracking-label text-ink-300 font-display">
                    0{i + 1}.
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SELECTED PROJECTS — marquee + grid
          ============================================ */}
      {featured.length > 0 && (
        <section className="section-spacing">
          {/* Marquee eyebrow */}
          <Marquee speed={25} className="mb-14 border-y border-line py-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="text-label tracking-label font-display text-ink-300 shrink-0 px-10"
              >
                SELECTED PROJECTS
              </span>
            ))}
          </Marquee>

          <div className="container-site">
            <div className="flex items-end justify-between mb-12 gap-6">
              <TextReveal>
                <h2 className="font-display font-semibold text-h2 text-ink-900">
                  Our Work
                </h2>
              </TextReveal>
              <Link href="/projects" className="arrow-link shrink-0">
                SEE ALL PROJECTS <ArrowRight size={16} />
              </Link>
            </div>

            {/* Asymmetric grid — renders only as many cards as we have projects */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Row 1 — 1 large + 2 stacked */}
              {featured[0] && (
                <div className="md:col-span-7">
                  <ProjectCard project={featured[0]} size="large" />
                </div>
              )}
              {(featured[1] || featured[2]) && (
                <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
                  {featured[1] && <ProjectCard project={featured[1]} size="medium" />}
                  {featured[2] && <ProjectCard project={featured[2]} size="medium" />}
                </div>
              )}

              {/* Row 2 — 2 equal */}
              {featured[3] && (
                <div className="md:col-span-6">
                  <ProjectCard project={featured[3]} size="medium" />
                </div>
              )}
              {featured[4] && (
                <div className="md:col-span-6">
                  <ProjectCard project={featured[4]} size="medium" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* ============================================
          MANIFESTO BAND
          ============================================ */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: '#241A15' }}>
        <div className="container-site">
          <TextReveal>
            <blockquote className="font-display font-semibold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              &ldquo;If a building becomes architecture,
              <br className="hidden md:block" />
              {' '}then it is art.&rdquo;
            </blockquote>
          </TextReveal>
        </div>
      </section>
    </>
  )
}
