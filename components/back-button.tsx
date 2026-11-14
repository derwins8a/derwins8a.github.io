"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = "back" }: BackButtonProps) {
  const pathname = usePathname()
  const isHomeOrContact = pathname === '/' || pathname === '/contact'

  // Don't show on home or contact pages
  if (isHomeOrContact) return null

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        "bg-muted border border-border text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground",
        "shadow-sm hover:shadow-md active:scale-[0.98]",
        "lowercase"
      )}
      aria-label={`Go back to ${label}`}
    >
      <ArrowLeft size={14} weight="bold" aria-hidden />
      {label}
    </Link>
  )
}