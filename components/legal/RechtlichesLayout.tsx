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
      <header className="border-b border-white/[0.07]">
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
          <a href="/" aria-label="Zur Startseite" className="transition-opacity hover:opacity-80">
            <BrandMark />
          </a>
          <a
            href="/"
            className="text-[11px] tracking-[0.24em] text-white/50 uppercase transition-colors hover:text-lilac-200"
          >
            Zurück
          </a>
        </div>
      </header>

      <main className="container-x max-w-3xl py-20 sm:py-28">
        <p className="text-[10px] tracking-[0.42em] text-lilac-300/80 uppercase">Rechtliches</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-light text-white sm:text-5xl">
          {titel}
        </h1>
        <p className="mt-4 text-xs tracking-[0.18em] text-white/35 uppercase">Stand: {stand}</p>

        <div className="mt-14 space-y-12">{children}</div>
      </main>

      <Footer />
    </>
  );
}

/** Ein Abschnitt mit Überschrift. */
export function Abschnitt({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-light text-white">
        {titel}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/60 [&_a]:text-lilac-200 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-white/85">
        {children}
      </div>
    </section>
  );
}
