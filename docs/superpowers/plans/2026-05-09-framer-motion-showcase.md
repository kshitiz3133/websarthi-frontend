# Framer Motion + Website Showcase Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add site-wide subtle scroll-triggered animations via a reusable `FadeIn` component, plus a bold interactive "We Build Websites The Way You Like" showcase section with auto-cycling template demos.

**Architecture:** `FadeIn` wraps existing section content using `whileInView`. `WebsiteShowcase` owns all cycle state (active template index, typed text, drag position, code panel visibility) and orchestrates the sequence with `useEffect` + `setTimeout`. Sub-components (TemplateCard, BrowserMockup, TemplatePreview, CodePanel) are purely presentational — they receive state as props.

**Tech Stack:** framer-motion, Next.js 16 App Router, Tailwind v4, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `components/ui/FadeIn.tsx` | Scroll-triggered fade-up wrapper |
| Create | `lib/showcase-templates.ts` | Template data + TypeScript interface |
| Create | `components/ui/TemplateCard.tsx` | Single stacked template card with spring animation |
| Create | `components/ui/BrowserMockup.tsx` | Browser chrome wrapper (dots + URL bar) |
| Create | `components/ui/TemplatePreview.tsx` | 4 pure-CSS template layouts, receives `typedText`/`dragPos` |
| Create | `components/ui/CodePanel.tsx` | Slide-in code lines panel |
| Create | `components/sections/WebsiteShowcase.tsx` | Main section — owns all cycle state |
| Modify | `components/sections/Navbar.tsx` | motion.header mount animation + "Our Work" link |
| Modify | `components/sections/Hero.tsx` | FadeIn wrappers on badge, h1, sub, CTAs, stats |
| Modify | `components/sections/Services.tsx` | FadeIn on heading + cards |
| Modify | `components/sections/WhyUs.tsx` | FadeIn on heading + pillars |
| Modify | `components/sections/Footer.tsx` | FadeIn on footer content block |
| Modify | `app/page.tsx` | Add WebsiteShowcase between Services and WhyUs |

---

## Task 1: Install framer-motion

**Files:**
- Modify: `package.json`

- [ ] **Install the package**

```bash
cd "/Users/kshitiz.agarwal/Personal Repos/websarthi-frontend"
npm install framer-motion
```

Expected: `added X packages` with no errors.

- [ ] **Verify**

```bash
grep '"framer-motion"' package.json
```

Expected: line like `"framer-motion": "^11.x.x"`

- [ ] **Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion"
```

---

## Task 2: Create FadeIn component

**Files:**
- Create: `components/ui/FadeIn.tsx`

- [ ] **Create the file**

```tsx
// components/ui/FadeIn.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Commit**

```bash
git add components/ui/FadeIn.tsx
git commit -m "feat: add FadeIn scroll-triggered animation wrapper"
```

---

## Task 3: Apply subtle animations to Navbar

**Files:**
- Modify: `components/sections/Navbar.tsx`

- [ ] **Replace `<header>` with `motion.header` mount animation**

Add import at top:
```tsx
import { motion } from "framer-motion";
```

Replace the `<header ...>` opening tag with:
```tsx
<motion.header
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-background/90 backdrop-blur-md border-b border-border py-3"
      : "py-5"
  }`}
>
```

Replace closing `</header>` with `</motion.header>`.

Add "Our Work" nav link inside the `<nav>`:
```tsx
<a href="#showcase" className="hover:text-foreground transition-colors">
  Our Work
</a>
```

- [ ] **Start dev server and confirm Navbar slides down on page load**

```bash
npm run dev
```

Open `http://localhost:3000`. Navbar should animate in from the top on first load.

- [ ] **Commit**

```bash
git add components/sections/Navbar.tsx
git commit -m "feat: animate navbar mount + add Our Work nav link"
```

---

## Task 4: Apply FadeIn to Hero, Services, WhyUs, Footer

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/WhyUs.tsx`
- Modify: `components/sections/Footer.tsx`

- [ ] **Update Hero.tsx — wrap elements with FadeIn**

Add import:
```tsx
import FadeIn from "@/components/ui/FadeIn";
```

Wrap each major element in its own `FadeIn` with staggered delays:

```tsx
// Badge
<FadeIn delay={0}>
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-sm font-medium mb-8">
    <Zap size={14} />
    End-to-end Tech Consultancy
  </div>
</FadeIn>

