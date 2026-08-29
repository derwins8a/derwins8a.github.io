"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { List, X, GithubLogo, LinkedinLogo, TwitterLogo, Envelope } from "@phosphor-icons/react"
import { cn } from '@/lib/utils'
import { ProtectedEmailLink } from '@/components/protected-email-link'

export const Navbar = () => {
  const [showSticky, setShowSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        setShowSticky(currentScrollY > 100)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      {/* 1. Main Top Static Navbar (Natural document flow - Zero Layout Jump) */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-10 pb-4 flex justify-between items-center transition-opacity select-none">
        {/* Logo / Name */}
        <Link 
          href="/" 
          className="font-extrabold tracking-tighter uppercase leading-none text-foreground text-3xl lg:text-4xl hover:opacity-85 transition-opacity"
        >
          Derwins Ochoa
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground lowercase">
          <Link href="/about" className="hover:text-foreground transition-colors">about me</Link>
          <Link href="/projects" className="hover:text-foreground transition-colors">projects</Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">blog</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">contact</Link>
        </nav>

        {/* Mobile Menu Toggle Button with Dock Rim Lighting */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="size-10 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.6)] flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all"
            aria-label="open menu"
          >
            <List size={20} weight="bold" />
          </button>
        </div>
      </header>

      {/* 2. Floating Sticky Navbar (Fades in with blur & gradient when top navbar is out of sight) */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out select-none",
          "backdrop-blur-md bg-background/80 border-b border-border/20 shadow-sm",
          showSticky 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-3 pointer-events-none"
        )}
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Compact Logo */}
          <Link 
            href="/" 
            className="font-extrabold tracking-tighter uppercase text-xl text-foreground hover:opacity-85 transition-opacity"
          >
            Derwins Ochoa
          </Link>

          {/* Compact Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground lowercase">
            <Link href="/about" className="hover:text-foreground transition-colors">about me</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">projects</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">blog</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">contact</Link>
          </nav>

          {/* Mobile Menu Button with Rim Lighting for Sticky Header */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="size-10 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.6)] flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all"
              aria-label="open menu"
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. iOS-Style Fullscreen Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md animate-fade-in select-none">
          {/* Top Bar inside Menu */}
          <div className="flex justify-between items-center px-6 h-16 border-b border-border/20">
            <span className="font-extrabold tracking-tighter uppercase text-xl text-foreground">Derwins Ochoa</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="size-10 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.6)] flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all"
              aria-label="close menu"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-grow flex flex-col justify-center px-8 gap-8">
            <nav className="flex flex-col gap-6 text-3xl font-bold tracking-tight lowercase">
              <Link 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-foreground/80 transition-colors py-2 border-b border-border/10"
              >
                about me.
              </Link>
              <Link 
                href="/projects" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-foreground/80 transition-colors py-2 border-b border-border/10"
              >
                projects.
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-foreground/80 transition-colors py-2 border-b border-border/10"
              >
                blog.
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-foreground/80 transition-colors py-2 border-b border-border/10"
              >
                contact.
              </Link>
            </nav>

            {/* Socials & Info inside Drawer */}
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-center gap-4 text-foreground/80">
                <a 
                  href="https://github.com/derwins8a" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="size-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <GithubLogo size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/derwins8a" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="size-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <LinkedinLogo size={20} />
                </a>
                <a 
                  href="https://twitter.com/derwins8a" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="size-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <TwitterLogo size={20} />
                </a>
                <ProtectedEmailLink className="size-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center hover:scale-105 transition-transform text-foreground cursor-pointer">
                  <Envelope size={20} />
                </ProtectedEmailLink>
              </div>
              <p className="text-xs text-muted-foreground font-light lowercase">made with 🖤 in venezuela</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}