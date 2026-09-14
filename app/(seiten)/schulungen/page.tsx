import type { Metadata } from "next";
import { Schulungen } from "@/components/sections/Schulungen";

export const metadata: Metadata = {
  title: "Schulungen",
  description:
    "Wimpernschulungen bei La Maison d'Ana Catarina in Frankfurt Riedberg. Basis, Volumen und UV-Technik in kleinen Runden, Preise auf Anfrage.",
  alternates: { canonical: "/schulungen" },
};

export default function SchulungenSeite() {
  return <Schulungen />;
}
