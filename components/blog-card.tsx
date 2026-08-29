import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

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
    <div className="flex flex-col h-full bg-card border border-border/60 dark:border-white/[0.08] hover:border-[#007AFF]/40 rounded-[28px] p-6 transition-all duration-300 group shadow-lg select-none">
      <Link href={article.route} className="flex flex-col h-full gap-4">
        
        {/* Title & Date Header */}
        <div className="flex flex-col gap-1.5 text-left">
          {formattedDate && (
            <span className="text-xs text-[#007AFF] font-medium tracking-tight lowercase">
              {formattedDate.toLowerCase()}
            </span>
          )}
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#007AFF] transition-colors leading-snug lowercase">
            {fm.title || article.name}
          </h3>
        </div>

        {/* Description */}
        {fm.description && (
          <p className="text-sm text-muted-foreground leading-relaxed font-normal lowercase line-clamp-3">
            {fm.description}
          </p>
        )}

        {/* Bottom Row: Tags & Read Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-border/30">
          <div className="flex flex-wrap gap-1.5">
            {fm.tags && fm.tags.map((tag: string) => (
              <span key={tag} className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full lowercase">
                {tag.toLowerCase()}
              </span>
            ))}
          </div>

          <span className="text-xs text-foreground/80 group-hover:text-foreground flex items-center gap-1 font-medium lowercase">
            read essay
            <ArrowRight size={12} weight="bold" />
          </span>
        </div>
      </Link>
    </div>
  )
}
