import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { priceGroups, site } from "@/lib/site";

export function Pricing() {
  return (
    <section
      id="preise"
      aria-labelledby="preise-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="preise-titel"
          eyebrow="Preise"
          spruch="no hidden fees, ever"
          title={
            <>
              Transparent, fair,{" "}
              <span className="text-beige-500 italic">
                ohne Kleingedrucktes
              </span>
            </>
          }
          text={`Alle Preise inklusive Beratung, Mapping und Pflegeempfehlung. Die Anzahlung von ${site.anzahlung} sichert deinen Termin und wird verrechnet.`}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {priceGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08}>
              <div className="karte h-full px-7 py-9 sm:px-9">
                <header>
                  <h3 className="text-2xl text-ink-900">{group.title}</h3>
                  {group.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {group.note}
                    </p>
                  ) : null}
                </header>

                <div className="mt-7 divide-y divide-beige-200">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className={`flex items-baseline justify-between gap-4 py-4 ${
                        item.featured
                          ? "-mx-3 rounded-2xl bg-beige-200/70 px-3"
                          : ""
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="text-[15px] text-ink-900">
                          {item.name}
                          {item.featured ? (
                            <span className="ml-2 text-[9px] tracking-[0.2em] text-beige-500 uppercase">
                              beliebt
                            </span>
                          ) : null}
                        </span>
                        {item.meta ? (
                          <span className="mt-1 text-[10px] tracking-[0.2em] text-ink-300 uppercase">
                            {item.meta}
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-lg text-ink-900">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <a
              href="/buchen"
              className="inline-flex items-center justify-center rounded-full bg-ink-900 px-8 py-4 text-[11px] font-medium tracking-[0.22em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700"
            >
              Termin buchen
            </a>
            <p className="text-xs text-ink-300">
              Preise gelten pro Termin. Schulungen nach Absprache.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
