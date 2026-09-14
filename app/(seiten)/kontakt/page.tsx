import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu La Maison d'Ana Catarina: Instagram oder E-Mail. Das Studio liegt in Frankfurt Riedberg.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktSeite() {
  return <Contact />;
}
