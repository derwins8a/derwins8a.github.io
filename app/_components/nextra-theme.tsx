"use client"

import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { GlassCursor } from '@/components/glass-cursor'

export const NextraTheme: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
}> = ({ children, pageMap }) => {
  const pathname = usePathname()
  const isHomeOrContact = pathname === '/' || pathname === '/contact'

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 transition-colors duration-300">
      {/* Background mesh gradient */}
      <div className="page-gradient" aria-hidden />

      {/* Apple-style Glass Refraction Cursor */}
      <GlassCursor />

      {/* Floating Centered Pill Navbar (Desktop) & Floating Bottom Pill (Mobile) */}
      <Navbar />

      {/* Main content
          Mobile: compact top padding (no top bar exists on mobile, so no dead space)
          Desktop:
            - Home & Contact: md:pt-20 (compact for hero)
            - Inner Pages: md:pt-28 lg:pt-32 (generous breathing room under top pill)
      */}
      <main className={`flex-grow max-w-4xl mx-auto w-full px-5 md:px-6 transition-all duration-300 ${
        isHomeOrContact
          ? 'pt-4 sm:pt-6 md:pt-20 pb-12 md:pb-16'
          : 'pt-5 sm:pt-6 md:pt-28 lg:pt-32 pb-12 md:pb-16'
      }`}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
