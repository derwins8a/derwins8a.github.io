'use client'

import Giscus from '@giscus/react';
import type { FC } from 'react'

export const Comments: FC = () => {
  return (
    <div className="mt-20 pt-10 border-t border-border/40 w-full">
      <h3 className="text-3xl font-bold tracking-tighter mb-8 lowercase">comments.</h3>
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
        theme="https://derwins8a.github.io/giscus/custom_example.css"
        lang="en"
        loading="lazy"
        strict="0"
      />
    </div>
  )
}