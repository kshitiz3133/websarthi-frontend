# Websarthi Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 App Router project and build a professional dark-themed landing page for Websarthi tech consultancy with a CTA that redirects to the Lead CMS portal.

**Architecture:** Single-page Next.js 14 app using App Router. All UI in `app/page.tsx` composed from small section components under `components/sections/`. Tailwind CSS + shadcn/ui for styling. Portal URL injected via `NEXT_PUBLIC_CMS_PORTAL_URL` env var.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, lucide-react

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies |
| `tailwind.config.ts` | Tailwind theme (navy/slate/gold palette) |
| `.env.local` | `NEXT_PUBLIC_CMS_PORTAL_URL` placeholder |
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/page.tsx` | Assembles all sections |
| `app/globals.css` | Tailwind directives + custom CSS vars |
| `components/sections/Hero.tsx` | Hero with tagline + CTA button |
| `components/sections/Services.tsx` | 5 service cards grid |
| `components/sections/WhyUs.tsx` | 3 value proposition cards |
| `components/sections/Footer.tsx` | Company name, tagline, links |
| `components/ui/ServiceCard.tsx` | Reusable card for service items |

---

### Task 1: Scaffold Next.js 14 project

**Files:**
- Create: project root (scaffolded by CLI)

- [ ] **Step 1: Create Next.js app**

Run from `/Users/kshitiz.agarwal/Personal Repos/`:
```bash
npx create-next-app@latest websarthi-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-git
```
When prompted, accept all defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
cd "websarthi-frontend"
npm install lucide-react clsx tailwind-merge
npx shadcn@latest init --defaults
```
When `shadcn init` prompts for style: select **Default**. Base color: **Slate**. CSS variables: **Yes**.

- [ ] **Step 3: Create `.env.local`**

```bash
echo 'NEXT_PUBLIC_CMS_PORTAL_URL=http://localhost:3001' > .env.local
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```
Expected: `Ready - started server on 0.0.0.0:3000`

- [ ] **Step 5: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind + shadcn"
```

---

### Task 2: Configure Tailwind theme (navy/slate/gold palette)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update `tailwind.config.ts`**

Replace contents with:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        navy: {
          900: "#0a0f1e",
          800: "#0d1526",
          700: "#111c33",
          600: "#162240",
        },
        gold: {
          400: "#f0c060",
          500: "#e6a817",
          600: "#c8920e",
        },
        slate: {
          850: "#1a2236",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(230,168,23,0.15) 0%, transparent 60%), linear-gradient(180deg, #0a0f1e 0%, #0d1526 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 2: Update `app/globals.css`**

Replace contents with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 7%;
    --foreground: 213 31% 91%;
    --card: 222 47% 10%;
    --card-foreground: 213 31% 91%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --primary: 43 78% 52%;
    --primary-foreground: 222 47% 7%;
    --secondary: 222 47% 13%;
    --secondary-foreground: 213 31% 91%;
    --muted: 223 47% 13%;
    --muted-foreground: 215 20% 55%;
    --accent: 43 78% 52%;
    --accent-foreground: 222 47% 7%;
    --ring: 43 78% 52%;
    --radius: 0.75rem;
  }

  * { @apply border-border; }

  body {
    @apply bg-navy-900 text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html { scroll-behavior: smooth; }
}

@layer utilities {
  .gold-text {
    @apply bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent;
  }
  .glass-card {
    @apply bg-navy-800/60 backdrop-blur-sm border border-white/5 rounded-xl;
  }
}
```

- [ ] **Step 3: Install tailwindcss-animate if missing**

```bash
npm install tailwindcss-animate
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: configure navy/gold dark theme in Tailwind"
```

---

