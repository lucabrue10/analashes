import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BrandMark } from "@/components/ui/BrandMark";

/**
 * Rahmen der Unterseiten. Die Startseite bleibt der Auftritt aus Banner,
 * Sets, Feedback und Vorstellung; alles Weitere liegt auf eigenen Seiten,
 * erreichbar über das Menü oben rechts.
 */
export default function SeitenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar brand={<BrandMark />} />
      <main id="inhalt" className="pt-[var(--nav-h)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
