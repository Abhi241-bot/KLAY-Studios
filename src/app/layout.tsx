import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { PageTransition } from '@/components/ui/PageTransition'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | KLAY Interiors',
    default: 'KLAY Interiors — Where Space Becomes Experience',
  },
  description:
    'KLAY Interiors is a luxury interior design studio crafting timeless spaces rooted in material craft, spatial precision, and editorial elegance.',
  keywords: ['luxury interior design', 'architecture', 'interior studio', 'hospitality design', 'KLAY Interiors'],
  authors: [{ name: 'KLAY Interiors' }],
  metadataBase: new URL('https://klayinteriors.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://klayinteriors.com',
    siteName: 'KLAY Interiors',
    title: 'KLAY Interiors — Where Space Becomes Experience',
    description: 'A luxury interior design studio crafting timeless spaces.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KLAY Interiors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KLAY Interiors',
    description: 'A luxury interior design studio crafting timeless spaces.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <PageTransition>
            <main id="main-content">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
