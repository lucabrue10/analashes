import type { Metadata } from "next";
import { Buchung } from "@/components/sections/Buchung";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Termin buchen",
  description:
    "Termin bei La Maison d'Ana Catarina anfragen: Set auswählen, Wunschtag nennen, Anzahlung sichert den Platz – die Adresse kommt mit der Bestätigung.",
  alternates: { canonical: "/buchen" },
};

export default function BuchenSeite() {
  return (
    <>
      <Buchung />
      <Faq />
    </>
  );
}
