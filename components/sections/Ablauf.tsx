import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aftercare, studioregeln, vorbereitung } from "@/lib/site";

function Liste({ punkte }: { punkte: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {punkte.map((punkt) => (
        <li
          key={punkt}
          className="flex gap-3.5 text-sm leading-relaxed text-ink-500"
        >
          <span
            aria-hidden
            className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-beige-500"
          />
          {punkt}
        </li>
      ))}
    </ul>
  );
}

/**
 * Alles, was vor und nach dem Termin gilt. Steht bewusst prominent auf der
 * Seite: Das spart Rückfragen und sorgt dafür, dass die Sets tatsächlich so
 * lange halten, wie sie können.
 */
export function Ablauf() {
  return (
    <section
      id="pflege"
      aria-labelledby="pflege-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="pflege-titel"
          eyebrow="Vorbereitung & Pflege"
          spruch="handle with care"
          title={
            <>
              Damit dein Set{" "}
              <span className="text-beige-500 italic">lange hält</span>
            </>
          }
          text="Zwei Dinge entscheiden über die Haltbarkeit: wie du zum Termin kommst und wie du die Wimpern danach behandelst."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="karte h-full px-7 py-9 sm:px-10 sm:py-10">
              <span className="label">Vor dem Termin</span>
              <h3 className="mt-4 text-2xl text-ink-900">
                {vorbereitung.titel}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                {vorbereitung.intro}
              </p>
              <Liste punkte={vorbereitung.punkte} />
              <p className="mt-7 border-t border-beige-200 pt-6 text-sm leading-relaxed text-ink-500">
                {vorbereitung.hinweis}
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <div className="karte h-full px-7 py-9 sm:px-10 sm:py-10">
              <span className="label">Nach dem Termin</span>
              <h3 className="mt-4 text-2xl text-ink-900">{aftercare.titel}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                {aftercare.intro}
              </p>
              <Liste punkte={aftercare.punkte} />
              <p className="mt-7 border-t border-beige-200 pt-6 text-sm leading-relaxed text-ink-900">
                {aftercare.wichtig}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-center text-xl text-ink-900">Im Studio gilt</h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studioregeln.map((regel, i) => (
              <Reveal key={regel.titel} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-[1.5rem] bg-beige-200/70 px-6 py-7">
                  <p className="text-[10px] tracking-[0.28em] text-ink-700 uppercase">
                    {regel.titel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {regel.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
