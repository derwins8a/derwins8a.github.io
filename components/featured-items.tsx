import { getFeatured } from "@/lib/portfolio"
import { ProjectCard } from "./project-card"
import { BlogCard } from "./blog-card"

export async function FeaturedProjects() {
  const projects = await getFeatured("/projects", 3)

  if (projects.length === 0) return null

  return (
    <section className="py-16 mt-12 w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">projects.</h2>
        <p className="text-2xl text-foreground font-light leading-tight max-w-md">
          collection of past works<br />I'm proud to show.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section className="py-16 w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">blog.</h2>
        <p className="text-2xl text-foreground font-light leading-tight max-w-md">
          thoughts and essays.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <BlogCard key={article.route} article={article} />
        ))}
      </div>
    </section>
  )
}
