"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { newsletter, site } from "@/lib/site";

/**
 * Anmeldung zum Newsletter.
 *
 * Es gibt noch keinen Versanddienst, deshalb öffnet der Knopf eine
 * vorbereitete E-Mail. So landet keine Adresse irgendwo, wo sie ohne
 * Einwilligung nichts zu suchen hätte. Sobald ein Dienst mit doppelter
 * Bestätigung eingerichtet ist, tritt hier dessen Formular an diese Stelle.
 */
export function Newsletter() {
  const [mail, setMail] = useState("");
  const gueltig = /.+@.+\..+/.test(mail);

  const link = `mailto:${site.email}?subject=${encodeURIComponent("Newsletter")}&body=${encodeURIComponent(
    `Bitte nimm mich in den Newsletter auf.\n\nE-Mail: ${mail}`,
  )}`;

  return (
    <section
      aria-labelledby="newsletter-titel"
      className="bg-ink-900 py-16 sm:py-20"
    >
      <div className="container-x">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h2
                id="newsletter-titel"
                className="text-2xl text-creme-100 sm:text-3xl"
              >
                {newsletter.titel}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-creme-200/70">
                {newsletter.text}
              </p>
            </div>

            <div className="w-full max-w-md">
              <label className="block">
                <span className="sr-only">Deine E-Mail-Adresse</span>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="deine@mail.de"
                    autoComplete="email"
                    className="w-full rounded-full border border-creme-200/20 bg-transparent px-6 py-3.5 text-sm text-creme-100 placeholder:text-creme-200/40"
                  />
                  <a
                    href={gueltig ? link : undefined}
                    aria-disabled={!gueltig}
                    className={`inline-flex shrink-0 items-center justify-center rounded-full px-7 py-3.5 text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                      gueltig
                        ? "bg-creme-100 text-ink-900 hover:bg-beige-200"
                        : "pointer-events-none bg-creme-100/20 text-creme-100/40"
                    }`}
                  >
                    Eintragen
                  </a>
                </div>
              </label>
              <p className="mt-3 text-xs text-creme-200/40">
                {newsletter.hinweis}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
