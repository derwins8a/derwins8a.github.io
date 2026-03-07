import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components'

const defaultComponents = getNextraComponents({
  wrapper({ children }: any) {
    return (
      <div className="w-full mt-24 mb-16 prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    )
  }
})

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...defaultComponents,
    ...components
  }
}