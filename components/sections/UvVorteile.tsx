import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { uvVorteile } from "@/lib/site";

/**
 * Warum im Studio mit UV-Kleber gearbeitet wird. Steht direkt unter den
 * Sets: Es ist der Unterschied, den Kundinnen am Termin selbst merken.
 */
export function UvVorteile() {
  return (
    <section
      id="uv"
      aria-labelledby="uv-titel"
      className="bg-beige-200 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="uv-titel"
          edel
          eyebrow="Technik"
          spruch="cured in seconds"
          title={
            <>
              Warum <span className="text-ink-900">UV-Wimpern</span>
            </>
          }
          text={uvVorteile.intro}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {uvVorteile.punkte.map((punkt, i) => (
            <Reveal key={punkt.titel} delay={(i % 2) * 0.07}>
              <div className="karte h-full px-7 py-8 sm:px-8 sm:py-9">
                <h3 className="text-xl text-ink-900">{punkt.titel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {punkt.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
