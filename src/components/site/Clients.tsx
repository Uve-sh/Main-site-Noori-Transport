import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

export function Clients() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Trusted by"
          title="Government bodies, industrial majors, and the people who keep India moving."
        />
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-4">
          {site.clients.map((c) => (
            <div
              key={c}
              className="flex items-center justify-center bg-white px-4 py-8 text-center text-sm font-display font-semibold text-[color:var(--color-navy)] transition-colors hover:bg-[color:var(--color-surface)] sm:py-10"
            >
              {c}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
          Indicative list · additional references available on request
        </p>
      </Container>
    </Section>
  );
}
