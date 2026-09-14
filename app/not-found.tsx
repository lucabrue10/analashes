import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

/**
 * Eigene 404-Seite. Wichtig ist vor allem die Fußzeile: Impressum und
 * Datenschutz müssen von jeder Seite aus erreichbar sein.
 */
export default function NichtGefunden() {
  return (
    <>
      <Navbar />
      <main
        id="inhalt"
        className="flex min-h-[70vh] items-center pt-[var(--nav-h)]"
      >
        <div className="container-x py-20 text-center">
          <p className="label">Fehler 404</p>
          <h1 className="mt-4 text-3xl leading-[1.15] text-balance text-ink-900 sm:text-4xl">
            Diese Seite gibt es nicht
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-500 text-pretty">
            Vielleicht hat sich die Adresse geändert. Über das Menü oben rechts
            findest du alles, oder du gehst zurück zum Start.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/">Zur Startseite</Button>
            <Button href="/buchen" variant="ghost">
              Termin buchen
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