// h1
<FadeIn delay={0.1}>
  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
    Scale Smarter with{" "}
    <span className="gold-text">Websarthi</span>
  </h1>
</FadeIn>

// Sub-headline
<FadeIn delay={0.2}>
  <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
    From first lead to final delivery — we automate, qualify, and
    accelerate every step of your business operations.
  </p>
</FadeIn>

// CTAs
<FadeIn delay={0.3}>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    {/* ... existing CTA links unchanged ... */}
  </div>
</FadeIn>

// Stats
<FadeIn delay={0.4}>
  <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
    {/* ... existing stats unchanged ... */}
  </div>
</FadeIn>
```

- [ ] **Update Services.tsx — wrap heading + cards**

Add import:
```tsx
import FadeIn from "@/components/ui/FadeIn";
```

Wrap the heading block:
```tsx
<FadeIn>
  <div className="text-center mb-16">
    {/* ... existing heading content unchanged ... */}
  </div>
</FadeIn>
```

Wrap the first grid (3 cards):
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.slice(0, 3).map((s, i) => (
    <FadeIn key={s.title} delay={i * 0.08}>
      <ServiceCard {...s} />
    </FadeIn>
  ))}
</div>
```

Wrap the second grid (2 cards):
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-2xl lg:mx-auto">
  {services.slice(3).map((s, i) => (
    <FadeIn key={s.title} delay={i * 0.08}>
      <ServiceCard {...s} />
    </FadeIn>
  ))}
</div>
```

- [ ] **Update WhyUs.tsx — wrap heading + pillars**

Add import:
```tsx
import FadeIn from "@/components/ui/FadeIn";
```

Wrap the heading block:
```tsx
<FadeIn>
  <div className="text-center mb-16">
    {/* ... existing heading content unchanged ... */}
  </div>
</FadeIn>
```

Wrap each pillar:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {pillars.map((p, i) => (
    <FadeIn key={p.title} delay={i * 0.1}>
      <div className="flex flex-col items-start gap-4">
        {/* ... existing pillar content unchanged ... */}
      </div>
    </FadeIn>
  ))}
</div>
```

- [ ] **Update Footer.tsx — wrap content**

Add import:
```tsx
import FadeIn from "@/components/ui/FadeIn";
```

Wrap the inner content div:
```tsx
<FadeIn>
  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
    {/* ... existing footer content unchanged ... */}
  </div>
</FadeIn>
```

- [ ] **Verify scroll animations in browser**

Scroll down the page — each section's content should fade up when it enters the viewport. Reload to confirm Hero animations play on mount.

- [ ] **Commit**

```bash
git add components/sections/Hero.tsx components/sections/Services.tsx components/sections/WhyUs.tsx components/sections/Footer.tsx
git commit -m "feat: add scroll-triggered fade-in animations to all sections"
```

---

## Task 5: Create template data

**Files:**
- Create: `lib/showcase-templates.ts`

- [ ] **Create the file**

```ts
// lib/showcase-templates.ts

export interface Template {
  id: string;
  name: string;
  type: string;
  accent: "blue" | "purple" | "emerald" | "orange";
  headlineEdit: string;
  codeLines: string[];
  dragTo: { x: number; y: number };
}

export const templates: Template[] = [
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    type: "Next.js / Shopify",
    accent: "blue",
    headlineEdit: "Shop Premium Gear",
    codeLines: [
      "<Product price={item.price} />",
      "cart.add(item.id, qty)",
      "stripe.checkout(cart)",
    ],
    dragTo: { x: 90, y: 0 },
  },
  {
    id: "saas",
    name: "SaaS Dashboard",
    type: "React / Tailwind",
    accent: "purple",
    headlineEdit: "Track Every Metric",
    codeLines: [
      "const { data } = useQuery(METRICS)",
      "<Chart data={data.weekly} />",
      'setFilter("last_30_days")',
    ],
    dragTo: { x: 0, y: 60 },
  },
  {
    id: "portfolio",
    name: "Portfolio / Agency",
    type: "Next.js / GSAP",
    accent: "emerald",
    headlineEdit: "We Craft Experiences",
    codeLines: [
      'gsap.from(".hero", { y: 60 })',
      "<ProjectCard key={p.slug} />",
      "router.push(`/work/${slug}`)",
    ],
    dragTo: { x: -70, y: 0 },
  },
  {
    id: "restaurant",
    name: "Restaurant",
    type: "Next.js / Prismic",
    accent: "orange",
    headlineEdit: "Reserve Your Table",
    codeLines: [
      "const menu = await prismic.get()",
      "<MenuItem dish={item} />",
      "booking.create({ date, guests })",
    ],
    dragTo: { x: 60, y: 40 },
  },
];
```

