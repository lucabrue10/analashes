import { navItems, site, whatsappLink } from "@/lib/site";
import { BrandMark } from "./ui/BrandMark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950/80 pt-16 pb-10">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandMark size="footer" />
            <p className="mt-6 font-[family-name:var(--font-display)] text-lg text-lilac-100/80 italic">
              {site.claim}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">{site.slogan}</p>
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
            <a href="/impressum" className="transition-colors duration-500 hover:text-white/70">
              Impressum
            </a>
            <a href="/datenschutz" className="transition-colors duration-500 hover:text-white/70">
              Datenschutz
            </a>
          </p>
        </div>

        <p className="mt-8 text-center text-[10px] tracking-[0.28em] text-white/25 uppercase">
          Designed by{" "}
          <span className="text-white/40">Adversify Marketing</span>
        </p>
      </div>
    </footer>
  );
}
