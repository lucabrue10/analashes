"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aftercare, studioregeln, vorbereitung } from "@/lib/site";

function Liste({ punkte }: { punkte: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {punkte.map((punkt) => (
        <li key={punkt} className="flex gap-3.5 text-sm leading-relaxed text-white/65">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-lilac-400" />
          {punkt}
        </li>
      ))}
    </ul>
  );
}

/**
 * Alles, was vor und nach dem Termin gilt – aus den Studio-Hinweisen.
 * Steht bewusst prominent auf der Seite: Das spart Rückfragen und sorgt
 * dafür, dass die Sets tatsächlich so lange halten, wie sie können.
 */
export function Ablauf() {
  return (
    <section id="pflege" aria-labelledby="pflege-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-lilac-700/12 blur-[140px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="pflege-titel"
          eyebrow="Vorbereitung & Pflege"
          title={
            <>
              Damit dein Set <span className="text-gradient italic">lange hält</span>
            </>
          }
          text="Zwei Dinge entscheiden über die Haltbarkeit: wie du zum Termin kommst und wie du die Wimpern danach behandelst."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="glass h-full rounded-3xl p-8 shadow-[var(--shadow-card)] sm:p-10">
              <span className="text-[10px] tracking-[0.32em] text-lilac-300/80 uppercase">
                Schritt 1
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-light text-white">
                {vorbereitung.titel}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{vorbereitung.intro}</p>
              <Liste punkte={vorbereitung.punkte} />
              <p className="mt-8 border-t border-white/[0.08] pt-6 text-xs leading-relaxed text-white/40">
                {vorbereitung.hinweis}
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="glass h-full rounded-3xl p-8 shadow-[var(--shadow-card)] sm:p-10">
              <span className="text-[10px] tracking-[0.32em] text-lilac-300/80 uppercase">
                Schritt 2
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-light text-white">
                {aftercare.titel}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{aftercare.intro}</p>
              <Liste punkte={aftercare.punkte} />
              <p className="mt-8 flex gap-3 rounded-2xl bg-lilac-500/[0.08] px-5 py-4 text-sm leading-relaxed text-lilac-100/90">
                <span aria-hidden>★</span>
                {aftercare.wichtig}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <h3 className="mt-20 text-center text-[11px] tracking-[0.42em] text-white/40 uppercase">
            Gut zu wissen
          </h3>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {studioregeln.map((regel) => (
            <motion.div
              key={regel.titel}
              variants={revealItem}
              className="glass rounded-3xl p-7 shadow-[var(--shadow-card)]"
            >
              <h4 className="text-sm font-medium tracking-[0.12em] text-white uppercase">
                {regel.titel}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{regel.text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
