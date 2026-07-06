import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  size?: 'large' | 'medium' | 'small'
}

export function ProjectCard({ project, size = 'medium' }: ProjectCardProps) {
  const aspectClass =
    size === 'large'
      ? 'aspect-[4/3] md:aspect-[16/11]'
      : size === 'small'
      ? 'aspect-[3/4]'
      : 'aspect-[3/4]'

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative overflow-hidden"
      data-cursor="view"
      aria-label={`View project: ${project.title}`}
    >
      {/* Image */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-bg-deep`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/20 transition-colors duration-500" />
      </div>

      {/* Meta */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-label tracking-label text-terracotta-500 font-display mb-1">
            {project.category}
          </p>
          <h3 className="font-display font-semibold text-ink-900 text-base leading-tight group-hover:text-terracotta-700 transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <span className="text-label tracking-label text-ink-300 font-display shrink-0 mt-1">
          {project.year}
        </span>
      </div>
    </Link>
  )
}
