'use client'
 
import { usePathname } from 'next/navigation'
import type { PageMapItem } from 'nextra'
import { Anchor } from 'nextra/components'
import { normalizePages } from 'nextra/normalize-pages'
import type { FC } from 'react'
import { cn } from '@/lib/utils'
 
export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname()
  const { docsDirectories } = normalizePages({
    list: pageMap,
    route: pathname
  })
 
  return (
    <nav
      className="sticky top-24 w-56 shrink-0 hidden lg:flex flex-col gap-1 text-sm"
      aria-label="Sidebar navigation"
    >
      <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2 px-3">
        On This Site
      </p>
      <ul className="flex flex-col gap-0.5">
        {docsDirectories.map(function renderItem(item: any) {
          const route = item.route || ('href' in item ? (item.href as string) : '')
          const { title } = item
          const isActive = pathname === route || pathname.startsWith(route + '/')
          return (
            <li key={route}>
              {'children' in item ? (
                <details open={pathname.startsWith(route)} className="group">
                  <summary
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer list-none font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all lowercase select-none",
                      "group-open:text-foreground"
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-muted-foreground/40 group-open:bg-primary transition-colors" />
                    {title}
                  </summary>
                  <ul className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-border/40 pl-3">
                    {item.children.map((child: any) => renderItem(child))}
                  </ul>
                </details>
              ) : (
                <Anchor
                  href={route}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all lowercase no-underline",
                    isActive
                      ? "bg-primary/8 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      isActive ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    aria-hidden
                  />
                  {title}
                </Anchor>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
