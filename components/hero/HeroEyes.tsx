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
      return (
        <>
          {/* Das Foto ist das größte Element im ersten Viewport – früh laden */}
          <link rel="preload" as="image" href={heroPhoto.src} fetchPriority="high" />
          <PhotoEyes photo={heroPhoto} width={size.width} height={size.height} />
        </>
      );
    }
  }
  return (
    <div className="relative">
      <div className="opacity-[0.94]">
        <Eyes />
      </div>
      {/* Dunkler Balken über der Augenpartie – nimmt die Zeichnung zurück,
          damit der Titel die Bühne behält */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[150%] -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,5,9,0.26)_20%,rgba(6,5,9,0.42)_50%,rgba(6,5,9,0.26)_80%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_84%,transparent_100%)]"
      />
    </div>
  );
}
