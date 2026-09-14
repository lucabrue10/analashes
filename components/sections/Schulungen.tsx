import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudioVideo } from "@/components/ui/StudioVideo";
import { schulungen } from "@/lib/site";

/**
 * Die Schulungen als eigene Seite. Oben eine Aufnahme aus einem
 * Schulungstag, darunter der Text und die Inhalte.
 */
export function Schulungen() {
  return (
    <section
      id="schulungen"
      aria-labelledby="schulungen-titel"
      className="bg-creme-100 pb-20 sm:pb-28"
    >
      <div className="container-x pt-14 pb-12 sm:pt-16 sm:pb-14">
        <SectionHeading
          id="schulungen-titel"
          edel
          eyebrow="Lernen bei mir"
          spruch="pass it on"
          title={<>{schulungen.titel}</>}
          text={schulungen.intro}
        />
      </div>

      {/* Die Aufnahme ist im Querformat 16:9. Der Rahmen hat genau dieses
          Verhältnis, damit auf dem Handy nichts beschnitten wird. */}
      <div className="bg-ink-900">
        <div className="relative mx-auto aspect-video w-full max-w-[1100px]">
          <StudioVideo
            label="Aufnahme von einem Schulungstag im Studio"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black/30"
          />
        </div>
      </div>

      <div className="container-x pt-16 sm:pt-20">
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="karte h-full px-7 py-9 sm:px-10 sm:py-10">
              <span className="label">Wie es abläuft</span>
              {schulungen.absaetze.map((absatz) => (
                <p
                  key={absatz}
                  className="mt-5 text-sm leading-relaxed text-ink-500"
                >
                  {absatz}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <div className="karte h-full px-7 py-9 sm:px-10 sm:py-10">
              <span className="label">Inhalte</span>
              <ul className="mt-6 space-y-3">
                {schulungen.inhalte.map((punkt) => (
                  <li
                    key={punkt}
                    className="flex gap-3.5 text-sm leading-relaxed text-ink-500"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-300"
                    />
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-[1.75rem] bg-beige-200 px-7 py-10 text-center sm:px-10">
            <p className="text-2xl text-ink-900">{schulungen.preis}</p>
            <p className="max-w-xl text-sm leading-relaxed text-ink-500 text-pretty">
              {schulungen.hinweis}
            </p>
            <Button href="/kontakt">Schulung anfragen</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
