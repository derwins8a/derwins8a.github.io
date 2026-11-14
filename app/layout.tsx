import type { Metadata, Viewport } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { NextraTheme } from './_components/nextra-theme'
import './globals.css'
import { Geist, Geist_Mono } from "next/font/google"
import { structuredData } from '@/lib/structured-data'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Derwins Ochoa — Design Engineer',
    template: '%s · Derwins Ochoa',
  },
  description: 'Design engineer & frontend architect. Building tactile, high-performance web and mobile software for established brands and funded startups.',
  keywords: ['design engineer', 'frontend developer', 'iOS developer', 'Next.js', 'SwiftUI', 'React', 'TypeScript', 'Venezuela'],
  authors: [{ name: 'Derwins Ochoa', url: 'https://derwins8a.github.io' }],
  creator: 'Derwins Ochoa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://derwins8a.github.io',
    siteName: 'Derwins Ochoa',
    title: 'Derwins Ochoa — Design Engineer',
    description: 'Design engineer & frontend architect building tactile, high-performance software.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@derwins8a',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f8f6' },
    { media: '(prefers-color-scheme: dark)',  color: '#181c24' },
  ],
}
 
const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <Head faviconGlyph="✦">
        {/* Inline theme script — runs before first paint, prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;var pref=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=t==='dark'||(t!=='light'&&pref);if(isDark){d.classList.add('dark');d.setAttribute('data-theme','dark');}else{d.classList.remove('dark');d.setAttribute('data-theme','light');}}catch(e){}})()`,
          }}
        />
        {/* Schema.org Person JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body style={{ margin: 0 }}>
        <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
      </body>
    </html>
  )
}
 
export default RootLayout
