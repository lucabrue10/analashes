"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sprueche } from "@/lib/site";

/** Drei Durchläufe, damit das Band auf jeder Breite lückenlos bleibt. */
const BAND = [...sprueche, ...sprueche, ...sprueche];

/**
 * Laufband mit den Sprüchen. Dunkel auf Creme oder umgekehrt – es setzt den
 * frechen Ton, ohne dass ein Abschnitt dafür Platz abgeben muss.
 */
export function Spruchband({
  variante = "dunkel",
}: {
  variante?: "dunkel" | "hell";
}) {
  const reduceMotion = useReducedMotion();
  const dunkel = variante === "dunkel";

  return (
    <div
      aria-hidden
      className={`overflow-hidden border-y py-4 ${
        dunkel
          ? "border-ink-900 bg-ink-900 text-creme-100"
          : "border-beige-300 bg-beige-200 text-ink-700"
      }`}
    >
      <motion.div
        className="flex w-max items-center"
        animate={reduceMotion ? undefined : { x: ["0%", "-33.3333%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {BAND.map((spruch, i) => (
          <span key={`${spruch}-${i}`} className="flex items-center">
            <span className="px-6 text-[11px] tracking-[0.32em] whitespace-nowrap uppercase sm:text-xs">
              {spruch}
            </span>
            <span className={dunkel ? "text-beige-400" : "text-beige-500"}>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
      {/* Der Wortlaut steht einmal als Text für Vorlesewerkzeuge */}
      <span className="sr-only">{sprueche.join(". ")}</span>
    </div>
  );
}
