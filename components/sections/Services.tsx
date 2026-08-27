"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const reduceMotion = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.article
      variants={revealItem}
      onMouseMove={onMove}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-card)]"
    >
      {/* Licht folgt dem Cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at ${glow.x}% ${glow.y}%, rgba(169,131,247,0.16), transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-lilac-300/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-lilac-300/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.2em] text-white/50 uppercase">
          {service.tagline}
        </span>
      </div>

      <h3 className="relative mt-7 font-[family-name:var(--font-display)] text-3xl font-light text-white">
        {service.title}
      </h3>
      <p className="relative mt-4 text-sm leading-relaxed text-white/55">{service.description}</p>

      <ul className="relative mt-6 space-y-2.5">
        {service.details.map((d) => (
          <li key={d} className="flex items-center gap-3 text-sm text-white/65">
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-lilac-400" />
            {d}
          </li>
        ))}
      </ul>

      <div className="relative mt-8 flex items-end justify-between border-t border-white/[0.08] pt-6">
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">{service.duration}</span>
        <span className="font-[family-name:var(--font-display)] text-2xl text-lilac-200">{service.from}</span>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-lilac-700/12 blur-[140px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="leistungen-titel"
          eyebrow="Leistungen"
          title={
            <>
              Techniken, die zu <span className="text-gradient italic">dir</span> passen
            </>
          }
          text="Ob dezent oder glamourös – jedes Set wird auf deine Augenform, deine Naturwimpern und deinen Alltag abgestimmt. Beratung ist immer inklusive."
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
