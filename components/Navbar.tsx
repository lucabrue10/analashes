"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navItems, site, whatsappLink } from "@/lib/site";
import { Logo } from "./ui/Logo";
import { Wordmark } from "./ui/Wordmark";

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.06, delayChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.3, when: "afterChildren", staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 18, filter: "blur(6px)", transition: { duration: 0.25 } },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Menü schließen bei Escape, Fokus zurück auf den Button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll sperren, solange das Overlay offen ist
  useEffect(() => {
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = open ? "hidden" : previous || "";
    return () => {
      style.overflow = previous || "";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const first = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
      first?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-x flex h-full items-center justify-between">
          <a
            href="#start"
            className="group flex items-center gap-3"
            aria-label={`${site.name} – zum Seitenanfang`}
            onClick={() => setOpen(false)}
          >
            <Logo className="h-9 w-9 transition-transform duration-700 group-hover:rotate-6" />
            <Wordmark />
          </a>

          <div className="flex items-center gap-4">
            <a
              href="#kontakt"
              className="hidden text-[11px] font-medium tracking-[0.26em] text-white/60 uppercase transition-colors duration-500 hover:text-lilac-200 md:block"
            >
              {site.phone}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="hauptmenue"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="glass group relative flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 hover:bg-white/[0.08]"
            >
              <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-white"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute top-[6px] left-0 block h-[1.5px] w-5 rounded-full bg-white"
                  animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.5px] rounded-full bg-white"
                  animate={open ? { top: 6, rotate: -45, width: 20 } : { top: 12, rotate: 0, width: 13 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Lesefortschritt */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-lilac-500 via-lilac-300 to-champagne"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="hauptmenue"
            ref={panelRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink-950/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptmenü"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lilac-600/20 blur-[140px]" />
              <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-lilac-800/25 blur-[130px]" />
            </div>

            <nav className="container-x relative pt-[calc(var(--nav-h)+2rem)] pb-16">
              <ul className="flex flex-col gap-1 sm:gap-2">
                {navItems.map((item, i) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-2.5 sm:py-3"
                    >
                      <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.3em] text-lilac-400/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative font-[family-name:var(--font-display)] text-4xl font-light text-white/80 transition-colors duration-500 group-hover:text-white sm:text-5xl md:text-6xl">
                        {item.label}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-lilac-300 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </span>
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={itemVariants} className="mt-6">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-lilac-600 to-lilac-400 px-8 py-4 text-xs font-medium tracking-[0.24em] text-white uppercase shadow-[0_20px_60px_-24px_rgba(144,97,232,0.95)] transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    Termin buchen
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </motion.li>
              </ul>

              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/10 pt-8 text-xs tracking-[0.22em] text-white/45 uppercase"
              >
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-lilac-200">
                  {site.phone}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-lilac-200"
                >
                  Instagram {site.instagramHandle}
                </a>
                <span>
                  {site.district} · {site.city}
                </span>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
