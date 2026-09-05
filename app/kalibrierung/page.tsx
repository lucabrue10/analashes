import type { Metadata } from "next";
import { Calibrator } from "./Calibrator";

export const metadata: Metadata = {
  title: "Hero-Foto kalibrieren",
  robots: { index: false, follow: false },
};

export default function KalibrierungPage() {
  return <Calibrator />;
}
