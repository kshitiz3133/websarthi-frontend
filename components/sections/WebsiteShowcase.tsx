"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    setTypedText("");
    setIsTyping(false);
    setDragPos({ x: 0, y: 0 });
    setShowCode(false);

    const template = templates[index];
    const ids: ReturnType<typeof setTimeout>[] = [];

    ids.push(
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
        ids.push(typeInterval as unknown as ReturnType<typeof setTimeout>);
      }, 500)
    );

    ids.push(setTimeout(() => setDragPos(template.dragTo), 2100));
    ids.push(setTimeout(() => setShowCode(true), 3500));

    return () => ids.forEach(clearTimeout);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = runSequence(index);
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
    <section id="showcase" className="py-24 bg-secondary/50">
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
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Card stack */}
            <div className="w-full lg:w-5/12 flex flex-col items-center gap-6">
              <div className="relative h-52 w-full">
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

              {/* Arrow navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => goTo((activeIndex - 1 + templates.length) % templates.length)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card hover:border-gold-500/40 hover:text-gold-500 text-muted-foreground transition-all duration-200"
                  aria-label="Previous template"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  {templates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-5 bg-gold-500"
                          : "w-1.5 bg-border hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to template ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goTo((activeIndex + 1) % templates.length)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card hover:border-gold-500/40 hover:text-gold-500 text-muted-foreground transition-all duration-200"
                  aria-label="Next template"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
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
