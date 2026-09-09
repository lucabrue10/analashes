# La Maison d'Ana Catarina

Website für das Wimpernstudio **La Maison d'Ana Catarina** in Frankfurt am Main –
Creme, Beige und ein wenig Schwarz, Arial für alles Gelesene, Schreibschrift nur
für den Namen.

## Aufbau

- `app/page.tsx` – Startseite: Banner mit drei Aufnahmen, Ablauf in drei
  Schritten, Sets, Feedback, Über mich, Newsletter
- `app/(seiten)/` – Unterseiten: `/buchen`, `/preise`, `/pflege`,
  `/stempelkarte`, `/kontakt`
- `app/impressum`, `app/datenschutz` – Rechtliches
- `lib/site.ts` – **alle Inhalte an einer Stelle**: Preise, Sets, Feedback,
  Regeln, Texte
- `components/sections/` – die Abschnitte, `components/ui/` – Bausteine

## Adresse

Die genaue Anschrift steht bewusst nirgends auf der Seite – sie geht erst mit
der Terminbestätigung an die Kundin. Einzige Ausnahme ist das Impressum, wo
sie nach § 5 DDG stehen muss.

## Entwicklung

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktionsbuild
npm start
```
