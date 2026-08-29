'use client'

import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import type { FC } from 'react'

export const Comments: FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateGiscusTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    }

    updateGiscusTheme()

    // Observe class changes on html
    const observer = new MutationObserver(updateGiscusTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-20 pt-10 border-t border-border/40 w-full text-left">
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground lowercase">
          comments.
        </h3>
        <p className="text-xs text-muted-foreground lowercase mt-1">
          join the discussion via github
        </p>
      </div>

      {mounted && (
        <Giscus
          id="comments"
          repo="derwins8a/derwins8a.github.io"
          repoId="R_kgDOQAzThg="
          category="Announcements"
          categoryId="DIC_kwDOQAzThs4C2qzK"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="https://derwins8a.github.io/giscus/ios-theme.css"
          lang="en"
          loading="lazy"
          strict="0"
        />
      )}
    </div>
  )
}