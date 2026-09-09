import { BrandMark } from "@/components/ui/BrandMark";
import { navItems, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-beige-200 bg-beige-200/50">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <BrandMark size="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              {site.slogan}
            </p>
            <p className="mt-6 text-[10px] tracking-[0.3em] text-ink-300 uppercase">
              {site.claim}
            </p>
          </div>

          <nav aria-label="Fußzeile">
            <p className="label">Seiten</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-500">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors duration-300 hover:text-ink-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label">Kontakt</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-500">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors duration-300 hover:text-ink-900"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-300 hover:text-ink-900"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-ink-900"
                >
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li className="pt-2 text-ink-300">
                {site.city} · Adresse mit der Terminbestätigung
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-beige-300 pt-7 text-[10px] tracking-[0.22em] text-ink-300 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <a
              href="/impressum"
              className="transition-colors duration-300 hover:text-ink-900"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="transition-colors duration-300 hover:text-ink-900"
            >
              Datenschutz
            </a>
            <span>Designed by Adversify Marketing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
