import { navItems, site, whatsappLink } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950/80 pt-16 pb-10">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.16em] text-white">
                  ANNA BLUSH
                </span>
                <span className="mt-1 text-[9px] tracking-[0.52em] text-lilac-300/80">LASHES</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">{site.slogan}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-5 py-2 text-[10px] tracking-[0.22em] text-white/60 uppercase transition-colors duration-500 hover:border-lilac-400/40 hover:text-lilac-100"
              >
                WhatsApp
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-5 py-2 text-[10px] tracking-[0.22em] text-white/60 uppercase transition-colors duration-500 hover:border-lilac-400/40 hover:text-lilac-100"
              >
                Instagram
              </a>
            </div>
          </div>

          <nav aria-label="Fußbereich">
            <h2 className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Navigation</h2>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-500 hover:text-lilac-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Kontakt</h2>
            <address className="mt-5 space-y-2.5 text-sm text-white/55 not-italic">
              <p>
                {site.street}
                <br />
                {site.postalCode} {site.city}
              </p>
              <p>
                <a href={`tel:${site.phoneHref}`} className="transition-colors duration-500 hover:text-lilac-100">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors duration-500 hover:text-lilac-100">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-[11px] text-white/35 sm:flex-row">
          <p>
            © {year} {site.name}. Alle Rechte vorbehalten.
          </p>
          <p className="flex gap-6">
            <a href="#kontakt" className="transition-colors duration-500 hover:text-white/70">
              Impressum
            </a>
            <a href="#kontakt" className="transition-colors duration-500 hover:text-white/70">
              Datenschutz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
