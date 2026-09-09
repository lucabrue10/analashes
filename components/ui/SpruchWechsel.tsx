"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroSprueche } from "@/lib/site";

/** Ein Spruch nach dem anderen – alle paar Sekunden wechselt er. */
export function SpruchWechsel({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % heroSprueche.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <span
      className={`relative inline-flex h-5 items-center justify-center ${className}`}
    >
      {/* Der volle Wortlaut bleibt für Vorlesewerkzeuge lesbar */}
      <span className="sr-only">{heroSprueche.join(". ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={heroSprueche[i]}
          aria-hidden
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute whitespace-nowrap"
        >
          {heroSprueche[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
