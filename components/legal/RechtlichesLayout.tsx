import type { ReactNode } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Footer } from "@/components/Footer";

/** Schlichter Rahmen für Impressum und Datenschutzerklärung. */
export function RechtlichesLayout({
  titel,
  stand,
  children,
}: {
  titel: string;
  stand: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-beige-200">
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
          <a
            href="/"
            aria-label="Zur Startseite"
            className="transition-opacity hover:opacity-80"
          >
            <BrandMark />
          </a>
          <a
            href="/"
            className="text-[11px] tracking-[0.24em] text-ink-500 uppercase transition-colors hover:text-ink-900"
          >
            Zurück
          </a>
        </div>
      </header>

      <main className="container-x max-w-3xl py-20 sm:py-28">
        <p className="label">Rechtliches</p>
        <h1 className="mt-5 text-3xl text-ink-900 sm:text-4xl">{titel}</h1>
        <p className="mt-4 text-xs tracking-[0.18em] text-ink-300 uppercase">
          Stand: {stand}
        </p>

        <div className="mt-14 space-y-12">{children}</div>
      </main>

      <Footer />
    </>
  );
}

/** Ein Abschnitt mit Überschrift. */
export function Abschnitt({
  titel,
  children,
}: {
  titel: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl text-ink-900">{titel}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-500 [&_a]:text-ink-900 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-bold [&_strong]:text-ink-900">
        {children}
      </div>
    </section>
  );
}
