import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart } from "@phosphor-icons/react/dist/ssr"
import { ProtectedEmailLink } from '@/components/protected-email-link'

const footerColumns = [
  {
    heading: 'Navigate',
    links: [
      { label: 'home',     href: '/' },
      { label: 'about',    href: '/about' },
      { label: 'projects', href: '/projects' },
      { label: 'blog',     href: '/blog' },
      { label: 'now',      href: '/now' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'github',   href: 'https://github.com/derwins8a',          external: true },
      { label: 'linkedin', href: 'https://linkedin.com/in/derwins8a',      external: true },
      { label: 'twitter',  href: 'https://twitter.com/derwins8a',          external: true },
      { label: 'rss feed', href: '/rss.xml' },
    ],
    extra: true, // Will include email
  },
  {
    heading: 'Legal',
    links: [
      { label: 'privacy policy',     href: '/privacy' },
      { label: 'terms & conditions', href: '/terms' },
    ],
  },
]

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/20 mt-16 md:mt-24 bg-background-secondary select-none transition-colors duration-300">
      {/* Top section */}
      <div className="max-w-4xl mx-auto px-5 md:px-6 pt-14 pb-10">
        {/* Brand row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-12">
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="font-extrabold tracking-tighter text-foreground text-xl uppercase hover:opacity-80 transition-opacity">
              Derwins Ochoa
            </Link>
            <p className="text-sm text-muted-foreground font-light leading-relaxed lowercase">
              design engineer & frontend architect. building tactile, high-performance digital experiences.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {[
                { href: 'https://github.com/derwins8a',     Icon: GithubLogo,   label: 'GitHub' },
                { href: 'https://linkedin.com/in/derwins8a',Icon: LinkedinLogo, label: 'LinkedIn' },
                { href: 'https://twitter.com/derwins8a',    Icon: TwitterLogo,  label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  <Icon size={16} weight="bold" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {footerColumns.map(col => (
              <div key={col.heading} className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-foreground/35 uppercase tracking-[0.12em]">
                  {col.heading}
                </span>
                <div className="flex flex-col gap-2.5">
                  {col.links.map(link => (
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors lowercase link-underline w-fit"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors lowercase link-underline w-fit"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  {col.extra && (
                    <ProtectedEmailLink className="text-muted-foreground hover:text-foreground transition-colors lowercase link-underline w-fit cursor-pointer" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/20">
          <p className="text-xs text-muted-foreground/70 font-light lowercase flex items-center gap-1.5">
            © {new Date().getFullYear()} Derwins Ochoa · made with
            <Heart size={11} weight="fill" className="text-red-400 inline" aria-hidden />
            in venezuela.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
