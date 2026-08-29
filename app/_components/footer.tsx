import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProtectedEmailLink } from '@/components/protected-email-link'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/20 mt-24 pt-16 pb-40 bg-background select-none text-left transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 text-sm flex flex-col items-center gap-12">
        
        {/* Footer Navigation & Link Columns */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 font-light text-muted-foreground lowercase">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">navigation</span>
            <Link href="/" className="hover:text-foreground transition-colors w-fit">home</Link>
            <Link href="/about" className="hover:text-foreground transition-colors w-fit">about me</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors w-fit">projects</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors w-fit">blog</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">connect</span>
            <a href="https://github.com/derwins8a" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors w-fit">github</a>
            <a href="https://linkedin.com/in/derwins8a" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors w-fit">linkedin</a>
            <a href="https://twitter.com/derwins8a" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors w-fit">twitter</a>
            <ProtectedEmailLink />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">legal</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors w-fit">privacy policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors w-fit">terms + conditions</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">extra</span>
            <Link href="/now" className="hover:text-foreground transition-colors w-fit">now</Link>
            <Link href="/rss.xml" className="hover:text-foreground transition-colors w-fit">rss feed</Link>
            <a href="#" className="hover:text-foreground transition-colors w-fit">buy me a coffee</a>
          </div>
        </div>

        {/* Footer Bottom: Theme Toggle & Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/10 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs text-muted-foreground font-light lowercase">
              © {new Date().getFullYear()} <span className="uppercase font-medium text-foreground/80">Derwins Ochoa</span> — all rights reserved.
            </p>
            <span className="hidden sm:inline text-border/40">•</span>
            <p className="text-xs text-muted-foreground/80 font-light lowercase">
              made with 🖤 in venezuela.
            </p>
          </div>

          {/* Theme Toggle Pill */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </footer>
  )
}