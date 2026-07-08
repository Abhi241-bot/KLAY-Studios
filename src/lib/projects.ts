import fs from 'fs'
import path from 'path'
import type { Project } from './data'

/**
 * Reads projects from public/projects.json at build time.
 * This file is populated automatically by the Google Apps Script
 * (see GOOGLE_DRIVE_SETUP.md).
 */
export function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'public', 'projects.json')
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find(p => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined
  next: Project | undefined
} {
  const all = getProjects()
  const idx = all.findIndex(p => p.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : all[all.length - 1],
    next: idx < all.length - 1 ? all[idx + 1] : all[0],
  }
}
