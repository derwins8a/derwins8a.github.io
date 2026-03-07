import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"

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
    <div className="flex flex-col h-full bg-secondary/5 border-l-4 border-foreground p-6 hover:bg-secondary/10 transition-colors">
      <div className="flex flex-col gap-1 mb-4">
        <Link href={article.route} className="hover:underline decoration-2 underline-offset-4">
          <h3 className="text-2xl font-bold tracking-tight text-foreground/90">
            {fm.title || article.name}
          </h3>
        </Link>
        {formattedDate && (
          <span className="text-sm font-medium text-muted-foreground italic">
            published {formattedDate}
          </span>
        )}
      </div>

      <div className="w-full flex justify-end gap-2 mb-4">
        {fm.tags && fm.tags.map((tag: string) => (
          <Badge key={tag} variant="outline" className="text-xs rounded-none border-foreground/20 font-normal">
            {tag.toLowerCase()}
          </Badge>
        ))}
      </div>

      {fm.description && (
        <p className="text-muted-foreground leading-relaxed">
          {fm.description}
        </p>
      )}
    </div>
  )
}
