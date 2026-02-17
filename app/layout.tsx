import type { Metadata } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { NextraTheme } from './_components/nextra-theme'
import './globals.css'
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    absolute: '',
    template: '%s'
  }
}
 
const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" className={geist.variable}>
      <Head faviconGlyph="✦" />
      <body style={{ margin: 0 }}>
        <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
      </body>
    </html>
  )
}
 
export default RootLayout