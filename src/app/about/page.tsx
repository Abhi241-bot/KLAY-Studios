import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TextReveal, WordReveal } from '@/components/animations/TextReveal'
import { Marquee } from '@/components/animations/Marquee'
import { team, partners } from '@/lib/data'
import { TeamCard } from '@/components/ui/TeamCard'
import { ArrowDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'KLAY Interiors was founded in 2012 with a conviction that the most sophisticated spaces are never the most complicated ones.',
}

export default function AboutPage() {
  const founders = team.filter(m => m.isFounder)
  const rest = team.filter(m => !m.isFounder)

  return (
    <>
      {/* Hero — split image pair */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
              alt="KLAY studio interior A"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              alt="KLAY studio interior B"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-ink-900/40 z-10" />
        <div className="absolute bottom-16 left-0 right-0 z-20 container-site">
          <WordReveal
            text="ABOUT"
            className="font-display font-semibold text-hero text-white leading-none tracking-tight"
          />
        </div>
      </section>

      {/* Intro quote */}
      <section className="section-spacing bg-bg-warm">
        <div className="container-site grid md:grid-cols-2 gap-16 items-start">
          <div>
            <TextReveal>
              <blockquote className="font-display font-semibold text-h2 text-ink-900 leading-tight">
                &ldquo;A great team finds a way to win.&rdquo;
              </blockquote>
            </TextReveal>
            <div className="w-12 h-px bg-terracotta-500 my-5" />
            <TextReveal delay={0.1}>
              <cite className="text-label tracking-label text-ink-500 font-display not-italic">
                ALLAN RAY
              </cite>
            </TextReveal>
          </div>
          <div>
            <TextReveal delay={0.15}>
              <p className="text-body text-ink-700 font-body leading-relaxed">
                KLAY Interiors was founded in 2012 by Layla Karim, Marco Riva, and Nour El-Amin — three practitioners who shared a single conviction: that the most sophisticated spaces are never the most complicated ones. From a studio of three, we have grown to a team of thirty-two operating across Istanbul, Dubai, and London.
              </p>
            </TextReveal>
            <TextReveal delay={0.22}>
              <p className="text-body text-ink-700 font-body leading-relaxed mt-5">
                Our philosophy has not changed in fourteen years. Every project begins with a single question: what does this space need to feel like? Everything — material, proportion, light — answers to that question.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Video block */}
      <section className="relative w-full aspect-[21/9] overflow-hidden bg-ink-900" data-cursor="play">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-cover opacity-80"
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          aria-label="KLAY studio office footage"
        >
          <source src="/videos/studio.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Second manifesto */}
      <section className="section-spacing">
        <div className="container-site grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <TextReveal>
              <h2 className="font-display font-semibold text-h2 text-ink-900 leading-tight mb-6">
                Design is a journey shaped through research and spatial understanding.
              </h2>
            </TextReveal>
            <TextReveal delay={0.12}>
              <p className="text-body text-ink-700 font-body leading-relaxed">
                Our Istanbul headquarters occupies a converted early-20th century building in Akat. The building was renovated by the studio itself — a permanent demonstration of how we work. We are based here because Istanbul is where European and Asian spatial traditions meet; we build for clients across both hemispheres.
              </p>
            </TextReveal>
          </div>

          {/* Asymmetric photo collage */}
          <div className="order-1 md:order-2 relative h-[500px] md:h-[600px]">
            <div className="absolute top-0 right-0 w-[65%] aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="KLAY project — portrait view"
                fill sizes="40vw" className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] aspect-[4/3] overflow-hidden border-4 border-bg">
              <Image
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
                alt="KLAY project — landscape view"
                fill sizes="35vw" className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section-spacing bg-bg-warm">
        <div className="container-site">
          <TextReveal>
            <p className="text-label tracking-label text-terracotta-500 font-display mb-4">TEAM</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="font-display font-semibold text-h2 text-ink-900 mb-14">
              The people behind the work.
            </h2>
          </TextReveal>

          {/* Founders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {founders.map((member, i) => (
              <TeamCard key={member.id} member={member} delay={i * 0.1} isLarge />
            ))}
          </div>

          {/* Rest of team */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rest.map((member, i) => (
              <TeamCard key={member.id} member={member} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: '360px' }}>
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Join KLAY Interiors team"
          fill sizes="100vw" className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/60" />
        <div className="relative z-10 container-site flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-20">
          <div>
            <TextReveal>
              <h2 className="font-display font-semibold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Be a part of this amazing team?
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/70 font-body mt-3 max-w-md">
                We are always looking for exceptional practitioners who believe that restraint is a superpower.
              </p>
            </TextReveal>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 bg-terracotta-500 hover:bg-terracotta-700 text-white font-display font-medium text-label tracking-label transition-colors duration-300"
          >
            APPLY NOW →
          </Link>
        </div>
      </section>

      {/* Partner logo marquee */}
      <section className="section-spacing border-t border-line">
        <div className="container-site mb-10">
          <TextReveal>
            <p className="text-label tracking-label text-ink-300 font-display">REFERENCES</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="font-display font-medium text-h2 text-ink-900 mt-2">
              Solution partner of global brands.
            </p>
          </TextReveal>
        </div>

        <Marquee speed={20} className="py-4 border-y border-line">
          {partners.map(name => (
            <span
              key={name}
              className="shrink-0 px-10 text-label tracking-label font-display text-ink-500 uppercase"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Company profile download */}
      <section className="py-16 border-t border-line">
        <div className="container-site flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-24 h-32 shrink-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=200&q=80"
              alt="KLAY Company Profile cover"
              fill sizes="96px" className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-display font-semibold text-ink-900 text-lg mb-1">Company Profile 2026</p>
            <p className="text-ink-500 font-body text-sm max-w-sm">
              Download our studio profile — full credentials, project portfolio, and team biography.
            </p>
          </div>
          <a
            href="/klay-company-profile-2026.pdf"
            download
            className="arrow-link"
          >
            DOWNLOAD <ArrowDown size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
