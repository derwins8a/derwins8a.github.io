import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr"

export function BlogCard({ article }: { article: StructuredPage }) {
  const fm = (article.frontMatter || {}) as PageFrontmatter

  const formattedDate = fm.date
    ? new Date(fm.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <article className="scroll-slide-up flex flex-col h-full card-surface grain relative rounded-[24px] p-6 transition-all duration-300 group select-none overflow-hidden">
      <Link href={article.route} className="flex flex-col h-full gap-4">

        {/* Date + read time */}
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-primary">
            <CalendarBlank size={12} weight="bold" aria-hidden />
            <span className="text-xs font-semibold tracking-tight lowercase">
              {formattedDate.toLowerCase()}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug lowercase">
          {fm.title || article.name}
        </h3>

        {/* Description */}
        {fm.description && (
          <p className="text-sm text-muted-foreground leading-relaxed font-normal lowercase line-clamp-3 flex-grow">
            {fm.description}
          </p>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-1.5">
            {fm.tags && fm.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="chip">
                {tag.toLowerCase()}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors lowercase shrink-0">
            read essay
            <ArrowRight size={12} weight="bold" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  )
}
