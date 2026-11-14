import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { Comments } from '../_components/comments'
import { BackButton } from '@/components/back-button'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: any) {
  const params = await props.params
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(params.mdxPath)

  const isBlogArticle = params.mdxPath && params.mdxPath[0] === 'blog' && params.mdxPath.length > 1
  const isProjectArticle = params.mdxPath && params.mdxPath[0] === 'projects' && params.mdxPath.length > 1
  const showComments = isBlogArticle && (metadata as any)?.comments !== false

  // Determine parent page for back button
  let backHref = '/'
  let backLabel = 'home'
  if (isBlogArticle) {
    backHref = '/blog'
    backLabel = 'blog'
  } else if (isProjectArticle) {
    backHref = '/projects'
    backLabel = 'projects'
  }

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode} mdxPath={params.mdxPath}>
      <div className="mb-8 md:mb-12">
        <BackButton href={backHref} label={backLabel} />
      </div>
      <MDXContent {...props} params={params} />
      {showComments && <Comments />}
    </Wrapper>
  )
}