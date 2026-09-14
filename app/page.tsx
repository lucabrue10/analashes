import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Ablauf3 } from "@/components/sections/Ablauf3";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Spruchband } from "@/components/ui/Spruchband";
import { Testimonials } from "@/components/sections/Testimonials";
import { UeberMich } from "@/components/sections/UeberMich";
import { UvVorteile } from "@/components/sections/UvVorteile";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero />
        <Spruchband />
        <Gallery />
        <UvVorteile />
        <Testimonials />
        <Spruchband variante="hell" />
        <UeberMich />
        <Faq />
        <Ablauf3 />
      </main>
      <Footer />
    </>
  );
}
