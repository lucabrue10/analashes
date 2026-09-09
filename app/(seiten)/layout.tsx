import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

/** Rahmen der Unterseiten: dieselbe Kopfzeile, derselbe Fuß. */
export default function SeitenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="pt-[var(--nav-h)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
