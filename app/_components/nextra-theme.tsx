"use client"

import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from './footer'
import { Navbar } from './navbar'

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

      <Navbar />

      {/* Main content — padded for desktop pill nav top + mobile bottom tab bar */}
      <main className={`flex-grow max-w-4xl mx-auto w-full px-5 md:px-6 transition-all duration-300 ${
        isHomeOrContact
          ? 'pt-20 md:pt-16 pb-16 md:pb-12'
          : 'pt-28 md:pt-24 pb-16 md:pb-12'
      }`}>
        {children}
      </main>

      <Footer />

      {/* Mobile bottom navbar spacer - prevents theme toggle occlusion */}
      <div className="md:hidden h-20" aria-hidden />
    </div>
  )
}
