import { join } from "node:path";
import { existsSync } from "node:fs";
import { hasTransparency } from "@/lib/imageSize";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Wordmark } from "./Wordmark";

/**
 * Mögliche Dateinamen des Logos, in dieser Reihenfolge. Dateien mit
 * `-freigestellt` sind bereits hell aufbereitet und werden unverändert
 * gezeigt; alles andere muss für den dunklen Hintergrund umgerechnet werden.
 */
const CANDIDATES = [
  "/logo-freigestellt.png",
  "/logo-freigestellt.webp",
  "/logo.svg",
  "/logo.png",
  "/logo.webp",
  "/logo.jpg",
  "/logo.jpeg",
];

type Treatment = "keine" | "einfaerben" | "umkehren";

function findLogo(): { src: string; treatment: Treatment } | null {
  for (const src of CANDIDATES) {
    const path = join(process.cwd(), "public", src);
    if (!existsSync(path)) continue;
    if (src.includes("-freigestellt")) return { src, treatment: "keine" };
    return { src, treatment: hasTransparency(path) ? "einfaerben" : "umkehren" };
  }
  return null;
}

/**
 * Zeigt das echte Logo, sobald es unter `public/` liegt – sonst die gesetzte
 * Wortmarke.
 *
 * Drei Fälle: Eine aufbereitete Datei (`-freigestellt`) ist bereits hell und
 * wird unverändert gezeigt, damit der silberne Verlauf des Schriftzugs
 * erhalten bleibt. Eine transparente Datei mit dunkler Zeichnung wird hell
 * eingefärbt. Ein Logo mit weißem Hintergrund wird umgekehrt und der
 * Hintergrund weggerechnet – Notlösung, das Ergebnis hängt von der Umgebung ab.
 */
export function BrandMark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const logo = findLogo();
  const height = size === "nav" ? "h-12 sm:h-14" : "h-20";

  if (logo) {
    const filter =
      logo.treatment === "einfaerben"
        ? "brightness-0 invert"
        : logo.treatment === "umkehren"
          ? "mix-blend-screen invert"
          : "";
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt={site.name}
        className={`w-auto object-contain ${height} ${filter}`}
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
