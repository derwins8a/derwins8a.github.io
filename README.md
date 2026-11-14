# Derwins Ochoa — Design Engineer Portfolio

> A premium, Apple HIG-inspired portfolio website built with Next.js 16, Tailwind CSS v4, and OKLCH color space. Features fluid iOS 26-style navigation, scroll-driven animations, and a comprehensive design system.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://vercel.com/)

## ✨ Features

### 🎨 Design Excellence
- **OKLCH Color Space** — Perceptually uniform colors that work flawlessly in both light and dark mode
- **Liquid Glass Morphing** — iOS 26-style fluid navigation pill with spring physics
- **Subtle Skeuomorphism** — Inset highlights, grain textures, and depth without clutter
- **Scroll-Driven Animations** — Native CSS `animation-timeline: scroll()` (no JS)
- **Reduced Motion Support** — Respects `prefers-reduced-motion` automatically

### 🧭 Navigation
- **Desktop**: Centered pill nav with fluid liquid morphing indicator (iOS 26 style)
- **Mobile**: Bottom tab bar with 5 sections + search, safe-area aware
- **Universal Search**: `⌘K` / `Ctrl+K` opens overlay with quick links & real-time results

### 📱 Responsive & Accessible
- Mobile-first, works beautifully at 375px → 1536px+
- WCAG 2.2 AA contrast in both themes
- Semantic HTML, proper landmarks, keyboard navigation
- Touch targets ≥44×44pt

### ⚡ Performance
- Next.js 16 with Turbopack
- React 19 with Server Components
- Zero layout shift, optimized images
- CSS-only animations (no JS animation libraries)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/derwins8a/derwins8a.github.io.git
cd derwins8a.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the site.

### Available Scripts

```bash
pnpm dev      # Start dev server with Turbopack
pnpm build    # Production build
pnpm start    # Start production server
```

---

## 📁 Project Structure

```
derwins8a.github.io/
├── app/                          # Next.js App Router
│   ├── [[...mdxPath]]/           # Nextra MDX pages
│   │   └── page.tsx
│   ├── _components/              # Layout components
│   │   ├── navbar.tsx            # Navigation (desktop pill + mobile tabs)
│   │   ├── sidebar.tsx           # Documentation sidebar
│   │   ├── toc.tsx               # Table of contents
│   │   ├── footer.tsx            # Site footer
│   │   ├── nextra-theme.tsx      # Nextra theme wrapper
│   │   └── comments.tsx          # Giscus comments
│   ├── globals.css               # Design system & global styles
│   └── layout.tsx                # Root layout
├── components/
│   ├── featured-items.tsx        # Home page sections (Hero, Projects, etc.)
│   ├── hero.tsx                  # Landing hero with stats/testimonials
│   ├── project-card.tsx          # Project showcase cards
│   ├── blog-card.tsx             # Blog post cards
│   ├── content-lists.tsx         # Paginated blog/project lists
│   ├── paginated-list.tsx        # Client-side pagination
│   ├── theme-toggle.tsx          # Light/Dark/System toggle
│   ├── protected-email-link.tsx  # Obfuscated email
│   └── ui/                       # Shadcn/UI components
├── content/                      # MDX content
│   ├── index.mdx                 # Home page
│   ├── about.mdx                 # About page
│   ├── projects/                 # Project case studies
│   ├── blog/                     # Blog posts
│   ├── contact.mdx               # Contact page
│   └── now.mdx                   # Now page
├── lib/
│   ├── portfolio.ts              # Content fetching utilities
│   ├── utils.ts                  # cn() helper
│   └── obfuscate.ts              # Email obfuscation
├── public/                       # Static assets
├── DESIGN_SYSTEM.md              # Design system documentation
├── next.config.mjs               # Next.js configuration
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## 🎨 Design System

The design system is documented in **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** and implemented in `app/globals.css`.

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| **Perceptual Color** | OKLCH for all color tokens |
| **Fluid Motion** | Spring physics `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **Breathing Room** | Exponential spacing scale (4px base) |
| **Materiality** | Grain textures, inset highlights, glass morphism |
| **Accessibility** | WCAG AA, focus rings, reduced motion |

### Color Tokens (CSS Variables)

```css
:root {
  --background: oklch(0.983 0.002 85);
  --foreground: oklch(0.11 0.012 265);
  --primary: oklch(0.6 0.22 250);       /* Apple Blue */
  --card: oklch(1 0 0);
  --border: oklch(0 0 0 / 7%);
  --radius: 1.5rem;
  --grain-opacity: 0.028;
  /* ... shadows, semantic colors, etc. */
}

.dark {
  --background: oklch(0.098 0.006 265);
  --foreground: oklch(0.962 0.003 265);
  /* ... dark mode overrides */
}
```

---

## 🧭 Navigation Deep Dive

### Desktop Pill Nav (`app/_components/navbar.tsx`)

```tsx
// Fluid liquid morphing pill
<div className="absolute top-1 bottom-1 rounded-full bg-primary
  transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
  style={{ transform: `translateX(${pillPosition.x}px)`, width: pillPosition.width }}
/>
```

