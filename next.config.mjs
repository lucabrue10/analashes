/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Statischer Export: Der Build legt fertige HTML-Dateien in `out/` ab.
   * Die Seite hat keinen Server-Anteil – keine Datenbank, keine Formular-
   * verarbeitung –, deshalb genügt ein einfacher Webspace, der die Dateien
   * ausliefert. Kein Node nötig.
   */
  output: "export",

  /** Ohne laufenden Server gibt es keine Bildoptimierung – Dateien wie sie sind. */
  images: { unoptimized: true },

  /** Jede Seite bekommt einen eigenen Ordner mit index.html – so findet
   *  Apache sie auch ohne Umschreiberegeln. */
  trailingSlash: true,

  /**
   * Fester Name für den Ordner der Programmdateien. Sonst erzeugt jeder Build
   * einen neuen Zufallsnamen; beim Hochladen muss der alte Ordner gelöscht
   * werden, und schlägt das fehl, bricht die Übertragung mittendrin ab – auf
   * dem Server liegt dann eine Mischung aus altem und neuem Stand.
   */
  generateBuildId: () => "maison",
};

export default nextConfig;
