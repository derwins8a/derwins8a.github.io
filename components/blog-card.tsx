import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr"

export function BlogCard({ article }: { article: StructuredPage }) {
  const fm = (article.frontMatter || {}) as PageFrontmatter

  const rawDate = fm.date || fm.originally_written
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <article className="flex flex-col h-full card-surface grain relative rounded-[20px] p-4 sm:p-5 transition-all duration-300 group select-none overflow-hidden hover-lift hover-glow">
      <Link href={article.route} className="flex flex-col h-full gap-2.5">

        {/* Date + read time */}
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-primary">
            <CalendarBlank size={13} weight="bold" aria-hidden />
            <time dateTime={rawDate} className="text-xs font-semibold tracking-tight lowercase">
              {formattedDate.toLowerCase()}
            </time>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug lowercase">
          {fm.title || article.name}
        </h3>

        {/* Description */}
        {fm.description && (
          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-normal lowercase line-clamp-2 flex-grow">
            {fm.description}
          </p>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/30">
          <div className="flex flex-wrap gap-1.5">
            {fm.tags && fm.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="chip">
                {tag.toLowerCase()}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors lowercase shrink-0">
            read essay
            <ArrowRight size={12} weight="bold" />
          </span>
        </div>
      </Link>
    </article>
  )
}
