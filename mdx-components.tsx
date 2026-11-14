import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, GithubLogo, Calendar, ClockCounterClockwise } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children, className, ...props }: any) => (
      <h1
        className={cn(
          "text-3xl sm:text-4xl font-extrabold tracking-tighter text-foreground mt-10 mb-4 lowercase leading-tight first:mt-0",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }: any) => (
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-12 mb-4 lowercase leading-snug scroll-mt-24",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }: any) => (
      <h3
        className={cn(
          "text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-10 mb-3 lowercase leading-snug scroll-mt-24",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }: any) => (
      <h4
        className={cn(
          "text-lg font-semibold tracking-tight text-foreground mt-8 mb-2 lowercase scroll-mt-24",
          className
        )}
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, className, ...props }: any) => (
      <p
        className={cn(
          "text-base text-foreground/85 leading-[1.75] my-5 font-normal lowercase",
          className
        )}
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }: any) => (
      <ul
        className={cn(
          "list-disc list-outside ml-6 my-5 space-y-2.5 text-foreground/85 lowercase",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }: any) => (
      <ol
        className={cn(
          "list-decimal list-outside ml-6 my-5 space-y-2.5 text-foreground/85 lowercase",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }: any) => (
      <li className={cn("leading-relaxed pl-1 text-sm sm:text-base", className)} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }: any) => (
      <blockquote
        className={cn(
          "my-8 pl-5 border-l-[3px] border-primary bg-primary/5 dark:bg-primary/8 rounded-r-2xl py-4 pr-5 italic text-foreground/80 text-base lowercase",
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: ({ className, ...props }: any) => (
      <hr className={cn("my-12 border-border/25", className)} {...props} />
    ),
    a: ({ href, children, className, ...props }: any) => {
      const isInternal = href && (href.startsWith('/') || href.startsWith('#'))
      if (isInternal) {
        return (
          <Link
            href={href}
            className={cn(
              "text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/40 hover:decoration-primary/80 font-medium transition-all lowercase",
              className
            )}
            {...props}
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/40 hover:decoration-primary/80 font-medium transition-all inline-flex items-center gap-0.5 lowercase",
            className
          )}
          {...props}
        >
          {children}
          <ArrowUpRight size={13} className="inline opacity-60 shrink-0" aria-hidden />
        </a>
      )
    },
    code: ({ children, className, ...props }: any) => {
      const isInline = typeof children === 'string' && !children.includes('\n')
      if (isInline) {
        return (
          <code
            className={cn(
              "bg-muted text-primary font-mono text-[0.82em] px-1.5 py-0.5 rounded-md border border-border/50 font-medium",
              className
            )}
            {...props}
          >
            {children}
          </code>
        )
      }
      return (
        <code className={cn("font-mono text-xs sm:text-sm", className)} {...props}>
          {children}
        </code>
      )
    },
    pre: ({ children, className, ...props }: any) => (
      <div className="relative group my-8">
        <pre
          className={cn(
            "p-5 sm:p-6 rounded-[20px] overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed",
            /* Dark code block in both themes — premium feel */
            "bg-[oklch(0.11_0.008_265)] text-[oklch(0.9_0.01_265)]",
            "border border-[oklch(1_0_0/8%)]",
            "shadow-[0_8px_32px_oklch(0_0_0/30%),inset_0_1px_0_oklch(1_0_0/8%)]",
            className
          )}
          {...props}
        >
          {children}
        </pre>
        {/* Subtle top gradient shine */}
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-[20px] pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, oklch(1 0 0 / 12%), transparent)' }}
          aria-hidden
        />
      </div>
    ),
    table: ({ children, className, ...props }: any) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-border/40 shadow-sm">
        <table className={cn("w-full border-collapse text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, className, ...props }: any) => (
      <th
        className={cn(
          "bg-muted px-5 py-3 text-left font-semibold text-foreground border-b border-border/40 lowercase text-sm tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, className, ...props }: any) => (
      <td
        className={cn(
          "px-5 py-3 border-b border-border/15 text-foreground/80 lowercase text-sm",
          className
        )}
        {...props}
      >
        {children}
      </td>
    ),
    strong: ({ children, className, ...props }: any) => (
      <strong className={cn("font-semibold text-foreground", className)} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, className, ...props }: any) => (
      <em className={cn("italic text-foreground/90", className)} {...props}>
        {children}
      </em>
    ),

    /* ── Page Wrapper ── */
    wrapper: ({ children, metadata, toc, mdxPath }: any) => {
      const isBlog = mdxPath && mdxPath[0] === 'blog' && mdxPath.length > 1
      const isProject = mdxPath && mdxPath[0] === 'projects' && mdxPath.length > 1
      const isArticle = isBlog || isProject

      // Format dates
      const originalDate = metadata?.originally_written || metadata?.date
      const formattedOriginalDate = originalDate
        ? new Date(originalDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null

      const lastEditedDate = metadata?.last_edited
      const formattedLastEdited = lastEditedDate
        ? new Date(lastEditedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null

      const showLastEdited =
        formattedLastEdited && formattedLastEdited !== formattedOriginalDate

      if (isArticle) {
        return (
          <article className="w-full text-left">
            {/* Article header */}
            <header className="mb-10 pb-8 border-b border-border/30 flex flex-col gap-5">
              {/* Back Pill Button */}
              <div>
                <Link
                  href={isBlog ? "/blog" : "/projects"}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-muted hover:bg-primary hover:text-primary-foreground border border-border/60 shadow-xs transition-all w-fit lowercase active:scale-95 text-foreground/80 hover:border-primary/40 group"
                  aria-label={isBlog ? "Back to essays" : "Back to works"}
                >
                  <ArrowLeft size={13} weight="bold" className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  <span>{isBlog ? "back to essays" : "back to works"}</span>
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-foreground leading-[1.05] lowercase">
                {metadata?.title}
              </h1>

              {/* Description */}
              {metadata?.description && (
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed lowercase max-w-2xl">
                  {metadata.description}
                </p>
              )}

              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  {formattedOriginalDate && (
                    <span className="flex items-center gap-1.5 font-medium lowercase">
                      <Calendar size={14} className="text-primary" aria-hidden />
                      {formattedOriginalDate.toLowerCase()}
                    </span>
                  )}
                  {showLastEdited && (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium lowercase">
                      <ClockCounterClockwise size={12} weight="bold" aria-hidden />
                      updated {formattedLastEdited!.toLowerCase()}
                    </span>
                  )}
                </div>

                {/* External links */}
                {(metadata?.github || metadata?.link) && (
                  <div className="flex items-center gap-2">
                    {metadata?.github && (
                      <a
                        href={metadata.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-muted hover:bg-foreground hover:text-background text-foreground transition-all flex items-center gap-1.5 font-medium lowercase border border-border/40 text-xs"
                      >
                        <GithubLogo size={13} weight="bold" aria-hidden />
                        source code.
                      </a>
                    )}
                    {metadata?.link && (
                      <a
                        href={metadata.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-1 font-medium lowercase shadow-sm text-xs"
                      >
                        live site.
                        <ArrowUpRight size={12} weight="bold" aria-hidden />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Tags */}
              {metadata?.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {metadata.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="chip"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Body */}
            <div className="max-w-2xl">
              {children}
            </div>
          </article>
        )
      }

      /* Default wrapper — regular pages (home, about, etc.) */
      return (
        <div className="w-full">
          {children}
        </div>
      )
    },

    ...components,
  }
}
