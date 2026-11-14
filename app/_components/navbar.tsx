"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
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

const desktopLinks = [
  { href: '/',         label: 'home',     icon: House },
  { href: '/about',    label: 'about',    icon: User },
  { href: '/projects', label: 'projects', icon: FolderSimple },
  { href: '/blog',     label: 'blog',     icon: BookOpen },
  { href: '/contact',  label: 'contact',  icon: PaperPlaneTilt },
]

const mobileTabs = [
  { href: '/',         label: 'home',     icon: House },
  { href: '/about',    label: 'about',    icon: User },
  { href: '/projects', label: 'work',     icon: FolderSimple },
  { href: '/blog',     label: 'blog',     icon: BookOpen },
  { href: '/contact',  label: 'contact',  icon: PaperPlaneTilt },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillPosition, setPillPosition] = useState({ x: 0, width: 0 })
  const [isPillAnimating, setIsPillAnimating] = useState(false)
  const [mobilePillPosition, setMobilePillPosition] = useState(0)
  const prevTabIdx = useRef<number>(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const mobileLinkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([])
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Determine active tab index
  const getActiveIndex = useCallback((path: string) => {
    if (path === '/') return 0
    if (path === '/about') return 1
    if (path.startsWith('/projects')) return 2
    if (path.startsWith('/blog')) return 3
    if (path.startsWith('/contact')) return 4
    return 0
  }, [])

  // Mobile active index (derived from pathname)
  const mobileActiveIndex = getActiveIndex(pathname)

  // Update pill position with fluid spring animation (desktop)
  const updatePillPosition = useCallback((index: number) => {
    if (!navRef.current || !linkRefs.current[index]) return

    const nav = navRef.current
    const link = linkRefs.current[index]
    if (!link) return

    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()

    const x = linkRect.left - navRect.left
    const width = linkRect.width

    setIsPillAnimating(true)
    setPillPosition({ x, width })

    // Trigger reflow for spring animation
    requestAnimationFrame(() => {
      setTimeout(() => setIsPillAnimating(false), 400)
    })
  }, [])

  // Update mobile pill position
  const updateMobilePillPosition = useCallback((index: number) => {
    if (!mobileNavRef.current || !mobileLinkRefs.current[index]) return

    const nav = mobileNavRef.current
    const link = mobileLinkRefs.current[index]
    if (!link) return

    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()

    const x = linkRect.left - navRect.left
    setMobilePillPosition(x)
  }, [])

  // Update pill positions on pathname change
  useEffect(() => {
    const newIndex = getActiveIndex(pathname)
    setActiveIndex(newIndex)

    requestAnimationFrame(() => {
      updatePillPosition(newIndex)
      updateMobilePillPosition(newIndex)
    })
  }, [pathname, getActiveIndex, updatePillPosition, updateMobilePillPosition])

  // Desktop active link helper
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Handle pathname changes
  useEffect(() => {
    const newIndex = getActiveIndex(pathname)
    setActiveIndex(newIndex)

    // Update pill position after render
    requestAnimationFrame(() => {
      updatePillPosition(newIndex)
    })
  }, [pathname, getActiveIndex, updatePillPosition])

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      requestAnimationFrame(() => searchInputRef.current?.focus())
    } else {
      setSearchQuery('')
    }
  }, [isSearchOpen])

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(v => !v)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setIsDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Handle link click for pill animation
  const handleLinkClick = (index: number) => {
    setActiveIndex(index)
    updatePillPosition(index)
  }

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — Centered Pill Nav with iOS 26 Fluid Liquid Animation
      ══════════════════════════════════════ */}
      <header className="hidden md:flex fixed top-5 inset-x-0 z-50 justify-center pointer-events-none select-none">
        <nav
          ref={navRef}
          className={cn(
            "pointer-events-auto relative flex items-center gap-1 px-2 h-11 rounded-full",
            "glass nav-pill-glow",
            "transition-all duration-300 ease-out",
            isScrolled ? "scale-[0.98] opacity-90" : "scale-100 opacity-100"
          )}
          aria-label="Main navigation"
        >
          {/* Fluid Liquid Pill - iOS 26 Style */}
          <div
            className={cn(
              "absolute top-1 bottom-1 rounded-full pointer-events-none z-0",
              "bg-primary shadow-[0_8px_24px_oklch(0.6_0.22_250_/0.4),0_2px_8px_oklch(0.6_0.22_250_/0.3)]",
              "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isPillAnimating && "animate-pill-bounce"
            )}
            style={{
              transform: `translateX(${pillPosition.x}px)`,
              width: pillPosition.width,
            }}
            aria-hidden="true"
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'linear-gradient(to bottom, oklch(1 0 0 / 0.25), oklch(0 0 0 / 0%))',
              boxShadow: 'inset 0 1px 0 oklch(1 0 0 / 0.3), inset 0 -1px 0 oklch(0 0 0 / 0.1)',
            }} />
          </div>

          {/* Logo / Monogram */}
          <Link
            href="/"
            onClick={() => handleLinkClick(0)}
            ref={(el) => { linkRefs.current[0] = el }}
            className="relative z-10 flex items-center justify-center size-7 rounded-full bg-transparent text-foreground font-bold text-xs mr-1 hover:scale-110 transition-transform"
            aria-label="Home"
          >
            DO
          </Link>

          {/* Separator */}
          <span className="relative z-10 w-px h-5 bg-border mx-1 opacity-60" aria-hidden />

          {/* Nav Links with Icons */}
          {desktopLinks.map(({ href, label, icon: Icon }, idx) => (
            <Link
              key={href}
              href={href}
              onClick={() => handleLinkClick(idx)}
              ref={(el) => { linkRefs.current[idx] = el }}
              className={cn(
                "relative z-10 flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium transition-all duration-200",
                isActive(href)
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              <Icon size={14} weight={isActive(href) ? "fill" : "regular"} aria-hidden />
              <span className="lowercase">{label}</span>
            </Link>
          ))}

          {/* Separator */}
          <span className="relative z-10 w-px h-5 bg-border mx-1 opacity-60" aria-hidden />

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative z-10 flex items-center gap-1.5 px-3 h-9 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 group"
            aria-label="Search (⌘K)"
          >
            <MagnifyingGlass size={14} weight="bold" />
            <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">⌘K</span>
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════
          MOBILE — Bottom Tab Bar (iOS 26 Style)
      ══════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom select-none">
        {/* Gradient fade above the bar */}
        <div
          className="absolute inset-x-0 -top-8 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
          }}
          aria-hidden
        />
        <nav
          ref={mobileNavRef}
          className={cn(
            "relative flex items-center justify-around px-2 pt-2 pb-safe-or-2",
            "glass border-t border-border/40",
          )}
          style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
          aria-label="Mobile navigation"
        >
          {/* Mobile fluid pill - iOS 26 liquid glass */}
          <div
            className={cn(
              "absolute top-2 bottom-2 rounded-2xl pointer-events-none z-0",
              "bg-primary/15 shadow-[0_4px_16px_oklch(0.6_0.22_250_/0.3),0_1px_4px_oklch(0.6_0.22_250_/0.2)]",
              "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            )}
            style={{
              transform: `translateX(${mobilePillPosition}px)`,
            }}
            aria-hidden
          >
            <div className="absolute inset-0 rounded-2xl" style={{
              background: 'linear-gradient(to bottom, oklch(1 0 0 / 0.2), oklch(0 0 0 / 0%))',
              boxShadow: 'inset 0 1px 0 oklch(1 0 0 / 0.15)',
            }} />
          </div>

          {mobileTabs.map(({ href, label, icon: Icon }, idx) => {
            const active = idx === mobileActiveIndex
            return (
              <Link
                key={href}
                href={href}
                ref={(el) => { mobileLinkRefs.current[idx] = el }}
                className={cn(
                  "relative z-10 flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1.5 rounded-2xl transition-all duration-200",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  size={22}
                  weight={active ? "fill" : "regular"}
                  aria-hidden
                />
                <span className={cn(
                  "text-[10px] font-medium tracking-tight lowercase transition-all",
                  active ? "opacity-100 font-semibold" : "opacity-70"
                )}>
                  {label}
                </span>
              </Link>
            )
          })}

          {/* Search tab */}
          <button
            onClick={() => setIsSearchOpen(true)}
            ref={(el) => { mobileLinkRefs.current[5] = el }}
            className="relative z-10 flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1.5 rounded-2xl text-muted-foreground hover:text-foreground transition-all"
            aria-label="Search"
          >
            <MagnifyingGlass size={22} weight="regular" aria-hidden />
            <span className="text-[10px] font-medium tracking-tight lowercase opacity-70">search</span>
          </button>
        </nav>
      </div>

      {/* ══════════════════════════════════════
          SEARCH OVERLAY (shared)
      ══════════════════════════════════════ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4 search-overlay animate-fade-in"
          style={{ background: 'oklch(from var(--background) l c h / 0.6)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsSearchOpen(false) }}
        >
          <div className="w-full max-w-xl animate-scale-up">
            {/* Search box */}
            <div className="card-surface rounded-[24px] overflow-hidden grain relative">
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
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={16} weight="bold" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center px-2 h-5 rounded-md bg-muted border border-border text-[10px] font-medium text-muted-foreground">
                  esc
                </kbd>
              </div>

              {/* Quick links */}
              {!searchQuery && (
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-widest px-2 pb-2">Quick Links</p>
                  <div className="flex flex-col gap-0.5">
                    {desktopLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/80 transition-colors group"
                      >
                        <span className="size-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                          <Icon size={13} weight="bold" />
                        </span>
                        <span className="text-sm font-medium text-foreground lowercase">{label}</span>
                        <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">↵</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Search results */}
              {searchQuery && (
                <div className="p-3">
                  <SearchResults query={searchQuery} onClose={() => setIsSearchOpen(false)} />
                </div>
              )}

              <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 text-[11px] text-muted-foreground/60">
                <span>↑↓ navigate · ↵ open · esc close</span>
                <span>⌘K</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Inline search result component ─── */
function SearchResults({ query, onClose }: { query: string; onClose: () => void }) {
  const q = query.toLowerCase().trim()

  const allPages = [
    { href: '/',         title: 'Home',           description: 'Design engineer & frontend architecture' },
    { href: '/about',    title: 'About',           description: 'Background, philosophy & tech stack' },
    { href: '/projects', title: 'Projects',        description: 'Selected works & case studies' },
    { href: '/blog',     title: 'Blog',            description: 'Thoughts, essays & tutorials' },
    { href: '/contact',  title: 'Contact',         description: 'Get in touch for projects & collaborations' },
    { href: '/now',      title: 'Now',             description: 'What I\'m currently working on' },
    { href: '/projects/ios-sleep-tracker',      title: 'sleep. — iOS Tracker',       description: 'Minimal SwiftUI sleep health app with physics gestures' },
    { href: '/projects/oklch-palette-builder', title: 'OKLCH Palette Builder',       description: 'Visual color palette tool using the OKLCH color space' },
    { href: '/projects/portfolio',             title: 'Portfolio Website',           description: 'This very site — Next.js, Tailwind, Nextra' },
    { href: '/blog/crafting-sleek-interfaces', title: 'Crafting Sleek Interfaces',   description: 'Design aesthetics, typography, and high-fidelity web experiences' },
    { href: '/blog/hello-world',               title: 'Hello, World',                description: 'First post on the new blog' },
    { href: '/blog/oklch-color-future',        title: 'OKLCH is the Future of Color', description: 'Why OKLCH produces more consistent, accessible palettes' },
    { href: '/blog/perfect-button',            title: 'The Anatomy of a Perfect Button', description: 'Deep dive into premium button design' },
  ]

  const results = allPages.filter(
    p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  )

  if (results.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        <p>No results for <strong className="text-foreground">"{query}"</strong></p>
        <p className="text-xs mt-1 opacity-60">Try a different search term</p>
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
            <span className="text-sm font-semibold text-foreground leading-tight">{page.title}</span>
            <span className="text-xs text-muted-foreground leading-tight truncate">{page.description}</span>
          </div>
          <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">↵</span>
        </Link>
      ))}
    </div>
  )
}

