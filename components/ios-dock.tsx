"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Clock, FolderSimple, BookOpen, PaperPlaneTilt } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "now.", href: "/now", icon: Clock },
  { name: "home.", href: "/", icon: House },
  { name: "projects.", href: "/projects", icon: FolderSimple },
  { name: "blog.", href: "/blog", icon: BookOpen },
  { name: "contact.", href: "/contact", icon: PaperPlaneTilt },
]

export function IOSDock() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const prevIndexRef = useRef<number>(1)

  // Determine current active index
  let activeIndex = 1 // Default to home
  if (pathname === "/now") activeIndex = 0
  else if (pathname === "/") activeIndex = 1
  else if (pathname.startsWith("/projects")) activeIndex = 2
  else if (pathname.startsWith("/blog")) activeIndex = 3
  else if (pathname.startsWith("/contact")) activeIndex = 4

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      setIsBouncing(true)
      const timer = setTimeout(() => setIsBouncing(false), 450)
      prevIndexRef.current = activeIndex
      return () => clearTimeout(timer)
    }
  }, [activeIndex])

  const tabWidth = 68 // Width of each tab in pixels
  const padding = 4 // Left/top padding of container in pixels

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
      <nav 
        className="relative flex items-center p-1 rounded-full bg-background/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-border/60 dark:border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-colors duration-300"
        style={{ width: `${tabs.length * tabWidth + padding * 2}px`, height: "54px" }}
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
                style={{ width: `${tabWidth}px` }}
              >
                <Icon size={20} weight="regular" />
                <span className="text-[10px] font-medium tracking-tight lowercase">
                  {tab.name}
                </span>
              </Link>
            )
          })}
        </div>

        {/* 2. Top Mask Layer: Solid/Opaque Sliding Pill that completely covers background icons and lights up in white */}
        <div
          className={cn(
            "absolute top-1 bottom-1 overflow-hidden pointer-events-none rounded-full z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "bg-muted dark:bg-[#2c2c2e] border border-border/40 dark:border-white/10 shadow-sm",
            isBouncing && "scale-x-115 scale-y-95"
          )}
          style={{
            left: `${activeIndex * tabWidth + padding}px`,
            width: `${tabWidth}px`,
          }}
        >
          {/* Inner container with exact matching offset to reveal active white icons */}
          <div
            className="flex items-center h-full absolute top-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              left: `-${activeIndex * tabWidth}px`,
              width: `${tabs.length * tabWidth}px`,
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <div
                  key={`active-${tab.href}`}
                  className="flex flex-col items-center justify-center gap-0.5 h-full text-foreground dark:text-white"
                  style={{ width: `${tabWidth}px` }}
                >
                  <Icon size={20} weight="fill" className="text-foreground dark:text-white" />
                  <span className="text-[10px] font-bold tracking-tight lowercase text-foreground dark:text-white">
                    {tab.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
