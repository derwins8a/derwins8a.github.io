'use client'

import Giscus from '@giscus/react';
import type { FC } from 'react'
 
export const Comments: FC = () => {
  return (
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
      theme="https://derwins8a.github.io/themes/giscus/custom_example.css"
      lang="en"
      loading="lazy"
      strict="0"
    />
  )
}