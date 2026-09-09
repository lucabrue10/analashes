import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { feedback, site } from "@/lib/site";

/**
 * Rückmeldungen als Ausschnitt der Nachricht selbst – freigestellte Blasen
 * direkt auf dem Creme-Grund. Der Wortlaut steht zusätzlich als Text im
 * Markup, damit Vorlesewerkzeuge und Suchmaschinen ihn erfassen.
 */
export function Testimonials() {
  return (
    <section
      id="feedback"
      aria-labelledby="feedback-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="feedback-titel"
          eyebrow="Feedback"
          title={
            <>
              Was danach im{" "}
              <span className="text-beige-500 italic">Postfach</span> landet
            </>
          }
          text="Nachrichten von Kundinnen nach ihrem Termin – unverändert, so wie sie angekommen sind."
        />

        <div className="mt-14 columns-1 gap-7 md:columns-2 lg:columns-3 [&>*]:mb-7">
          {feedback.map((f, i) => (
            <Reveal
              key={f.src}
              delay={(i % 3) * 0.08}
              className="break-inside-avoid"
            >
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt="" loading="lazy" className="w-full" />
                <figcaption className="mt-3 pl-1 text-[10px] tracking-[0.24em] text-ink-300 uppercase">
                  Kundin · {f.datum}
                  <span className="sr-only">: {f.text}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-sm text-ink-500">
            Mehr davon täglich auf{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-ink-900"
            >
              Instagram {site.instagramHandle}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
