# Website Showcase Section — Design Spec

**Date:** 2026-05-09
**Status:** Approved

---

## Overview

New section added between the Services and WhyUs sections. Headline: **"We Build Websites The Way You Like"**. Demonstrates web development capability through an auto-cycling interactive mockup — left side shows a stack of template cards, right side shows a browser window with looping editing animations (typing, drag, code).

---

## Layout

Split panel, full-width section with `py-24` padding consistent with other sections.

```
┌──────────────────────────────────────────────────┐
│  We Build Websites The Way You Like              │
│  [subheading]                                    │
│                                                  │
│  ┌──────────────┐  ┌────────────────────────┐   │
│  │ Template     │  │ ┌──────────────────┐   │   │
│  │ Card Stack   │  │ │  Browser Chrome  │   │   │
│  │              │  │ │  [mockup + anim] │   │   │
│  │ [E-commerce] │  │ └──────────────────┘   │   │
│  │ [SaaS]       │  └────────────────────────┘   │
│  │ [Portfolio]  │                                │
│  │ [Restaurant] │                                │
│  └──────────────┘                                │
└──────────────────────────────────────────────────┘
```

Left column (`w-5/12`): stacked template cards.
Right column (`w-7/12`): browser chrome mockup.

---

## Template Cards (Left)

4 cards rendered in a stack. Inactive cards are offset downward and scaled slightly smaller to create a depth/fan effect. Active card springs forward.

| # | Template | Accent color |
|---|----------|-------------|
| 1 | E-commerce | blue |
| 2 | SaaS Dashboard | purple |
| 3 | Portfolio / Agency | emerald |
| 4 | Restaurant | orange |

Each card shows:
- Template name + type label
- Small thumbnail (3–4 CSS-drawn UI blocks representing that template's layout)
- Color-coded left border accent

**Framer Motion:** `layoutId` on the active card indicator. Scale `0.92 → 1.0`, `y: 12 → 0`, shadow increase on selection. Spring config: `stiffness: 300, damping: 25`.

---

## Browser Mockup (Right)

CSS browser chrome: three colored dots (red/yellow/green), a fake URL bar, then the content area below. Fixed height ~380px.

Content area shows the active template's mockup — pure CSS/Tailwind blocks, no real pages.

**`AnimatePresence` mode="wait"**: on template switch, old mockup slides out (`x: -30, opacity: 0`), new mockup slides in (`x: 30 → 0, opacity: 0 → 1`), duration 0.35s.

---

## Animation Sequence (per cycle, ~5.5s total)

Each template plays this sequence automatically via `useEffect` + `setInterval`.

| Step | Duration | What happens |
|------|----------|-------------|
| 1. Card select | 0–0.4s | Active card springs forward, browser swaps template |
| 2. Text edit | 0.5–2.0s | Cursor blinks on headline, text types character-by-character |
| 3. Element drag | 2.0–3.5s | A UI block animates from position A → B with spring, then settles |
| 4. Code flash | 3.5–5.0s | Code panel slides in from right, 3 lines appear sequentially |
| 5. Pause | 5.0–5.5s | All settled, brief hold before next cycle |

Cycle auto-advances at 5500ms interval. Interval resets if user clicks a card manually.

---

## Typing Animation

Implemented with a `useEffect` that appends characters from a target string to a `displayText` state at 45ms per character. A blinking cursor `|` is appended while typing is in progress.

Each template defines a `headlineEdit` string — the text that gets "typed" to replace the placeholder headline in the mockup.

---

## Drag Animation

A `motion.div` block inside the mockup animates between two `x/y` positions using `animate` prop. Uses `transition: { type: "spring", stiffness: 200, damping: 20 }`. The block has a dashed border during drag to suggest selection/active state.

---

## Code Panel

A `motion.div` that slides in from the right edge of the browser mockup (`x: 80 → 0`). Contains 3 `motion.p` lines that fade in with 0.2s stagger. Lines are short, realistic-looking code snippets matching the template type (e.g. JSX for e-commerce, CSS for portfolio). Fixed-width font, dark background panel regardless of site theme.

---

## Template Mockup Layouts (CSS only)

Each template is a unique arrangement of colored `div` blocks:

- **E-commerce:** nav bar, hero banner, 3 product cards in a row
- **SaaS Dashboard:** sidebar, top bar, 2 stat cards + chart placeholder
- **Portfolio/Agency:** large hero text block, 2 project tiles
- **Restaurant:** hero image placeholder, menu section with 4 items

All blocks use `rounded`, `bg-*` Tailwind classes. No real images — `bg-gradient-to-br` blocks stand in for images.

---

## Component Structure

```
components/sections/WebsiteShowcase.tsx   — main section, owns cycle state
components/ui/TemplatCard.tsx             — individual template card
components/ui/BrowserMockup.tsx           — chrome + AnimatePresence wrapper
components/ui/TemplatePreview.tsx         — renders the correct mockup layout
components/ui/CodePanel.tsx               — animated code lines panel
```

`WebsiteShowcase` is a client component (`"use client"`). All children are pure presentational.

---

## Framer Motion — Site-wide Subtle Animations

In addition to the showcase section, all existing sections get scroll-triggered fade-up:

- Shared `<FadeIn>` wrapper component: `motion.div` with `whileInView`, `viewport: { once: true }`, `initial: { opacity: 0, y: 20 }`, `animate: { opacity: 1, y: 0 }`, `transition: { duration: 0.5, ease: "easeOut" }`. Accepts optional `delay` prop.
- Navbar: `motion.header` slides down on mount (`y: -60 → 0`, `opacity: 0 → 1`).
- Hero: badge → h1 → subheading → CTAs → stats each wrapped in `<FadeIn>` with 0.1s incremental delays.
- Services: section heading in `<FadeIn>`, each card in `<FadeIn delay={index * 0.08}>`.
- WhyUs: heading + each pillar in `<FadeIn>` with stagger.
- Footer: `<FadeIn>` on the whole footer content.

---

## Integration

Section order in `app/page.tsx`:
1. Hero
2. Services
3. **WebsiteShowcase** ← new
4. WhyUs
5. Footer

Add `id="showcase"` to the section. Add "Our Work" nav link in Navbar pointing to `#showcase`.

---

## Dependencies

- `framer-motion` — install via npm

No other new dependencies.
