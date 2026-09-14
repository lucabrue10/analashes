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

      {/* Das Studio-Video läuft stumm in Schleife über die volle Breite.
          Auf dem Handy füllt es die Breite und wird oben und unten nur
          minimal beschnitten; auf großen Bildschirmen steht es mittig in
          seinem eigenen Format, damit nichts abgeschnitten wirkt. */}
      <div className="relative w-full overflow-hidden bg-ink-900">
        <div className="mx-auto h-[58svh] max-h-[560px] min-h-[300px] w-full sm:h-[62svh] sm:max-w-[min(100%,calc(62svh*0.5625))]">
          <StudioVideo
            label="Aufnahme aus dem Studio von Ana Catarina"
            className="h-full w-full object-cover"
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
              {site.city} · Die genaue Adresse bekommst du mit der Bestätigung.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
