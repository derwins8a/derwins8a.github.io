"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Sun, Moon, Desktop } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (stored) {
      setTheme(stored)
      if (stored === "dark") {
        document.documentElement.classList.add("dark")
        document.documentElement.setAttribute("data-theme", "dark")
      } else if (stored === "light") {
        document.documentElement.classList.remove("dark")
        document.documentElement.setAttribute("data-theme", "light")
      }
    } else {
      setTheme("system")
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.setAttribute("data-theme", "dark")
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", "light")
    } else {
      document.documentElement.removeAttribute("data-theme")
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  if (!mounted) {
    return (
      <div className="h-8 w-28 rounded-full bg-muted/50 animate-pulse" />
    )
  }

  return (
    <div className="flex items-center p-1 rounded-full bg-muted border border-border/40 text-muted-foreground shadow-sm select-none">
      <button
        onClick={() => applyTheme("light")}
        className={cn(
          "p-1.5 rounded-full transition-all flex items-center justify-center",
          theme === "light" 
            ? "bg-background text-foreground shadow-sm" 
            : "hover:text-foreground"
        )}
        title="light mode"
        aria-label="Light mode"
      >
        <Sun size={15} weight={theme === "light" ? "fill" : "regular"} />
      </button>

      <button
        onClick={() => applyTheme("system")}
        className={cn(
          "p-1.5 rounded-full transition-all flex items-center justify-center",
          theme === "system" 
            ? "bg-background text-foreground shadow-sm" 
            : "hover:text-foreground"
        )}
        title="system theme"
        aria-label="System theme"
      >
        <Desktop size={15} weight={theme === "system" ? "fill" : "regular"} />
      </button>

      <button
        onClick={() => applyTheme("dark")}
        className={cn(
          "p-1.5 rounded-full transition-all flex items-center justify-center",
          theme === "dark" 
            ? "bg-background text-foreground shadow-sm" 
            : "hover:text-foreground"
        )}
        title="dark mode"
        aria-label="Dark mode"
      >
        <Moon size={15} weight={theme === "dark" ? "fill" : "regular"} />
      </button>
    </div>
  )
}
