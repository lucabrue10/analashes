import { Fragment, type ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  /** Überschrift in der Bodoni des Schriftzugs statt in Arial. */
  edel?: boolean;
  /** Englischer Spruch unter der Überschrift – setzt den Ton der Seite. */
  spruch?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  /** Ohne Einblenden: Die Überschrift steht sofort da. */
  ruhig?: boolean;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  edel = false,
  spruch,
  title,
  text,
  align = "center",
  ruhig = false,
  id,
}: Props) {
  const zentriert = align === "center";
  // Auf ruhigen Seiten blendet nichts ein, der Text steht beim Laden da.
  const Huelle = ruhig
    ? ({ children }: { children: ReactNode; delay?: number }) => (
        <Fragment>{children}</Fragment>
      )
    : Reveal;
  return (
    <div className={zentriert ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Huelle>
          <span className="label">{eyebrow}</span>
        </Huelle>
      ) : null}
      <Huelle delay={0.03}>
        <h2
          id={id}
          style={
            edel
              ? {
                  fontOpticalSizing: "none",
                  fontVariationSettings: '"opsz" 16',
                }
              : undefined
          }
          className={
            edel
              ? // Dieselbe Bodoni wie der Schriftzug im Kopf: klein gesetzt,
                // in Versalien und weit gesperrt. Das bindet die Abschnitte
                // an die Marke, ohne dem Namen die Größe streitig zu machen.
                "mt-4 font-[family-name:var(--font-display)] text-[1.35rem] leading-[1.35] font-medium tracking-[0.14em] text-balance text-ink-900 uppercase sm:text-[1.7rem] md:text-[2rem]"
              : "mt-4 text-3xl leading-[1.15] font-normal text-balance text-ink-900 sm:text-4xl md:text-[2.75rem]"
          }
        >
          {title}
        </h2>
      </Huelle>
      {spruch ? (
        <Huelle delay={0.05}>
          <p className="mt-3 font-[family-name:var(--font-script)] text-2xl text-ink-700 sm:text-[1.75rem]">
            {spruch}
          </p>
        </Huelle>
      ) : null}
      {text ? (
        <Huelle delay={0.07}>
          <p
            className={`mt-5 text-base leading-relaxed text-ink-500 text-pretty ${zentriert ? "mx-auto" : ""}`}
          >
            {text}
          </p>
        </Huelle>
      ) : null}
    </div>
  );
}
