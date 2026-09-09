import { site } from "@/lib/site";

/**
 * Das Logo der Kundin: die Ligatur AC neben "MAISON by ana catarina".
 * Die Datei ist freigestellt, die Zeichnung liegt also direkt auf dem
 * Creme-Grund – kein sichtbarer Kreis, kein weißer Kasten.
 */
export function BrandMark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const hoehe = size === "footer" ? "h-14 sm:h-16" : "h-10 sm:h-14";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-ac.png"
      alt={site.name}
      className={`${hoehe} w-auto`}
      width={1081}
      height={491}
    />
  );
}

/** Der Name in Schreibschrift – nur noch groß im Kopf der Startseite. */
export function Wortmarke({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-script)] leading-[1.3] text-ink-900 ${className}`}
    >
      {site.name}
    </span>
  );
}
