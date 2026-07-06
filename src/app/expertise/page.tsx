import type { Metadata } from 'next'
import { TextReveal, WordReveal } from '@/components/animations/TextReveal'
import { ExpertisePinnedSection } from '@/components/ui/ExpertisePinnedSection'

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'KLAY Interiors offers three core disciplines: Design, Build, and Design + Build — each executed with the same relentless attention to material and spatial truth.',
}

const sections = [
  {
    number: '01.',
    title: 'DESIGN',
    pullQuote: 'If a building becomes architecture, then it is art.',
    body: 'Our design practice begins with deep site and client research — understanding not just spatial requirements but the emotional register a space should carry. From concept development through material specification, we translate intent into enduring environments.',
    services: ['Concept Development', 'Spatial Planning', 'Material & Detail Research', 'Collaborative Design Process', 'Furniture & Lighting Specification'],
    images: [
      { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: 'Atlas Hotel lobby — Design phase' },
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Maison Dubai — Design detail' },
    ],
  },
  {
    number: '02.',
    title: 'BUILD',
    pullQuote: 'Materials are honest things. They resist the dishonest hand.',
    body: 'Where we manage construction, our studio acts as both design guardian and delivery engine — maintaining absolute fidelity to the design intent while navigating the inevitable pressures of site, schedule, and budget. We work exclusively with craftspeople we trust.',
    services: ['Project Management', 'Contractor Coordination', 'Bespoke Millwork Procurement', 'Quality Assurance', 'Handover & Snagging'],
    images: [
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'On-site construction management' },
      { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Onyx HQ — Build phase' },
    ],
  },
  {
    number: '03.',
    title: 'DESIGN + BUILD',
    pullQuote: 'The best projects are collaborations between conviction and capability.',
    body: 'Our fully integrated offer — design and build under one studio — exists because we believe the conversation between designer and builder should happen internally, not across a procurement gap. The result is tighter timelines, fewer surprises, and spaces that are exactly what was drawn.',
    services: ['End-to-End Project Delivery', 'Single Point of Contact', 'Integrated Design & Build Timeline', 'Value Engineering', 'Post-Completion Support'],
    images: [
      { src: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80', alt: 'Lune Restaurant — Design + Build' },
      { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Meridian Residences — D+B' },
    ],
  },
]

export default function ExpertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-64 pb-20 bg-bg-warm">
        <div className="container-site">
          <TextReveal>
            <p className="text-label tracking-label text-terracotta-500 font-display mb-6">EXPERTISE</p>
          </TextReveal>
          <WordReveal
            text="EXPERTISE"
            className="font-display font-semibold text-ink-900 text-hero leading-none tracking-tight mb-10"
          />
          <TextReveal delay={0.2}>
            <p className="text-body-lg text-ink-700 max-w-2xl font-body leading-relaxed">
              Design begins with an idea, a possibility shaped through exploration and intent. We offer three disciplines — each executed with the same relentless attention to material and spatial truth.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Pinned sections */}
      <ExpertisePinnedSection sections={sections} />
    </>
  )
}
