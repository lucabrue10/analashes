import type { Metadata, Viewport } from "next";
import { ErrorReporter } from "@/components/ErrorReporter";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Wimpernverlängerung in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Wimpernverlängerung",
    "Lash Extensions",
    `Wimpern ${site.city}`,
    "Volume Lashes",
    "Mega Volume",
    "UV Lashes",
    "Wimpern Schulung",
    "Wispy Lashes",
    "Wimpernstudio",
    site.name,
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} – ${site.slogan}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.slogan}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "beauty",
};

export const viewport: Viewport = {
  themeColor: "#faf6f0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/ana.jpg`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    postalCode: site.postalCode,
    addressLocality: site.city,
    addressRegion: site.district,
    addressCountry: site.country,
  },
  sameAs: [site.instagram],
  areaServed: site.city,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Browser-Erweiterungen verändern den Body vor der Hydration –
          ohne diesen Hinweis wertet React das als Fehler. */}
      <body className="antialiased" suppressHydrationWarning>
        {/* Ohne JavaScript blieben die eingeblendeten Abschnitte unsichtbar –
            dann wird der Inhalt schlicht ohne Animation gezeigt. */}
        <noscript>
          <style>{`#inhalt,#inhalt *,header,header *{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-creme-100"
        >
          Zum Inhalt springen
        </a>
        {children}
        <ErrorReporter />
      </body>
    </html>
  );
}
