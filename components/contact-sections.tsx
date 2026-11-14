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