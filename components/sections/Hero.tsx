"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";

const titleWords = site.name.split(" ");

/**
 * Die Augen kommen als Prop herein: Ob Foto oder Zeichnung, entscheidet eine
 * Server-Komponente (components/hero/HeroEyes.tsx) – hier läuft Client-Code.
 */
export function Hero({ eyes }: { eyes: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Sanfter Parallax beim Herausscrollen
  const eyesY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", reduceMotion ? "blur(0px)" : "blur(6px)"]);

  return (
    <section
      ref={ref}
      id="start"
      aria-labelledby="hero-titel"
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-[var(--nav-h)] pb-20"
    >
      {/* Atmosphärische Lichtstimmung */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[-18%] left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-lilac-600/25 blur-[150px]"
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[8%] h-[46vh] w-[46vh] rounded-full bg-lilac-800/40 blur-[130px]"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] bottom-[4%] h-[38vh] w-[38vh] rounded-full bg-lilac-500/15 blur-[120px]"
          animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-950)_78%)]" />
      </div>

      <motion.div style={{ y: eyesY, opacity: fade, filter: blur }} className="relative z-10 w-full">
        <div className="relative">
          <div className="opacity-[0.94]">
            {eyes}
          </div>

          {/* Dunkler Balken über der Augenpartie – nimmt die Augen zurück,
              damit der Titel die Bühne behält */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[150%] -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,5,9,0.26)_20%,rgba(6,5,9,0.42)_50%,rgba(6,5,9,0.26)_80%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_84%,transparent_100%)]"
          />
        </div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 container-x mt-10 flex flex-col items-center text-center sm:mt-12"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] font-medium tracking-[0.34em] text-lilac-200/90 uppercase"
        >
          <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-lilac-300" />
          Lash Studio · {site.city}
        </motion.span>

        <h1
          id="hero-titel"
          className="mt-7 font-[family-name:var(--font-display)] text-[clamp(2.9rem,10vw,7.5rem)] leading-[0.95] font-light tracking-[-0.02em]"
        >
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="flex flex-wrap items-baseline justify-center gap-x-[0.28em]">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.62 + i * 0.13, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className={i === 1 ? "text-gradient italic" : "text-white"}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg"
        >
          {site.slogan}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Termin buchen
          </Button>
          <Button href="#preise" variant="ghost">
            Preise ansehen
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[9px] tracking-[0.4em] text-white/35 uppercase transition-colors duration-500 hover:text-lilac-200"
      >
        Scrollen
        <span aria-hidden className="relative h-11 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-lilac-300 to-transparent"
            animate={reduceMotion ? undefined : { y: [-16, 44] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
