"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";

/** Die Aufnahmen des Laufbands – sie wiederholen sich endlos. */
const BANNER = [
  { src: "/banner/band-1.jpg", alt: "Wimpernverlängerung an braunen Augen" },
  {
    src: "/banner/band-2.jpg",
    alt: "Wimpernverlängerung an blauen Augen, offener Blick",
  },
  { src: "/banner/band-3.jpg", alt: "Volles Wimpernset an braunen Augen" },
  { src: "/banner/band-4.jpg", alt: "Dichtes Wimpernset an blaugrauen Augen" },
];

/** Drei Durchläufe hintereinander: Das Band wird um genau einen Durchlauf
 *  verschoben und springt dann zurück – weil dahinter dieselben Bilder in
 *  derselben Reihenfolge stehen, ist der Sprung unsichtbar. Drei statt zwei
 *  Durchläufe, damit das Band auch auf sehr breiten Bildschirmen nirgends
 *  abreißt. */
const LAUFBAND = [...BANNER, ...BANNER, ...BANNER];

/** Sekunden für einen kompletten Durchlauf. */
const TEMPO = 44;

/** Weiche Kanten: Die Bilder blenden rechts ein und links wieder aus. */
const EDGE_FADE = [
  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
].join(", ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Sanfter Parallax beim Herausscrollen
  const bannerY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 140],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -60],
  );
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", reduceMotion ? "blur(0px)" : "blur(6px)"],
  );

  return (
    <section
      ref={ref}
      id="start"
      aria-labelledby="hero-titel"
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-[var(--nav-h)] pb-20"
    >
      {/* Atmosphärische Lichtstimmung */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute top-[-18%] left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-lilac-600/25 blur-[150px]"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[8%] h-[46vh] w-[46vh] rounded-full bg-lilac-800/40 blur-[130px]"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] bottom-[4%] h-[38vh] w-[38vh] rounded-full bg-lilac-500/15 blur-[120px]"
          animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-950)_78%)]" />
      </div>

      {/* Die Wortmarke steht zwischen Logo und Laufband */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 container-x mb-4 flex flex-col items-center text-center sm:mb-6"
      >
        <h1
          id="hero-titel"
          className="font-[family-name:var(--font-script)] text-[clamp(3.6rem,13vw,10rem)] leading-[1.15] font-normal"
        >
          <span className="sr-only">{site.name}</span>
          {/* Ein einziger Textlauf – nur so bleiben die Buchstaben der
              Schreibschrift durchgehend verbunden */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.62,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-gradient block pb-[0.12em]"
          >
            {site.name}
          </motion.span>
        </h1>
      </motion.div>

      {/* Laufband: Die Aufnahmen ziehen endlos von rechts nach links durch
          und blenden an den Rändern weich ein und aus */}
      <motion.div
        style={{ y: bannerY, opacity: fade, filter: blur }}
        className="relative z-10 w-full"
      >
        {/* Feine Linie über dem Band */}
        <div
          aria-hidden
          className="h-px w-full bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.55)_18%,rgba(255,255,255,0.55)_82%,transparent_100%)]"
        />

        <div
          className="relative my-4 w-full overflow-hidden sm:my-5"
          style={{
            WebkitMaskImage: EDGE_FADE,
            maskImage: EDGE_FADE,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          <motion.div
            className="flex w-max"
            animate={reduceMotion ? undefined : { x: ["0%", "-33.3333%"] }}
            transition={{ duration: TEMPO, repeat: Infinity, ease: "linear" }}
          >
            {LAUFBAND.map((bild, i) => (
              <div
                // Jede Kachel trägt ihren Abstand als Rand mit sich, damit ein
                // Drittel der Gesamtbreite exakt einem Durchlauf entspricht
                key={`${bild.src}-${i}`}
                className="relative mr-3 aspect-[2.14/1] w-[clamp(230px,26vw,430px)] shrink-0 overflow-hidden rounded-2xl sm:mr-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bild.src}
                  alt={i < BANNER.length ? bild.alt : ""}
                  aria-hidden={i >= BANNER.length}
                  draggable={false}
                  className="h-full w-full object-cover brightness-[0.62] contrast-[1.1] saturate-[0.78]"
                />
                {/* Randabdunklung und ein Hauch Lila, damit die Fotos zur Marke passen */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_78%_at_50%_50%,transparent_0%,rgba(8,7,11,0.45)_66%,rgba(8,7,11,0.88)_100%)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-lilac-700/25 mix-blend-soft-light"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,11,0.6)_0%,transparent_32%,transparent_66%,rgba(8,7,11,0.78)_100%)]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* … und dieselbe Linie darunter */}
        <div
          aria-hidden
          className="h-px w-full bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.55)_18%,rgba(255,255,255,0.55)_82%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 container-x mt-9 flex flex-col items-center text-center sm:mt-11"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[10px] font-medium tracking-[0.52em] text-white uppercase sm:text-[11px]"
        >
          Lash Studio · {site.district}, {site.city}
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg"
        >
          {site.slogan}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Termin buchen
          </Button>
          <Button href="#preise" variant="ghost">
            Preise ansehen
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[9px] tracking-[0.4em] text-white/35 uppercase transition-colors duration-500 hover:text-lilac-200"
      >
        Scrollen
        <span
          aria-hidden
          className="relative h-11 w-px overflow-hidden bg-white/15"
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-lilac-300 to-transparent"
            animate={reduceMotion ? undefined : { y: [-16, 44] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
