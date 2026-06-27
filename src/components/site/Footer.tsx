import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-navy)] text-white/80">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={site.brand.logo} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <div className="font-display text-lg font-bold text-white">NOORI TRANSPORT CO.</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-orange-light)]">
                  {site.brand.tagline}
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Bharuch-based road transportation and logistics specialist serving
              government, mining, hazardous cargo and industrial clients across India.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white hover:text-[color:var(--color-navy)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white hover:text-[color:var(--color-navy)]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link to={n.href as never} className="text-white/70 transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {site.services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services"
                    hash={s.slug as never}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-orange-light)]" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-orange-light)]" />
                <a href={`tel:${site.contact.phone}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-orange-light)]" />
                <a href={`mailto:${site.contact.email}`} className="break-all hover:text-white">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Noori Transport Co. All rights reserved.</p>
          <p>Built on trust. Driven by excellence.</p>
        </div>
      </Container>
    </footer>
  );
}
