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

  // Im geöffneten Lightbox steuern die Pfeiltasten global, Escape schließt.
  // Ohne Lightbox hört nur das Karussell selbst mit (siehe onKeyDown unten) –
  // sonst würde die Galerie das Scrollen mit den Pfeiltasten kapern.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step, lightbox, close]);

  useEffect(() => {
    if (!lightbox) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  return (
    <section
      id="galerie"
      aria-labelledby="galerie-titel"
      className="relative py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-10 right-1/4 h-[380px] w-[380px] rounded-full bg-lilac-600/10 blur-[140px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="galerie-titel"
          eyebrow="Galerie"
          title={
            <>
              Sets, die ich{" "}
              <span className="text-gradient italic">gelegt habe</span>
            </>
          }
          text="Echte Sets aus dem Studio. Blättere mit den Pfeilen durch – ein Klick zeigt das Bild groß."
        />

        <Reveal>
          <div
            className="mt-16 flex flex-col items-center"
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
            {/* Der Stapel: die vorderste Karte liegt mittig, die nächsten
                versetzt dahinter */}
            {/* Der Rahmen schneidet die schräg herausragenden Karten ab, damit
                die Seite auf dem Telefon nicht seitlich scrollt */}
            <div className="w-full overflow-hidden py-6">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] sm:max-w-[400px]">
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
                        opacity: sichtbar ? 1 - Math.abs(d) * 0.35 : 0,
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
                        className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-3xl border border-white/[0.08] shadow-[var(--shadow-card)]"
                      >
                        <Image
                          src={item.src}
                          alt={vorne ? item.alt : ""}
                          fill
                          draggable={false}
                          sizes="(max-width: 640px) 90vw, 400px"
                          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95"
                        />
                        {/* Karten im Hintergrund treten zurück */}
                        {!vorne ? (
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-ink-950/45"
                          />
                        ) : null}
                        <span className="absolute inset-x-6 bottom-6 flex flex-col items-start text-left">
                          <span className="text-[9px] tracking-[0.32em] text-lilac-300/90 uppercase">
                            {item.technique}
                          </span>
                          <span className="mt-2 font-[family-name:var(--font-display)] text-xl text-white">
                            {item.caption}
                          </span>
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Steuerung unter dem Stapel */}
            <div className="mt-9 flex items-center gap-5">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorheriges Set"
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-white/75 transition-colors duration-300 hover:text-white"
              >
                <span aria-hidden className="text-lg leading-none">
                  ←
                </span>
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
                        ? "w-6 bg-lilac-300"
                        : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Nächstes Set"
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-white/75 transition-colors duration-300 hover:text-white"
              >
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </button>
            </div>

            <p
              aria-live="polite"
              className="mt-5 text-[10px] tracking-[0.3em] text-white/40 uppercase"
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
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[min(100%,62vh)] overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-soft)]">
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
                  {aktiv + 1} / {gallery.length}
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
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
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
