import { heroPhoto } from "@/lib/heroPhoto";
import { Eyes } from "./Eyes";
import { PhotoEyes } from "./PhotoEyes";

/** Zeigt das kalibrierte Foto, solange eines hinterlegt ist – sonst die Zeichnung. */
export function HeroEyes() {
  return heroPhoto ? <PhotoEyes photo={heroPhoto} /> : <Eyes />;
}
