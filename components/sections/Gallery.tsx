"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/lib/site";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = index !== null;
  const current = open ? gallery[index] : null;

  const close = useCallback(() => {
    setIndex(null);
    lastFocused.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, step]);

  return (
    <section id="galerie" aria-labelledby="galerie-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-1/4 h-[380px] w-[380px] rounded-full bg-lilac-600/10 blur-[140px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="galerie-titel"
          eyebrow="Galerie"
          title={
            <>
              Vorher · <span className="text-gradient italic">Nachher</span>
            </>
          }
          text="Echte Ergebnisse aus dem Studio. Klicke auf ein Bild, um es in voller Größe zu sehen."
        />

        {/* Masonry über CSS-Spalten */}
        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <motion.button
                type="button"
                onClick={(e) => {
                  lastFocused.current = e.currentTarget;
                  setIndex(i);
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                aria-label={`${item.caption} – Bild vergrößern`}
                className="group relative block w-full overflow-hidden rounded-3xl border border-white/[0.08] shadow-[var(--shadow-card)]"
              >
                <span
                  className={`relative block w-full ${item.span === "tall" ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95"
                />
                <span className="absolute inset-x-6 bottom-6 flex flex-col items-start text-left">
                  <span className="text-[9px] tracking-[0.32em] text-lilac-300/90 uppercase">
                    {item.technique}
                  </span>
                  <span className="mt-2 font-[family-name:var(--font-display)] text-xl text-white">
                    {item.caption}
                  </span>
                  <span
                    aria-hidden
                    className="mt-3 h-px w-10 origin-left scale-x-0 bg-lilac-300 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-xl sm:p-8"
            onClick={close}
          >
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative mx-auto w-full overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-soft)] ${
                  current.span === "tall" ? "aspect-[4/5] max-w-[min(100%,52vh)]" : "aspect-[4/3] max-w-[min(100%,110vh)]"
                }`}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="font-[family-name:var(--font-display)] text-xl text-white">
                  {current.caption}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  {(index ?? 0) + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Galerie schließen"
              className="glass absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
            >
              <span aria-hidden className="text-lg leading-none">✕</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Vorheriges Bild"
              className="glass absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:left-6"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Nächstes Bild"
              className="glass absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:right-6"
            >
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
