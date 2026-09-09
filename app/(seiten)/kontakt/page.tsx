import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu La Maison d'Ana Catarina: WhatsApp, Instagram oder Telefon. Das Studio liegt in Frankfurt am Main.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktSeite() {
  return <Contact />;
}
