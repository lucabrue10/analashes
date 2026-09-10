import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Für den statischen Export: Datei wird beim Build erzeugt. */
export const dynamic = "force-static";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
