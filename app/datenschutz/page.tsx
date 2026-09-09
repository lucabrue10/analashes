import type { Metadata } from "next";
import {
  Abschnitt,
  RechtlichesLayout,
} from "@/components/legal/RechtlichesLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name}, ${site.city}.`,
};

export default function DatenschutzPage() {
  return (
    <RechtlichesLayout titel="Datenschutz" stand="September 2026">
      <Abschnitt titel="Verantwortliche Stelle">
        <p>
          <strong>{site.owner}</strong>
          <br />
          {site.name}
          <br />
          {site.street}
          <br />
          {site.postalCode} {site.city}
          <br />
          <br />
          Telefon: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Das Wichtigste vorweg">
        <p>
          Diese Website setzt <strong>keine Cookies</strong> und bindet{" "}
          <strong>keine Analyse- oder Tracking-Dienste</strong> ein. Es gibt
          weder Google Analytics noch ein Meta-Pixel oder Vergleichbares. Auch
          die verwendeten Schriften werden vom eigenen Server geladen, es
          entsteht also keine Verbindung zu Google.
        </p>
        <p>
          Beim bloßen Besuch der Seite verlässt außer den unten beschriebenen
          Server-Logdateien kein Datum diese Website. Ein Einwilligungsbanner
          ist deshalb nicht erforderlich.
        </p>
      </Abschnitt>

      <Abschnitt titel="Hosting">
        <p>
          Diese Website wird bei der Hostinger International Ltd., 61 Lordou
          Vironos Street, 6023 Larnaca, Zypern, gehostet. Hostinger verarbeitet
          die beim Aufruf der Seite anfallenden Daten (siehe
          „Server-Logdateien") ausschließlich in unserem Auftrag und nach
          unseren Weisungen. Grundlage ist ein Vertrag über die
          Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>
        <p>
          Der Einsatz eines Hosting-Anbieters erfolgt auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt in der sicheren
          und zuverlässigen Bereitstellung dieser Website. Näheres in der{" "}
          <a
            href="https://www.hostinger.de/datenschutzrichtlinie"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Hostinger
          </a>
          .
        </p>
      </Abschnitt>

      <Abschnitt titel="Server-Logdateien">
        <p>
          Beim Aufruf der Website übermittelt dein Browser technisch notwendige
          Daten, die der Hosting-Anbieter in Logdateien speichert: IP-Adresse,
          Datum und Uhrzeit des Zugriffs, Name der abgerufenen Datei,
          übertragene Datenmenge, Browsertyp und Betriebssystem sowie die zuvor
          besuchte Seite.
        </p>
        <p>
          Diese Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Das berechtigte Interesse liegt im sicheren und störungsfreien
          Betrieb der Website. Eine Zusammenführung dieser Daten mit anderen
          Datenquellen findet nicht statt.
        </p>
      </Abschnitt>

      <Abschnitt titel="Google Maps – nur auf Klick">
        <p>
          Die Karte im Kontaktbereich wird{" "}
          <strong>nicht automatisch geladen</strong>. Zunächst ist nur eine
          Vorschau ohne Verbindung zu Google zu sehen. Erst wenn du auf „Karte
          laden" klickst, wird die Karte von Google Maps nachgeladen. Dabei
          werden deine IP-Adresse und weitere Verbindungsdaten an Google
          übertragen und dort möglicherweise Cookies gesetzt; eine Übermittlung
          in die USA ist nicht ausgeschlossen.
        </p>
        <p>
          Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a
          DSGVO, die du durch den Klick erteilst. Ohne Klick findet keine
          Übertragung statt. Anbieter ist Google Ireland Limited, Gordon House,
          Barrow Street, Dublin 4, Irland. Näheres in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </Abschnitt>

      <Abschnitt titel="Kontaktaufnahme">
        <p>
          Wenn du mich per Telefon, E-Mail, WhatsApp oder Instagram
          kontaktierst, verarbeite ich die von dir übermittelten Daten, um deine
          Anfrage zu beantworten und Termine zu organisieren. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um die Anbahnung oder
          Durchführung eines Termins geht, ansonsten Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Die Links zu WhatsApp und Instagram auf dieser Seite sind einfache
          Verweise – es werden erst dann Daten übertragen, wenn du sie
          anklickst. Betreiber beider Dienste ist Meta Platforms Ireland
          Limited. Bei der Kommunikation über diese Dienste gelten deren
          Datenschutzbestimmungen; auf die Verarbeitung durch Meta habe ich
          keinen Einfluss.
        </p>
      </Abschnitt>

      <Abschnitt titel="Kundenstimmen und Fotos">
        <p>
          Die auf dieser Seite gezeigten Nachrichten und Arbeitsfotos stammen
          von Kundinnen, die der Veröffentlichung zugestimmt haben. Die
          Screenshots sind so zugeschnitten, dass weder Namen noch Profilbilder
          oder sonstige identifizierende Angaben zu sehen sind. Rechtsgrundlage
          ist die Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung
          kann jederzeit für die Zukunft widerrufen werden – eine kurze
          Nachricht an die oben genannte Adresse genügt, der Beitrag wird dann
          entfernt.
        </p>
      </Abschnitt>

      <Abschnitt titel="Speicherdauer">
        <p>
          Server-Logdateien werden nach kurzer Zeit automatisch gelöscht.
          Anfragen und Termindaten bewahre ich so lange auf, wie es für die
          Bearbeitung und mögliche Rückfragen erforderlich ist, sowie im Rahmen
          gesetzlicher Aufbewahrungsfristen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft über die zu dir gespeicherten Daten,
          auf Berichtigung, Löschung und Einschränkung der Verarbeitung, auf
          Datenübertragbarkeit sowie auf Widerspruch gegen Verarbeitungen, die
          auf einem berechtigten Interesse beruhen. Eine erteilte Einwilligung
          kannst du jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Außerdem steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu,
          für Hessen: Der Hessische Beauftragte für Datenschutz und
          Informationsfreiheit, Postfach 3163, 65021 Wiesbaden.
        </p>
      </Abschnitt>

      <Abschnitt titel="Verschlüsselung">
        <p>
          Diese Website wird über HTTPS ausgeliefert. Die Übertragung zwischen
          deinem Browser und dem Server ist damit verschlüsselt.
        </p>
      </Abschnitt>
    </RechtlichesLayout>
  );
}
