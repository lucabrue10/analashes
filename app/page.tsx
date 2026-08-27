import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BookingCta } from "@/components/sections/BookingCta";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero />
        <Services />
        <Pricing />
        <Studio />
        <Gallery />
        <Testimonials />
        <Faq />
        <BookingCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
