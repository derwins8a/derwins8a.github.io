import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import Image from "next/image"
import { ArrowRight, Code } from "@phosphor-icons/react/dist/ssr"

export function ProjectCard({ project }: { project: StructuredPage }) {
  const fm = (project.frontMatter || {}) as PageFrontmatter

  return (
    <article className="flex flex-col h-full card-surface grain relative rounded-[20px] overflow-hidden transition-all duration-300 group select-none hover-lift hover-glow">
      <Link href={project.route} className="flex flex-col h-full">
        {/* Media container - balanced 16/9 ratio, not overly vertical */}
        <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
          {fm.image ? (
            <Image
              src={fm.image}
              alt={fm.title || project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center p-4 text-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.65 0.22 250) 0%, oklch(0.48 0.22 250) 100%)',
              }}
            >
              {/* Subtle dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
                aria-hidden
              />
              <Code size={32} weight="thin" className="text-white/90 relative z-10" aria-hidden />
            </div>
          )}

          {/* Top gradient overlay for legibility */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, oklch(0 0 0 / 25%) 0%, transparent 60%)' }}
            aria-hidden
          />
        </div>

        {/* Content - tight, balanced padding */}
        <div className="flex flex-col flex-grow gap-2 p-4 sm:p-4.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug lowercase line-clamp-1">
              {fm.title || project.name}
            </h3>
            <span
              className="size-6 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground/80 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-200 shrink-0 mt-0.5"
              aria-hidden
            >
              <ArrowRight size={12} weight="bold" />
            </span>
          </div>

          {fm.description && (
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-normal lowercase line-clamp-2">
              {fm.description}
            </p>
          )}

          {fm.tags && fm.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {fm.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="chip">
                  {tag.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
