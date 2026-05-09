"use client";

import { motion } from "framer-motion";
import { Template } from "@/lib/showcase-templates";

interface TemplatePreviewProps {
  template: Template;
  typedText: string;
  isTyping: boolean;
  dragPos: { x: number; y: number };
}

const accentClasses: Record<
  Template["accent"],
  { bg: string; block: string; text: string }
> = {
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

type PreviewProps = {
  typedText: string;
  isTyping: boolean;
  dragPos: { x: number; y: number };
  ac: { bg: string; block: string; text: string };
};

function EcommercePreview({ typedText, isTyping, dragPos, ac }: PreviewProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className={`h-6 ${ac.bg} rounded flex items-center px-2 gap-2`}>
        <div className="w-10 h-1.5 bg-current opacity-30 rounded-full" />
        <div className="ml-auto flex gap-1.5">
          <div className="w-6 h-1.5 bg-current opacity-20 rounded-full" />
          <div className="w-8 h-1.5 bg-current opacity-40 rounded-full" />
        </div>
      </div>
      <div className={`h-16 ${ac.bg} rounded flex items-center px-3`}>
        <div>
          <p className={`text-xs font-bold ${ac.text}`}>
            {typedText || "Welcome"}<Cursor isTyping={isTyping} />
          </p>
          <div className="w-16 h-1 bg-current opacity-20 rounded mt-1" />
        </div>
      </div>
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

function SaasPreview({ typedText, isTyping, dragPos, ac }: PreviewProps) {
  return (
    <div className="flex gap-2 h-full">
      <div className={`w-12 ${ac.bg} rounded flex flex-col gap-1.5 p-1.5`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-2 rounded ${i === 0 ? ac.block : "bg-border"}`} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-6 bg-muted rounded flex items-center px-2">
          <p className={`text-[9px] font-semibold ${ac.text}`}>
            {typedText || "Dashboard"}<Cursor isTyping={isTyping} />
          </p>
        </div>
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
        <div className={`flex-1 ${ac.bg} rounded p-1.5 flex items-end gap-1`}>
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className={`flex-1 ${ac.block} rounded-t`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioPreview({ typedText, isTyping, dragPos, ac }: PreviewProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="h-6 bg-muted rounded flex items-center justify-between px-2">
        <div className="w-8 h-1.5 bg-border rounded-full" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="w-6 h-1 bg-border rounded-full" />)}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-2 gap-1.5">
        <p className={`text-sm font-black ${ac.text} leading-tight`}>
          {typedText || "Creative Studio"}<Cursor isTyping={isTyping} />
        </p>
        <div className="w-24 h-1 bg-border rounded" />
        <div className={`w-10 h-3 ${ac.block} rounded mt-1`} />
      </div>
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

function RestaurantPreview({ typedText, isTyping, dragPos, ac }: PreviewProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className={`h-20 ${ac.bg} rounded flex items-end p-2`}>
        <p className={`text-xs font-bold ${ac.text}`}>
          {typedText || "Fine Dining"}<Cursor isTyping={isTyping} />
        </p>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {[0, 1, 2, 3].map((i) => (
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

export default function TemplatePreview({
  template,
  typedText,
  isTyping,
  dragPos,
}: TemplatePreviewProps) {
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
