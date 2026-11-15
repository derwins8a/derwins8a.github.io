"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  House,
  User,
  FolderSimple,
  BookOpen,
  PaperPlaneTilt,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react"
import { cn } from '@/lib/utils'

const tabs = [
  { name: "home.", href: "/", icon: House },
  { name: "about.", href: "/about", icon: User },
  { name: "projects.", href: "/projects", icon: FolderSimple },
  { name: "blog.", href: "/blog", icon: BookOpen },
  { name: "contact.", href: "/contact", icon: PaperPlaneTilt },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Determine current active index (-1 for unknown pages so the lens smoothly hides)
  let activeIndex = -1
  if (pathname === "/") activeIndex = 0
  else if (pathname === "/about") activeIndex = 1
  else if (pathname.startsWith("/projects")) activeIndex = 2
  else if (pathname.startsWith("/blog")) activeIndex = 3
  else if (pathname.startsWith("/contact")) activeIndex = 4

  const prevIndexRef = useRef<number>(activeIndex)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Bounciness on tab change
  useEffect(() => {
    if (activeIndex !== -1 && prevIndexRef.current !== -1 && prevIndexRef.current !== activeIndex) {
      setIsBouncing(true)
      const timer = setTimeout(() => setIsBouncing(false), 450)
      prevIndexRef.current = activeIndex
      return () => clearTimeout(timer)
    }
    prevIndexRef.current = activeIndex
  }, [activeIndex])

  // Focus search input on open
  useEffect(() => {
    if (isSearchOpen) {
      requestAnimationFrame(() => searchInputRef.current?.focus())
    } else {
      setSearchQuery('')
    }
  }, [isSearchOpen])

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(v => !v)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Desktop dimensions
  const desktopTabWidth = 76 // px per tab on desktop
  const desktopPadding = 4

  // Mobile dimensions
  const mobileTabWidth = 56  // px per tab on mobile
  const mobilePadding = 4

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — Centered Pill Nav with iOS 26 Liquid Magnifier Animation
      ══════════════════════════════════════ */}
      <header className="hidden md:flex fixed top-5 inset-x-0 z-50 justify-center pointer-events-none select-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <nav
            className="relative flex items-center p-1 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-colors duration-300"
            style={{
              width: `${tabs.length * desktopTabWidth + desktopPadding * 2}px`,
              height: "54px",
            }}
            aria-label="Main navigation"
          >
            {/* 1. Base Layer: Inactive Muted Icons & Links */}
            <div className="flex items-center w-full h-full relative z-10">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className="flex flex-col items-center justify-center gap-0.5 h-full transition-colors text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                    style={{ width: `${desktopTabWidth}px` }}
                  >
                    <Icon size={20} weight="regular" />
                    <span className="text-[10px] font-medium tracking-tight lowercase">
                      {tab.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* 2. Top Mask Layer: Translucent Liquid Glass Lens (iOS 26 Style) */}
            <div
              className={cn(
                "absolute top-1 bottom-1 overflow-hidden pointer-events-none rounded-full z-20",
                "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "bg-black/[0.06] dark:bg-white/[0.14] backdrop-blur-xl",
                "border border-black/10 dark:border-white/25",
                isBouncing && "scale-x-[1.15] scale-y-[0.95]",
                activeIndex === -1 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
              style={{
                left: `${(activeIndex === -1 ? 0 : activeIndex) * desktopTabWidth + desktopPadding}px`,
                width: `${desktopTabWidth}px`,
                boxShadow:
                  '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.5), inset 0 -1px 1px rgba(0, 0, 0, 0.15)',
              }}
              aria-hidden="true"
            >
              {/* Inner container with exact matching negative offset to reveal active colored glowing icon & text */}
              <div
                className="flex items-center h-full absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  left: `-${(activeIndex === -1 ? 0 : activeIndex) * desktopTabWidth}px`,
                  width: `${tabs.length * desktopTabWidth}px`,
                }}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <div
                      key={`active-${tab.href}`}
                      className="flex flex-col items-center justify-center gap-0.5 h-full text-[#007AFF] dark:text-[#0a84ff]"
                      style={{ width: `${desktopTabWidth}px` }}
                    >
                      <Icon
                        size={20}
                        weight="fill"
                        className="text-[#007AFF] dark:text-[#0a84ff] drop-shadow-[0_0_8px_rgba(0,122,255,0.7)]"
                      />
                      <span className="text-[10px] font-bold tracking-tight lowercase text-[#007AFF] dark:text-[#0a84ff] drop-shadow-[0_0_6px_rgba(0,122,255,0.5)]">
                        {tab.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Search Glass Button (Matching iOS 26 Circle as in reference image) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="size-[54px] rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center text-muted-foreground hover:text-foreground dark:text-[#8e8e93] dark:hover:text-white transition-all hover:scale-105 active:scale-95 group"
            aria-label="Search (⌘K)"
          >
            <MagnifyingGlass size={20} weight="bold" />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE — Floating Bottom Pill Nav (iOS 26 Style)
      ══════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
        <div className="flex items-center gap-2">
          <nav
            className="relative flex items-center p-1 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-colors duration-300"
            style={{
              width: `${tabs.length * mobileTabWidth + mobilePadding * 2}px`,
              height: "54px",
            }}
            aria-label="Mobile navigation"
          >
            {/* 1. Base Layer: Inactive Tabs */}
            <div className="flex items-center w-full h-full relative z-10">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className="flex flex-col items-center justify-center gap-0.5 h-full transition-colors text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                    style={{ width: `${mobileTabWidth}px` }}
                  >
                    <Icon size={20} weight="regular" />
                    <span className="text-[10px] font-medium tracking-tight lowercase">
                      {tab.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* 2. Top Mask Layer: Mobile Liquid Glass Lens */}
            <div
              className={cn(
                "absolute top-1 bottom-1 overflow-hidden pointer-events-none rounded-full z-20",
                "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "bg-black/[0.06] dark:bg-white/[0.14] backdrop-blur-xl",
                "border border-black/10 dark:border-white/25",
                isBouncing && "scale-x-[1.15] scale-y-[0.95]",
                activeIndex === -1 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
              style={{
                left: `${(activeIndex === -1 ? 0 : activeIndex) * mobileTabWidth + mobilePadding}px`,
                width: `${mobileTabWidth}px`,
                boxShadow:
                  '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.5), inset 0 -1px 1px rgba(0, 0, 0, 0.15)',
              }}
              aria-hidden="true"
            >
              {/* Inner container with exact matching offset */}
              <div
                className="flex items-center h-full absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  left: `-${(activeIndex === -1 ? 0 : activeIndex) * mobileTabWidth}px`,
                  width: `${tabs.length * mobileTabWidth}px`,
                }}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <div
                      key={`active-mobile-${tab.href}`}
                      className="flex flex-col items-center justify-center gap-0.5 h-full text-[#007AFF] dark:text-[#0a84ff]"
                      style={{ width: `${mobileTabWidth}px` }}
                    >
                      <Icon
                        size={20}
                        weight="fill"
                        className="text-[#007AFF] dark:text-[#0a84ff] drop-shadow-[0_0_8px_rgba(0,122,255,0.7)]"
                      />
                      <span className="text-[10px] font-bold tracking-tight lowercase text-[#007AFF] dark:text-[#0a84ff] drop-shadow-[0_0_6px_rgba(0,122,255,0.5)]">
                        {tab.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Search Button for Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="size-[54px] rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center text-muted-foreground hover:text-foreground dark:text-[#8e8e93] dark:hover:text-white transition-all active:scale-95"
            aria-label="Search"
          >
            <MagnifyingGlass size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SEARCH OVERLAY (⌘K)
      ══════════════════════════════════════ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 search-overlay animate-fade-in"
          style={{ background: 'oklch(from var(--background) l c h / 0.65)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsSearchOpen(false) }}
        >
          <div className="w-full max-w-xl animate-scale-up">
            <div className="card-surface rounded-[24px] overflow-hidden grain relative shadow-2xl border border-border/60">
              {/* Search input bar */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
                <MagnifyingGlass size={18} weight="bold" className="text-muted-foreground shrink-0" aria-hidden />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="search posts, projects, pages…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base font-medium lowercase"
                  aria-label="Search"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Clear search"
                  >
                    <X size={16} weight="bold" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center px-2 h-5 rounded-md bg-muted border border-border text-[10px] font-medium text-muted-foreground">
                  esc
                </kbd>
              </div>

              {/* Quick links when empty */}
              {!searchQuery && (
                <div className="p-3">
                  <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest px-3 pb-2 pt-1">
                    Quick Navigation
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {tabs.map(({ href, name, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/80 transition-colors group"
                      >
                        <span className="size-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                          <Icon size={14} weight="bold" />
                        </span>
                        <span className="text-sm font-medium text-foreground lowercase">{name}</span>
                        <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">↵</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Search results */}
              {searchQuery && (
                <div className="p-3 max-h-[60vh] overflow-y-auto">
                  <SearchResults query={searchQuery} onClose={() => setIsSearchOpen(false)} />
                </div>
              )}

              <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 text-[11px] text-muted-foreground/70 bg-muted/20">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span>⌘K</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SearchResults({ query, onClose }: { query: string; onClose: () => void }) {
  const q = query.toLowerCase().trim()

  const allPages = [
    { href: '/',         title: 'home',           description: 'Design engineer & frontend architecture' },
    { href: '/about',    title: 'about',          description: 'Background, philosophy & tech stack' },
    { href: '/projects', title: 'projects',       description: 'Selected works & case studies' },
    { href: '/blog',     title: 'blog',           description: 'Thoughts, essays & technical writings' },
    { href: '/contact',  title: 'contact',        description: 'Get in touch for projects & collaborations' },
    { href: '/now',      title: 'now',            description: 'What I am currently focused on' },
    { href: '/projects/ios-sleep-tracker',      title: 'sleep. — iOS tracker',       description: 'Minimal SwiftUI sleep health app with physics gestures' },
    { href: '/projects/oklch-palette-builder', title: 'oklch color builder',         description: 'Interactive color palette tool using OKLCH color space' },
    { href: '/projects/design-system-kit',     title: 'design system kit',           description: 'Open source design tokens and component kit for Next.js' },
    { href: '/projects/portfolio',             title: 'portfolio website',           description: 'Tactile, high-performance portfolio built with Nextra & Tailwind' },
    { href: '/blog/crafting-sleek-interfaces', title: 'crafting sleek interfaces',   description: 'Design aesthetics, typography, and high-fidelity web experiences' },
    { href: '/blog/oklch-color-future',        title: 'oklch is the future of web color', description: 'Why OKLCH produces more consistent palettes than HSL' },
    { href: '/blog/perfect-button',            title: 'the anatomy of a perfect button', description: 'What makes a button feel premium: padding, physics, and light' },
    { href: '/blog/hello-world',               title: 'hello world',                 description: 'First post on the new blog' },
  ]

  const results = allPages.filter(
    p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  )

  if (results.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        <p>No results for <strong className="text-foreground">"{query}"</strong></p>
        <p className="text-xs mt-1 opacity-60">Try searching for "design", "swiftui", "oklch", or "react"</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      {results.map(page => (
        <Link
          key={page.href}
          href={page.href}
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/80 transition-colors group"
        >
          <span className="size-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
            <MagnifyingGlass size={13} weight="bold" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground leading-tight lowercase">{page.title}</span>
            <span className="text-xs text-muted-foreground leading-tight truncate mt-0.5 lowercase">{page.description}</span>
          </div>
          <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">↵</span>
        </Link>
      ))}
    </div>
  )
}
