"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
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
  Rss,
  Code,
  DeviceMobile,
  Palette,
  ArrowRight,
  Star,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { getObfuscatedEmail, openProtectedMail } from "@/lib/obfuscate"

const skills = [
  { icon: Code,          label: "Frontend Engineering", detail: "React · Next.js · TypeScript" },
  { icon: DeviceMobile,  label: "iOS Development",       detail: "SwiftUI · Swift · SwiftData" },
  { icon: Palette,       label: "Design Systems",        detail: "Figma · Tailwind · OKLCH" },
]

const testimonials = [
  {
    quote: "Derwins built our dashboard in record time — pixel-perfect and buttery smooth.",
    name: "Alex M.",
    role: "CTO, Funded Startup",
    stars: 5,
  },
  {
    quote: "The attention to detail is unreal. Every interaction feels native and intentional.",
    name: "Sara K.",
    role: "Product Lead, Series B",
    stars: 5,
  },
]

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [timeString, setTimeString] = useState("")
  const [mounted, setMounted] = useState(false)
  const [displayEmail, setDisplayEmail] = useState("contact@encrypted")
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    setMounted(true)
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
      } catch {
        setTimeString("utc-4")
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 10000)
    return () => clearInterval(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial(v => (v + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(getObfuscatedEmail())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleOpenEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    openProtectedMail()
  }

  return (
    <section className="relative w-full pt-6 pb-4 select-none" aria-label="Introduction">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* ── Left Column ── */}
        <div className="lg:col-span-7 flex flex-col gap-7 text-left">

          {/* Status badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full chip">
              <span className="size-2 rounded-full bg-emerald-500 status-dot" aria-hidden />
              <span className="text-xs font-medium text-muted-foreground lowercase">
                available for contracts
              </span>
            </div>
            {timeString && (
              <div className="inline-flex items-center gap-1.5 chip">
                <Clock size={12} weight="bold" className="text-primary" aria-hidden />
                <span className="text-xs text-muted-foreground lowercase">{timeString} · venezuela</span>
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-xs font-semibold text-primary w-fit lowercase">
              <Sparkle size={12} weight="fill" aria-hidden />
              design engineer · frontend architecture
            </div>
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-extrabold tracking-tighter text-foreground leading-[1.05] lowercase">
              software that<br />
              <span className="relative inline-block">
                feels right.
                {/* Underline accent */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary opacity-70"
                  aria-hidden
                />
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg lowercase">
            i work exclusively with established brands and funded startups to craft{" "}
            <em className="not-italic text-foreground font-medium">tactile, high-performance</em>{" "}
            web and mobile software that users remember.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2">
            {skills.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl card-surface cursor-default group"
              >
                <span className="size-7 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={15} weight="duotone" className="text-primary" aria-hidden />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-semibold text-foreground lowercase">{label}</span>
                  <span className="text-[10px] text-muted-foreground lowercase mt-0.5">{detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleOpenEmail}
              className="btn-apple px-6 h-12 bg-primary text-primary-foreground text-sm shadow-lg shadow-primary/25"
              style={{ boxShadow: '0 4px 16px oklch(0.6 0.22 250 / 30%), var(--inset-highlight) inset' }}
            >
              <Envelope size={16} weight="bold" aria-hidden />
              send email.
            </button>

            <button
              onClick={handleCopyEmail}
              className={cn(
                "btn-apple px-5 h-12 card-surface text-sm font-medium text-foreground",
                copied && "border-emerald-500/50 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400"
              )}
            >
              {copied ? (
                <><Check size={15} weight="bold" aria-hidden /> copied!</>
              ) : (
                <><Copy size={15} weight="bold" aria-hidden /> copy email.</>
              )}
            </button>

            <Link
              href="/projects"
              className="btn-apple px-5 h-12 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              view work.
              <ArrowRight size={15} weight="bold" aria-hidden />
            </Link>
          </div>

          {/* Social row */}
          <div className="flex items-center gap-2.5 pt-0.5">
            {[
              { href: 'https://github.com/derwins8a',      Icon: GithubLogo,   label: 'GitHub' },
              { href: 'https://linkedin.com/in/derwins8a', Icon: LinkedinLogo, label: 'LinkedIn' },
              { href: 'https://twitter.com/derwins8a',     Icon: TwitterLogo,  label: 'Twitter' },
            ].map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="size-11 rounded-2xl card-surface text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <Icon size={19} weight="bold" aria-hidden />
              </a>
            ))}
            <span className="w-px h-6 bg-border opacity-60 mx-0.5" aria-hidden />
            <p className="text-xs text-muted-foreground/60 font-light lowercase">
              derwins8a everywhere.
            </p>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">

          {/* Profile card */}
          <div
            className="w-full rounded-[26px] card-surface grain relative p-5 overflow-hidden"
            style={{ boxShadow: 'var(--shadow-xl), var(--inset-highlight), var(--inset-shadow)' }}
          >
            {/* Subtle top gradient bar */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, oklch(0.6 0.22 250 / 40%), transparent)' }}
              aria-hidden
            />

            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="size-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.68 0.22 250) 0%, oklch(0.5 0.22 250) 100%)',
                  boxShadow: '0 4px 14px oklch(0.6 0.22 250 / 35%), inset 0 1px 0 oklch(1 0 0 / 25%)',
                }}
              >
                DO
              </div>
              <div>
                <p className="font-bold text-foreground text-base tracking-tight lowercase leading-tight">
                  derwins ochoa
                </p>
                <p className="text-sm text-muted-foreground lowercase mt-0.5">
                  design engineer · venezuela
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 status-dot" aria-hidden />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium lowercase">
                    open to high-impact projects
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-border/40">
              {[
                { value: '5+',  label: 'years exp.' },
                { value: '30+', label: 'projects shipped' },
                { value: '10+', label: 'clients' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-0.5 inset-panel rounded-xl py-3">
                  <span className="text-xl font-extrabold text-foreground tracking-tighter">{value}</span>
                  <span className="text-[10px] text-muted-foreground lowercase text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial card */}
          <div
            className="w-full rounded-[22px] card-surface grain relative p-5 overflow-hidden"
            aria-live="polite"
            aria-atomic
          >
            <div className="flex items-start gap-1 mb-3">
              {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                <Star key={i} size={13} weight="fill" className="text-amber-400" aria-hidden />
              ))}
            </div>
            <blockquote className="text-sm text-foreground font-medium leading-relaxed lowercase italic">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <div>
                <p className="text-xs font-semibold text-foreground lowercase">{testimonials[activeTestimonial].name}</p>
                <p className="text-[11px] text-muted-foreground lowercase">{testimonials[activeTestimonial].role}</p>
              </div>
              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === activeTestimonial
                        ? "w-5 h-1.5 bg-primary"
                        : "w-1.5 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                    )}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === activeTestimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Direct channels card */}
          <div
            className="w-full rounded-[22px] card-surface grain relative p-4 overflow-hidden"
            aria-label="Direct contact channels"
          >
            <div className="px-1 flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold tracking-widest text-muted-foreground/60 uppercase">Direct Channels</h2>
              <span className="text-[11px] text-muted-foreground lowercase">instant contact</span>
            </div>

            <div className="flex flex-col rounded-xl inset-panel divide-y divide-border/30 overflow-hidden">
              {[
                {
                  key: 'email',
                  icon: Envelope,
                  label: 'email (protected)',
                  sub: mounted ? displayEmail : 'click to reveal',
                  action: 'open mail',
                  onClick: handleOpenEmail,
                  isButton: true,
                },
                {
                  key: 'github',
                  icon: GithubLogo,
                  label: 'github',
                  sub: 'github.com/derwins8a',
                  action: 'view profile',
                  href: 'https://github.com/derwins8a',
                },
                {
                  key: 'linkedin',
                  icon: LinkedinLogo,
                  label: 'linkedin',
                  sub: 'linkedin.com/in/derwins8a',
                  action: 'connect',
                  href: 'https://linkedin.com/in/derwins8a',
                },
                {
                  key: 'twitter',
                  icon: TwitterLogo,
                  label: 'twitter / x',
                  sub: '@derwins8a',
                  action: 'follow',
                  href: 'https://twitter.com/derwins8a',
                },
                {
                  key: 'rss',
                  icon: Rss,
                  label: 'rss feed',
                  sub: 'subscribe to updates',
                  action: 'subscribe',
                  href: '/rss.xml',
                },
              ].map(row => {
                const Icon = row.icon
                const inner = (
                  <div className="flex items-center justify-between px-3.5 py-3 hover:bg-muted/60 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-xs">
                        <Icon size={15} weight="bold" aria-hidden />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-xs font-semibold text-foreground lowercase">{row.label}</span>
                        <span className="text-[10px] text-muted-foreground lowercase mt-0.5">{row.sub}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground group-hover:text-primary flex items-center gap-0.5 font-medium lowercase transition-colors shrink-0">
                      {row.action}
                      <ArrowUpRight size={12} weight="bold" aria-hidden />
                    </span>
                  </div>
                )

                if (row.isButton) {
                  return (
                    <button
                      key={row.key}
                      onClick={row.onClick}
                      className="text-left w-full cursor-pointer"
                    >
                      {inner}
                    </button>
                  )
                }
                return (
                  <a
                    key={row.key}
                    href={row.href}
                    target={row.href?.startsWith('http') ? '_blank' : undefined}
                    rel={row.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {inner}
                  </a>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
