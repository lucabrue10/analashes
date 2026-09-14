import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, termine } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M3 5.5h18c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-11c0-.55.45-1 1-1Zm1.6 2L12 12.2l7.4-4.7H4.6Zm15.4 1.9-7.47 4.74a1 1 0 0 1-1.06 0L4 9.4v7.1h16V9.4Z" />
    </svg>
  );
}

const kanaele = [
  {
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
    extern: false,
    icon: <MailIcon />,
    note: "Antwort meist innerhalb eines Tages",
  },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    extern: true,
    icon: <InstagramIcon />,
    note: "Aktuelle Sets und freie Termine",
  },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-titel"
      className="bg-creme-100 py-20 sm:py-28"
    >
      <div className="container-x">
        <SectionHeading
          id="kontakt-titel"
          eyebrow="Kontakt"
          spruch="slide into my DMs"
          title={
            <>
              Bereit für deinen <span className="italic">neuen Blick?</span>
            </>
          }
          text={termine.text}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {kanaele.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.08}>
              <a
                href={k.href}
                target={k.extern ? "_blank" : undefined}
                rel={k.extern ? "noopener noreferrer" : undefined}
                className="karte flex h-full flex-col px-7 py-8 transition-colors duration-300 hover:bg-creme-50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-beige-200 text-ink-700">
                  {k.icon}
                </span>
                <span className="mt-5 label">{k.label}</span>
                <span className="mt-2 text-lg text-ink-900">{k.value}</span>
                <span className="mt-2 text-sm text-ink-500">{k.note}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] bg-beige-200 px-7 py-8 sm:px-9">
              <p className="label">Termine</p>
              <p className="mt-3 text-lg text-ink-900">{termine.hinweis}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Ich arbeite mit einem Termin zur gleichen Zeit, deshalb gibt es
                keine festen Öffnungszeiten, sondern feste Plätze.
              </p>
              <a
                href="/buchen"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink-900 px-7 py-3.5 text-[10px] font-medium tracking-[0.22em] text-creme-100 uppercase transition-colors duration-300 hover:bg-ink-700"
              >
                Termin anfragen
              </a>
            </div>

            <div className="rounded-[1.75rem] bg-beige-200 px-7 py-8 sm:px-9">
              <p className="label">Wo</p>
              <p className="mt-3 text-lg text-ink-900">{site.city}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Das Studio liegt in einer Wohnung. Die genaue Adresse erhältst
                du mit der Terminbestätigung, zusammen mit allem, was du vorher
                wissen musst.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
