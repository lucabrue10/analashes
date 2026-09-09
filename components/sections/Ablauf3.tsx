import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buchungsSchritte } from "@/lib/site";

/** Die drei Schritte von der Anfrage bis zur Adresse. */
export function Ablauf3() {
  return (
    <section
      id="ablauf"
      aria-labelledby="ablauf-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="ablauf-titel"
          eyebrow="So läuft es"
          title="Drei Schritte, dann liegst du auf der Liege"
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {buchungsSchritte.map((schritt, i) => (
            <Reveal key={schritt.nummer} delay={i * 0.08}>
              <li className="karte h-full px-8 py-9">
                <p className="text-[11px] tracking-[0.3em] text-beige-500">
                  {schritt.nummer}
                </p>
                <h3 className="mt-4 text-xl text-ink-900">{schritt.titel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {schritt.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
