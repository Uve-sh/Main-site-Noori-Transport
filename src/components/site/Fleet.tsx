import { Gauge } from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

export function Fleet() {
  return (
    <Section id="fleet" tone="muted">
      <Container>
        <SectionHeader
          eyebrow="Our fleet"
          title="A versatile, owned fleet built for every kind of cargo."
          subtitle="From 9-tonne closed-body trucks to 40-tonne trailers and chemical tankers — calibrated for India's industrial diversity."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.fleet.map((f) => (
            <div
              key={f.name}
              className="group rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--color-surface)] text-[color:var(--color-navy)] transition-colors group-hover:bg-[color:var(--color-navy)] group-hover:text-white">
                  <Gauge className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold text-[color:var(--color-navy)]">
                  {f.name}
                </h3>
              </div>
              <dl className="mt-5 grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                <dt className="text-[color:var(--color-ink-soft)]">Capacity</dt>
                <dd className="font-medium text-[color:var(--color-ink)]">{f.capacity}</dd>
                <dt className="text-[color:var(--color-ink-soft)]">Use case</dt>
                <dd className="font-medium text-[color:var(--color-ink)]">{f.use}</dd>
              </dl>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
