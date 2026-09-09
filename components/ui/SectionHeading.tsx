import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  /** Englischer Spruch unter der Überschrift – setzt den Ton der Seite. */
  spruch?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  spruch,
  title,
  text,
  align = "center",
  id,
}: Props) {
  const zentriert = align === "center";
  return (
    <div className={zentriert ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Reveal>
          <span className="label">{eyebrow}</span>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-4 text-3xl leading-[1.15] font-normal text-balance text-ink-900 sm:text-4xl md:text-[2.75rem]"
        >
          {title}
        </h2>
      </Reveal>
      {spruch ? (
        <Reveal delay={0.1}>
          <p className="mt-3 font-[family-name:var(--font-script)] text-2xl text-beige-500 sm:text-[1.75rem]">
            {spruch}
          </p>
        </Reveal>
      ) : null}
      {text ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-base leading-relaxed text-ink-500 text-pretty ${zentriert ? "mx-auto" : ""}`}
          >
            {text}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
