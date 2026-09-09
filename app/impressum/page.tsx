import type { Metadata } from "next";
import {
  Abschnitt,
  RechtlichesLayout,
} from "@/components/legal/RechtlichesLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name}, ${site.city}.`,
};

export default function ImpressumPage() {
  return (
    <RechtlichesLayout titel="Impressum" stand="September 2026">
      <Abschnitt titel="Angaben gemäß § 5 DDG">
        <p>
          <strong>{site.owner}</strong>
          <br />
          {site.name}
          <br />
          {site.street}
          <br />
          {site.postalCode} {site.city}
        </p>
      </Abschnitt>

      <Abschnitt titel="Kontakt">
        <p>
          Telefon: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          Instagram:{" "}
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            {site.instagramHandle}
          </a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {site.owner}
          <br />
          {site.street}
          <br />
          {site.postalCode} {site.city}
        </p>
      </Abschnitt>

      <Abschnitt titel="Verbraucherstreitbeilegung">
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Haftung für Inhalte und Links">
        <p>
          Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich
          jedoch keine Gewähr übernehmen. Diese Website enthält Links zu
          externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
          verantwortlich.
        </p>
      </Abschnitt>

      <Abschnitt titel="Bildrechte">
        <p>
          Alle auf dieser Website gezeigten Fotografien von Wimpernsets stammen
          aus dem Studio {site.name} und wurden mit Einverständnis der
          abgebildeten Personen veröffentlicht.
        </p>
      </Abschnitt>
    </RechtlichesLayout>
  );
}
