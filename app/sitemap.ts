import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Für den statischen Export: Datei wird beim Build erzeugt. */
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["buchen", "preise", "pflege", "stempelkarte", "kontakt"].map((pfad) => ({
      url: `${site.url}/${pfad}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${site.url}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
