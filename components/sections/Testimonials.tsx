"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/site";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${rating} von 5 Sternen`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${i < rating ? "fill-lilac-300" : "fill-white/15"}`}
          aria-hidden="true"
        >
          <path d="M12 2.6l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3-5.6-3.2-5.6 3.2 1.3-6.3L3 9.2l6.3-.7z" />
        </svg>
      ))}
    </span>
  );
}

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
          eyebrow="Bewertungen"
          title={
            <>
              Was meine Kundinnen <span className="text-gradient italic">sagen</span>
            </>
          }
          text="Rückmeldungen, die mich nach den Terminen erreicht haben – im Wortlaut."
        />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={revealItem}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="glass group relative flex h-full flex-col rounded-3xl p-8 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-6 right-7 font-[family-name:var(--font-display)] text-6xl leading-none text-lilac-400/15 transition-colors duration-700 group-hover:text-lilac-400/30"
              >
                &rdquo;
              </span>
              <Stars rating={t.rating} />
              <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-white/70">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lilac-500/40 to-lilac-800/40 font-[family-name:var(--font-display)] text-sm text-white"
                >
                  {t.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm text-white/85">{t.name}</span>
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
