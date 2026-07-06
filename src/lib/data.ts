export interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: 'Hospitality' | 'Retail' | 'Office' | 'F&B' | 'Residential'
  expertise: 'Design' | 'Build' | 'Design + Build'
  city: string
  country: string
  year: number
  area: string
  image: string
  video?: string
  gallery: string[]
  prevSlug?: string
  nextSlug?: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  category: 'Hospitality' | 'Retail' | 'Office' | 'F&B'
  expertise: 'Design' | 'Build' | 'Design + Build'
  city: string
  country: string
  year: number
  area: string
  heroImage: string
  overview: string
  sections: { body: string; images: string[] }[]
  prevSlug?: string
  nextSlug?: string
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

export interface NewsArticle {
  id: string
  title: string
  date: string
  publication?: string
  url?: string
}

/* =============================================
   PROJECTS
   ============================================= */
export const projects: Project[] = [
  {
    id: '1',
    slug: 'atlas-boutique-hotel',
    title: 'ATLAS BOUTIQUE HOTEL',
    client: 'Atlas Group',
    category: 'Hospitality',
    expertise: 'Design + Build',
    city: 'Istanbul',
    country: 'Turkey',
    year: 2025,
    area: '4,200 m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    video: undefined,
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80',
    ],
    prevSlug: 'velour-flagship',
    nextSlug: 'onyx-headquarters',
  },
  {
    id: '2',
    slug: 'onyx-headquarters',
    title: 'ONYX HEADQUARTERS',
    client: 'Onyx Capital',
    category: 'Office',
    expertise: 'Design',
    city: 'Dubai',
    country: 'UAE',
    year: 2025,
    area: '6,800 m²',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80',
    ],
    prevSlug: 'atlas-boutique-hotel',
    nextSlug: 'maison-dubai',
  },
  {
    id: '3',
    slug: 'maison-dubai',
    title: 'MAISON DUBAI',
    client: 'Maison Lifestyle',
    category: 'Retail',
    expertise: 'Design + Build',
    city: 'Dubai',
    country: 'UAE',
    year: 2024,
    area: '1,100 m²',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80',
    ],
    prevSlug: 'onyx-headquarters',
    nextSlug: 'lune-restaurant',
  },
  {
    id: '4',
    slug: 'lune-restaurant',
    title: 'LUNE RESTAURANT',
    client: 'Lune Hospitality',
    category: 'F&B',
    expertise: 'Design + Build',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    year: 2024,
    area: '780 m²',
    image: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1600&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828a592?w=1600&q=80',
    ],
    prevSlug: 'maison-dubai',
    nextSlug: 'velour-flagship',
  },
  {
    id: '5',
    slug: 'velour-flagship',
    title: 'VELOUR FLAGSHIP',
    client: 'Velour Fashion',
    category: 'Retail',
    expertise: 'Design',
    city: 'London',
    country: 'UK',
    year: 2024,
    area: '950 m²',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80',
    ],
    prevSlug: 'lune-restaurant',
    nextSlug: 'atlas-boutique-hotel',
  },
  {
    id: '6',
    slug: 'meridian-residences',
    title: 'MERIDIAN RESIDENCES',
    client: 'Meridian Developments',
    category: 'Residential',
    expertise: 'Design + Build',
    city: 'Athens',
    country: 'Greece',
    year: 2023,
    area: '3,200 m²',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80',
    ],
    prevSlug: 'velour-flagship',
    nextSlug: 'atlas-boutique-hotel',
  },
]

/* =============================================
   CASE STUDIES
   ============================================= */
