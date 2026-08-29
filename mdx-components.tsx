import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, GithubLogo, Calendar, ClockCounterClockwise } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children, className, ...props }: any) => (
      <h1
        className={cn(
          "text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-10 mb-4 lowercase leading-tight first:mt-0",
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
          "text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 lowercase leading-snug border-b border-border/20 pb-2",
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
          "text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3 lowercase leading-snug",
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
          "text-lg font-semibold tracking-tight text-foreground mt-6 mb-2 lowercase",
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
          "text-base text-foreground/85 leading-relaxed my-4 font-normal lowercase selection:bg-[#007AFF]/30",
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
          "list-disc list-outside ml-6 my-4 space-y-2 text-foreground/85 lowercase",
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
          "list-decimal list-outside ml-6 my-4 space-y-2 text-foreground/85 lowercase",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }: any) => (
      <li className={cn("leading-relaxed pl-1", className)} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }: any) => (
      <blockquote
        className={cn(
          "my-6 pl-5 border-l-4 border-[#007AFF] bg-muted/40 rounded-r-2xl py-3.5 pr-4 italic text-foreground/90 text-base lowercase",
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: ({ className, ...props }: any) => (
      <hr className={cn("my-10 border-border/30", className)} {...props} />
    ),
    a: ({ href, children, className, ...props }: any) => {
      const isInternal = href && (href.startsWith('/') || href.startsWith('#'))
      if (isInternal) {
        return (
          <Link
            href={href}
            className={cn(
              "text-[#007AFF] hover:underline underline-offset-4 decoration-2 font-medium transition-colors lowercase",
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
            "text-[#007AFF] hover:underline underline-offset-4 decoration-2 font-medium transition-colors inline-flex items-center gap-0.5 lowercase",
            className
          )}
          {...props}
        >
          {children}
          <ArrowUpRight size={14} className="inline opacity-70" />
        </a>
      )
    },
    code: ({ children, className, ...props }: any) => {
      const isInline = typeof children === 'string' && !children.includes('\n')
      if (isInline) {
        return (
          <code
            className={cn(
              "bg-muted text-[#007AFF] dark:text-[#409cff] font-mono text-xs sm:text-sm px-2 py-0.5 rounded-md border border-border/40 font-medium",
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
      <pre
        className={cn(
          "my-6 p-4 sm:p-6 rounded-[24px] bg-[#161618] dark:bg-[#121214] text-white border border-white/[0.08] overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    ),
    table: ({ children, className, ...props }: any) => (
      <div className="my-6 overflow-x-auto rounded-2xl border border-border/40">
        <table className={cn("w-full border-collapse text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, className, ...props }: any) => (
      <th
        className={cn(
          "bg-muted px-4 py-3 text-left font-semibold text-foreground border-b border-border/40 lowercase",
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
          "px-4 py-3 border-b border-border/20 text-foreground/80 lowercase",
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
    wrapper: ({ children, metadata, mdxPath }: any) => {
      const isBlog = mdxPath && mdxPath[0] === 'blog' && mdxPath.length > 1
      const isProject = mdxPath && mdxPath[0] === 'projects' && mdxPath.length > 1
      const isArticle = isBlog || isProject

      // Format Dates
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
        formattedLastEdited &&
        formattedLastEdited !== formattedOriginalDate

      return (
        <article className="w-full mt-4 mb-20 text-left">
          {/* Article Header for blog posts and project details */}
          {isArticle && (
            <header className="mb-10 pb-8 border-b border-border/40 flex flex-col gap-5">
              {/* Back Link */}
              <Link
                href={isBlog ? "/blog" : "/projects"}
                className="text-xs font-medium text-muted-foreground hover:text-[#007AFF] transition-colors inline-flex items-center gap-1.5 w-fit lowercase"
              >
                <ArrowLeft size={14} weight="bold" />
                {isBlog ? "back to all essays." : "back to all works."}
              </Link>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] lowercase">
                {metadata?.title}
              </h1>

              {/* Description */}
              {metadata?.description && (
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed lowercase">
                  {metadata.description}
                </p>
              )}

              {/* Metadata Bar (Dates, Tags, Links) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                {/* Dates & Last Edited */}
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  {formattedOriginalDate && (
                    <span className="flex items-center gap-1.5 font-medium lowercase">
                      <Calendar size={15} className="text-[#007AFF]" />
                      published {formattedOriginalDate.toLowerCase()}
                    </span>
                  )}

                  {showLastEdited && (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 font-medium lowercase">
                      <ClockCounterClockwise size={13} weight="bold" />
                      last edited {formattedLastEdited.toLowerCase()}
                    </span>
                  )}
                </div>

                {/* External Project Links */}
                {(metadata?.github || metadata?.link) && (
                  <div className="flex items-center gap-2">
                    {metadata?.github && (
                      <a
                        href={metadata.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-muted hover:bg-foreground hover:text-background text-foreground transition-all flex items-center gap-1.5 font-medium lowercase border border-border/40"
                      >
                        <GithubLogo size={14} weight="bold" />
                        source code.
                      </a>
                    )}
                    {metadata?.link && (
                      <a
                        href={metadata.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0071e3] text-white transition-all flex items-center gap-1 font-medium lowercase shadow-sm"
                      >
                        live site.
                        <ArrowUpRight size={13} weight="bold" />
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
                      className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full lowercase font-medium border border-border/20"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </header>
          )}

          {/* Article Body Content */}
          <div className="space-y-1">
            {children}
          </div>
        </article>
      )
    },
    ...components,
  }
}