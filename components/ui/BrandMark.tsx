import { join } from "node:path";
import { existsSync } from "node:fs";
import { hasTransparency } from "@/lib/imageSize";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Wordmark } from "./Wordmark";

/** Mögliche Dateinamen des Logos, in dieser Reihenfolge. */
const CANDIDATES = [
  "/logo-freigestellt.png",
  "/logo-freigestellt.webp",
  "/logo.svg",
  "/logo.png",
  "/logo.webp",
  "/logo.jpg",
  "/logo.jpeg",
];

function findLogo(): { src: string; transparent: boolean } | null {
  for (const src of CANDIDATES) {
    const path = join(process.cwd(), "public", src);
    if (existsSync(path)) return { src, transparent: hasTransparency(path) };
  }
  return null;
}

/**
 * Zeigt das echte Logo, sobald es unter `public/` liegt – sonst die gesetzte
 * Wortmarke.
 *
 * Die Behandlung richtet sich danach, ob die Datei einen Alphakanal hat:
 * Ein freigestelltes Logo wird über `brightness-0 invert` vollflächig hell
 * eingefärbt – so sind sowohl die schwarze Zeichnung als auch der helle
 * Schriftzug auf dunklem Grund gut sichtbar. Ein Logo mit weißem Hintergrund
 * wird umgekehrt und der Hintergrund über `mix-blend-screen` weggerechnet;
 * das ist eine Notlösung, weil das Ergebnis von der Umgebung abhängt.
 */
export function BrandMark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const logo = findLogo();
  const height = size === "nav" ? "h-11 sm:h-12" : "h-20";

  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt={site.name}
        className={`w-auto object-contain ${height} ${
          logo.transparent ? "brightness-0 invert" : "mix-blend-screen invert"
        }`}
      />
    );
  }

  return (
    <span className="flex items-center gap-3">
      {/* Auf schmalen Geräten nur die Wortmarke – sonst wird es neben dem
          Menüknopf zu eng */}
      <Logo
        className={size === "nav" ? "hidden h-9 w-9 sm:block" : "h-10 w-10"}
      />
      <Wordmark subline={size === "footer"} />
    </span>
  );
}
