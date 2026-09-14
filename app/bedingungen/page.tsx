import type { Metadata } from "next";
import {
  Abschnitt,
  RechtlichesLayout,
} from "@/components/legal/RechtlichesLayout";
import { site, studioregeln } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedingungen und Widerruf",
  description: `Terminbedingungen und Widerrufsbelehrung von ${site.name}.`,
  alternates: { canonical: "/bedingungen" },
};

export default function BedingungenSeite() {
  return (
    <RechtlichesLayout titel="Bedingungen und Widerruf" stand="September 2026">
      <Abschnitt titel="Wer dein Vertragspartner ist">
        <p>
          {site.owner}, {site.name}, {site.street}, {site.postalCode}{" "}
          {site.city}. Erreichbar per E-Mail unter{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Abschnitt>

      <Abschnitt titel="Wie ein Termin zustande kommt">
        <p>
          Über das Formular auf dieser Seite schickst du mir eine unverbindliche
          Anfrage. Ein Vertrag kommt erst zustande, wenn ich dir einen Termin
          ausdrücklich bestätige. Mit der Bestätigung bekommst du auch die
          genaue Adresse des Studios.
        </p>
      </Abschnitt>

      <Abschnitt titel="Preise und Zahlung">
        <p>
          Es gelten die Preise, die auf der Preisseite stehen. Alle Preise sind
          Endpreise inklusive Umsatzsteuer. Die Anzahlung von {site.anzahlung}{" "}
          macht den Termin verbindlich und wird am Termin mit dem Preis
          verrechnet. Der Rest wird nach der Behandlung im Studio bezahlt.
        </p>
      </Abschnitt>

      <Abschnitt titel="Absage, Verspätung und Ablauf">
        <ul className="space-y-4">
          {studioregeln.map((regel) => (
            <li key={regel.titel}>
              <strong>{regel.titel}:</strong> {regel.text}
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt titel="Widerrufsrecht">
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
          ab dem Tag des Vertragsschlusses.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du mir ({site.owner},{" "}
          {site.street}, {site.postalCode} {site.city},{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>) mittels einer
          eindeutigen Erklärung, zum Beispiel per E-Mail, über deinen Entschluss
          informieren, diesen Vertrag zu widerrufen. Zur Wahrung der Frist
          genügt es, dass du die Mitteilung über die Ausübung des
          Widerrufsrechts vor Ablauf der Frist absendest.
        </p>
      </Abschnitt>

      <Abschnitt titel="Folgen des Widerrufs">
        <p>
          Wenn du diesen Vertrag widerrufst, zahle ich dir alle Zahlungen, die
          ich von dir erhalten habe, einschließlich der Anzahlung, unverzüglich
          und spätestens binnen vierzehn Tagen ab dem Tag zurück, an dem die
          Mitteilung über deinen Widerruf bei mir eingegangen ist. Für die
          Rückzahlung verwende ich dasselbe Zahlungsmittel wie bei der
          ursprünglichen Zahlung, es sei denn, wir vereinbaren ausdrücklich
          etwas anderes. Dafür werden dir Entgelte nicht berechnet.
        </p>
      </Abschnitt>

      <Abschnitt titel="Vorzeitiges Erlöschen des Widerrufsrechts">
        <p>
          Hast du verlangt, dass die Behandlung schon vor Ablauf der
          Widerrufsfrist stattfindet, schuldest du mir einen angemessenen
          Betrag, der dem Anteil der bis zum Widerruf bereits erbrachten
          Leistung entspricht. Das Widerrufsrecht erlischt, wenn die Behandlung
          auf dein ausdrückliches Verlangen vollständig erbracht wurde und du
          vor Beginn bestätigt hast, dass du mit dem Beginn vor Ablauf der Frist
          einverstanden bist und dein Widerrufsrecht damit verlierst.
        </p>
      </Abschnitt>

      <Abschnitt titel="Verbraucherstreitbeilegung">
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Abschnitt>
    </RechtlichesLayout>
  );
}
