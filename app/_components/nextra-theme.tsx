import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

export const NextraTheme: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
}> = ({ children, pageMap }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 transition-colors duration-300">
      {/* Background mesh gradient */}
      <div className="page-gradient" aria-hidden />

      <Navbar />

      {/* Main content — padded for desktop pill nav top + mobile bottom tab bar */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-5 md:px-6 pt-24 md:pt-20 pb-28 md:pb-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}
