import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { TextReveal, WordReveal } from '@/components/animations/TextReveal'
import { ProjectsGrid } from './ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the full portfolio of KLAY Interiors — hospitality, retail, office, residential, and F&B spaces across the globe.',
}

// Revalidate every 60 seconds so newly pushed projects.json is picked up
export const revalidate = 60

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <>
      {/* Hero */}
      <section className="pt-64 pb-16 bg-bg">
        <div className="container-site">
          <TextReveal>
            <p className="text-label tracking-label text-terracotta-500 font-display mb-4">WORK</p>
          </TextReveal>
          <WordReveal
            text="PROJECTS"
            className="font-display font-semibold text-hero text-ink-900 leading-none tracking-tight mb-10"
          />

          {/* Filters + Grid (client component) */}
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
