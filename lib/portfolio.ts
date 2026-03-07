import { getPageMap } from 'nextra/page-map'

export interface PageFrontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
  featured?: boolean
  image?: string
  link?: string
  github?: string
  [key: string]: any
}

export interface StructuredPage {
  name: string
  route: string
  frontMatter?: PageFrontmatter
  children?: any[]
}

function extractAllPages(nodes: StructuredPage[]): StructuredPage[] {
  let result: StructuredPage[] = []
  
  for (const node of nodes) {
    if (node.children) {
      result = result.concat(extractAllPages(node.children))
    }
    if (node.route && node.frontMatter && node.name !== 'index') {
      result.push(node)
    }
  }

  return result
}

export async function getCollection(collectionName: string): Promise<StructuredPage[]> {
  const pageMap = (await getPageMap()) as StructuredPage[]
  
  // Find the exact collection folder ("projects" or "blog")
  const collectionFolder = pageMap.find(
    (item) => item.name === collectionName.replace('/', '') && item.children
  )

  if (!collectionFolder || !collectionFolder.children) {
    return []
  }

  // Extract all valid pages inside that specific folder tree recursively
  const pages = extractAllPages(collectionFolder.children)

  return pages.sort((a, b) => {
    const dateA = a.frontMatter?.date ? new Date(a.frontMatter.date).getTime() : 0;
    const dateB = b.frontMatter?.date ? new Date(b.frontMatter.date).getTime() : 0;
    return dateB - dateA;
  })
}

export async function getFeatured(collectionName: string, count: number = 3): Promise<StructuredPage[]> {
  const items = await getCollection(collectionName)
  return items.filter(item => item.frontMatter?.featured === true).slice(0, count)
}
