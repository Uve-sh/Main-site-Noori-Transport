import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Landmark,
  Layers,
  Mountain,
  Package,
  Pickaxe,
  ShieldAlert,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Truck,
  ShieldAlert,
  Mountain,
  Layers,
  Pickaxe,
  Package,
};

export function Services({ limit }: { limit?: number }) {
  const items = limit ? site.services.slice(0, limit) : site.services;
  return (
    <Section tone="muted" id="services">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="What we do"
            title="Logistics solutions for India's most demanding industries."
            subtitle="From government convoys to chemical tankers and mining haulage — every shipment handled with the same discipline."
          />
          {limit && (
            <Link
              to="/services"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-orange)] sm:inline-flex"
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Truck;
            const featured = i === 0;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] ${
                  featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-[4/5]" : "aspect-[16/10]"}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy)]/65 via-[color:var(--color-navy)]/10 to-transparent" />
                  <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/95 text-[color:var(--color-navy)] shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-[color:var(--color-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {s.summary}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-navy)] transition-colors hover:text-[color:var(--color-orange)]"
                  >
                    Enquire about this service
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {limit && (
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)]"
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
