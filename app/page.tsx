import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Ablauf3 } from "@/components/sections/Ablauf3";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { Testimonials } from "@/components/sections/Testimonials";
import { UeberMich } from "@/components/sections/UeberMich";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero />
        <Ablauf3 />
        <Gallery />
        <Testimonials />
        <UeberMich />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
