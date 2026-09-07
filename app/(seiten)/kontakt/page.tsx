import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Termin über WhatsApp, Instagram oder Telefon – das Studio liegt auf dem Riedberg in Frankfurt am Main.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktSeite() {
  return <Contact />;
}
