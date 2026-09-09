"use client";

import { useEffect } from "react";

/**
 * Auffangnetz für Fehler im Browser. Statt der nackten Next-Meldung sieht die
 * Besucherin eine Seite im Look der Marke – und die Kennung des Fehlers, die
 * bei der Fehlersuche weiterhilft.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fehler auf der Seite:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="karte w-full max-w-lg p-10 text-center">
        <p className="label">
          Kurz gestolpert
        </p>
        <h1 className="mt-5 text-3xl text-ink-900 sm:text-4xl">
          Die Seite konnte nicht geladen werden
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Meist hilft schon ein Neuladen. Bleibt es dabei, erreichst du uns
          jederzeit direkt.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink-900 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700"
          >
            Neu laden
          </button>
          <a
            href="/"
            className="rounded-full border border-beige-300 px-7 py-3.5 text-[11px] font-medium tracking-[0.22em] text-ink-700 uppercase transition-colors duration-300 hover:bg-white"
          >
            Zur Startseite
          </a>
        </div>

        {error.digest ? (
          <p className="mt-8 font-mono text-[10px] tracking-widest text-white/25">
            Kennung: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
