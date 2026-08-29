import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { IOSDock } from '@/components/ios-dock'

export const NextraTheme: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
}> = ({ children, pageMap }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-[#007AFF]/30 selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-6 pb-20">
        {children}
      </main>
      <Footer />
      <IOSDock />
    </div>
  )
}