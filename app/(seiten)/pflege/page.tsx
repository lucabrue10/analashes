import type { Metadata } from "next";
import { Ablauf } from "@/components/sections/Ablauf";

export const metadata: Metadata = {
  title: "Pflege",
  description:
    "Vorbereitung auf den Termin, Pflege danach und die Regeln im Studio – damit dein Set lange schön bleibt.",
  alternates: { canonical: "/pflege" },
};

export default function PflegeSeite() {
  return <Ablauf />;
}
