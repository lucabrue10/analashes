import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BrandMark } from "@/components/ui/BrandMark";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { UeberMich } from "@/components/sections/UeberMich";

/**
 * Die Startseite endet nach der Vorstellung. Techniken, Preise, Studio,
 * Pflege und Kontakt liegen auf eigenen Seiten und sind über das Menü
 * oben rechts erreichbar; die Preise zusätzlich über den Knopf oben links.
 */
export default function Home() {
  return (
    <>
      <Navbar brand={<BrandMark />} />
      <main id="inhalt">
        <Hero />
        <Gallery />
        <Testimonials />
        <UeberMich />
      </main>
      <Footer />
    </>
  );
}
