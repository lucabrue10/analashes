import { site } from "@/lib/site";

/**
 * Der Name in Schreibschrift. Die Kundin heißt "La Maison d'Ana Catarina" –
 * in der Kopfzeile steht auf schmalen Geräten nur "La Maison".
 */
export function BrandMark({
  size = "nav",
}: {
  size?: "nav" | "gross" | "footer";
}) {
  const klasse =
    size === "gross"
      ? "text-[clamp(2.6rem,9vw,6rem)]"
      : size === "footer"
        ? "text-3xl"
        : "text-2xl sm:text-[1.75rem]";

  return (
    <span
      className={`font-[family-name:var(--font-script)] leading-[1.3] text-ink-900 ${klasse}`}
    >
      <span className="sr-only">{site.name}</span>
      <span aria-hidden className="hidden sm:inline">
        {site.name}
      </span>
      <span aria-hidden className="sm:hidden">
        {size === "nav" ? site.kurz : site.name}
      </span>
    </span>
  );
}
