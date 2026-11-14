# Design System — Derwins Portfolio

A premium, Apple HIG-inspired design system built with Tailwind CSS v4, OKLCH color space, and modern CSS features. This document serves as the single source of truth for all design decisions.

---

## 🎨 Design Philosophy

**Obsessive Craft** — Every pixel, every millisecond, every interaction is intentional. The details others skip are where the magic lives.

**Accessibility First** — Inclusive by default. Semantic HTML, proper contrast, keyboard navigation, screen reader support — never an afterthought.

**Performance Obsessed** — Sub-100ms interactions, optimal bundle sizes, zero layout shift. Speed is a feature, not a luxury.

**Human-Centered** — Software should feel alive. Micro-interactions, haptic feedback, thoughtful motion — technology that respects the human using it.

---

## 🌈 Color System (OKLCH)

All colors use the **OKLCH color space** for perceptual uniformity — the same lightness value appears equally bright across all hues.

### Core Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `oklch(0.983 0.002 85)` | `oklch(0.098 0.006 265)` | Page background |
| `--background-secondary` | `oklch(0.971 0.004 85)` | `oklch(0.13 0.007 265)` | Secondary surfaces |
| `--foreground` | `oklch(0.11 0.012 265)` | `oklch(0.962 0.003 265)` | Primary text |
| `--foreground-secondary` | `oklch(0.38 0.01 265)` | `oklch(0.62 0.01 265)` | Secondary text |
| `--card` | `oklch(1 0 0)` | `oklch(0.148 0.007 265)` | Card surfaces |
| `--border` | `oklch(0 0 0 / 7%)` | `oklch(1 0 0 / 8%)` | Subtle borders |
| `--border-strong` | `oklch(0 0 0 / 14%)` | `oklch(1 0 0 / 14%)` | Stronger borders |

### Primary Brand Color

```css
--primary: oklch(0.6 0.22 250);        /* Apple Blue — exact system blue */
--primary-foreground: oklch(1 0 0);    /* White on primary */
```

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--secondary` | `oklch(0.945 0.004 265)` | `oklch(0.198 0.007 265)` | Secondary actions |
| `--muted` | `oklch(0.945 0.004 265)` | `oklch(0.165 0.007 265)` | Muted backgrounds |
| `--accent` | `oklch(0.6 0.22 250)` | `oklch(0.6 0.22 250)` | Accent highlights |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Errors, deletions |

### Generating Variants

```css
/* Light mode variants — adjust lightness only */
--primary-50:  oklch(0.95 0.04 250);
--primary-100: oklch(0.90 0.08 250);
--primary-500: oklch(0.60 0.22 250);  /* Base */
--primary-900: oklch(0.25 0.14 250);

/* Dark mode — shift lightness, keep chroma/hue */
.dark {
  --primary-50:  oklch(0.20 0.04 250);
  --primary-500: oklch(0.60 0.22 250);
  --primary-900: oklch(0.90 0.14 250);
}
```

---

## 📐 Spacing Scale

Based on 4px unit, exponential growth for visual harmony.

```css
--space-1: 4px;   --space-6: 32px;
--space-2: 8px;   --space-7: 48px;
--space-3: 12px;  --space-8: 64px;
--space-4: 16px;  --space-9: 96px;
--space-5: 24px;  --space-10: 128px;
```

### Spacing Hierarchy

| Level | Value | Use Case |
|-------|-------|----------|
| Micro | `--space-1` to `--space-2` | Icon gaps, inline elements |
| Component | `--space-3` to `--space-5` | Card padding, button gaps |
| Section | `--space-6` to `--space-8` | Section margins, card gaps |
| Layout | `--space-9` to `--space-10` | Page margins, hero spacing |

---

## 🔤 Typography

### Font Stack

```css
--font-sans: 'Geist', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, SF Mono, monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | `clamp(2.4rem, 6vw, 4rem)` | 800 | 1.05 | -0.025em |
| H2 | `clamp(1.8rem, 4vw, 2.5rem)` | 700 | 1.1 | -0.025em |
| H3 | `clamp(1.4rem, 3vw, 1.8rem)` | 600 | 1.2 | -0.02em |
| H4 | `clamp(1.1rem, 2vw, 1.3rem)` | 500 | 1.3 | -0.015em |
| Body | `1rem` | 400 | 1.65 | 0 |
| Small | `0.875rem` | 400 | 1.5 | 0 |
| Caption | `0.75rem` | 500 | 1.4 | 0.01em |

