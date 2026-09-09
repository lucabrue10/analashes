import Image from "next/image";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpruchWechsel } from "@/components/ui/SpruchWechsel";
import { gallery, site } from "@/lib/site";

/** Drei Aufnahmen über dem Namen – so von der Kundin gewünscht. */
const BILDER = [gallery[1], gallery[3], gallery[5]];

export function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="hero-titel"
      className="relative overflow-hidden bg-creme-100 pt-[var(--nav-h)]"
    >
      {/* Beiger Bogen hinter den Bildern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-beige-200"
      />

      <div className="container-x relative pt-10 pb-20 sm:pt-14 sm:pb-24">
        <Reveal>
          <p className="flex justify-center text-[10px] tracking-[0.42em] text-ink-500 uppercase">
            <SpruchWechsel />
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-5">
          {BILDER.map((bild, i) => (
            <Reveal key={bild.id} delay={i * 0.1}>
              <div
                className={`relative overflow-hidden rounded-[1.25rem] bg-beige-300 sm:rounded-[2rem] ${
                  // Das mittlere Bild steht etwas höher – gibt der Reihe Rhythmus
                  i === 1 ? "aspect-[3/4] sm:-translate-y-6" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={bild.src}
                  alt={bild.alt}
                  fill
                  priority={i === 1}
                  sizes="(max-width: 640px) 32vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center text-center sm:mt-14">
          <Reveal delay={0.15}>
            <h1 id="hero-titel">
              <BrandMark size="gross" />
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
              {site.slogan}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/buchen">Termin buchen</Button>
              <Button href="/preise" variant="ghost">
                Preise ansehen
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-7 text-xs leading-relaxed text-ink-300">
              {site.city} · Die genaue Adresse bekommst du mit der Bestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
