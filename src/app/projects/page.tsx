'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { TextReveal } from '@/components/animations/TextReveal'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Expertise = 'All' | 'Design' | 'Build' | 'Design + Build'
type Category = 'All' | 'Hospitality' | 'Retail' | 'Office' | 'F&B' | 'Residential'

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

export default function ProjectsPage() {
  const [expertise, setExpertise] = useState<Expertise>('All')
  const [category, setCategory] = useState<Category>('All')

  const filtered = useMemo(() => projects.filter(p => {
    const expertiseMatch = expertise === 'All' || p.expertise === expertise
    const categoryMatch = category === 'All' || p.category === category
    return expertiseMatch && categoryMatch
  }), [expertise, category])

  return (
    <>
      {/* Hero */}
      <section className="pt-64 pb-16 bg-bg">
        <div className="container-site">
          <TextReveal>
            <p className="text-label tracking-label text-terracotta-500 font-display mb-4">WORK</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h1 className="font-display font-semibold text-hero text-ink-900 leading-none tracking-tight mb-10">
              PROJECTS
            </h1>
          </TextReveal>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <FilterDropdown
              label={`Expertise${expertise !== 'All' ? ': ' + expertise : ' +'}`}
              options={['All', 'Design', 'Build', 'Design + Build']}
              value={expertise}
              onChange={v => setExpertise(v as Expertise)}
            />
            <FilterDropdown
              label={`Category${category !== 'All' ? ': ' + category : ' +'}`}
              options={['All', 'Hospitality', 'Retail', 'Office', 'F&B', 'Residential']}
              value={category}
              onChange={v => setCategory(v as Category)}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32">
        <div className="container-site">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} size="small" />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-ink-300 font-body text-center py-20">
              No projects match the selected filters.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
