import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollDownCue } from '@/components/ui/ScrollDownCue'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: `${project.expertise} project for ${project.client} in ${project.city}, ${project.country}. ${project.area}.`,
  }
}

const metaFields = (project: (typeof projects)[0]) => [
  { label: 'CLIENT', value: project.client },
  { label: 'LOCATION', value: `${project.city}, ${project.country}` },
  { label: 'YEAR', value: String(project.year) },
  { label: 'EXPERTISE', value: project.expertise },
  { label: 'AREA', value: project.area },
  { label: 'CATEGORY', value: project.category },
]

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

  const prevProject = projects.find(p => p.slug === project.prevSlug)
  const nextProject = projects.find(p => p.slug === project.nextSlug)

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[500px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink-900/40" />
        </div>
        <div className="relative z-10 container-site pb-16">
          <TextReveal>
            <h1 className="font-display font-semibold text-hero text-white leading-none tracking-tight">
              {project.title}
            </h1>
          </TextReveal>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollDownCue />
        </div>
      </section>

      {/* Meta strip */}
      <section className="py-12 border-b border-line bg-bg-warm">
        <div className="container-site">
          <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {metaFields(project).map(({ label, value }) => (
              <div key={label}>
                <dt className="text-label tracking-label text-ink-300 font-display mb-1">{label}</dt>
                <dd className="text-sm font-body text-ink-900 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing">
        <div className="container-site flex flex-col gap-4 md:gap-6">
          {project.gallery.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden ${i % 3 === 0 ? 'w-full aspect-[16/9]' : i % 3 === 1 ? 'md:w-2/3 aspect-[4/3]' : 'md:w-2/3 aspect-[4/3] self-end'}`}
            >
              <Image
                src={src}
                alt={`${project.title} — image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Hero bookend */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — closing view`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/30" />
      </div>

      {/* Prev / Next nav */}
      <nav className="grid grid-cols-1 md:grid-cols-2 border-t border-line" aria-label="Project navigation">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col gap-2 p-8 md:p-12 border-r border-line hover:bg-bg-warm transition-colors duration-300"
            data-cursor="view"
          >
            <span className="flex items-center gap-2 text-label tracking-label text-ink-300 font-display">
              <ArrowLeft size={14} /> PREV PROJECT
            </span>
            <span className="font-display font-semibold text-h2 text-ink-900 group-hover:text-terracotta-700 transition-colors duration-300">
              {prevProject.title}
            </span>
          </Link>
        ) : <div />}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-2 p-8 md:p-12 items-end hover:bg-bg-warm transition-colors duration-300"
            data-cursor="view"
          >
            <span className="flex items-center gap-2 text-label tracking-label text-ink-300 font-display">
              NEXT PROJECT <ArrowRight size={14} />
            </span>
            <span className="font-display font-semibold text-h2 text-ink-900 text-right group-hover:text-terracotta-700 transition-colors duration-300">
              {nextProject.title}
            </span>
          </Link>
        )}
      </nav>
    </>
  )
}
