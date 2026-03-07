import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 mt-20 pt-16 pb-12 bg-background">
      <div className="max-w-2xl mx-auto px-6 text-sm flex flex-col items-center">

        <p className="mb-14 text-foreground/80 font-medium">© {new Date().getFullYear()} derwins ochoa — all rights reserved.</p>

        <div className="w-full flex justify-between items-start mb-16 px-2 sm:px-8 text-foreground/80 font-medium">
          <div className="flex flex-col gap-3">
            <Link href="/privacy" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">privacy policy.</Link>
            <Link href="/terms" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">terms and conditions.</Link>
            <a href="#" rel="noreferrer" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">buy me a coffee.</a>
          </div>
          <div className="flex flex-col gap-3 text-right items-end">
            <Link href="/rss.xml" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">rss.</Link>
            <a href="https://github.com/derwins8a" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">source code.</a>
            <Link href="/now" className="hover:text-foreground hover:underline transition-colors w-fit underline-offset-4">now.</Link>
          </div>
        </div>

        <p className="text-foreground/80 font-medium">made with 🖤 in venezuela.</p>

      </div>
    </footer>
  )
}