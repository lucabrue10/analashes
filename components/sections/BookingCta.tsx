"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/lib/site";

export function BookingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [60, -60]);

  return (
    <section aria-labelledby="termin-titel" className="relative py-20 sm:py-28">
      <div ref={ref} className="container-x">
        <div className="glass grain relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center shadow-[var(--shadow-soft)] sm:px-16 sm:py-24">
          <motion.div
            aria-hidden
            style={{ y }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-lilac-500/25 blur-[130px]" />
            <div className="absolute -bottom-28 left-[12%] h-[300px] w-[300px] rounded-full bg-lilac-800/40 blur-[120px]" />
          </motion.div>

          <div className="relative">
            <Reveal>
              <span className="text-[10px] tracking-[0.42em] text-lilac-200/80 uppercase">
                Termin sichern
              </span>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-lilac-400/25 px-4 py-1.5 text-[10px] tracking-[0.24em] text-lilac-100/80 uppercase">
                <span aria-hidden>⚠</span>
                {site.warning}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="termin-titel"
                className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.08] font-light text-balance sm:text-5xl md:text-6xl"
              >
                Dein perfekter Blick ist nur <span className="text-gradient italic">eine Nachricht</span> entfernt
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-6 max-w-xl text-white/55 text-pretty">
                Freie Termine gibt es meist innerhalb von zehn Tagen. Schreib mir kurz, welchen Look du dir wünschst –
                den Rest übernehme ich.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Termin buchen
                </Button>
                <Button href={`tel:${site.phoneHref}`} variant="ghost">
                  {site.phone}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
