import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

export function Process() {
  return (
    <Section tone="navy">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeader
            invert
            eyebrow="How we work"
            title="A simple, transparent process from enquiry to proof of delivery."
            subtitle="No middlemen. No surprises. Every shipment runs through the same disciplined five-step workflow."
          />
          <ol className="relative space-y-5 lg:space-y-3">
            {site.process.map((p, idx) => (
              <li
                key={p.step}
                className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
              >
                <div className="flex flex-col items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-orange)] font-display text-sm font-bold text-white">
                    {p.step}
                  </div>
                  {idx < site.process.length - 1 && (
                    <span className="mt-2 hidden h-full w-px bg-white/15 lg:block" />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