### Task 3: Root layout with Inter font + metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Websarthi — Tech Consultancy & Business Automation",
  description:
    "End-to-end tech consultancy: digital marketing, lead qualification, lead management, tech provision, and full operations automation.",
  openGraph: {
    title: "Websarthi",
    description: "Your growth partner — from lead to close.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: root layout with Inter font and site metadata"
```

---

### Task 4: Hero section component

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/` directory**

```bash
mkdir -p components/sections
```

- [ ] **Step 2: Create `components/sections/Hero.tsx`**

```typescript
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  const portalUrl = process.env.NEXT_PUBLIC_CMS_PORTAL_URL ?? "#";

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container max-w-5xl text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-medium mb-8">
          <Zap size={14} />
          End-to-end Tech Consultancy
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Scale Smarter with{" "}
          <span className="gold-text">Websarthi</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          From first lead to final delivery — we automate, qualify, and
          accelerate every step of your business operations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(230,168,23,0.4)] active:scale-100"
          >
            Access Lead CMS Portal
            <ArrowRight size={20} />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-lg transition-all duration-200"
          >
            Explore Services
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Leads Managed" },
            { value: "98%", label: "Client Retention" },
            { value: "10x", label: "ROI Average" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gold-text">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy-900 to-transparent" />
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: Hero section with CTA to Lead CMS portal"
```

---

### Task 5: ServiceCard component + Services section

**Files:**
- Create: `components/ui/ServiceCard.tsx`
- Create: `components/sections/Services.tsx`

- [ ] **Step 1: Create `components/ui/ServiceCard.tsx`**

```typescript
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  accent = "text-gold-400",
}: ServiceCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 hover:border-gold-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group">
      <div
        className={`w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center ${accent} group-hover:bg-gold-500/20 transition-colors duration-300`}
      >
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/sections/Services.tsx`**

```typescript
import ServiceCard from "@/components/ui/ServiceCard";
import {
  Megaphone,
  UserCheck,
  HeartHandshake,
  Cpu,
  Settings2,
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "SEO, paid ads, content strategy, and social media campaigns tailored to generate high-intent leads at scale.",
  },
  {
    icon: UserCheck,
    title: "Lead Qualification",
    description:
      "Multi-stage qualification pipelines that score, filter, and prioritise leads so your sales team only speaks to buyers.",
  },
  {
    icon: HeartHandshake,
    title: "Lead Catering",
    description:
      "Nurture sequences, personalised outreach, and CRM workflows that keep leads warm from first touch to close.",
  },
  {
    icon: Cpu,
    title: "Tech Provision",
    description:
      "Full-stack development, cloud infrastructure, API integrations, and platform builds — all under one roof.",
  },
  {
    icon: Settings2,
    title: "Operations Automation",
    description:
      "End-to-end workflow automation, RPA, and process optimisation that eliminate manual bottlenecks and cut costs.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-navy-800/30">
      <div className="container max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything Your Business Needs
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Five core capabilities. One integrated partner. Zero complexity.
          </p>
        </div>

        {/* Cards grid — 2 cols on md, 3 on lg with last row centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-2xl lg:mx-auto">
          {services.slice(3).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ServiceCard.tsx components/sections/Services.tsx
git commit -m "feat: Services section with 5 service cards"
```

---

### Task 6: Why Us section

**Files:**
- Create: `components/sections/WhyUs.tsx`

- [ ] **Step 1: Create `components/sections/WhyUs.tsx`**

```typescript
import { ShieldCheck, BarChart3, Workflow } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Full-Stack Ownership",
    body: "We don't just advise — we build, run, and optimise. One partner owns the entire journey from lead acquisition to conversion, so nothing falls through the cracks.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    body: "Every campaign, qualification step, and automation is instrumented. You see real numbers, not vanity metrics — and we act on what the data actually says.",
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    body: "Our systems plug into your existing stack — CRMs, ERPs, communication tools, billing platforms — with minimal disruption and maximum impact from day one.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-navy-900">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3">
            Why Websarthi
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Outcomes, Not Hours
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We measure success by your growth, not our deliverable count.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <p.icon size={28} />
              </div>
              <h3 className="text-white font-semibold text-xl">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/WhyUs.tsx
git commit -m "feat: Why Us section with 3 value proposition pillars"
```

---

### Task 7: Footer component

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Create `components/sections/Footer.tsx`**

```typescript
export default function Footer() {
  const year = new Date().getFullYear();
  const portalUrl = process.env.NEXT_PUBLIC_CMS_PORTAL_URL ?? "#";

  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="container max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold gold-text">Websarthi</span>
            <p className="text-slate-500 text-sm mt-1">
              Your growth partner — from lead to close.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#why-us" className="hover:text-white transition-colors">
              Why Us
            </a>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 transition-colors font-medium"
            >
              Lead CMS Portal ↗
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
          © {year} Websarthi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat: Footer with navigation and portal link"
```

---

### Task 8: Assemble page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 3: Start dev server and manually verify**

```bash
npm run dev
```
Open `http://localhost:3000` and verify:
- Hero renders with gold headline, CTA button visible
- Services section shows all 5 cards
- Why Us section shows 3 pillars
- Footer shows brand + portal link
- No console errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page — Hero, Services, WhyUs, Footer"
```

---

### Task 9: Navbar (optional scroll-aware)

**Files:**
- Create: `components/sections/Navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/sections/Navbar.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const portalUrl = process.env.NEXT_PUBLIC_CMS_PORTAL_URL ?? "#";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/90 backdrop-blur-md border-b border-white/5 py-3"
          : "py-5"
      }`}
    >
      <div className="container max-w-6xl px-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold gold-text">
          Websarthi
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#why-us" className="hover:text-white transition-colors">
            Why Us
          </a>
        </nav>

        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 text-sm font-medium transition-all duration-200"
        >
          Lead CMS Portal
          <ExternalLink size={14} />
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add Navbar to `app/layout.tsx`**

Add import at top:
```typescript
import Navbar from "@/components/sections/Navbar";
```

Add inside `<body>` before `{children}`:
```typescript
<Navbar />
```

Full updated `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Websarthi — Tech Consultancy & Business Automation",
  description:
    "End-to-end tech consultancy: digital marketing, lead qualification, lead management, tech provision, and full operations automation.",
  openGraph: {
    title: "Websarthi",
    description: "Your growth partner — from lead to close.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Final build + verify**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Final commit**

```bash
git add components/sections/Navbar.tsx app/layout.tsx
git commit -m "feat: scroll-aware Navbar with portal CTA"
```
