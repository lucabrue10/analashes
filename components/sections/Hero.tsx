import { Wortmarke } from "@/components/ui/BrandMark";
import { StudioVideo } from "@/components/ui/StudioVideo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

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

      {/* Das Studio-Video laeuft stumm in Schleife. Die Aufnahme ist im
          Querformat 16:9; der Rahmen hat genau dieses Verhaeltnis, damit
          auf dem Handy nichts beschnitten wird. Auf grossen Bildschirmen
          begrenzt die Breite die Hoehe, sonst wuerde das Bild die halbe
          Seite fuellen. */}
      <div className="bg-ink-900">
        <div className="relative mx-auto aspect-video w-full max-w-[1100px]">
          <StudioVideo
            label="Aufnahme aus dem Studio von Ana Catarina"
            className="h-full w-full object-cover"
          />
          {/* Dunkler Schleier ueber der Aufnahme: nimmt dem hellen
              Material die Haerte und bindet es an das Schwarz der
              Knoepfe. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black/30"
          />
        </div>
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
