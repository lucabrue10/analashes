"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceGroups, site, whatsappLink } from "@/lib/site";

/**
 * Terminanfrage in einem Formular.
 *
 * Die Anfrage geht bewusst über WhatsApp oder E-Mail hinaus: Es gibt keinen
 * Server, der Daten entgegennimmt, also verlässt hier nichts den Browser,
 * bevor die Kundin selbst auf Senden drückt. Ein echter Kalender mit
 * Zahlung braucht ein Buchungssystem – siehe Hinweis unten auf der Seite.
 */
const leistungen = priceGroups
  .filter((g) => g.title !== "Schulungen")
  .flatMap((g) => g.items.map((i) => `${g.title} · ${i.name} (${i.price})`));

const tageszeiten = ["vormittags", "nachmittags", "abends", "egal"];

export function Buchung() {
  const [leistung, setLeistung] = useState(leistungen[1] ?? leistungen[0]);
  const [datum, setDatum] = useState("");
  const [zeit, setZeit] = useState(tageszeiten[3]);
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");
  const [notiz, setNotiz] = useState("");

  const nachricht = useMemo(() => {
    const zeilen = [
      "Hallo Ana, ich möchte gerne einen Termin anfragen.",
      "",
      `Leistung: ${leistung}`,
      `Wunschtag: ${datum || "flexibel"}`,
      `Uhrzeit: ${zeit}`,
      `Name: ${name || "—"}`,
    ];
    if (insta.trim()) zeilen.push(`Instagram: ${insta.trim()}`);
    if (notiz.trim()) zeilen.push(`Notiz: ${notiz.trim()}`);
    return zeilen.join("\n");
  }, [leistung, datum, zeit, name, insta, notiz]);

  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(nachricht)}`;
  const mailLink = `mailto:${site.email}?subject=${encodeURIComponent("Terminanfrage")}&body=${encodeURIComponent(nachricht)}`;
  const bereit = name.trim().length > 1;

  return (
    <section
      id="buchen"
      aria-labelledby="buchen-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="buchen-titel"
          eyebrow="Termin"
          spruch="your seat, your rules"
          title={
            <>
              Deinen Platz{" "}
              <span className="text-beige-500 italic">reservieren</span>
            </>
          }
          text="Such dir dein Set aus, nenn mir deinen Wunschtag – den Rest klären wir im Chat. Die Anzahlung macht den Termin verbindlich, danach bekommst du die genaue Adresse."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="karte px-7 py-8 sm:px-9 sm:py-10">
              <div className="space-y-6">
                <label className="block">
                  <span className="label">Leistung</span>
                  <select
                    value={leistung}
                    onChange={(e) => setLeistung(e.target.value)}
                    className="mt-2.5 w-full rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900"
                  >
                    {leistungen.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="label">Wunschtag</span>
                    <input
                      type="date"
                      value={datum}
                      onChange={(e) => setDatum(e.target.value)}
                      className="mt-2.5 w-full rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900"
                    />
                  </label>

                  <label className="block">
                    <span className="label">Uhrzeit</span>
                    <select
                      value={zeit}
                      onChange={(e) => setZeit(e.target.value)}
                      className="mt-2.5 w-full rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900"
                    >
                      {tageszeiten.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="label">Dein Name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vorname"
                      autoComplete="given-name"
                      className="mt-2.5 w-full rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900 placeholder:text-ink-300"
                    />
                  </label>

                  <label className="block">
                    <span className="label">Instagram (optional)</span>
                    <input
                      type="text"
                      value={insta}
                      onChange={(e) => setInsta(e.target.value)}
                      placeholder="@deinname"
                      className="mt-2.5 w-full rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900 placeholder:text-ink-300"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="label">Noch etwas?</span>
                  <textarea
                    value={notiz}
                    onChange={(e) => setNotiz(e.target.value)}
                    rows={3}
                    placeholder="Erstes Mal, Allergien, Wunsch-Look …"
                    className="mt-2.5 w-full resize-none rounded-2xl border border-beige-300 bg-creme-50 px-4 py-3.5 text-sm text-ink-900 placeholder:text-ink-300"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={bereit ? waLink : undefined}
                  aria-disabled={!bereit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex flex-1 items-center justify-center rounded-full px-7 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                    bereit
                      ? "bg-ink-900 text-creme-100 hover:bg-ink-700"
                      : "pointer-events-none bg-beige-300 text-ink-300"
                  }`}
                >
                  Über WhatsApp senden
                </a>
                <a
                  href={bereit ? mailLink : undefined}
                  aria-disabled={!bereit}
                  className={`inline-flex flex-1 items-center justify-center rounded-full border px-7 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                    bereit
                      ? "border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-white"
                      : "pointer-events-none border-beige-300 text-ink-300"
                  }`}
                >
                  Per E-Mail senden
                </a>
              </div>

              {!bereit ? (
                <p className="mt-4 text-xs text-ink-300">
                  Trag deinen Namen ein, dann kannst du senden.
                </p>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-full rounded-[1.75rem] bg-beige-200 px-7 py-8 sm:px-9 sm:py-10">
              <p className="label">Gut zu wissen</p>
              <dl className="mt-6 space-y-6 text-sm leading-relaxed text-ink-700">
                <div>
                  <dt className="font-bold">Anzahlung {site.anzahlung}</dt>
                  <dd className="mt-1.5 text-ink-500">
                    Sichert deinen Platz und wird am Termin vom Preis abgezogen.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">Adresse</dt>
                  <dd className="mt-1.5 text-ink-500">
                    Kommt mit der Bestätigung – aus Rücksicht auf ein Studio zu
                    Hause steht sie nicht öffentlich auf der Seite.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">Absagen</dt>
                  <dd className="mt-1.5 text-ink-500">
                    Bis 24 Stunden vorher kostenlos. Danach wird der Termin in
                    voller Höhe berechnet.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">Lieber direkt schreiben?</dt>
                  <dd className="mt-1.5">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-ink-900"
                    >
                      WhatsApp {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
