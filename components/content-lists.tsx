import { getCollection } from "@/lib/portfolio"
import { PaginatedList } from "@/components/paginated-list"
import { BlogCard } from "@/components/blog-card"
import { ProjectCard } from "@/components/project-card"

export async function BlogList() {
  const articles = await getCollection("/blog")
  const articleNodes = articles.map(item => <BlogCard key={item.route} article={item} />)
  
  return (
    <PaginatedList 
      items={articleNodes} 
      pageSize={6}
    />
  )
}

export async function ProjectList() {
  const projects = await getCollection("/projects")
  const projectNodes = projects.map(item => <ProjectCard key={item.route} project={item} />)
  
  return (
    <div className="mt-8">
      <PaginatedList 
        items={projectNodes} 
        pageSize={6}
        gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      />
    </div>
  )
}
