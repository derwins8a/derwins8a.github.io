import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import Image from "next/image"
import { ArrowRight, Code } from "@phosphor-icons/react/dist/ssr"

export function ProjectCard({ project }: { project: StructuredPage }) {
  const fm = (project.frontMatter || {}) as PageFrontmatter

  return (
    <article className="scroll-slide-up flex flex-col h-full card-surface grain relative rounded-[24px] overflow-hidden transition-all duration-300 group select-none">
      <Link href={project.route} className="flex flex-col h-full">
        {/* Media container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
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
              className="w-full h-full flex items-center justify-center p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.68 0.22 250) 0%, oklch(0.5 0.22 250) 100%)',
              }}
            >
              {/* Subtle dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
                aria-hidden
              />
              <Code size={36} weight="thin" className="text-white/80 relative z-10" aria-hidden />
            </div>
          )}

          {/* Top gradient overlay for legibility */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, oklch(0 0 0 / 20%) 0%, transparent 60%)' }}
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow gap-2.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug lowercase line-clamp-2">
              {fm.title || project.name}
            </h3>
            <span
              className="size-7 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground/90 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-200 shrink-0 mt-0.5"
              aria-hidden
            >
              <ArrowRight size={13} weight="bold" />
            </span>
          </div>

          {fm.description && (
            <p className="text-sm text-muted-foreground/90 leading-relaxed font-normal lowercase line-clamp-2">
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
