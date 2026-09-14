import { Reveal } from "@/components/ui/Reveal";
import { uvVorteile } from "@/lib/site";

/**
 * Kurzer Hinweis auf die UV-Technik, direkt unter den Sets. Bewusst
 * schmal gehalten: drei Saetze, keine Karten, kein eigener Block.
 */
export function UvVorteile() {
  return (
    <section
      id="uv"
      aria-labelledby="uv-titel"
      className="bg-beige-200 py-14 sm:py-16"
    >
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="label" id="uv-titel">
              {uvVorteile.titel}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-700 text-pretty sm:text-lg">
              {uvVorteile.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
