"use client";

import { useState } from "react";
import { Phone, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CONTACT_EMAIL = "hsinghal179@gmail.com";

interface ContactButtonProps {
  className?: string;
  size?: "sm" | "lg";
}

export default function ContactButton({ className = "", size = "sm" }: ContactButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard failed — mailto still opens
    }
  };

  return (
    <>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={handleClick}
        className={className}
      >
        <Phone size={size === "lg" ? 18 : 14} />
        Contact Us
      </a>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium shadow-xl"
          >
            <Check size={14} />
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
