"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import ContactButton from "@/components/ui/ContactButton";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const contactEmail = "mailto:hsinghal179@gmail.com";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
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
      <div className="container max-w-6xl px-4 mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold gold-text">
          Websarthi
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#showcase" className="hover:text-foreground transition-colors">
            Our Work
          </a>
          <a href="#why-us" className="hover:text-foreground transition-colors">
            Why Us
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <ContactButton className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold-500/10 dark:bg-indigo-500/10 border border-gold-500/30 dark:border-indigo-500/30 text-gold-500 dark:text-indigo-400 hover:bg-gold-500/20 dark:hover:bg-indigo-500/20 text-sm font-medium transition-all duration-200" />
        </div>
      </div>
    </motion.header>
  );
}
