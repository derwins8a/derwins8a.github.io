import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import Image from "next/image"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

export function ProjectCard({ project }: { project: StructuredPage }) {
  const fm = (project.frontMatter || {}) as PageFrontmatter

  return (
    <div className="flex flex-col h-full bg-card border border-border/60 dark:border-white/[0.08] hover:border-[#007AFF]/40 rounded-[32px] p-5 transition-all duration-300 group shadow-lg select-none">
      <Link href={project.route} className="flex flex-col h-full gap-4">
        {/* iOS Blue Rounded Media Container */}
        <div className="relative w-full aspect-[16/10] bg-[#007AFF] rounded-[22px] overflow-hidden shadow-inner flex items-center justify-center">
          {fm.image ? (
            <Image
              src={fm.image}
              alt={fm.title || project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-[#005bb5] via-[#007AFF] to-[#409cff] flex items-center justify-center p-6 text-center">
              <span className="text-white font-bold text-lg tracking-tight lowercase line-clamp-2">
                {fm.title || project.name}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-grow gap-2 px-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#007AFF] transition-colors leading-snug lowercase">
            {fm.title || project.name}
          </h3>

          {fm.description && (
            <p className="text-sm text-muted-foreground leading-relaxed font-normal lowercase line-clamp-3">
              {fm.description}
            </p>
          )}

          {/* Bottom Row: Tags & iOS Pill Button */}
          <div className="mt-auto pt-4 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {fm.tags && fm.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded-full lowercase font-medium">
                  {tag.toLowerCase()}
                </span>
              ))}
            </div>

            <span className="bg-[#007AFF] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-1 lowercase shrink-0">
              read more.
              <ArrowRight size={12} weight="bold" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
