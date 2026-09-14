import type { Metadata } from "next";
import { Buchung } from "@/components/sections/Buchung";

export const metadata: Metadata = {
  title: "Termin buchen",
  description:
    "Termin bei La Maison d'Ana Catarina anfragen: Set auswählen, Wunschtag nennen, Anzahlung sichert den Platz, die Adresse erhältst du mit der Terminbestätigung.",
  alternates: { canonical: "/buchen" },
};

export default function BuchenSeite() {
  return <Buchung />;
}
