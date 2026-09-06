"use client";

import { useEffect, useState } from "react";

const RELOAD_KEY = "aanaa-chunk-reload";

/** Fehler, die nach einem Deploy auftreten, weil der Browser noch alte Dateien hat. */
const isStaleBundleError = (message: string) =>
  /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unexpected token '<'/i.test(
    message,
  );

/**
 * Fängt Fehler im Browser ab.
 *
 * Zwei Fälle: Nach einem Deploy hält der Browser oft noch alte JavaScript-
 * Dateien im Cache – dann genügt ein einmaliges Neuladen, das hier automatisch
 * passiert. Alles andere wird sichtbar gemacht, damit der Fehlertext ohne
 * Entwicklerkonsole ablesbar ist.
 */
export function ErrorReporter() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handle = (raw: unknown, source: string) => {
      const text =
        typeof raw === "string" ? raw : raw instanceof Error ? `${raw.name}: ${raw.message}` : String(raw);
      if (!text || text === "undefined") return;

      if (isStaleBundleError(text)) {
        try {
          if (sessionStorage.getItem(RELOAD_KEY)) return;
          sessionStorage.setItem(RELOAD_KEY, "1");
        } catch {
          // Speicher gesperrt – dann eben ohne Schutz vor Wiederholung
        }
        window.location.reload();
        return;
      }

      console.error(`[${source}]`, raw);
      setMessage(`${text}\n(${source})`);
    };

    const onError = (e: ErrorEvent) => handle(e.error ?? e.message, "error");
    const onRejection = (e: PromiseRejectionEvent) => handle(e.reason, "promise");

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    // Lief der Seitenaufbau durch, ist der Merker fürs Neuladen wieder frei
    const timer = setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        // ignorieren
      }
    }, 10_000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-3 bottom-3 z-[999] rounded-2xl border border-red-400/30 bg-black/90 p-4 text-left backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:max-w-md"
    >
      <p className="text-[10px] tracking-[0.28em] text-red-300/80 uppercase">Technischer Fehler</p>
      <pre className="mt-2 max-h-40 overflow-auto font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap text-white/70">
        {message}
      </pre>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(message)}
          className="rounded-full border border-white/15 px-4 py-1.5 text-[10px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
        >
          Kopieren
        </button>
        <button
          type="button"
          onClick={() => setMessage(null)}
          className="rounded-full border border-white/15 px-4 py-1.5 text-[10px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
