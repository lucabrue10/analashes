import type { Metadata } from "next";
import { BookingCta } from "@/components/sections/BookingCta";
import { Faq } from "@/components/sections/Faq";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Techniken im Studio: 1 : 1, Soft Volumen, Hybrid, Wispy, Wet Look, Mega Volumen und Schulungen.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenSeite() {
  return (
    <>
      <Services />
      <Faq />
      <BookingCta />
    </>
  );
}
