import { getFeatured } from "@/lib/portfolio"
import { ProjectCard } from "./project-card"
import { BlogCard } from "./blog-card"

export async function FeaturedProjects() {
  const projects = await getFeatured("/projects", 3)

  if (projects.length === 0) return null

  return (
    <section className="py-12 mt-6 w-full text-left">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          selected works.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.route} project={project} />
        ))}
      </div>
    </section>
  )
}

export async function FeaturedArticles() {
  const articles = await getFeatured("/blog", 3)

  if (articles.length === 0) return null

  return (
    <section className="py-12 w-full text-left">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          thoughts & essays.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <BlogCard key={article.route} article={article} />
        ))}
      </div>
    </section>
  )
}
