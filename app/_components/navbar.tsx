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

const navTabs = [
  { href: '/',         label: 'home',     icon: House },
  { href: '/about',    label: 'about',    icon: User },
  { href: '/projects', label: 'projects', icon: FolderSimple },
  { href: '/blog',     label: 'blog',     icon: BookOpen },
  { href: '/contact',  label: 'contact',  icon: PaperPlaneTilt },
]

const DESKTOP_TAB_WIDTH = 96 // px per tab on desktop
const DESKTOP_PADDING = 4    // container padding
const MOBILE_TAB_WIDTH = 54  // px per tab on mobile
const MOBILE_PADDING = 4     // container padding

export const Navbar = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isBouncing, setIsBouncing] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const prevIndexRef = useRef<number>(-1)

  // Determine active index
  const getActiveIndex = useCallback((path: string) => {
    if (path === '/') return 0
    if (path === '/about') return 1
    if (path.startsWith('/projects')) return 2
    if (path.startsWith('/blog')) return 3
    if (path.startsWith('/contact')) return 4
    return -1
  }, [])

  const activeIndex = getActiveIndex(pathname)

  // Bounce spring animation on tab change
  useEffect(() => {
    if (activeIndex !== -1 && prevIndexRef.current !== -1 && prevIndexRef.current !== activeIndex) {
      setIsBouncing(true)
      const timer = setTimeout(() => setIsBouncing(false), 450)
      prevIndexRef.current = activeIndex
      return () => clearTimeout(timer)
    }
    prevIndexRef.current = activeIndex
  }, [activeIndex])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — Centered Pill Nav with iOS 26 Fluid Liquid Animation
      ══════════════════════════════════════ */}
      <header className="hidden md:flex fixed top-5 inset-x-0 z-50 justify-center pointer-events-none select-none">
        <nav
          className={cn(
            "pointer-events-auto relative flex items-center p-1 rounded-full",
            "glass nav-pill-glow",
            "transition-all duration-300 ease-out",
            isScrolled ? "scale-[0.98] shadow-lg" : "scale-100"
          )}
          style={{ height: '46px' }}
          aria-label="Main navigation"
        >
          {/* 1. Base Layer: Inactive Icons & Links */}
          <div className="relative flex items-center h-full z-10">
            {navTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex items-center justify-center gap-1.5 h-full text-xs font-medium lowercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                  style={{ width: `${DESKTOP_TAB_WIDTH}px` }}
                >
                  <Icon size={15} weight="regular" aria-hidden />
                  <span>{tab.label}</span>
                </Link>
              )
            })}
          </div>

          {/* 2. Top Mask Layer: Solid Liquid Sliding Pill Aperture */}
          <div
            className={cn(
              "absolute top-1 bottom-1 overflow-hidden pointer-events-none rounded-full z-20",
              "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "bg-primary text-primary-foreground shadow-[0_4px_16px_oklch(0.6_0.22_250_/0.4),0_1px_4px_oklch(0.6_0.22_250_/0.3)]",
              isBouncing && "scale-x-110 scale-y-95",
              activeIndex === -1 ? "opacity-0" : "opacity-100"
            )}
            style={{
              left: `${(activeIndex === -1 ? 0 : activeIndex) * DESKTOP_TAB_WIDTH + DESKTOP_PADDING}px`,
              width: `${DESKTOP_TAB_WIDTH}px`,
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 4px 16px oklch(0.6 0.22 250 / 0.35)',
            }}
            aria-hidden="true"
          >
            {/* Inner mirrored container that reveals glowing white active icon & text */}
            <div
              className="flex items-center h-full absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                left: `-${(activeIndex === -1 ? 0 : activeIndex) * DESKTOP_TAB_WIDTH}px`,
                width: `${navTabs.length * DESKTOP_TAB_WIDTH}px`,
              }}
            >
              {navTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <div
                    key={`active-${tab.href}`}
                    className="flex items-center justify-center gap-1.5 h-full text-white font-semibold text-xs lowercase"
                    style={{ width: `${DESKTOP_TAB_WIDTH}px` }}
                  >
                    <Icon size={15} weight="fill" className="text-white drop-shadow-xs" aria-hidden />
                    <span className="drop-shadow-xs">{tab.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Separator */}
          <span className="relative z-10 w-px h-5 bg-border/60 mx-1" aria-hidden />

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative z-10 flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 group"
            aria-label="Search (⌘K)"
          >
            <MagnifyingGlass size={14} weight="bold" aria-hidden />
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted border border-border/60 font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              ⌘K
            </span>
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════
          MOBILE — Floating Bottom Pill Nav (iOS 26 Style)
          Centered, glass rounded-full pill, no background rectangle
      ══════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 select-none">
        <nav
          className={cn(
            "relative flex items-center p-1 rounded-full",
            "glass shadow-[0_12px_36px_rgba(0,0,0,0.16)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)]",
            "border border-border/60 dark:border-white/10"
          )}
          style={{ height: '52px' }}
          aria-label="Mobile navigation"
        >
          {/* Base Layer: Inactive Tabs */}
          <div className="relative flex items-center h-full z-10">
            {navTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex flex-col items-center justify-center gap-0.5 h-full text-muted-foreground hover:text-foreground transition-colors duration-200"
                  style={{ width: `${MOBILE_TAB_WIDTH}px` }}
                >
                  <Icon size={19} weight="regular" aria-hidden />
                  <span className="text-[10px] font-medium tracking-tight lowercase">
                    {tab.label}
                  </span>
                </Link>
              )
            })}

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex flex-col items-center justify-center gap-0.5 h-full text-muted-foreground hover:text-foreground transition-colors duration-200"
              style={{ width: `${MOBILE_TAB_WIDTH}px` }}
              aria-label="Search"
            >
              <MagnifyingGlass size={19} weight="regular" aria-hidden />
              <span className="text-[10px] font-medium tracking-tight lowercase">search</span>
            </button>
          </div>

          {/* Top Mask Layer: Mobile Sliding Liquid Pill */}
          <div
            className={cn(
              "absolute top-1 bottom-1 overflow-hidden pointer-events-none rounded-full z-20",
              "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "bg-primary text-primary-foreground shadow-[0_4px_16px_oklch(0.6_0.22_250_/0.4)]",
              isBouncing && "scale-x-110 scale-y-95",
              activeIndex === -1 ? "opacity-0" : "opacity-100"
            )}
            style={{
              left: `${(activeIndex === -1 ? 0 : activeIndex) * MOBILE_TAB_WIDTH + MOBILE_PADDING}px`,
              width: `${MOBILE_TAB_WIDTH}px`,
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 4px 16px oklch(0.6 0.22 250 / 0.35)',
            }}
            aria-hidden="true"
          >
            {/* Inner container revealing glowing white icon & text */}
            <div
              className="flex items-center h-full absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                left: `-${(activeIndex === -1 ? 0 : activeIndex) * MOBILE_TAB_WIDTH}px`,
                width: `${navTabs.length * MOBILE_TAB_WIDTH}px`,
              }}
            >
              {navTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <div
                    key={`active-mobile-${tab.href}`}
                    className="flex flex-col items-center justify-center gap-0.5 h-full text-white font-semibold"
                    style={{ width: `${MOBILE_TAB_WIDTH}px` }}
                  >
                    <Icon size={19} weight="fill" className="text-white drop-shadow-xs" aria-hidden />
                    <span className="text-[10px] font-bold tracking-tight lowercase text-white drop-shadow-xs">
                      {tab.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </nav>
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
                    {navTabs.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/80 transition-colors group"
                      >
                        <span className="size-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                          <Icon size={14} weight="bold" />
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
