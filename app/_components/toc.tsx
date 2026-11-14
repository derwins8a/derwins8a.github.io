import type { Heading } from 'nextra'
import type { FC } from 'react'
import { cn } from '@/lib/utils'

export const TOC: FC<{ toc: Heading[] }> = ({ toc }) => {
  if (!toc || toc.length === 0) return null

  return (
    <nav
      className="sticky top-24 w-52 shrink-0 hidden xl:flex flex-col gap-1 text-sm"
      aria-label="Table of contents"
    >
      <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2 px-3">
        On This Page
      </p>
      <ul className="flex flex-col gap-0.5">
        {toc.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all lowercase leading-snug",
                heading.depth === 2 ? "text-sm font-medium" : "text-xs font-normal ml-3 text-muted-foreground/70"
              )}
            >
              {heading.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