- [ ] **Commit**

```bash
git add lib/showcase-templates.ts
git commit -m "feat: add showcase template data"
```

---

## Task 6: Create TemplateCard component

**Files:**
- Create: `components/ui/TemplateCard.tsx`

- [ ] **Create the file**

```tsx
// components/ui/TemplateCard.tsx
"use client";

import { motion } from "framer-motion";
import { Template } from "@/lib/showcase-templates";

interface TemplateCardProps {
  template: Template;
  index: number;
  activeIndex: number;
  total: number;
  onClick: () => void;
}

const accentBorder: Record<Template["accent"], string> = {
  blue: "border-blue-500",
  purple: "border-purple-500",
  emerald: "border-emerald-500",
  orange: "border-orange-500",
};

const accentBg: Record<Template["accent"], string> = {
  blue: "bg-blue-500/10",
  purple: "bg-purple-500/10",
  emerald: "bg-emerald-500/10",
  orange: "bg-orange-500/10",
};

const accentText: Record<Template["accent"], string> = {
  blue: "text-blue-500",
  purple: "text-purple-500",
  emerald: "text-emerald-500",
  orange: "text-orange-500",
};

const accentDot: Record<Template["accent"], string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
};

export default function TemplateCard({
  template,
  index,
  activeIndex,
  total,
  onClick,
}: TemplateCardProps) {
  const isActive = index === activeIndex;
  // distance from active (wraps around)
  const distance = (index - activeIndex + total) % total;

  return (
    <motion.div
      className={`absolute inset-x-0 cursor-pointer rounded-xl border-2 p-4 ${
        isActive
          ? `${accentBorder[template.accent]} ${accentBg[template.accent]} shadow-xl`
          : "border-border bg-card"
      }`}
      animate={{
        y: isActive ? 0 : distance * 14,
        scale: isActive ? 1 : Math.max(0.88, 1 - distance * 0.04),
        zIndex: isActive ? 10 : total - distance,
        opacity: isActive ? 1 : Math.max(0.25, 1 - distance * 0.25),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-foreground text-sm">{template.name}</p>
          <p className={`text-xs mt-0.5 ${accentText[template.accent]}`}>
            {template.type}
          </p>
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-2.5 h-2.5 rounded-full mt-1 ${accentDot[template.accent]}`}
          />
        )}
      </div>
      {/* Mini thumbnail */}
      <div className="mt-3 h-14 rounded-lg bg-muted overflow-hidden flex flex-col gap-1 p-1.5">
        <div className="h-2.5 bg-border rounded w-full" />
        <div className="flex gap-1 flex-1">
          <div className="w-1/4 bg-border/60 rounded" />
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex-1 bg-border/40 rounded" />
            <div className="flex-1 bg-border/30 rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Commit**

```bash
git add components/ui/TemplateCard.tsx
git commit -m "feat: TemplateCard with spring stack animation"
```

---

## Task 7: Create BrowserMockup component

**Files:**
- Create: `components/ui/BrowserMockup.tsx`

- [ ] **Create the file**

```tsx
// components/ui/BrowserMockup.tsx
import { ReactNode } from "react";

export default function BrowserMockup({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-2xl bg-card">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded bg-background border border-border flex items-center px-2">
          <span className="text-[10px] text-muted-foreground truncate">
            https://your-site.websarthi.com
          </span>
        </div>
      </div>
      {/* Content area */}
      <div className="h-80 overflow-hidden relative bg-background p-3">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add components/ui/BrowserMockup.tsx
git commit -m "feat: BrowserMockup chrome wrapper component"
```

---

## Task 8: Create CodePanel component

**Files:**
- Create: `components/ui/CodePanel.tsx`

- [ ] **Create the file**

```tsx
// components/ui/CodePanel.tsx
"use client";

import { motion } from "framer-motion";

interface CodePanelProps {
  lines: string[];
}

export default function CodePanel({ lines }: CodePanelProps) {
  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="absolute bottom-0 right-0 w-56 rounded-tl-xl bg-navy-900 dark:bg-black/80 border border-white/10 p-3 shadow-xl"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-slate-400 font-mono">editor</span>
      </div>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, duration: 0.3 }}
          className="text-[10px] font-mono text-green-400 leading-5 truncate"
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
```

