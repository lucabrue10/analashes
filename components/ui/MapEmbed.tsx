"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Karte mit vorgeschalteter Zustimmung.
 *
 * Google Maps überträgt beim Laden die IP-Adresse der Besucherin an Google und
 * setzt Cookies. Deshalb wird zunächst nur eine Vorschau gezeigt; die Karte
 * lädt erst, wenn jemand sie ausdrücklich anfordert. Ohne Klick verlässt kein
 * Datum die Seite – damit ist dafür auch kein Einwilligungsbanner nötig.
 */
export function MapEmbed() {
  const [geladen, setGeladen] = useState(false);

  if (geladen) {
    return (
      <iframe
        title={`Karte: Standort von ${site.name}`}
        src={site.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full min-h-[364px] w-full rounded-[1.35rem] border-0 opacity-90 grayscale-[0.55] transition-all duration-700 hover:opacity-100 hover:grayscale-0"
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[364px] w-full flex-col items-center justify-center overflow-hidden rounded-[1.35rem] px-8 text-center">
      {/* Angedeutetes Kartenbild, damit die Fläche nicht leer wirkt */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(192,167,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(192,167,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(144,97,232,0.18),transparent_70%)]"
      />

      <p className="relative text-[10px] tracking-[0.34em] text-lilac-200/80 uppercase">Anfahrt</p>
      <p className="relative mt-4 font-[family-name:var(--font-display)] text-2xl text-white">
        {site.district} · {site.postalCode} {site.city}
      </p>
      <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-white/50">
        Die Karte wird von Google geladen. Dabei wird deine IP-Adresse an Google übertragen – deshalb
        fragen wir vorher.
      </p>

      <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
        <motion.button
          type="button"
          onClick={() => setGeladen(true)}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="rounded-full bg-gradient-to-r from-lilac-600 to-lilac-400 px-7 py-3 text-[11px] font-medium tracking-[0.24em] text-white uppercase"
        >
          Karte laden
        </motion.button>
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-full px-7 py-3 text-[11px] font-medium tracking-[0.24em] text-white/80 uppercase transition-colors duration-500 hover:text-white"
        >
          In Google Maps öffnen
        </a>
      </div>
    </div>
  );
}
