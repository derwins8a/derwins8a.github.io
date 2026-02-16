import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components'
import { TOC } from './app/_components/toc'

const defaultComponents = getNextraComponents({
  wrapper({ children, toc }: any) {
    return (
      <>
        <div style={{ flexGrow: 1, padding: 20 }}>{children}</div>
        <TOC toc={toc} />
      </>
    )
  }
})

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...defaultComponents,
    ...components
  }
}