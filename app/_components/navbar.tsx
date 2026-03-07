"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { List } from "@phosphor-icons/react/dist/ssr"
import { cn } from '@/lib/utils'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        
        // Handle Top State (Uncollapsed)
        if (currentScrollY <= 20) {
          setIsScrolled(false)
          setIsVisible(true)
        } else {
          setIsScrolled(true)
          // Hide when scrolling down, Show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false) 
          } else {
            setIsVisible(true)
          }
        }
        setLastScrollY(currentScrollY)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lastScrollY])

  return (
    <>
      {/* 
        We use a placeholder div at the top to prevent layout jump 
        when the massive header turns fixed/sticky. 
      */}
      <div className={cn("w-full transition-all duration-300", isScrolled ? "h-20" : "h-48")} />
      
      <header
        className={cn(
          "fixed left-0 right-0 z-50 flex items-center transition-all duration-300 ease-in-out",
          
          // Massive Uncollapsed Top State
          !isScrolled && "top-8 bg-transparent border-none py-4",

          // Compressed Sticky State
          isScrolled && "top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-0 shadow-sm",

          // Translate logic
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className={cn("mx-auto w-full px-6 flex justify-between", !isScrolled ? "max-w-4xl" : "max-w-4xl h-16 items-center")}>
          
          <div className={cn("flex flex-col transition-all duration-300", isScrolled ? "justify-center" : "")}>
            <Link href="/" className={cn(
              "font-bold tracking-tighter transition-all duration-300 uppercase leading-none",
              isScrolled ? "text-xl mt-0" : "text-6xl max-w-min"
            )}>
              Derwins Ochoa
            </Link>

            {/* Sub Nav Menu (Visible only at top) */}
            <div className={cn(
              "flex items-center gap-2 text-foreground/60 text-lg transition-all duration-300 font-light",
              isScrolled ? "opacity-0 h-0 w-0 overflow-hidden" : "opacity-100 mt-4"
            )}>
              <Link href="/about" className="hover:text-foreground transition-colors">about me</Link>
              <span>|</span>
              <Link href="/projects" className="hover:text-foreground transition-colors">projects</Link>
              <span>|</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">blog</Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-foreground transition-colors">contact</Link>
            </div>
          </div>

          {/* Mobile Menu Icon (Only visible in Sticky or Mobile) */}
          <div className={cn(
            "flex items-center transition-all duration-300", 
            !isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <button className="p-2 -mr-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" aria-label="Open menu">
              <List size={28} weight="bold" />
            </button>
          </div>

        </div>
      </header>
    </>
  )
}