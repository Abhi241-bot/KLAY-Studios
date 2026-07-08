import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollDownCue } from '@/components/ui/ScrollDownCue'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  const desc = [
    project.expertise,
    project.client ? `for ${project.client}` : '',
    project.city && project.country ? `in ${project.city}, ${project.country}` : '',
    project.area ?? '',
  ].filter(Boolean).join(' ')
  return { title: project.title, description: desc }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  // Build meta fields from whatever data exists
  const metaFields = [
    project.client && { label: 'CLIENT', value: project.client },
    (project.city || project.country) && {
      label: 'LOCATION',
      value: [project.city, project.country].filter(Boolean).join(', '),
    },
    project.year && { label: 'YEAR', value: String(project.year) },
    project.expertise && { label: 'EXPERTISE', value: project.expertise },
    project.area && { label: 'AREA', value: project.area },
    project.category && { label: 'CATEGORY', value: project.category },
    // Any extra fields from info.txt
    ...Object.entries(project.meta ?? {}).map(([k, v]) => ({
      label: k.toUpperCase(),
      value: v,
    })),
  ].filter(Boolean) as { label: string; value: string }[]

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
          {project.description && (
            <TextReveal delay={0.1}>
              <p className="text-white/70 font-body text-body-lg mt-4 max-w-2xl">
                {project.description}
              </p>
            </TextReveal>
          )}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollDownCue />
        </div>
      </section>

      {/* Meta strip — only render if there is metadata */}
      {metaFields.length > 0 && (
        <section className="py-12 border-b border-line bg-bg-warm">
          <div className="container-site">
            <dl className="flex flex-wrap gap-x-10 gap-y-6">
              {metaFields.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-label tracking-label text-ink-300 font-display mb-1">{label}</dt>
                  <dd className="text-sm font-body text-ink-900 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="section-spacing">
          <div className="container-site flex flex-col gap-4 md:gap-6">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden ${
                  i % 3 === 0
                    ? 'w-full aspect-[16/9]'
                    : 'md:w-2/3 aspect-[4/3] ' + (i % 3 === 2 ? 'self-end' : '')
                }`}
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
      )}

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
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-2 p-8 md:p-12 border-r border-line hover:bg-bg-warm transition-colors duration-300"
          >
            <span className="flex items-center gap-2 text-label tracking-label text-ink-300 font-display">
              <ArrowLeft size={14} /> PREV PROJECT
            </span>
            <span className="font-display font-semibold text-h2 text-ink-900 group-hover:text-terracotta-700 transition-colors duration-300">
              {prev.title}
            </span>
          </Link>
        ) : <div />}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 p-8 md:p-12 items-end hover:bg-bg-warm transition-colors duration-300"
          >
            <span className="flex items-center gap-2 text-label tracking-label text-ink-300 font-display">
              NEXT PROJECT <ArrowRight size={14} />
            </span>
            <span className="font-display font-semibold text-h2 text-ink-900 text-right group-hover:text-terracotta-700 transition-colors duration-300">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </>
  )
}