### Font Features

```css
font-feature-settings: "ss01" on, "ss02" on, "cv01" on, "kern" on;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

---

## 🌊 Border Radius Scale

```css
--radius: 1.5rem;          /* 24px — base */
--radius-sm: 1rem;         /* 16px */
--radius-md: 1.25rem;      /* 20px */
--radius-lg: 1.5rem;       /* 24px */
--radius-xl: 1.75rem;      /* 28px */
--radius-2xl: 2rem;        /* 32px */
--radius-3xl: 2.25rem;     /* 36px */
--radius-4xl: 2.5rem;      /* 40px */
--radius-full: 9999px;     /* Pills, badges */
```

---

## 🎭 Elevation & Shadows

### Shadow Tokens

```css
/* Light mode */
--shadow-xs: 0 1px 2px 0 oklch(0 0 0 / 5%), 0 1px 1px -1px oklch(0 0 0 / 4%);
--shadow-sm: 0 1px 3px 0 oklch(0 0 0 / 8%), 0 1px 2px -1px oklch(0 0 0 / 6%);
--shadow-md: 0 4px 6px -1px oklch(0 0 0 / 8%), 0 2px 4px -2px oklch(0 0 0 / 5%);
--shadow-lg: 0 10px 25px -3px oklch(0 0 0 / 10%), 0 4px 6px -4px oklch(0 0 0 / 6%);
--shadow-xl: 0 20px 50px -6px oklch(0 0 0 / 12%), 0 8px 15px -6px oklch(0 0 0 / 8%);
--shadow-card: 0 2px 10px oklch(0 0 0 / 6%), 0 0 0 1px oklch(0 0 0 / 5%);

/* Dark mode — deeper, more pronounced */
--shadow-xs: 0 1px 2px 0 oklch(0 0 0 / 20%), 0 1px 1px -1px oklch(0 0 0 / 15%);
--shadow-sm: 0 1px 3px 0 oklch(0 0 0 / 25%), 0 1px 2px -1px oklch(0 0 0 / 20%);
--shadow-md: 0 4px 6px -1px oklch(0 0 0 / 30%), 0 2px 4px -2px oklch(0 0 0 / 20%);
--shadow-lg: 0 10px 25px -3px oklch(0 0 0 / 40%), 0 4px 6px -4px oklch(0 0 0 / 25%);
--shadow-xl: 0 20px 50px -6px oklch(0 0 0 / 50%), 0 8px 15px -6px oklch(0 0 0 / 30%);
--shadow-card: 0 2px 10px oklch(0 0 0 / 30%), 0 0 0 1px oklch(1 0 0 / 6%);
```

### Skeuomorphic Highlights

```css
--inset-highlight: inset 0 1px 0 0 oklch(1 0 0 / 70%);  /* Light mode */
--inset-highlight: inset 0 1px 0 0 oklch(1 0 0 / 10%);  /* Dark mode */

--inset-shadow: inset 0 -1px 0 0 oklch(0 0 0 / 6%);     /* Light mode */
--inset-shadow: inset 0 -1px 0 0 oklch(0 0 0 / 20%);    /* Dark mode */
```

---

## 🪟 Glass & Surface Utilities

### Liquid Glass (iOS 26 Style)

```css
.liquid-glass {
  background: oklch(from var(--background) l c h / 0.72);
  backdrop-filter: blur(40px) saturate(180%) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(1.05);
  border: 1px solid oklch(1 0 0 / 12%);
  box-shadow:
    0 2px 8px oklch(0 0 0 / 8%),
    0 0 0 1px oklch(1 0 0 / 10%),
    inset 0 1px 0 oklch(1 0 0 / 40%),
    inset 0 -1px 0 oklch(0 0 0 / 5%);
}
```

### Standard Glass

```css
.glass {
  background: oklch(from var(--background) l c h / 0.75);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm), var(--inset-highlight);
}
```

### Card Surface

```css
.card-surface {
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card), var(--inset-highlight), var(--inset-shadow);
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.card-surface:hover {
  box-shadow: var(--shadow-lg), var(--inset-highlight);
  border-color: oklch(0.6 0.22 250 / 35%);
}
```

### Inset Panel (Pressed Feel)

```css
.inset-panel {
  background: var(--background-secondary);
  box-shadow:
    inset 0 2px 4px oklch(0 0 0 / 8%),
    inset 0 1px 2px oklch(0 0 0 / 6%),
    0 1px 0 0 oklch(1 0 0 / 60%);
  border: 1px solid var(--border);
}
```

---

## 🎯 Button System

### Base Button (`.btn-apple`)

```css
.btn-apple {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: 999px;
  transition: all 0.15s cubic-bezier(0.34, 1.2, 0.64, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-apple::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, oklch(1 0 0 / 15%), oklch(0 0 0 / 0%));
  border-radius: inherit;
  pointer-events: none;
}

