"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpruchWechsel } from "@/components/ui/SpruchWechsel";
import { gallery, site } from "@/lib/site";

/** Drei Aufnahmen unter dem Namen – die mittlere steht größer im Bogen. */
const BILDER = [gallery[1], gallery[3], gallery[5]];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="start"
      aria-labelledby="hero-titel"
      className="relative overflow-hidden bg-creme-100 pt-[var(--nav-h)]"
    >
      {/* Beiger Grund, der unter den Rahmen ausläuft */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-beige-200" />

      <div className="container-x relative pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="flex justify-center text-[10px] tracking-[0.42em] text-ink-500 uppercase">
              <SpruchWechsel />
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-titel" className="mt-6">
              <BrandMark size="gross" />
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
              {site.slogan}
            </p>
          </Reveal>
        </div>

        {/* Die Rahmen: weiße Passepartouts im Bogen, das mittlere größer */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 items-end gap-3 sm:mt-16 sm:gap-6 lg:max-w-4xl lg:gap-8">
          {BILDER.map((bild, i) => {
            const mitte = i === 1;
            return (
              <Reveal key={bild.id} delay={0.2 + i * 0.1}>
                <motion.figure
                  whileHover={reduceMotion ? undefined : { y: -10 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className={`group relative ${mitte ? "" : "sm:mb-10"}`}
                >
                  <div
                    className={`relative rounded-t-[999px] rounded-b-[1.25rem] border border-beige-300 bg-white p-2 shadow-[var(--shadow-soft)] sm:p-3 ${
                      mitte ? "" : "sm:mt-6"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-t-[999px] rounded-b-[0.75rem] bg-beige-300 ${
                        mitte ? "aspect-[3/4.6]" : "aspect-[3/4.2]"
                      }`}
                    >
                      <Image
                        src={bild.src}
                        alt={bild.alt}
                        fill
                        priority={mitte}
                        sizes="(max-width: 640px) 32vw, 30vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                      {/* Lichtstreif, der beim Überfahren über das Bild zieht */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
                      />
                    </div>

                    {/* Feine Innenlinie – lässt den Rahmen teurer wirken */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[6px] rounded-t-[999px] rounded-b-[0.9rem] border border-beige-200 sm:inset-[10px]"
                    />
                  </div>

                  <figcaption className="mt-3 text-center font-[family-name:var(--font-script)] text-lg text-ink-700 sm:text-2xl">
                    {bild.caption}
                  </figcaption>
                </motion.figure>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center text-center sm:mt-14">
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/buchen">Termin buchen</Button>
              <Button href="/preise" variant="ghost">
                Preise ansehen
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <p className="mt-7 text-xs leading-relaxed text-ink-300">
              {site.city} · Die genaue Adresse bekommst du mit der Bestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