export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'atlas-full-story',
    title: 'ATLAS BOUTIQUE HOTEL',
    client: 'Atlas Group',
    category: 'Hospitality',
    expertise: 'Design + Build',
    city: 'Istanbul',
    country: 'Turkey',
    year: 2025,
    area: '4,200 m²',
    heroImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80',
    overview:
      'The Atlas Boutique Hotel commission began with a deceptively simple brief: create a 42-room property that feels timeless in a city that has witnessed the rise and fall of empires. Our response was to excavate the layered history of the Beyoğlu district and encode it into every surface — from the hand-laid zellige tilework in the entrance rotunda to the bespoke bronze hardware cast by Istanbul artisans whose workshops operate three streets away from the site.',
    sections: [
      {
        body: 'The lobby operates as a controlled compression: a low vaulted antechamber lined in aged plaster and terracotta relief panels opens dramatically into a double-height atrium wrapped in locally quarried travertine. The material palette refuses exoticism; everything could plausibly have been found within 200 kilometres of the building site.',
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80',
        ],
      },
      {
        body: 'Guest rooms were designed on the principle that luxury is the removal of friction rather than the addition of ornament. Beds face east. Blackout shutters are mechanical, not electronic. The minibar is a hand-thrown ceramic cabinet. Every decision was interrogated: does this serve the guest, or does it merely signal effort?',
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80'],
      },
    ],
    prevSlug: 'lune-editorial',
    nextSlug: 'lune-editorial',
  },
  {
    id: '2',
    slug: 'lune-editorial',
    title: 'LUNE RESTAURANT',
    client: 'Lune Hospitality',
    category: 'F&B',
    expertise: 'Design + Build',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    year: 2024,
    area: '780 m²',
    heroImage: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1600&q=80',
    overview:
      'Lune asked for a restaurant that would read as a destination in its own right — not an amenity, but a reason to travel. The concept pivots on a single architectural gesture: a 14-metre continuous arch that bisects the dining room, carved from hand-formed terracotta block. Everything else — the seating, the lighting, the menu design — derives its logic from that primary element.',
    sections: [
      {
        body: 'Lighting was designed in collaboration with a Berlin-based studio specialising in hospitality acoustics. Every luminaire is custom; none were sourced from a catalogue. The result is a room that changes character completely between service times: an airy, sun-washed space at lunch; an intimate amber chamber at dinner.',
        images: ['https://images.unsplash.com/photo-1552566626-52f8b828a592?w=1600&q=80'],
      },
    ],
    prevSlug: 'atlas-full-story',
    nextSlug: 'atlas-full-story',
  },
]

/* =============================================
   TEAM
   ============================================= */
export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Layla Karim',
    role: 'Co-Founder & Creative Director',
    education: 'M.Arch — Architectural Association, London',
    bio: 'Layla established KLAY in 2012 with a conviction that the most sophisticated spaces are never the most complicated ones. She leads all design direction and is the studio\'s primary client liaison on landmark projects.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    isFounder: true,
    linkedin: '#',
  },
  {
    id: '2',
    name: 'Marco Riva',
    role: 'Co-Founder & Director of Construction',
    education: 'MSc Building Engineering — Politecnico di Milano',
    bio: 'Marco ensures that every concept KLAY designs is buildable, budget-respecting, and enduringly robust. His background spans contractor-side project management and bespoke furniture manufacture.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    isFounder: true,
    linkedin: '#',
  },
  {
    id: '3',
    name: 'Nour El-Amin',
    role: 'Co-Founder & Managing Director',
    education: 'MBA — INSEAD; BA Interior Architecture — AUB',
    bio: 'Nour shapes the business strategy that has allowed KLAY to operate simultaneously across five countries. She oversees client relations, new business development, and the studio\'s creative partnerships.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    isFounder: true,
    linkedin: '#',
  },
  {
    id: '4',
    name: 'Selin Doğan',
    role: 'Senior Designer',
    education: '',
    bio: 'Selin leads interior detailing on hospitality projects, with a particular focus on bespoke millwork and material specification.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    isFounder: false,
  },
  {
    id: '5',
    name: 'Rafael Torres',
    role: 'Project Architect',
    education: '',
    bio: 'Rafael manages technical documentation and contractor coordination across KLAY\'s Gulf region projects.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    isFounder: false,
  },
  {
    id: '6',
    name: 'Ayşe Özdemir',
    role: 'Design Director — Retail',
    education: '',
    bio: 'Ayşe specialises in luxury retail environments, having previously spent five years at a flagship Paris atelier.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    isFounder: false,
  },
]

/* =============================================
   NEWS
   ============================================= */
export const news: NewsArticle[] = [
  { id: '1', title: 'KLAY Interiors wins Interior Design Award for Atlas Boutique Hotel', date: 'MAY 28, 2026', publication: 'Interior Design Magazine' },
  { id: '2', title: 'In Conversation: Layla Karim on restraint as a design philosophy', date: 'APR 14, 2026', publication: 'Dezeen' },
  { id: '3', title: 'Lune Restaurant, Riyadh: a new destination in the making', date: 'MAR 02, 2026', publication: 'Wallpaper*' },
  { id: '4', title: 'KLAY opens third international office in Dubai', date: 'FEB 10, 2026', publication: 'Architectural Digest ME' },
  { id: '5', title: 'Material Intelligence: KLAY\'s approach to sourcing', date: 'JAN 19, 2026', publication: 'Kinfolk' },
  { id: '6', title: 'The new luxury: studios doing more with less', date: 'DEC 05, 2025', publication: 'Surface' },
]

/* =============================================
   PARTNERS (for logo marquee)
   ============================================= */
export const partners = [
  'Four Seasons', 'Hyatt', 'Marriott', 'Louis Vuitton',
  'Nobu', 'Raffles', 'W Hotels', 'Accor',
  'Kempinski', 'Jumeirah', 'Rosewood', 'Mandarin Oriental',
]
