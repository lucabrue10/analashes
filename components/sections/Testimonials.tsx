"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { feedback, site } from "@/lib/site";

/**
 * Rückmeldungen als Ausschnitt der Instagram-Nachricht selbst.
 *
 * Die Blasen sind freigestellt und stehen direkt auf dem dunklen Grund – das
 * wirkt wie ein Blick ins Postfach und nicht wie eine nachgebaute Zitatkarte.
 * Der Wortlaut steht zusätzlich als Text im Markup, damit Vorlesewerkzeuge und
 * Suchmaschinen ihn erfassen.
 */
export function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="bewertungen" aria-labelledby="bewertungen-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac-700/10 blur-[160px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="bewertungen-titel"
          eyebrow="Feedback"
          title={
            <>
              Was danach im <span className="text-gradient italic">Postfach</span> landet
            </>
          }
          text="Nachrichten von Kundinnen nach ihrem Termin – unverändert, so wie sie angekommen sind."
        />

        <div className="mt-16 columns-1 gap-8 md:columns-2 lg:columns-3 [&>*]:mb-8">
          {feedback.map((f, i) => (
            <Reveal key={f.src} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <motion.figure
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt=""
                  loading="lazy"
                  className="w-full"
                />
                <figcaption className="mt-3 pl-1 text-[10px] tracking-[0.24em] text-white/30 uppercase">
                  Kundin · {f.datum}
                  <span className="sr-only">: {f.text}</span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center text-sm text-white/40">
            Mehr davon täglich auf{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lilac-200 underline underline-offset-4 transition-colors hover:text-lilac-100"
            >
              Instagram {site.instagramHandle}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
