import { Footer } from "@/components/Footer";
import { BrandMark } from "@/components/ui/BrandMark";
import { Navbar } from "@/components/Navbar";
import { Ablauf } from "@/components/sections/Ablauf";
import { BookingCta } from "@/components/sections/BookingCta";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { UeberMich } from "@/components/sections/UeberMich";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar brand={<BrandMark />} />
      <main id="inhalt">
        <Hero />
        <UeberMich />
        <Gallery />
        <Testimonials />
        <Services />
        <Pricing />
        <Studio />
        <Ablauf />
        <Faq />
        <BookingCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
