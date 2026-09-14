import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Preise für Neuanfertigung, Auffüllen und Schulungen bei La Maison d'Ana Catarina in Frankfurt Riedberg.",
  alternates: { canonical: "/preise" },
};

export default function PreiseSeite() {
  return <Pricing />;
}
