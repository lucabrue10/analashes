"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { site, studioFeatures } from "@/lib/site";

const stats = [
  { value: "8+", label: "Jahre Erfahrung" },
  { value: "2.400", label: "Zufriedene Kundinnen" },
  { value: "4,9", label: "Sterne Ø Bewertung" },
];

export function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);

  return (
    <section id="studio" aria-labelledby="studio-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-lilac-700/12 blur-[150px]" />
      </div>

      <div ref={ref} className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right" className="relative">
          <motion.div
            style={{ y: frameY }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[var(--shadow-soft)] sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
              <Image
                src="/studio.svg"
                alt={`Behandlungsraum des Studios ${site.name} mit Ringlicht und Liege`}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            <div className="glass absolute right-5 bottom-5 left-5 rounded-2xl px-6 py-5">
              <p className="text-[10px] tracking-[0.34em] text-lilac-200/80 uppercase">Studio</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-white">
                {site.district} · {site.postalCode} {site.city}
              </p>
            </div>
          </motion.div>

          <span
            aria-hidden
            className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-full border border-lilac-400/25"
          />
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.42em] text-lilac-300/90 uppercase">
              <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-lilac-400/70" />
              Das Studio
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="studio-titel"
              className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-light text-balance sm:text-5xl"
            >
              Ein ruhiger Ort, an dem <span className="text-gradient italic">nur du</span> im Mittelpunkt stehst
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-base leading-relaxed text-white/60 text-pretty">
              Im {site.district} in {site.city}, hinter einer unscheinbaren Tür, erwartet dich ein privates Studio in warmem Licht.
              Kein Großraum, keine Hektik – nur ein Termin zur gleichen Zeit. Du liegst weich, hörst leise Musik und
              stehst nach ein bis zwei Stunden mit einem Blick auf, der alles verändert.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2" stagger={0.09}>
            {studioFeatures.map((f) => (
              <motion.div key={f.title} variants={revealItem}>
                <h3 className="flex items-center gap-3 text-sm font-medium tracking-[0.12em] text-white uppercase">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
                  {f.title}
                </h3>
                <p className="mt-2.5 pl-[18px] text-sm leading-relaxed text-white/50">{f.text}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-8" stagger={0.1}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={revealItem}>
                <p className="font-[family-name:var(--font-display)] text-3xl text-lilac-100 sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-[10px] tracking-[0.2em] text-white/40 uppercase">{s.label}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
