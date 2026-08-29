"use client"

import * as React from "react"
import { openProtectedMail } from "@/lib/obfuscate"

export function ProtectedEmailLink({ 
  className,
  children = "email"
}: { 
  className?: string
  children?: React.ReactNode 
}) {
  return (
    <button
      onClick={() => openProtectedMail()}
      className={className || "hover:text-foreground transition-colors w-fit text-left cursor-pointer"}
    >
      {children}
    </button>
  )
}
