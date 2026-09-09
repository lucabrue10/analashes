"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stempelkarte } from "@/lib/site";

const SPEICHER = "maison-stempel";

/**
 * Digitale Stempelkarte.
 *
 * Der Stand liegt im Browser der Kundin (localStorage) – es gibt keinen
 * Server, der ihn führen könnte. Das reicht als Ersatz für die Karte aus
 * Papier: Wer schummelt, betrügt sich vor allem selbst, und Ana sieht am
 * Termin ohnehin, wie oft jemand da war. Wird der Browser geleert, ist die
 * Karte weg – das steht so auch auf der Seite.
 */
export function Stempelkarte() {
  const [stempel, setStempel] = useState(0);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    try {
      const wert = Number(window.localStorage.getItem(SPEICHER) ?? "0");
      if (Number.isFinite(wert))
        setStempel(Math.min(Math.max(wert, 0), stempelkarte.felder));
    } catch {
      // Privater Modus oder gesperrte Speicherung – dann bleibt die Karte leer
    }
    setGeladen(true);
  }, []);

  const setzen = (wert: number) => {
    const neu = Math.min(Math.max(wert, 0), stempelkarte.felder);
    setStempel(neu);
    try {
      window.localStorage.setItem(SPEICHER, String(neu));
    } catch {
      // Nicht schlimm – die Anzeige stimmt für diesen Besuch trotzdem
    }
  };

  const voll = stempel >= stempelkarte.felder;

  return (
    <section
      id="stempelkarte"
      aria-labelledby="stempelkarte-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="stempelkarte-titel"
          eyebrow="Treue"
          title={
            <>
              Deine <span className="text-beige-500 italic">Stempelkarte</span>
            </>
          }
          text={stempelkarte.hinweis}
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-xl">
            <div className="karte px-7 py-9 sm:px-10 sm:py-11">
              <div className="flex items-baseline justify-between">
                <p className="label">La Maison</p>
                <p className="text-[10px] tracking-[0.24em] text-ink-300 uppercase">
                  {stempel} / {stempelkarte.felder}
                </p>
              </div>

              <ul className="mt-7 grid grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: stempelkarte.felder }, (_, i) => {
                  const gesetzt = geladen && i < stempel;
                  return (
                    <li
                      key={i}
                      className={`flex aspect-square items-center justify-center rounded-full border text-sm transition-colors duration-500 ${
                        gesetzt
                          ? "border-ink-900 bg-ink-900 text-creme-100"
                          : "border-dashed border-beige-400 bg-creme-50 text-beige-400"
                      }`}
                    >
                      <span aria-hidden>{gesetzt ? "✓" : i + 1}</span>
                      <span className="sr-only">
                        {gesetzt
                          ? `Termin ${i + 1} eingelöst`
                          : `Feld ${i + 1} frei`}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-7 text-sm leading-relaxed text-ink-500">
                {voll ? (
                  <>
                    Karte voll:{" "}
                    <strong className="text-ink-900">
                      {stempelkarte.belohnung}
                    </strong>
                    . Zeig mir die Karte einfach beim nächsten Termin.
                  </>
                ) : (
                  <>
                    Noch {stempelkarte.felder - stempel}{" "}
                    {stempelkarte.felder - stempel === 1 ? "Termin" : "Termine"}{" "}
                    bis zur Belohnung: {stempelkarte.belohnung}.
                  </>
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-beige-200 pt-6">
                <button
                  type="button"
                  onClick={() => setzen(stempel + 1)}
                  disabled={voll}
                  className="rounded-full bg-ink-900 px-6 py-3 text-[10px] font-medium tracking-[0.22em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700 disabled:bg-beige-300 disabled:text-ink-300"
                >
                  Stempel setzen
                </button>
                <button
                  type="button"
                  onClick={() => setzen(0)}
                  className="rounded-full border border-beige-300 px-6 py-3 text-[10px] font-medium tracking-[0.22em] text-ink-500 uppercase transition-colors duration-300 hover:bg-white"
                >
                  Zurücksetzen
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
