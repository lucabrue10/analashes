import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "center", id }: Props) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.42em] text-lilac-300/90 uppercase">
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-lilac-400/70" />
          {eyebrow}
          <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-lilac-400/70" />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-light text-balance sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
      </Reveal>
      {text ? (
        <Reveal delay={0.16}>
          <p className={`mt-6 text-base leading-relaxed text-white/60 text-pretty sm:text-lg ${centered ? "mx-auto" : ""}`}>
            {text}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
