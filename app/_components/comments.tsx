'use client'

import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import type { FC } from 'react'

export const Comments: FC = () => {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark') ||
                   document.documentElement.getAttribute('data-theme') === 'dark'
      setIsDark(dark)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-16 pt-8 border-t border-border/40 w-full text-left">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground lowercase">
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
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={isDark ? "https://derwins8a.github.io/giscus/dark.css" : "https://derwins8a.github.io/giscus/light.css"}
          lang="en"
          loading="lazy"
        />
      )}
    </div>
  )
}
