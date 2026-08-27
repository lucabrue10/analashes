"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openingHours, site, whatsappLink } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.19-1.36a9.9 9.9 0 0 0 4.85 1.26h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.14c-.25.7-1.44 1.34-2 1.38-.51.04-1.16.06-1.87-.12-.43-.11-.99-.33-1.7-.64-3-1.3-4.96-4.32-5.11-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.05-2.5.27-.3.6-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.75 1.24 1.61 2 1.11.99 2.04 1.3 2.34 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.3 21 3 12.7 3 2.9c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.3Z" />
    </svg>
  );
}

const channels = [
  {
    label: "WhatsApp",
    value: "Direkt schreiben",
    href: whatsappLink,
    external: true,
    icon: <WhatsAppIcon />,
    note: "Antwort meist innerhalb weniger Stunden",
  },
  {
    label: "Telefon",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    external: false,
    icon: <PhoneIcon />,
    note: "Während der Öffnungszeiten erreichbar",
  },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
    icon: <InstagramIcon />,
    note: "Aktuelle Sets und freie Termine",
  },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  // Erst nach dem Mount ermitteln – sonst weicht das Server-HTML vom Client ab.
  const [dayIndex, setDayIndex] = useState(-1);

  useEffect(() => {
    setDayIndex(new Date().getDay()); // 0 = Sonntag
  }, []);

  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 bottom-0 h-[440px] w-[440px] rounded-full bg-lilac-600/12 blur-[150px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="kontakt-titel"
          eyebrow="Kontakt"
          title={
            <>
              Bereit für deinen <span className="text-gradient italic">neuen Blick?</span>
            </>
          }
          text="Schreib mir per WhatsApp oder Instagram, ruf einfach an – oder komm nach Terminvereinbarung vorbei."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-3" stagger={0.1}>
          {channels.map((c) => (
            <motion.a
              key={c.label}
              variants={revealItem}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="glass group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lilac-500/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lilac-200 transition-colors duration-500 group-hover:border-lilac-400/40 group-hover:text-lilac-100">
                {c.icon}
              </span>
              <span className="relative">
                <span className="block text-[10px] tracking-[0.3em] text-white/40 uppercase">{c.label}</span>
                <span className="mt-2 block font-[family-name:var(--font-display)] text-2xl text-white">
                  {c.value}
                </span>
                <span className="mt-2 block text-xs text-white/45">{c.note}</span>
              </span>
              <span
                aria-hidden
                className="relative mt-auto inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-lilac-300/80 uppercase transition-transform duration-500 group-hover:translate-x-1"
              >
                Öffnen →
              </span>
            </motion.a>
          ))}
        </RevealGroup>

        <div className="mt-6 grid gap-5 lg:grid-cols-5">
          <Reveal direction="right" className="lg:col-span-2">
            <div className="glass h-full rounded-3xl p-8 shadow-[var(--shadow-card)]">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-light text-white">
                Öffnungszeiten
              </h3>
              <dl className="mt-6 space-y-1">
                {openingHours.map((o, i) => {
                  const isToday = (i + 1) % 7 === dayIndex;
                  return (
                    <div
                      key={o.day}
                      className={`flex items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors duration-500 ${
                        isToday ? "bg-lilac-500/10" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <dt className={`text-sm ${isToday ? "text-lilac-100" : "text-white/60"}`}>
                        {o.day}
                        {isToday ? (
                          <span className="ml-2 text-[9px] tracking-[0.2em] text-lilac-300 uppercase">heute</span>
                        ) : null}
                      </dt>
                      <dd
                        className={`text-sm tracking-wide ${
                          o.time === "geschlossen" ? "text-white/30" : isToday ? "text-white" : "text-white/70"
                        }`}
                      >
                        {o.time}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Adresse</p>
                <address className="mt-3 text-sm leading-relaxed text-white/70 not-italic">
                  {site.name}
                  <br />
                  {site.street}
                  <br />
                  {site.postalCode} {site.city}
                </address>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-lilac-200 uppercase transition-colors hover:text-lilac-100"
                >
                  Route planen
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            <div className="glass relative h-full min-h-[380px] overflow-hidden rounded-3xl p-2 shadow-[var(--shadow-card)]">
              <iframe
                title={`Karte: Standort von ${site.name}`}
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-[364px] w-full rounded-[1.35rem] border-0 opacity-90 grayscale-[0.55] transition-all duration-700 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
