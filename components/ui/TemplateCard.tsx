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
          <p className={`text-xs mt-6.5 ${accentText[template.accent]}`}>
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
