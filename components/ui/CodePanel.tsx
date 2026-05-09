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
