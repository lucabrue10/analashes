import type { Metadata } from "next";
import { Stempelkarte } from "@/components/sections/Stempelkarte";

export const metadata: Metadata = {
  title: "Stempelkarte",
  description: "Die digitale Stempelkarte von La Maison d'Ana Catarina.",
  alternates: { canonical: "/stempelkarte" },
};

export default function StempelkarteSeite() {
  return <Stempelkarte />;
}
