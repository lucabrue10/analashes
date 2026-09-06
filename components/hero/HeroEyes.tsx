import { join } from "node:path";
import { heroPhoto } from "@/lib/heroPhoto";
import { readImageSize } from "@/lib/imageSize";
import { Eyes } from "./Eyes";
import { PhotoEyes } from "./PhotoEyes";

/**
 * Zeigt das kalibrierte Foto, sobald die Datei unter `public/` liegt – sonst
 * die gezeichneten Augen. Die Bildmaße werden zur Build-Zeit aus der Datei
 * gelesen, damit die Kalibrierung unabhängig von der Auflösung gilt.
 */
export function HeroEyes() {
  if (heroPhoto) {
    const size = readImageSize(join(process.cwd(), "public", heroPhoto.src));
    if (size) {
      return <PhotoEyes photo={heroPhoto} width={size.width} height={size.height} />;
    }
  }
  return <Eyes />;
}
