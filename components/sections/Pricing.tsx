"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealGroup, revealItem, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceGroups, whatsappLink } from "@/lib/site";

export function Pricing() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="preise" aria-labelledby="preise-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 h-[460px] w-[460px] rounded-full bg-lilac-600/12 blur-[150px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="preise-titel"
          eyebrow="Preise"
          title={
            <>
              Transparent, fair, <span className="text-gradient italic">ohne Kleingedrucktes</span>
            </>
          }
          text="Alle Preise verstehen sich inklusive Beratung, Mapping und Aftercare-Empfehlung. Für jeden Termin wird eine Anzahlung fällig."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {priceGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.1}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-card)] transition-colors duration-700 hover:border-lilac-400/25">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lilac-500/[0.07] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <header className="relative">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-light text-white">
                    {group.title}
                  </h3>
                  {group.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-white/45">{group.note}</p>
                  ) : null}
                </header>

                <RevealGroup className="relative mt-8 divide-y divide-white/[0.07]" stagger={0.07}>
                  {group.items.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={revealItem}
                      whileHover={reduceMotion ? undefined : { x: 6 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                      className={`relative flex items-baseline justify-between gap-4 py-4 ${
                        item.featured ? "px-3 -mx-3 rounded-xl bg-lilac-500/[0.08]" : ""
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="text-[15px] text-white/85">
                          {item.name}
                          {item.featured ? (
                            <span className="ml-2 align-middle text-[9px] tracking-[0.2em] text-lilac-300 uppercase">
                              beliebt
                            </span>
                          ) : null}
                        </span>
                        {item.meta ? (
                          <span className="mt-1 text-[11px] tracking-[0.16em] text-white/35 uppercase">
                            {item.meta}
                          </span>
                        ) : null}
                      </span>
                      <span
                        aria-hidden
                        className="mx-1 hidden h-px flex-1 self-center bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_2px,transparent_2px_7px)] sm:block"
                      />
                      <span className="shrink-0 font-[family-name:var(--font-display)] text-xl text-lilac-100">
                        {item.price}
                      </span>
                    </motion.div>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="glass mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-light text-white">
                Unsicher, welches Set zu dir passt?
              </p>
              <p className="mt-2 text-sm text-white/55">
                Schreib mir kurz per WhatsApp – ich berate dich unverbindlich und finde den passenden Look.
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-lilac-400/30 px-7 py-3.5 text-[11px] font-medium tracking-[0.24em] text-lilac-100 uppercase transition-all duration-500 hover:border-lilac-300/60 hover:bg-lilac-500/10"
            >
              Kostenlos beraten lassen
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
