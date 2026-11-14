import Link from 'next/link'
import { getFeatured } from "@/lib/portfolio"
import { ProjectCard } from "./project-card"
import { BlogCard } from "./blog-card"
import { ArrowRight, Star, Heart, Shield, Lightning, Sparkle, Check, ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

export async function FeaturedProjects() {
  const projects = await getFeatured("/projects", 3)

  if (projects.length === 0) return null

  return (
    <section className="py-14 mt-4 w-full text-left" aria-labelledby="works-heading">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Portfolio</p>
          <h2 id="works-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
            selected works.
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors lowercase"
        >
          all projects
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(project => (
          <ProjectCard key={project.route} project={project} />
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors lowercase"
        >
          all projects <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </section>
  )
}

export async function FeaturedArticles() {
  const articles = await getFeatured("/blog", 3)

  if (articles.length === 0) return null

  return (
    <section className="py-14 w-full text-left" aria-labelledby="essays-heading">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Writing</p>
          <h2 id="essays-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
            thoughts & essays.
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors lowercase"
        >
          all posts
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map(article => (
          <BlogCard key={article.route} article={article} />
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors lowercase"
        >
          all posts <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </section>
  )
}

/* ─── Process / Philosophy section (bonus content) ─── */
export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      body: "I start by deeply understanding your users, goals, and constraints — no assumptions, just research.",
    },
    {
      num: "02",
      title: "Design",
      body: "High-fidelity prototypes built in Figma, grounded in a coherent design system from day one.",
    },
    {
      num: "03",
      title: "Build",
      body: "Production code written with performance, accessibility, and maintainability as first-class concerns.",
    },
    {
      num: "04",
      title: "Refine",
      body: "Iterative polish based on real feedback — the last 10% that separates good from exceptional.",
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="process-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">How I Work</p>
        <h2 id="process-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          the process.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map(({ num, title, body }) => (
          <div
            key={num}
            className="scroll-slide-up flex flex-col gap-3 card-surface grain relative rounded-[22px] p-5 overflow-hidden"
          >
            <span className="text-3xl font-black text-muted-foreground/15 tracking-tighter leading-none">
              {num}
            </span>
            <h3 className="text-base font-bold tracking-tight text-foreground lowercase">{title}.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light lowercase">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Tech Stack showcase ─── */
export function TechStack() {
  const categories = [
    {
      label: "Languages",
      items: ["TypeScript", "Swift", "JavaScript", "CSS"],
    },
    {
      label: "Frameworks",
      items: ["Next.js", "React", "SwiftUI", "Node.js"],
    },
    {
      label: "Styling",
      items: ["Tailwind CSS", "OKLCH", "Radix UI", "shadcn"],
    },
    {
      label: "Tools",
      items: ["Figma", "Git", "Playwright", "Vercel"],
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="stack-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Expertise</p>
        <h2 id="stack-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          the stack.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(({ label, items }) => (
          <div key={label} className="scroll-scale-in flex flex-col gap-3 card-surface grain relative rounded-[22px] p-5 overflow-hidden">
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{label}</p>
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <span key={item} className="text-sm font-medium text-foreground lowercase leading-tight">
                  {item.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
/* ─── Values / Philosophy Section ─── */
export function ValuesSection() {
  const values = [
    {
      icon: Sparkle,
      title: "Obsessive Craft",
      description: "Every pixel, every millisecond, every interaction is intentional. The details others skip are where the magic lives.",
    },
    {
      icon: Shield,
      title: "Accessibility First",
      description: "Inclusive by default. Semantic HTML, proper contrast, keyboard navigation, screen reader support — never an afterthought.",
    },
    {
      icon: Lightning,
      title: "Performance Obsessed",
      description: "Sub-100ms interactions, optimal bundle sizes, zero layout shift. Speed is a feature, not a luxury.",
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Software should feel alive. Micro-interactions, haptic feedback, thoughtful motion — technology that respects the human using it.",
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="values-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Philosophy</p>
        <h2 id="values-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          what i believe.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl font-light leading-relaxed lowercase">
          these principles guide every decision, from the first sketch to the final deploy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map(({ icon: Icon, title, description }, idx) => (
          <div
            key={title}
            className="reveal-stagger flex flex-col gap-4 card-surface grain relative rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon size={20} weight="duotone" className="text-primary" aria-hidden />
            </div>
            <h3 className="text-lg font-bold tracking-tight text-foreground lowercase">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light lowercase">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Testimonials Section ─── */
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Derwins built our dashboard in record time — pixel-perfect and buttery smooth. The attention to detail is unreal; every interaction feels native and intentional.",
      name: "Alex M.",
      role: "CTO, Funded Startup",
      avatar: "AM",
      stars: 5,
    },
    {
      quote: "Working with Derwins changed how our team thinks about frontend. He brought a design system rigor that scaled across our entire product org.",
      name: "Sara K.",
      role: "Product Lead, Series B",
      avatar: "SK",
      stars: 5,
    },
    {
      quote: "The iOS app he built for us feels more Apple than Apple's own apps. Fluid gestures, perfect haptics, zero jank. This is the standard.",
      name: "Marcus R.",
      role: "Founder, HealthTech",
      avatar: "MR",
      stars: 5,
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="testimonials-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Social Proof</p>
        <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          trusted by builders.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map(({ quote, name, role, avatar, stars }) => (
          <article
            key={name}
            className="scroll-slide-up flex flex-col gap-4 card-surface grain relative rounded-[24px] p-6 overflow-hidden"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-amber-400" aria-hidden />
              ))}
            </div>
            <blockquote className="text-base text-foreground font-light leading-relaxed italic flex-grow">
              "{quote}"
            </blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-border/30">
              <div
                className="size-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.22 250) 0%, oklch(0.5 0.22 250) 100%)' }}
              >
                {avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground tracking-tight lowercase">{name}</p>
                <p className="text-sm text-muted-foreground lowercase">{role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── CTA Section ─── */
export function CTASection() {
  return (
    <section className="py-14 w-full text-left" aria-labelledby="cta-heading">
      <div className="relative rounded-[32px] overflow-hidden grain"
        style={{
          background: 'linear-gradient(135deg, oklch(0.6 0.22 250) 0%, oklch(0.5 0.22 250) 100%)',
          boxShadow: '0 20px 50px -10px oklch(0.6 0.22 250 / 0.4)',
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          aria-hidden
        />
        {/* Orbs */}
        <div className="orb orb-primary" style={{ width: '300px', height: '300px', top: '-100px', right: '-100px' }} />
        <div className="orb orb-warm" style={{ width: '200px', height: '200px', bottom: '-50px', left: '10%' }} />

        <div className="relative z-10 px-6 md:px-12 py-14 md:py-20 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white mb-4 lowercase">
            let's build something exceptional.
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-8 lowercase">
            i'm open to high-impact contracts and collaborations. if you're building something that deserves to be excellent, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn-apple px-8 h-14 bg-white text-primary text-base font-semibold shadow-xl hover:scale-[1.03] hover:-translate-y-px active:scale-[0.97] transition-all"
              style={{ boxShadow: '0 8px 24px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.3)' }}
            >
              start a conversation
              <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
            <a
              href="/projects"
              className="btn-apple px-8 h-14 border-2 border-white/30 text-white text-base font-semibold hover:bg-white/10 hover:border-white/50 active:bg-white/5 transition-all"
            >
              view previous work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
/* ─── Newsletter Section ─── */
export function NewsletterSection() {
  return (
    <section className="py-14 w-full text-left" aria-labelledby="newsletter-heading">
      <div className="relative rounded-[24px] card-surface grain overflow-hidden border border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10">
          <div className="text-center md:text-left">
            <h2 id="newsletter-heading" className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground mb-2 lowercase">
              stay in the loop.
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed lowercase">
              occasional essays on design, frontend, and craft. no spam, ever.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center" action="https://formspree.io/f/your-form-id" method="POST">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 min-w-[200px] px-4 h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn-primary px-6 h-12 text-sm whitespace-nowrap"
            >
              subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ─── Project Categories Section ─── */
export function ProjectCategories() {
  const categories = [
    {
      label: "Web Applications",
      count: 12,
      icon: "🌐",
      description: "Full-stack apps, dashboards, SaaS products",
    },
    {
      label: "iOS / visionOS",
      count: 6,
      icon: "📱",
      description: "Native SwiftUI apps with fluid interactions",
    },
    {
      label: "Design Systems",
      count: 4,
      description: "Token architectures, component libraries, docs",
      icon: "🎨",
    },
    {
      label: "Open Source",
      count: 8,
      icon: "🔓",
      description: "Tools, libraries, and community projects",
    },
  ]

  return (
    <section className="py-10 w-full text-left" aria-labelledby="categories-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Categories</p>
        <h2 id="categories-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          explore by type.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(({ label, count, icon, description }) => (
          <article
            key={label}
            className="scroll-scale-in flex flex-col gap-3 card-surface grain relative rounded-[22px] p-5 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-muted-foreground/15 tracking-tighter leading-none" aria-hidden>{icon}</span>
              <span className="text-2xl font-black text-primary/20">{count}+</span>
            </div>
            <h3 className="text-base font-bold tracking-tight text-foreground lowercase">{label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light lowercase">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── Open Source Section ─── */
export function OpenSourceSection() {
  const repos = [
    {
      name: "oklch-palette",
      description: "Visual OKLCH color palette builder with export",
      stars: 342,
      language: "TypeScript",
      url: "https://github.com/derwins8a/oklch-palette",
    },
    {
      name: "swiftui-physics-gestures",
      description: "Spring-based gesture system for SwiftUI",
      stars: 187,
      language: "Swift",
      url: "https://github.com/derwins8a/swiftui-physics-gestures",
    },
    {
      name: "tailwind-oklch-plugin",
      description: "Tailwind CSS plugin for OKLCH color utilities",
      stars: 96,
      language: "JavaScript",
      url: "https://github.com/derwins8a/tailwind-oklch-plugin",
    },
    {
      name: "react-liquid-glass",
      description: "iOS 26 liquid glass components for React",
      stars: 245,
      language: "TypeScript",
      url: "https://github.com/derwins8a/react-liquid-glass",
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="oss-heading">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">Open Source</p>
        <h2 id="oss-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          giving back.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl font-light leading-relaxed lowercase">
          tools and libraries i've built for the community. MIT licensed, production-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map(({ name, description, stars, language, url }) => (
          <article
            key={name}
            className="scroll-slide-up flex flex-col gap-4 card-surface grain relative rounded-[22px] p-5 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-base font-bold text-foreground hover:text-primary transition-colors lowercase">
                    {name}
                  </a>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground hover:text-primary transition-colors">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
              <span className="chip shrink-0">{language}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {stars.toLocaleString()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
/* ─── Contact Form Section ─── */
export function ContactForm() {
  return (
    <section className="py-14 w-full text-left" aria-labelledby="contact-form-heading">
      <div className="mb-8">
        <h2 id="contact-form-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          start a conversation.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl font-light leading-relaxed lowercase">
          tell me about your project, timeline, and budget. i'll respond within 24 hours.
        </p>
      </div>

      <form
        className="card-surface grain relative rounded-[24px] p-6 md:p-8 overflow-hidden"
        action="https://formspree.io/f/your-form-id"
        method="POST"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 lowercase">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              placeholder="your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 lowercase">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 h-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              placeholder="you@domain.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="project-type" className="block text-sm font-medium text-foreground mb-2 lowercase">
            project type
          </label>
          <select
            id="project-type"
            name="projectType"
            className="w-full px-4 h-12 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none"
          >
            <option value="">select a type</option>
            <option value="web-app">web application</option>
            <option value="ios-app">ios / visionos app</option>
            <option value="design-system">design system</option>
            <option value="consulting">design consulting</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2 lowercase">
            budget range
          </label>
          <select
            id="budget"
            name="budget"
            className="w-full px-4 h-12 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none"
          >
            <option value="">select a range</option>
            <option value="10k-25k">$10k — $25k</option>
            <option value="25k-50k">$25k — $50k</option>
            <option value="50k-100k">$50k — $100k</option>
            <option value="100k+">$100k+</option>
            <option value="retainer">ongoing retainer</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 lowercase">
            project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none font-sans"
            placeholder="what are you building? tell me about the problem you're solving, your users, timeline, and any constraints."
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto px-8 h-14 text-base"
        >
          send message
        </button>

        <p className="text-xs text-muted-foreground/60 text-center mt-4 lowercase">
          by submitting, you agree to our <a href="/privacy" className="underline hover:text-primary">privacy policy</a>.
        </p>
      </form>
    </section>
  )
}

/* ─── Contact Info Section ─── */
export function ContactInfo() {
  const channels = [
    {
      icon: "📧",
      label: "Email",
      value: "hi@derwins.dev",
      description: "best for project inquiries",
      href: "mailto:hi@derwins.dev",
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/derwins8a",
      description: "open source & code",
      href: "https://github.com/derwins8a",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/derwins8a",
      description: "professional network",
      href: "https://linkedin.com/in/derwins8a",
    },
    {
      icon: "🐦",
      label: "Twitter / X",
      value: "@derwins8a",
      description: "thoughts & updates",
      href: "https://twitter.com/derwins8a",
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="contact-info-heading">
      <div className="mb-8">
        <h2 id="contact-info-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          other ways to reach me.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map(({ icon, label, value, description, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col gap-3 card-surface grain relative rounded-[22px] p-5 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg group"
          >
            <span className="text-3xl" aria-hidden>{icon}</span>
            <h3 className="text-base font-bold tracking-tight text-foreground lowercase">{label}</h3>
            <p className="font-mono text-sm text-primary font-medium">{value}</p>
            <p className="text-sm text-muted-foreground leading-relaxed font-light lowercase">{description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── FAQ Section (Schema.org FAQPage) ─── */
export function FAQSection() {
  const faqs = [
    {
      question: "What is a design engineer?",
      answer: "A design engineer bridges the gap between design and engineering. I don't just implement designs — I make architectural decisions about interactions, motion, typography, and color systems that shape how a product feels. I write production code (React, Next.js, SwiftUI) while owning the design system, component library, and frontend architecture.",
    },
    {
      question: "What does 'derwins8a' mean?",
      answer: "derwins8a is my unified digital identity across all platforms (GitHub, LinkedIn, Twitter/X, Instagram, YouTube). My full name is Derwins Ochoa — known in networks as derwins8a. Using both together (Derwins Ochoa @derwins8a) consolidates my identity for search engines and AI crawlers.",
    },
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in TypeScript, React 19, Next.js, SwiftUI, Tailwind CSS v4, and OKLCH color space. My stack includes Radix UI, shadcn/ui, and custom design system tooling. I build for the web (Next.js) and native iOS/visionOS (SwiftUI) with shared design tokens.",
    },
    {
      question: "Do you work with early-stage startups?",
      answer: "I work exclusively with established brands and funded startups (Series A+) where craft, performance, and accessibility are non-negotiable. I don't take on MVP-only projects or equity-only arrangements. Minimum engagement is $25k.",
    },
    {
      question: "What's your approach to design systems?",
      answer: "I build token-first design systems using OKLCH for perceptually uniform color, semantic naming, and platform-agnostic tokens that compile to CSS, iOS, and Android. Components are built with Radix UI primitives, fully typed, tested, and documented. The system scales without drifting.",
    },
    {
      question: "How do you handle animations and motion?",
      answer: "Motion is functional, not decorative. I use spring physics (cubic-bezier(0.34, 1.56, 0.64, 1)) for natural feel, respect prefers-reduced-motion, and leverage View Transitions API, CSS scroll-driven animations, and SwiftUI's native springs. Every animation communicates state change.",
    },
    {
      question: "Where are you based?",
      answer: "I'm based in Venezuela and work remotely with clients globally (US, EU, LatAm). Time zone overlap with Americas and Europe is comfortable for async + sync collaboration.",
    },
    {
      question: "What's your availability?",
      answer: "Currently taking on new projects starting January 2027. Limited slots — book early via the contact page. I respond to inquiries within 24 hours.",
    },
  ]

  return (
    <section className="py-14 w-full text-left" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">FAQ</p>
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          frequently asked questions.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl font-light leading-relaxed lowercase">
          direct answers about how i work, what i build, and who i am.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map(({ question, answer }, idx) => (
          <article
            key={question}
            itemScope
            itemType="https://schema.org/Question"
            className="scroll-slide-up flex flex-col gap-3 card-surface grain relative rounded-[22px] p-5 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <h3 itemProp="name" className="text-base font-bold tracking-tight text-foreground leading-snug">
              {question}
            </h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-sm text-muted-foreground leading-relaxed font-light lowercase">
                {answer}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── Availability Section ─── */
export function AvailabilitySection() {
  return (
    <section className="py-14 w-full text-left" aria-labelledby="availability-heading">
      <div className="relative rounded-[24px] overflow-hidden grain"
        style={{
          background: 'linear-gradient(135deg, oklch(0.148 0.007 265) 0%, oklch(0.098 0.006 265) 100%)',
          border: '1px solid oklch(1 0 0 / 8%)',
        }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} aria-hidden />
        <div className="orb orb-primary" style={{ width: '200px', height: '200px', top: '-50px', right: '-50px' }} />
        <div className="orb orb-accent" style={{ width: '150px', height: '150px', bottom: '-30px', left: '10%' }} />

        <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
            <div className="flex-1">
              <h2 id="availability-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 lowercase">
                currently available.
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl lowercase">
                taking on new projects starting <strong className="text-white">january 2027</strong>. limited slots — book early.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 h-12 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                open for contracts
              </span>
              <a
                href="/contact"
                className="btn-apple px-8 h-12 bg-white text-primary text-sm font-semibold shadow-lg hover:scale-[1.03] hover:-translate-y-px active:scale-[0.97] transition-all"
                style={{ boxShadow: '0 8px 24px oklch(0 0 0 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.3)' }}
              >
                book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}