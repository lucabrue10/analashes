import Image from "next/image";
import { Wortmarke } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { gallery, site } from "@/lib/site";

/** Drei Aufnahmen unter dem Namen. */
const BILDER = [gallery[1], gallery[3], gallery[5]];

export function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="hero-titel"
      className="relative overflow-hidden bg-creme-100 pt-[var(--nav-h)]"
    >
      <div className="bg-beige-200">
        <div className="container-x relative pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div className="flex flex-col items-center text-center">
            {/* Handgeschrieben und leicht schief – wie mit dem Marker
                über den Namen gekritzelt. */}
            <p
              aria-hidden
              className="-mb-2 -rotate-3 font-[family-name:var(--font-marker)] text-[clamp(1.1rem,3.4vw,2rem)] leading-[1.15] text-ink-900 sm:-mb-4 sm:-rotate-2"
            >
              Better than your f*cking Ex
            </p>
            <span className="sr-only">Better than your f*cking Ex</span>

            <h1 id="hero-titel" className="mt-4">
              <Wortmarke className="text-[clamp(1.7rem,5.6vw,3.9rem)]" />
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
              {site.slogan}
            </p>

            {/* Zweiter Markerzug, in die andere Richtung gekippt */}
            <p
              aria-hidden
              className="mt-4 rotate-2 font-[family-name:var(--font-marker)] text-[clamp(1rem,2.8vw,1.6rem)] text-ink-900 sm:mt-5 sm:rotate-1"
            >
              Only in Frankfurt...
            </p>
            <span className="sr-only">Only in Frankfurt...</span>
          </div>
        </div>
      </div>

      {/* Die Bilder laufen über die volle Breite. Darüber liegt ein
          durchsichtiger schwarzer Balken, der über das untere Drittel geht
          und unten aus den Bildern herausragt – das legt die Reihe in
          Ebenen, ganz ohne Beschriftung. */}
      <div className="relative">
        <div className="grid grid-cols-3">
          {BILDER.map((bild, i) => (
            <figure
              key={bild.id} // Feste Höhe statt Seitenverhältnis: So bleiben die Knöpfe darunter
              // auch auf einem Laptop ohne Scrollen sichtbar.
              className="relative h-[clamp(200px,31vh,360px)] overflow-hidden"
            >
              <Image
                src={bild.src}
                alt={bild.alt}
                fill
                priority={i === 1}
                sizes="33vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,transparent_26%)]"
              />
            </figure>
          ))}
        </div>

        {/* Der Balken: ein Drittel hoch, über die volle Breite, unten ein
            Stück über die Bilder hinaus. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-18px] h-[36%] border-t border-white/20 bg-black/45"
        />
      </div>

      <div className="container-x relative pt-10 pb-14 sm:pt-12 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/buchen">Termin buchen</Button>
            <Button href="/preise" variant="ghost">
              Preise ansehen
            </Button>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-7 text-xs leading-relaxed text-ink-300">
              {site.city} · Die genaue Adresse bekommst du mit der Bestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