- [ ] **Commit**

```bash
git add components/ui/CodePanel.tsx
git commit -m "feat: CodePanel with staggered line animation"
```

---

## Task 9: Create TemplatePreview component

**Files:**
- Create: `components/ui/TemplatePreview.tsx`

- [ ] **Create the file**

```tsx
// components/ui/TemplatePreview.tsx
"use client";

import { motion } from "framer-motion";
import { Template } from "@/lib/showcase-templates";

interface TemplatePreviewProps {
  template: Template;
  typedText: string;
  isTyping: boolean;
  dragPos: { x: number; y: number };
}

const accentClasses: Record<Template["accent"], { bg: string; block: string; text: string }> = {
  blue:    { bg: "bg-blue-500/10",    block: "bg-blue-400/40",    text: "text-blue-600 dark:text-blue-300" },
  purple:  { bg: "bg-purple-500/10",  block: "bg-purple-400/40",  text: "text-purple-600 dark:text-purple-300" },
  emerald: { bg: "bg-emerald-500/10", block: "bg-emerald-400/40", text: "text-emerald-600 dark:text-emerald-300" },
  orange:  { bg: "bg-orange-500/10",  block: "bg-orange-400/40",  text: "text-orange-600 dark:text-orange-300" },
};

function Cursor({ isTyping }: { isTyping: boolean }) {
  if (!isTyping) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
      className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle"
    />
  );
}

function EcommercePreview({ typedText, isTyping, dragPos, ac }: {
  typedText: string; isTyping: boolean; dragPos: { x: number; y: number };
  ac: typeof accentClasses["blue"];
}) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Nav */}
      <div className={`h-6 ${ac.bg} rounded flex items-center px-2 gap-2`}>
        <div className="w-10 h-1.5 bg-current opacity-30 rounded-full" />
        <div className="ml-auto flex gap-1.5">
          <div className="w-6 h-1.5 bg-current opacity-20 rounded-full" />
          <div className="w-6 h-1.5 bg-current opacity-20 rounded-full" />
          <div className="w-8 h-1.5 bg-current opacity-40 rounded-full" />
        </div>
      </div>
      {/* Hero */}
      <div className={`h-16 ${ac.bg} rounded flex items-center px-3`}>
        <div>
          <p className={`text-xs font-bold ${ac.text}`}>
            {typedText || "Welcome"}<Cursor isTyping={isTyping} />
          </p>
          <div className="w-16 h-1 bg-current opacity-20 rounded mt-1" />
        </div>
      </div>
      {/* Products */}
      <div className="flex gap-2 flex-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`flex-1 bg-card rounded border border-border p-1.5 flex flex-col gap-1 ${
              i === 1 ? "ring-1 ring-offset-1 ring-blue-400/50" : ""
            }`}
            animate={i === 1 ? { x: dragPos.x, y: dragPos.y } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className={`h-10 ${ac.bg} rounded`} />
            <div className="w-full h-1 bg-border rounded" />
            <div className="w-2/3 h-1 bg-border rounded" />
            <div className={`w-1/2 h-2 ${ac.block} rounded mt-auto`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SaasPreview({ typedText, isTyping, dragPos, ac }: {
  typedText: string; isTyping: boolean; dragPos: { x: number; y: number };
  ac: typeof accentClasses["blue"];
}) {
  return (
    <div className="flex gap-2 h-full">
      {/* Sidebar */}
      <div className={`w-12 ${ac.bg} rounded flex flex-col gap-1.5 p-1.5`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-2 rounded ${i === 0 ? ac.block : "bg-border"}`} />
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Top bar */}
        <div className="h-6 bg-muted rounded flex items-center px-2">
          <p className={`text-[9px] font-semibold ${ac.text}`}>
            {typedText || "Dashboard"}<Cursor isTyping={isTyping} />
          </p>
        </div>
        {/* Stat cards */}
        <div className="flex gap-2">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="flex-1 bg-card border border-border rounded p-1.5"
              animate={i === 0 ? { x: dragPos.x, y: dragPos.y } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="w-8 h-1 bg-border rounded mb-1" />
              <div className={`w-12 h-3 ${ac.block} rounded`} />
            </motion.div>
          ))}
        </div>
        {/* Chart */}
        <div className={`flex-1 ${ac.bg} rounded p-1.5 flex items-end gap-1`}>
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className={`flex-1 ${ac.block} rounded-t`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioPreview({ typedText, isTyping, dragPos, ac }: {
  typedText: string; isTyping: boolean; dragPos: { x: number; y: number };
  ac: typeof accentClasses["blue"];
}) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Nav */}
      <div className="h-6 bg-muted rounded flex items-center justify-between px-2">
        <div className="w-8 h-1.5 bg-border rounded-full" />
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <div key={i} className="w-6 h-1 bg-border rounded-full" />)}
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center px-2 gap-1.5">
        <p className={`text-sm font-black ${ac.text} leading-tight`}>
          {typedText || "Creative Studio"}<Cursor isTyping={isTyping} />
        </p>
        <div className="w-24 h-1 bg-border rounded" />
        <div className={`w-10 h-3 ${ac.block} rounded mt-1`} />
      </div>
      {/* Project tiles */}
      <div className="flex gap-2 h-20">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className={`flex-1 ${ac.bg} rounded border border-border flex items-end p-1.5`}
            animate={i === 0 ? { x: dragPos.x, y: dragPos.y } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="w-12 h-1.5 bg-current opacity-40 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RestaurantPreview({ typedText, isTyping, dragPos, ac }: {
  typedText: string; isTyping: boolean; dragPos: { x: number; y: number };
  ac: typeof accentClasses["blue"];
}) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Hero image */}
      <div className={`h-20 ${ac.bg} rounded flex items-end p-2`}>
        <p className={`text-xs font-bold ${ac.text}`}>
          {typedText || "Fine Dining"}<Cursor isTyping={isTyping} />
        </p>
      </div>
      {/* Menu items */}
      <div className="flex flex-col gap-1.5 flex-1">
        {[0,1,2,3].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 bg-card border border-border rounded px-2 py-1"
            animate={i === 1 ? { x: dragPos.x, y: dragPos.y } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className={`w-6 h-6 ${ac.bg} rounded`} />
            <div className="flex-1 space-y-0.5">
              <div className="w-16 h-1.5 bg-border rounded" />
              <div className="w-10 h-1 bg-border/60 rounded" />
            </div>
            <div className={`w-8 h-1.5 ${ac.block} rounded`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TemplatePreview({ template, typedText, isTyping, dragPos }: TemplatePreviewProps) {
  const ac = accentClasses[template.accent];
  const props = { typedText, isTyping, dragPos, ac };

  switch (template.id) {
    case "ecommerce":  return <EcommercePreview {...props} />;
    case "saas":       return <SaasPreview {...props} />;
    case "portfolio":  return <PortfolioPreview {...props} />;
    case "restaurant": return <RestaurantPreview {...props} />;
    default:           return null;
  }
}
```

- [ ] **Commit**

```bash
git add components/ui/TemplatePreview.tsx
git commit -m "feat: 4 pure-CSS template preview layouts with typing + drag"
```

---

## Task 10: Create WebsiteShowcase section

**Files:**
- Create: `components/sections/WebsiteShowcase.tsx`

- [ ] **Create the file**

```tsx
// components/sections/WebsiteShowcase.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import TemplateCard from "@/components/ui/TemplateCard";
import BrowserMockup from "@/components/ui/BrowserMockup";
import TemplatePreview from "@/components/ui/TemplatePreview";
import CodePanel from "@/components/ui/CodePanel";
import { templates } from "@/lib/showcase-templates";

const CYCLE_MS = 5500;
const TYPING_SPEED_MS = 50;

export default function WebsiteShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const runSequence = useCallback((index: number) => {
    // Reset state
    setTypedText("");
    setIsTyping(false);
    setDragPos({ x: 0, y: 0 });
    setShowCode(false);

    const template = templates[index];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: start typing at 500ms
    timeouts.push(
      setTimeout(() => {
        setIsTyping(true);
        let i = 0;
        const typeInterval = setInterval(() => {
          i++;
          setTypedText(template.headlineEdit.slice(0, i));
          if (i >= template.headlineEdit.length) {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, TYPING_SPEED_MS);
        timeouts.push(typeInterval as unknown as ReturnType<typeof setTimeout>);
      }, 500)
    );

    // Phase 2: drag at 2100ms
    timeouts.push(
      setTimeout(() => {
        setDragPos(template.dragTo);
      }, 2100)
    );

    // Phase 3: show code at 3500ms
    timeouts.push(
      setTimeout(() => {
        setShowCode(true);
      }, 3500)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = runSequence(index);

      // Reset cycle timer
      if (cycleRef.current) clearInterval(cycleRef.current);
      cycleRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % templates.length;
          if (cleanupRef.current) cleanupRef.current();
          cleanupRef.current = runSequence(next);
          return next;
        });
      }, CYCLE_MS);
    },
    [runSequence]
  );

  // Start the auto-cycle on mount
  useEffect(() => {
    cleanupRef.current = runSequence(0);
    cycleRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % templates.length;
        if (cleanupRef.current) cleanupRef.current();
        cleanupRef.current = runSequence(next);
        return next;
      });
    }, CYCLE_MS);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [runSequence]);

  return (
    <section id="showcase" className="py-24 bg-background">
      <div className="container max-w-6xl px-4 mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-gold-500 dark:text-gold-400 font-medium text-sm tracking-widest uppercase mb-3">
            Web Development
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            We Build Websites The Way You Like
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Pick a style. Watch us shape it in real time.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Card stack */}
            <div className="w-full lg:w-5/12 relative h-52">
              {templates.map((template, i) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={i}
                  activeIndex={activeIndex}
                  total={templates.length}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            {/* Browser mockup */}
            <div className="w-full lg:w-7/12">
              <BrowserMockup>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="h-full relative"
                  >
                    <TemplatePreview
                      template={templates[activeIndex]}
                      typedText={typedText}
                      isTyping={isTyping}
                      dragPos={dragPos}
                    />
                    <AnimatePresence>
                      {showCode && (
                        <CodePanel lines={templates[activeIndex].codeLines} />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </BrowserMockup>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/sections/WebsiteShowcase.tsx
git commit -m "feat: WebsiteShowcase section with auto-cycling template demo"
```

---

## Task 11: Wire up in page.tsx and verify

**Files:**
- Modify: `app/page.tsx`

- [ ] **Update page.tsx**

```tsx
// app/page.tsx
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WebsiteShowcase from "@/components/sections/WebsiteShowcase";
import WhyUs from "@/components/sections/WhyUs";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <WebsiteShowcase />
      <WhyUs />
      <Footer />
    </main>
  );
}
```

- [ ] **Start dev server and verify full page**

```bash
npm run dev
```

Check the following at `http://localhost:3000`:
1. Navbar slides down on load ✓
2. Hero badge → h1 → sub → CTAs → stats each fade up with stagger ✓
3. Services cards fade in on scroll ✓
4. Showcase section appears between Services and WhyUs ✓
5. Template cards stack correctly, active card springs forward ✓
6. Browser mockup shows correct layout per template ✓
7. Typing animation plays in mockup headline ✓
8. One element drags to new position ✓
9. Code panel slides in from right ✓
10. Cycle auto-advances every 5.5s ✓
11. Clicking a card manually jumps to that template ✓
12. WhyUs pillars and Footer fade in on scroll ✓
13. Both light and dark mode look correct ✓

- [ ] **Build to catch type errors**

```bash
npm run build
```

Expected: build completes with no TypeScript errors.

- [ ] **Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up WebsiteShowcase in page, complete framer-motion integration"
```

---

## Self-Review

**Spec coverage:**
- ✓ Site-wide subtle FadeIn (Tasks 2, 4)
- ✓ Navbar mount animation (Task 3)
- ✓ Hero staggered delays (Task 4)
- ✓ Services + WhyUs + Footer stagger (Task 4)
- ✓ Template card stack with spring (Task 6)
- ✓ Browser chrome mockup (Task 7)
- ✓ 4 template CSS layouts (Task 9)
- ✓ Typing animation (Task 10 — WebsiteShowcase state)
- ✓ Drag animation (Task 10 + Task 9)
- ✓ Code panel staggered lines (Task 8)
- ✓ Auto 5.5s cycle (Task 10)
- ✓ Manual card click resets cycle (Task 10)
- ✓ Section added between Services and WhyUs (Task 11)
- ✓ "Our Work" nav link (Task 3)

**Placeholder scan:** No TBDs. All code complete.

**Type consistency:** `Template` interface defined in `lib/showcase-templates.ts` and imported by `TemplateCard`, `TemplatePreview`, `WebsiteShowcase`. `dragPos: { x: number; y: number }` used consistently across `WebsiteShowcase` → `TemplatePreview`. `isTyping: boolean`, `typedText: string` consistent. ✓
