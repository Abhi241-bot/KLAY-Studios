'use client'

import { useState, useMemo } from 'react'
import type { Project } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 text-label tracking-label font-display text-ink-700 border border-line px-4 py-2 hover:border-terracotta-500 transition-colors duration-300"
        onClick={() => setOpen(!open)}
      >
        {label}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className={open ? 'hidden' : 'block'} />
          <span className={open ? 'block' : 'hidden'}>×</span>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="absolute top-full left-0 mt-1 bg-white border border-line shadow-card z-50 min-w-[180px]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(opt => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={`px-4 py-3 text-sm font-body cursor-pointer hover:bg-bg-warm transition-colors duration-200 ${value === opt ? 'text-terracotta-500 font-medium' : 'text-ink-700'}`}
                onClick={() => { onChange(opt); setOpen(false) }}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All')
  const [expertise, setExpertise] = useState('All')

  // Derive filter options dynamically from actual projects
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category).filter(Boolean))) as string[]
    return ['All', ...cats]
  }, [projects])

  const expertises = useMemo(() => {
    const exps = Array.from(new Set(projects.map(p => p.expertise).filter(Boolean))) as string[]
    return ['All', ...exps]
  }, [projects])

  const filtered = useMemo(() =>
    projects.filter(p => {
      const catOk = category === 'All' || p.category === category
      const expOk = expertise === 'All' || p.expertise === expertise
      return catOk && expOk
    }),
    [projects, category, expertise]
  )

  return (
    <>
      {/* Filters — only show if there are projects */}
      {projects.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-14">
          <FilterDropdown
            label={`Category${category !== 'All' ? ': ' + category : ' +'}`}
            options={categories}
            value={category}
            onChange={setCategory}
          />
          <FilterDropdown
            label={`Expertise${expertise !== 'All' ? ': ' + expertise : ' +'}`}
            options={expertises}
            value={expertise}
            onChange={setExpertise}
          />
        </div>
      )}

      {/* Project grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10"
          >
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="py-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {projects.length === 0 ? (
              <>
                <p className="font-display font-semibold text-h2 text-ink-300 mb-4">
                  Coming Soon
                </p>
                <p className="text-body-lg text-ink-300 font-body">
                  Our portfolio is being prepared. Check back shortly.
                </p>
              </>
            ) : (
              <p className="text-body-lg text-ink-500 font-body">
                No projects match the selected filters.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
