/* =============================================
   PROJECT TYPE
   Fields are flexible – only id, slug, title,
   image, and gallery are required. Any extra
   key-value pairs from info.txt are stored in `meta`.
   ============================================= */
export interface Project {
  id: string
  slug: string
  title: string
  image: string          // Google Drive direct-download URL (first image)
  gallery: string[]      // All image URLs in the folder
  // Common optional fields read from info.txt
  category?: string
  expertise?: string
  client?: string
  city?: string
  country?: string
  year?: number
  area?: string
  description?: string
  // Any additional fields from info.txt land here
  meta?: Record<string, string>
}

export interface TeamMember {
  id: string
  name: string
  role: string
  education?: string
  bio: string
  image: string
  isFounder?: boolean
  linkedin?: string
}

/* =============================================
   DATA — served from public/projects.json
   (populated automatically by Google Apps Script)

   Do NOT edit this array manually.
   Run the Apps Script to sync from Google Drive.
   ============================================= */
export const projects: Project[] = []

/* =============================================
   TEAM MEMBERS  (edit freely)
   ============================================= */
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ananya Mehta',
    role: 'Founder & Creative Director',
    bio: 'With over 15 years shaping luxury interiors across three continents, Ananya founded KLAY with a singular conviction: that truly great spaces are felt before they are seen.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    isFounder: true,
    linkedin: '#',
  },
  {
    id: '2',
    name: 'Rohan Desai',
    role: 'Principal Architect',
    education: 'M.Arch, Architectural Association London',
    bio: 'Rohan leads spatial strategy and technical delivery, bringing rigour and warmth to every project he touches.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    linkedin: '#',
  },
  {
    id: '3',
    name: 'Priya Iyer',
    role: 'Head of Materials & Finishes',
    education: 'B.Des, NID Ahmedabad',
    bio: 'Priya curates the tactile language of every KLAY project — her eye for material provenance is unmatched.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    linkedin: '#',
  },
]
