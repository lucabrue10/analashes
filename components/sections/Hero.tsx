import Image from "next/image";
import { Wortmarke } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpruchWechsel } from "@/components/ui/SpruchWechsel";
import { gallery, site } from "@/lib/site";

/** Drei Aufnahmen unter dem Namen – die mittlere steht größer im Bogen. */
const BILDER = [gallery[1], gallery[3], gallery[5]];

export function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="hero-titel"
      className="relative overflow-hidden bg-creme-100 pt-[var(--nav-h)]"
    >
      <div className="bg-beige-200">
        <div className="container-x relative pt-12 pb-14 sm:pt-16 sm:pb-16">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <p className="flex justify-center text-[10px] tracking-[0.42em] text-ink-500 uppercase">
                <SpruchWechsel />
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 id="hero-titel" className="mt-6">
                <Wortmarke className="text-[clamp(2.6rem,9vw,6rem)]" />
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
                {site.slogan}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Die Bilder laufen über die volle Breite – große Flächen, dazwischen
          nur eine Fuge. Über jedem liegt ein leicht durchsichtiger schwarzer
          Balken mit der Technik. */}
      <div className="relative grid grid-cols-3 gap-[3px] sm:gap-1">
        {BILDER.map((bild, i) => (
          <Reveal key={bild.id} delay={0.2 + i * 0.08}>
            <figure className="group relative aspect-[1/1.95] overflow-hidden sm:aspect-[3/4]">
              <Image
                src={bild.src}
                alt={bild.alt}
                fill
                priority={i === 1}
                sizes="33vw"
                className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              {/* Tiefe von oben und unten, damit die Reihe zusammen wirkt */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22)_0%,transparent_28%,transparent_58%,rgba(0,0,0,0.3)_100%)]"
              />
              <figcaption className="absolute inset-x-0 bottom-[13%] border-y border-white/15 bg-black/45 py-3.5 text-center backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-black/55 sm:py-5">
                <span className="text-[9px] tracking-[0.3em] text-white uppercase sm:text-xs sm:tracking-[0.42em]">
                  {bild.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="container-x relative pb-20 sm:pb-24">
        <div className="mt-12 flex flex-col items-center text-center sm:mt-14">
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                href={site.buchungUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Termin buchen
              </Button>
              <Button href="/preise" variant="ghost">
                Preise ansehen
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <p className="mt-7 text-xs leading-relaxed text-ink-300">
              {site.city} · Die genaue Adresse bekommst du mit der Bestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