- **Position calculated via `getBoundingClientRect()`** — matches link dimensions exactly
- **Spring animation** — `cubic-bezier(0.34, 1.56, 0.64, 1)` with subtle bounce
- **Icons + labels** — Phosphor icons, filled when active
- **Scroll response** — Scales to 98% and fades slightly

### Mobile Bottom Tab Bar

```tsx
// Liquid glass background
<nav className="glass border-t border-border/40" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
  {/* Morphing pill */}
  <div className="absolute top-2 bottom-2 rounded-2xl bg-primary/15
    transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    style={{ transform: `translateX(${mobilePillPosition}px)` }}
  />
</nav>
```

- **Safe-area aware** — `env(safe-area-inset-bottom)` for home indicator
- **Gradient fade** — Smooth transition above bar
- **5 tabs + search** — Icons switch to filled on active

### Search Overlay

```tsx
// Keyboard shortcut
useEffect(() => {
  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); setIsSearchOpen(v => !v);
    }
  };
}, []);
```

- **`⌘K` / `Ctrl+K`** — Opens from anywhere
- **Quick links** — Shows when query empty
- **Real-time filtering** — Client-side, no API calls
- **Keyboard nav** — `↑↓` select, `↵` open, `Esc` close

---

## 📝 Content Management

### Adding a Blog Post

1. Create `content/blog/your-post-title.mdx`
2. Add frontmatter:

```mdx
---
title: Your Post Title
date: 2026-11-15
description: One-sentence summary for SEO/social
tags: [design, frontend, typescript]
featured: true  # Shows on home page
image: /path/to/hero-image.png  # optional
---

Your content here...
```

### Adding a Project

1. Create `content/projects/your-project.mdx`
2. Add frontmatter:

```mdx
---
title: Project Name
date: 2026-11-15
description: Brief description for cards
tags: [react, typescript, design-system]
featured: true
image: /projects/your-project/hero.png
github: https://github.com/derwins8a/repo
link: https://your-project.com
---

## Overview

Project details...

## Challenges

Technical deep dive...

## Results

Metrics, outcomes...
```

---

## 🌙 Theming

### Theme Toggle (`components/theme-toggle.tsx`)

Three modes: **Light**, **Dark**, **System**

```tsx
const applyTheme = (newTheme: "light" | "dark" | "system") => {
  // Updates localStorage, document.documentElement, and CSS variables
};
```

### No-FOUC Inline Script

In `app/layout.tsx`, a tiny inline script runs **before first paint**:

```html
<script dangerouslySetInnerHTML={{ __html: `(function(){
  var t=localStorage.getItem('theme');
  var d=document.documentElement;
  var pref=window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark=t==='dark'||(t!=='light'&&pref);
  if(isDark){d.classList.add('dark');d.setAttribute('data-theme','dark');}
  else{d.classList.remove('dark');d.setAttribute('data-theme','light');}
})()` }} />
```

---

## 🔧 Customization

### Changing Primary Color

Edit `app/globals.css`:

```css
:root {
  --primary: oklch(0.6 0.22 250);  /* Change hue (250 = blue) */
}
```

Popular alternatives:
- Emerald: `oklch(0.6 0.18 140)`
- Orange: `oklch(0.7 0.2 60)`
- Purple: `oklch(0.55 0.22 280)`
- Rose: `oklch(0.65 0.22 10)`

### Adjusting Spacing Density

```css
/* In globals.css --design-system section */
--space-4: 16px;  /* Base unit — change to 12px for dense, 20px for spacious */
```

Or use design dials (requires Python):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "portfolio" --design-system --density 8
```

### Modifying Border Radius

```css
:root {
  --radius: 1rem;      /* 16px — less rounded */
  --radius: 2rem;      /* 32px — more rounded */
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables if needed
4. Deploy — automatic on push to main

### GitHub Pages

```bash
pnpm build
# Output in ./out — deploy to gh-pages branch
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GISCUS_REPO` | No | Giscus comments repo |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | No | Giscus category |
| `FORMSPREE_ENDPOINT` | No | Contact form endpoint |

---

## 📚 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@16` | React framework with App Router |
| `nextra@4` | MDX documentation/blog framework |
| `nextra-theme-blog` | Blog theme for Nextra |
| `tailwindcss@4` | Utility-first CSS (v4 alpha) |
| `@phosphor-icons/react` | Consistent icon system |
| `clsx` + `tailwind-merge` | Class composition |
| `tw-animate-css` | Tailwind animate utilities |

---

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Open a PR with a clear description

---

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio.

---

## 🙏 Acknowledgments

- **Apple HIG** — Navigation patterns, motion principles, accessibility
- **Tailwind CSS** — Utility-first methodology
- **OKLCH** — Perceptually uniform color space
- **Phosphor Icons** — Beautiful, consistent icon set
- **Nextra** — MDX-powered documentation
- **Vercel** — Hosting & edge network

---

<p align="center">
  Built with <span style="color: oklch(0.6 0.22 250);">♥</span> by <a href="https://derwins8a.github.io">Derwins Ochoa</a>
</p>