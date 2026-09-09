"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/lib/site";

/** Wie viele Karten hinter der vordersten noch zu sehen sind. */
const SICHTBAR = 2;

/** Kürzester Abstand im Kreis – Karte 0 liegt neben der letzten Karte. */
function abstand(i: number, aktiv: number, laenge: number) {
  const roh = (i - aktiv + laenge) % laenge;
  return roh > laenge / 2 ? roh - laenge : roh;
}

export function Gallery() {
  const [aktiv, setAktiv] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const current = gallery[aktiv];

  const step = useCallback((dir: 1 | -1) => {
    setAktiv((i) => (i + dir + gallery.length) % gallery.length);
  }, []);

  const close = useCallback(() => {
    setLightbox(false);
    lastFocused.current?.focus({ preventScroll: true });
  }, []);

  // Nur im geöffneten Lightbox global mithören – sonst würde die Galerie
  // das Scrollen mit den Pfeiltasten kapern.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const vorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = vorher;
    };
  }, [lightbox, step, close]);

  return (
    <section
      id="sets"
      aria-labelledby="sets-titel"
      className="bg-beige-200/60 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="sets-titel"
          eyebrow="Sets"
          spruch="the lashes are lashing"
          title={
            <>
              Sets, die ich{" "}
              <span className="text-beige-500 italic">gelegt habe</span>
            </>
          }
          text="Echte Arbeiten aus dem Studio. Blättere mit den Pfeilen durch – ein Klick zeigt das Bild groß."
        />

        <Reveal>
          <div
            className="mt-14 flex flex-col items-center"
            role="group"
            aria-roledescription="Karussell"
            aria-label="Sets aus dem Studio"
            onKeyDown={(e) => {
              if (lightbox) return;
              if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
              }
            }}
          >
            {/* Der Rahmen schneidet die schräg herausragenden Karten ab */}
            <div className="w-full overflow-hidden py-6">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] sm:max-w-[380px]">
                {gallery.map((item, i) => {
                  const d = abstand(i, aktiv, gallery.length);
                  const sichtbar = Math.abs(d) <= SICHTBAR;
                  const vorne = d === 0;

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute inset-0"
                      aria-hidden={!vorne}
                      initial={false}
                      animate={{
                        x: `${d * 8}%`,
                        y: `${Math.abs(d) * 3}%`,
                        scale: 1 - Math.abs(d) * 0.09,
                        rotate: reduceMotion ? 0 : d * 3.5,
                        opacity: sichtbar ? 1 - Math.abs(d) * 0.3 : 0,
                      }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 220, damping: 30 }
                      }
                      style={{
                        zIndex: gallery.length - Math.abs(d),
                        pointerEvents: vorne ? "auto" : "none",
                      }}
                      drag={vorne ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.16}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) step(1);
                        else if (info.offset.x > 60) step(-1);
                      }}
                    >
                      <button
                        type="button"
                        tabIndex={vorne ? 0 : -1}
                        onClick={(e) => {
                          lastFocused.current = e.currentTarget;
                          setLightbox(true);
                        }}
                        aria-label={`${item.caption} – Bild vergrößern`}
                        className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] border border-beige-300 bg-beige-300 shadow-[var(--shadow-soft)]"
                      >
                        <Image
                          src={item.src}
                          alt={vorne ? item.alt : ""}
                          fill
                          draggable={false}
                          sizes="(max-width: 640px) 85vw, 380px"
                          className="object-cover"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent"
                        />
                        {!vorne ? (
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-creme-100/40"
                          />
                        ) : null}
                        <span className="absolute inset-x-6 bottom-6 flex flex-col items-start text-left">
                          <span className="text-[9px] tracking-[0.3em] text-beige-300 uppercase">
                            {item.technique}
                          </span>
                          <span className="mt-1.5 text-lg text-white">
                            {item.caption}
                          </span>
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorheriges Set"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-beige-300 bg-white text-ink-900 transition-colors duration-300 hover:bg-creme-50"
              >
                <span aria-hidden>←</span>
              </button>

              <div className="flex items-center gap-2.5">
                {gallery.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAktiv(i)}
                    aria-label={`Set ${i + 1}: ${item.caption}`}
                    aria-current={i === aktiv}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === aktiv
                        ? "w-6 bg-ink-900"
                        : "w-1.5 bg-beige-400 hover:bg-beige-500"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Nächstes Set"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-beige-300 bg-white text-ink-900 transition-colors duration-300 hover:bg-creme-50"
              >
                <span aria-hidden>→</span>
              </button>
            </div>

            <p
              aria-live="polite"
              className="mt-5 text-[10px] tracking-[0.3em] text-ink-300 uppercase"
            >
              {aktiv + 1} / {gallery.length} · {current.caption}
            </p>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-creme-100/95 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[min(100%,62vh)] overflow-hidden rounded-[1.75rem] border border-beige-300 bg-beige-200">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg text-ink-900">{current.caption}</span>
                <span className="text-[10px] tracking-[0.3em] text-ink-300 uppercase">
                  {aktiv + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Galerie schließen"
              className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-beige-300 bg-white text-ink-900 transition-colors hover:bg-creme-50"
            >
              <span aria-hidden>✕</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Vorheriges Bild"
              className="absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-beige-300 bg-white text-ink-900 transition-colors hover:bg-creme-50 sm:left-6"
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
              className="absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-beige-300 bg-white text-ink-900 transition-colors hover:bg-creme-50 sm:right-6"
            >
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
