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
    "Lash Lifting",
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
  themeColor: "#08070b",
  colorScheme: "dark",
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
  image: `${site.url}/studio.svg`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    postalCode: site.postalCode,
    addressLocality: site.city,
    addressRegion: site.district,
    addressCountry: site.country,
  },
  sameAs: [site.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Browser-Erweiterungen verändern den Body vor der Hydration –
          ohne diesen Hinweis wertet React das als Fehler. */}
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#start"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-lilac-500 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Zum Inhalt springen
        </a>
        {children}
        <ErrorReporter />
      </body>
    </html>
  );
}
