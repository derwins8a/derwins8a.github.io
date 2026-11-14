# Derwins Ochoa — Design Engineer Portfolio

> A high-performance, Apple Human Interface Guidelines (HIG)-inspired portfolio website built with Next.js 16, React 19, Tailwind CSS v4, and OKLCH color tokens. Features fluid iOS 26-style liquid navigation with spring physics, custom glass looking-glass cursor, Schema.org Person structured data, and bespoke Giscus comments.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Design & Architecture Highlights

### 🎨 Apple HIG & Design System
- **OKLCH Color Space** — Perceptually uniform colors ensuring mathematically consistent contrast across light and dark themes.
- **Subtle Skeuomorphism** — Inset specular highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.35)`), optical grain textures, and realistic elevation shadows without visual clutter.
- **Fluid Liquid Morphing Navigation (iOS 26 Style)** — Dual-layer magnifying aperture pill with spring physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`). As the pill moves between tabs, it smoothly reveals glowing active icons beneath its aperture before settling with spring bounce.
- **Glass Refraction Cursor** — Custom looking-glass circle on pointer-fine devices that magnifies underlying content with subtle lens refraction. Hovering interactive targets expands an outer glowing ring without switching to generic OS pointer hands.
- **Zero-Jump Mobile Experience** — Top bar is completely abandoned on mobile; replaced with a floating rounded-full bottom pill that never occludes footer controls or the theme toggle.
- **Structured Data (Schema.org)** — Built-in JSON-LD `Person` markup with `alternateName: "derwins8a"` consolidating digital identity for search engines and generative AI answer engines.

---

## 🧭 Navigation Structure

| Device | Pattern | Behavior |
| :--- | :--- | :--- |
| **Desktop** | Centered Floating Pill (`top-5`) | Icons + lowercase labels, spring liquid morphing pill, universal `⌘K` search shortcut |
| **Mobile** | Floating Bottom Pill (`bottom-5`) | Rounded-full glass container, 5 primary tabs + search, generous bottom breathing room |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/) with React Server Components (RSC)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & OKLCH color definitions
- **Content Engine**: [Nextra 4](https://nextra.site/) (MDX with dynamic page mapping)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/react`)
- **Typography**: [Geist Sans](https://vercel.com/font) & [Geist Mono](https://vercel.com/font)
- **Discussion Engine**: [Giscus](https://giscus.app/) with custom Apple HIG light and dark stylesheets

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (tested with v24 LTS via `mise`)
- `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/derwins8a/derwins8a.github.io.git
cd derwins8a.github.io

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Building for Production

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
derwins8a.github.io/
├── app/
│   ├── [[...mdxPath]]/     # Nextra dynamic MDX catch-all page router
│   ├── _components/        # Layout components (Navbar, Footer, Comments, NextraTheme)
│   ├── globals.css         # OKLCH design tokens, liquid animations, glass textures
│   └── layout.tsx          # Root layout with Schema.org JSON-LD and font loading
├── components/
│   ├── featured-items.tsx  # Featured projects, essays, and FAQ section
│   ├── glass-cursor.tsx    # Smooth optical looking-glass cursor
│   ├── hero.tsx            # Interactive hero profile with time & direct channels
│   ├── project-card.tsx    # Proportional, accessible work showcase card
│   ├── blog-card.tsx       # Essay card with verified publication date & tags
│   └── theme-toggle.tsx    # Light / Dark / System segmented pill switch
├── content/
│   ├── blog/               # MDX technical essays & design writings
│   ├── projects/           # MDX case studies & open source tools
│   ├── about.mdx           # Strategic bio & FAQ section for AI crawlers
│   ├── contact.mdx         # Contact form & direct links
│   ├── index.mdx           # Homepage layout
│   └── now.mdx             # Current focus & learning snapshot
├── public/
│   └── giscus/             # Custom Apple HIG stylesheets (light.css, dark.css)
└── lib/
    ├── obfuscate.ts        # Bot-safe email decoding
    ├── portfolio.ts        # Nextra page map extraction & sorting
    ├── structured-data.ts  # Schema.org Person JSON-LD object
    └── utils.ts            # ClassName merging utility
```

---

## 📄 License

MIT © [Derwins Ochoa (@derwins8a)](https://github.com/derwins8a)
