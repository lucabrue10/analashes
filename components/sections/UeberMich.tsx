"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, ueberMich } from "@/lib/site";

export function UeberMich() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bildY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="ueber-mich" aria-labelledby="ueber-mich-titel" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 h-[420px] w-[420px] rounded-full bg-lilac-700/12 blur-[150px]" />
      </div>

      {/* Auf dem Telefon untereinander, ab Tablet Foto links und Text rechts */}
      <div
        ref={ref}
        className="container-x relative grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
      >
        <Reveal direction="right">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[var(--shadow-soft)]">
            <motion.div style={{ y: bildY }} className="absolute inset-[-6%]">
              <Image
                src={ueberMich.bild}
                alt={ueberMich.bildAlt}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                className="object-cover"
              />
            </motion.div>
            {/* Das Foto ist hell – der Verlauf bindet es in die dunkle Seite ein */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent"
            />
            <div className="absolute right-6 bottom-6 left-6">
              <p className="text-[10px] tracking-[0.34em] text-lilac-200/90 uppercase">
                {site.district} · {site.city}
              </p>
              <p className="mt-2 text-xl text-white">Ana</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="ueber-mich-titel"
            eyebrow="Über mich"
            align="left"
            title={
              <>
                Hinter jedem Set <span className="text-gradient italic">steht Ana</span>
              </>
            }
          />

          <div className="mt-7 space-y-5">
            {ueberMich.absaetze.map((absatz, i) => (
              <Reveal key={absatz.slice(0, 24)} delay={0.08 + i * 0.06}>
                <p className="text-base leading-relaxed text-white/65 text-pretty">{absatz}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <ul className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {ueberMich.punkte.map((punkt) => (
                <li key={punkt.titel}>
                  <p className="text-[10px] tracking-[0.28em] text-lilac-300/90 uppercase">
                    {punkt.titel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{punkt.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