.btn-apple:hover { transform: scale(1.03) translateY(-1px); }
.btn-apple:active { transform: scale(0.97); }
```

### Variants

| Class | Background | Text | Shadow | Use Case |
|-------|------------|------|--------|----------|
| `.btn-primary` | `--primary` | `--primary-foreground` | Colored glow | Primary CTAs |
| `.btn-secondary` | `--secondary` | `--secondary-foreground` | Subtle | Secondary actions |
| `.btn-ghost` | Transparent | `--foreground` | None | Tertiary actions |

### Primary Button Complete

```css
.btn-primary {
  @apply btn-apple;
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow:
    0 4px 16px oklch(0.6 0.22 250 / 35%),
    var(--inset-highlight);
}

.btn-primary:hover {
  box-shadow:
    0 8px 24px oklch(0.6 0.22 250 / 45%),
    var(--inset-highlight);
}
```

---

## 🌾 Textures & Atmosphere

### Grain/Noise Overlay

```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--grain-opacity);  /* 0.028 light / 0.045 dark */
  background-image: url("data:image/svg+xml,<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/>");
  background-size: 180px 180px;
  mix-blend-mode: overlay;
  border-radius: inherit;
  z-index: 1;
}
```

### Dot Grid

```css
.dot-grid {
  background-image: radial-gradient(circle, var(--border-strong) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Mesh Gradient Background

```css
.page-gradient {
  background:
    radial-gradient(ellipse 60% 50% at 20% 10%, oklch(0.6 0.22 250 / 5%) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.75 0.18 190 / 4%) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 60% 20%, oklch(0.8 0.1 310 / 3%) 0%, transparent 70%),
    var(--background);
}
```

### Floating Orbs

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}

.orb-primary { background: oklch(0.6 0.22 250); }
.orb-accent  { background: oklch(0.75 0.18 190); }
.orb-warm    { background: oklch(0.8 0.1 30); }
```

---

## ⚡ Motion & Animation

### Spring Physics

```css
/* Apple-style spring: cubic-bezier(0.34, 1.56, 0.64, 1) */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.32, 0.94, 0.6, 1);
--ease-snappy: cubic-bezier(0.34, 1.2, 0.64, 1);
```

### Timing Scale

| Duration | Use Case |
|----------|----------|
| 100ms | Press states, micro-interactions |
| 150ms | Hover transitions |
| 200ms | Standard UI transitions |
| 300ms | Modal/panel animations |
| 400ms | Complex choreography, pill morphing |
| 500ms | Page transitions |

### Pill Bounce (iOS 26 Nav)

```css
@keyframes pillBounce {
  0%   { transform: scale(1, 1); }
  30%  { transform: scale(1.12, 0.92); }
  65%  { transform: scale(0.96, 1.04); }
  100% { transform: scale(1, 1); }
}

.animate-pill-bounce {
  animation: pillBounce 0.4s var(--ease-spring);
}
```

### Scroll-Driven Animations (CSS Only)

```css
@supports (animation-timeline: scroll()) {
  .scroll-fade-in {
    animation: scrollFadeIn linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }

  .scroll-slide-up {
    animation: scrollSlideUp linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 25%;
  }

  .scroll-scale-in {
    animation: scrollScaleIn linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 20%;
  }

  /* Stagger children */
  .reveal-stagger > * {
    animation: scrollSlideUp linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
  .reveal-stagger > *:nth-child(1) { animation-delay: 0ms; }
  .reveal-stagger > *:nth-child(2) { animation-delay: 60ms; }
  .reveal-stagger > *:nth-child(3) { animation-delay: 120ms; }
  /* ... up to 6 children */
}
```

### Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🔍 Focus & Accessibility

### Focus Ring (HIG Compliant)

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
  border-radius: 6px;
}
```

### Skip Links

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-3) var(--space-5);
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
  z-index: 9999;
  transition: top 0.2s ease;
}

