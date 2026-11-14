'use client'

import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import type { FC } from 'react'

export const Comments: FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
          repoId="R_kgDOQAzThg"
          category="Announcements"
          categoryId="DIC_kwDOQAzThs4C2qzK"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
        />
      )}
    </div>
  )
}