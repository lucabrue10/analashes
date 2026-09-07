import type { Metadata } from "next";
import { BookingCta } from "@/components/sections/BookingCta";
import { Studio } from "@/components/sections/Studio";

export const metadata: Metadata = {
  title: "Studio",
  description: "Das Studio auf dem Riedberg in Frankfurt am Main – ein Termin zur gleichen Zeit.",
  alternates: { canonical: "/studio" },
};

export default function StudioSeite() {
  return (
    <>
      <Studio />
      <BookingCta />
    </>
  );
}
