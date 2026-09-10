import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buchungsSchritte, site, whatsappLink } from "@/lib/site";

/**
 * Der Weg zum Termin. Gebucht wird im Kalender bei Fresha – verlinkt,
 * nicht eingebettet: So verlässt erst mit dem Klick ein Datum diese Seite,
 * und es braucht kein Einwilligungsbanner.
 */
export function Buchung() {
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
          text="Im Kalender siehst du meine freien Zeiten und buchst direkt. Die Anzahlung macht den Termin verbindlich – danach kommt die Bestätigung mit der genauen Adresse."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="karte flex h-full flex-col px-7 py-9 sm:px-10 sm:py-11">
              <ol className="space-y-7">
                {buchungsSchritte.map((schritt) => (
                  <li key={schritt.nummer} className="flex gap-5">
                    <span className="mt-0.5 text-[11px] tracking-[0.3em] text-beige-500">
                      {schritt.nummer}
                    </span>
                    <span>
                      <span className="block text-lg text-ink-900">
                        {schritt.titel}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">
                        {schritt.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 border-t border-beige-200 pt-8">
                <a
                  href={site.buchungUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-8 py-4.5 text-[11px] font-medium tracking-[0.22em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700"
                >
                  Freie Zeiten ansehen
                </a>
                <p className="mt-3.5 text-center text-xs text-ink-300">
                  Öffnet den Kalender bei Fresha. Dort wählst du Leistung, Tag
                  und Uhrzeit.
                </p>
              </div>
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
                    Steht in der Bestätigung – aus Rücksicht auf ein Studio zu
                    Hause nicht öffentlich auf der Seite.
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
                  <dt className="font-bold">Passt keine Zeit?</dt>
                  <dd className="mt-1.5">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-ink-900"
                    >
                      Schreib mir auf WhatsApp
                    </a>
                    , dann finden wir etwas.
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
