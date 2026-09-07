import type { Metadata } from "next";
import { BookingCta } from "@/components/sections/BookingCta";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Preise für Neuanfertigung, Auffüllen und Schulungen – inklusive Beratung, Mapping und Pflegeempfehlung.",
  alternates: { canonical: "/preise" },
};

export default function PreiseSeite() {
  return (
    <>
      <Pricing />
      <BookingCta />
    </>
  );
}
