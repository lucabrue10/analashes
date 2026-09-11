"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x relative">
        <SectionHeading
          id="faq-titel"
          marker
          eyebrow="Gut zu wissen"
          title={
            <>
              Häufige <span className="text-beige-500">Fragen</span>
            </>
          }
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="border-b border-beige-300">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-base text-ink-900 transition-colors duration-300 group-hover:text-ink-500 sm:text-lg">
                        {f.q}
                      </span>
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-beige-400 text-ink-500"
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-12 pb-7 text-sm leading-relaxed text-ink-500">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
