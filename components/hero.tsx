"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo, 
  Envelope, 
  ArrowUpRight, 
  Check, 
  Copy,
  Clock,
  Sparkle,
  Rss
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { getObfuscatedEmail, openProtectedMail } from "@/lib/obfuscate"

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [timeString, setTimeString] = useState("")
  const [mounted, setMounted] = useState(false)
  const [displayEmail, setDisplayEmail] = useState("contact@encrypted")

  useEffect(() => {
    setMounted(true)
    // Decode email only on client side to prevent bot harvesting from static HTML
    setDisplayEmail(getObfuscatedEmail())

    const updateTime = () => {
      try {
        const now = new Date()
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Caracas",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now)
        setTimeString(time.toLowerCase())
      } catch (e) {
        setTimeString("utc-4")
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    const email = getObfuscatedEmail()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleOpenEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    openProtectedMail()
  }

  return (
    <section className="relative w-full py-8 lg:py-14 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Heading, Lead & Protected Quick Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          {/* Main Title Block */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/40 text-xs font-medium text-muted-foreground w-fit lowercase">
              <Sparkle size={13} weight="fill" className="text-[#007AFF]" />
              design engineer & frontend architecture
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.08] lowercase">
              software development. done right.
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-md lowercase">
            working exclusively with established enterprise brands and funded startups to craft tactile, high-performance web and mobile software.
          </p>

          {/* Bot-Protected Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleOpenEmail}
              className="px-6 h-12 bg-[#007AFF] hover:bg-[#0071e3] text-white font-semibold rounded-full text-sm inline-flex items-center gap-2 shadow-lg shadow-[#007AFF]/25 hover:scale-105 active:scale-95 transition-all lowercase cursor-pointer"
            >
              <Envelope size={17} weight="bold" />
              send email.
            </button>

            <button
              onClick={handleCopyEmail}
              className={cn(
                "px-5 h-12 rounded-full border border-border/60 bg-card hover:bg-muted text-sm font-medium text-foreground inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 lowercase shadow-sm cursor-pointer",
                copied && "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
              )}
            >
              {copied ? (
                <>
                  <Check size={16} weight="bold" />
                  copied!
                </>
              ) : (
                <>
                  <Copy size={16} weight="bold" />
                  copy email.
                </>
              )}
            </button>
          </div>

          {/* Social Quick Dock */}
          <div className="flex items-center gap-3 pt-1">
            <a 
              href="https://github.com/derwins8a" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="size-11 rounded-2xl bg-card hover:bg-muted border border-border/60 text-foreground/80 hover:text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <GithubLogo size={20} weight="bold" />
            </a>
            <a 
              href="https://linkedin.com/in/derwins8a" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="size-11 rounded-2xl bg-card hover:bg-muted border border-border/60 text-foreground/80 hover:text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <LinkedinLogo size={20} weight="bold" />
            </a>
            <a 
              href="https://twitter.com/derwins8a" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="size-11 rounded-2xl bg-card hover:bg-muted border border-border/60 text-foreground/80 hover:text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <TwitterLogo size={20} weight="bold" />
            </a>
          </div>
        </div>

        {/* Right Column: iOS Settings Status Card & Direct Channels Inset Widget */}
        <div className="lg:col-span-6 flex flex-col gap-4 w-full">
          
          {/* iOS Profile Status Card */}
          <div className="w-full rounded-[24px] bg-card border border-border/60 p-4 sm:p-5 flex items-center justify-between shadow-lg hover:border-[#007AFF]/40 transition-colors">
            <div className="flex items-center gap-3.5">
              {/* Monogram Avatar */}
              <div className="size-12 rounded-full bg-gradient-to-br from-[#0a84ff] to-[#005bb5] flex items-center justify-center text-white font-bold text-base shadow-md">
                DO
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground tracking-tight text-base leading-snug lowercase">
                  available for contracts & engineering
                </span>
                <span className="text-xs text-muted-foreground font-normal lowercase flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  open to high-impact projects
                </span>
              </div>
            </div>

            {/* Time badge */}
            {timeString && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/40 text-[11px] text-muted-foreground lowercase">
                <Clock size={13} weight="bold" className="text-[#007AFF]" />
                {timeString}
              </div>
            )}
          </div>

          {/* iOS Inset Grouped Channels Card */}
          <div className="w-full rounded-[28px] bg-card border border-border/60 p-5 shadow-xl relative overflow-hidden flex flex-col gap-3">
            <div className="px-1 flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-foreground lowercase">direct channels.</h2>
              <span className="text-[11px] text-muted-foreground lowercase">instant contact</span>
            </div>

            <div className="flex flex-col rounded-2xl bg-muted/30 border border-border/40 divide-y divide-border/30 overflow-hidden">
              {/* Row 1: Obfuscated Email Channel */}
              <button
                onClick={handleOpenEmail}
                className="flex items-center justify-between p-3.5 hover:bg-muted/70 transition-colors group text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#007AFF] transition-colors shadow-xs">
                    <Envelope size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground lowercase leading-tight">
                      email (protected)
                    </span>
                    <span className="text-[11px] text-muted-foreground lowercase leading-tight">
                      {mounted ? displayEmail : "click to reveal"}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-[#007AFF] flex items-center gap-0.5 font-medium lowercase transition-colors">
                  open mail
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </button>

              {/* Row 2: GitHub */}
              <a
                href="https://github.com/derwins8a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 hover:bg-muted/70 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#007AFF] transition-colors shadow-xs">
                    <GithubLogo size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground lowercase leading-tight">
                      github
                    </span>
                    <span className="text-[11px] text-muted-foreground lowercase leading-tight">
                      github.com/derwins8a
                    </span>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-[#007AFF] flex items-center gap-0.5 font-medium lowercase transition-colors">
                  view profile
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </a>

              {/* Row 3: LinkedIn */}
              <a
                href="https://linkedin.com/in/derwins8a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 hover:bg-muted/70 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#007AFF] transition-colors shadow-xs">
                    <LinkedinLogo size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground lowercase leading-tight">
                      linkedin
                    </span>
                    <span className="text-[11px] text-muted-foreground lowercase leading-tight">
                      linkedin.com/in/derwins8a
                    </span>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-[#007AFF] flex items-center gap-0.5 font-medium lowercase transition-colors">
                  connect
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </a>

              {/* Row 4: Twitter / X */}
              <a
                href="https://twitter.com/derwins8a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 hover:bg-muted/70 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#007AFF] transition-colors shadow-xs">
                    <TwitterLogo size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground lowercase leading-tight">
                      twitter / x
                    </span>
                    <span className="text-[11px] text-muted-foreground lowercase leading-tight">
                      @derwins8a
                    </span>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-[#007AFF] flex items-center gap-0.5 font-medium lowercase transition-colors">
                  follow
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </a>

              {/* Row 5: RSS */}
              <a
                href="/rss.xml"
                className="flex items-center justify-between p-3.5 hover:bg-muted/70 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#007AFF] transition-colors shadow-xs">
                    <Rss size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground lowercase leading-tight">
                      rss feed
                    </span>
                    <span className="text-[11px] text-muted-foreground lowercase leading-tight">
                      derwins8a.github.io/rss.xml
                    </span>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-[#007AFF] flex items-center gap-0.5 font-medium lowercase transition-colors">
                  subscribe
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
