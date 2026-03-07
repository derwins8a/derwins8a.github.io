import Link from "next/link"
import { StructuredPage, PageFrontmatter } from "@/lib/portfolio"
import Image from "next/image"

export function ProjectCard({ project }: { project: StructuredPage }) {
  const fm = (project.frontMatter || {}) as PageFrontmatter

  return (
    <div className="flex flex-col h-full bg-secondary/5 pt-4 pb-6 px-4 hover:bg-secondary/10 transition-colors group">
      
      <div className="mb-2 pl-2 border-l-2 border-primary/40">
        <Link href={project.route} className="hover:underline decoration-2 underline-offset-4">
          <h3 className="text-xl font-medium tracking-tight text-foreground/90 mb-0.5 max-h-min leading-6">
            {fm.title || project.name}
          </h3>
        </Link>
        {fm.tags && fm.tags.length > 0 && (
          <span className="text-sm text-foreground/60 italic block">
            {fm.tags[0].toLowerCase()} project
          </span>
        )}
      </div>

      <div className="relative w-full aspect-video bg-[#007bfa] mt-2 mb-2 group-hover:opacity-90 transition-opacity">
        {fm.image && (
          <Image
            src={fm.image}
            alt={fm.title || project.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="w-full flex justify-end gap-1 mb-2 px-1">
        {fm.tags && fm.tags.map((tag: string, index: number) => (
          <span key={tag} className="text-sm text-foreground/80">
            {tag.toLowerCase()}{index < fm.tags!.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>

      {fm.description && (
        <p className="text-muted-foreground px-1 leading-snug">
          {fm.description}
        </p>
      )}
    </div>
  )
}