.skip-link:focus { top: var(--space-4); }
```

### Selection Color

```css
::selection {
  background: oklch(0.6 0.22 250 / 0.25);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind v4 defaults — mobile first */
--breakpoint-sm: 640px;   /* Large phone */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Ultra wide */
```

### Container Max Widths

| Breakpoint | Max Width |
|------------|-----------|
| Mobile | 100% (with 16px padding) |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1280px |

---

## 🧩 Component Patterns

### Navigation Pill (Desktop)

- Centered, fixed, `top-5`
- Fluid liquid morphing indicator (iOS 26 style)
- Icons + labels, spring animation on change
- Scales down on scroll (`scale-[0.98]`)

### Bottom Tab Bar (Mobile)

- Fixed bottom, safe-area aware
- 5 tabs + search
- Liquid glass background with morphing pill
- Active state: filled icon + primary color

### Search Overlay

- `⌘K` / `Ctrl+K` keyboard shortcut
- Backdrop blur + semi-transparent overlay
- Quick links when empty
- Real-time results filtering
- Keyboard navigation (↑↓, ↵, Esc)

### Card Pattern

```tsx
<article className="card-surface grain relative rounded-[24px] p-6 overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg">
  {/* Content */}
</article>
```

### Section Header Pattern

```tsx
<div className="mb-8">
  <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.14em] mb-2">
    Category Label
  </p>
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground lowercase">
    Section Title.
  </h2>
  <p className="text-muted-foreground mt-4 max-w-2xl font-light leading-relaxed lowercase">
    Optional description.
  </p>
</div>
```

---

## 🌙 Dark Mode Strategy

### Implementation

```css
/* Inline script in <head> — runs before first paint */
(function() {
  var t = localStorage.getItem('theme');
  var d = document.documentElement;
  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = t === 'dark' || (t !== 'light' && pref);
  if (isDark) {
    d.classList.add('dark');
    d.setAttribute('data-theme', 'dark');
  } else {
    d.classList.remove('dark');
    d.setAttribute('data-theme', 'light');
  }
})();
```

### CSS Variables

All semantic tokens redefined in `.dark` selector — **never hardcode colors**.

### Dark Mode Principles

1. **Invert lightness, preserve chroma** — OKLCH makes this trivial
2. **Deepen shadows** — More pronounced elevation in dark
3. **Reduce highlight opacity** — Subtle inset highlights only
4. **Increase grain opacity** — Adds texture (0.028 → 0.045)
5. **Test contrast independently** — Don't assume light mode values work

---

## 📦 Usage in Components

### Import Tokens

```tsx
// Use CSS variables directly in style props
<div style={{ background: 'var(--card)', borderColor: 'var(--border)' }} />

// Or use Tailwind classes (mapped in @theme inline)
<div className="bg-card border-border" />
```

### Responsive Spacing

```tsx
<div className="px-5 md:px-6 lg:px-8 py-10 md:py-14 lg:py-20" />
```

### Conditional Dark Styles

```tsx
<div className="bg-background dark:bg-background-secondary" />
```

---

## ✅ Pre-Flight Checklist

Before shipping any UI:

- [ ] **Contrast** — All text ≥4.5:1 in both themes
- [ ] **Focus** — Visible focus rings on all interactive elements
- [ ] **Motion** — `prefers-reduced-motion` respected
- [ ] **Touch** — Targets ≥44×44px (mobile)
- [ ] **Scroll** — Content not hidden behind fixed bars
- [ ] **Dark mode** — Tested independently, not inferred
- [ ] **Performance** — No layout shift, smooth 60fps
- [ ] **Semantics** — Proper heading hierarchy, landmarks
- [ ] **Grain** — Applied consistently to surfaces
- [ ] **Radius** — Consistent scale, no arbitrary values

---

## 🔗 Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [OKLCH Color Space](https://oklch.com/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
- [WCAG 2.2 Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

---

*Last updated: November 2026 — Version 2.0*