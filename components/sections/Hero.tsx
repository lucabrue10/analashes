import Image from "next/image";
import { Wortmarke } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Die drei Aufnahmen unter dem Schriftzug. */
const BILDER = [
  {
    src: "/galerie/megavolumen-01.jpg",
    alt: "Mega-Volumen-Set, dicht und voll",
  },
  { src: "/galerie/wet-01.jpg", alt: "Wet-Look-Set mit geschlossenen Spitzen" },
  {
    src: "/galerie/megavolumen-04.jpg",
    alt: "Mega-Volumen-Set mit starkem Schwung",
  },
];

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
            <h1 id="hero-titel">
              <Wortmarke className="text-[clamp(1.7rem,5.6vw,3.9rem)]" />
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 text-pretty sm:text-lg">
              {site.heroZeile}
            </p>
          </div>
        </div>
      </div>

      {/* Drei Aufnahmen ueber die volle Breite, buendig nebeneinander.
          Darueber liegt ein durchsichtiger schwarzer Balken, der unten
          ein Stueck ueber die Bilder hinausragt. */}
      <div className="relative">
        <div className="grid grid-cols-3">
          {BILDER.map((bild, i) => (
            <figure
              key={bild.src}
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
            </figure>
          ))}
        </div>

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
              {site.city} · Die genaue Adresse erhältst du mit der
              Terminbestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
