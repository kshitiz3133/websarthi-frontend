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
          Websaarthi
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
