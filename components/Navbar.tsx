"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { navItems, site } from "@/lib/site";

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

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

  useEffect(() => {
    const { style } = document.body;
    const vorher = style.overflow;
    style.overflow = open ? "hidden" : vorher || "";
    return () => {
      style.overflow = vorher || "";
    };
  }, [open]);

  useEffect(() => {
    if (open)
      panelRef.current
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-beige-200 bg-creme-100/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-x flex h-full items-center justify-between gap-3">
          {/* Links: der Name, immer zurück zur Startseite */}
          <a
            href="/"
            aria-label={`${site.name} – zur Startseite`}
            className="transition-opacity hover:opacity-70"
          >
            <BrandMark />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.buchungUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink-900 px-4 py-2.5 text-[9px] font-medium tracking-[0.16em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700 min-[400px]:px-5 min-[400px]:text-[10px] sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.22em]"
            >
              <span className="sm:hidden">Termin</span>
              <span className="hidden sm:inline">Termin buchen</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="hauptmenue"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige-300 bg-white transition-colors duration-300 hover:bg-creme-50"
            >
              <span aria-hidden className="relative block h-3 w-4.5">
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-ink-900"
                  animate={
                    open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.5px] rounded-full bg-ink-900"
                  animate={
                    open
                      ? { top: 5, rotate: -45, width: 18 }
                      : { top: 10, rotate: 0, width: 12 }
                  }
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="hauptmenue"
            ref={panelRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptmenü"
            className="fixed inset-0 z-40 overflow-y-auto bg-creme-100"
          >
            <nav className="container-x flex min-h-full flex-col justify-center pt-[calc(var(--nav-h)+2rem)] pb-14">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-b border-beige-200 py-4"
                    >
                      <span className="w-6 shrink-0 text-[10px] tracking-[0.26em] text-ink-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-2xl text-ink-900 transition-colors duration-300 group-hover:text-ink-500 sm:text-3xl">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[10px] tracking-[0.24em] text-ink-500 uppercase"
              >
                <a
                  href={`tel:${site.phoneHref}`}
                  className="hover:text-ink-900"
                >
                  {site.phone}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink-900"
                >
                  Instagram {site.instagramHandle}
                </a>
                <span>{site.city}</span>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
