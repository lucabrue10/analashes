import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, ueberMich } from "@/lib/site";

export function UeberMich() {
  return (
    <section
      id="ueber-mich"
      aria-labelledby="ueber-mich-titel"
      className="bg-beige-200/60 py-20 sm:py-28"
    >
      {/* Auf dem Telefon untereinander, ab Tablet Foto links und Text rechts */}
      <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <Reveal direction="right">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-beige-300 bg-beige-300 shadow-[var(--shadow-soft)]">
            <Image
              src={ueberMich.bild}
              alt={ueberMich.bildAlt}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute right-6 bottom-6 left-6">
              <p className="rounded-full bg-creme-100/90 px-5 py-2.5 text-center text-[10px] tracking-[0.3em] text-ink-700 uppercase">
                Ana Catarina · {site.city}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="ueber-mich-titel"
            eyebrow="Über mich"
            align="left"
            title={
              <>
                Hinter jedem Set{" "}
                <span className="text-beige-500 italic">steht Ana</span>
              </>
            }
          />

          <div className="mt-7 space-y-5">
            {ueberMich.absaetze.map((absatz, i) => (
              <Reveal key={absatz.slice(0, 24)} delay={0.08 + i * 0.06}>
                <p className="text-base leading-relaxed text-ink-500 text-pretty">
                  {absatz}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
