import { Check } from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";
import { CTAButton } from "./CTAButton";

export function AboutPreview() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
              <img
                src={site.about.image}
                alt="Noori Transport operations team inspecting fleet"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden w-64 rounded-2xl bg-[color:var(--color-navy)] p-5 text-white shadow-[var(--shadow-elevated)] sm:block lg:-right-8">
              <div className="font-display text-3xl font-bold text-[color:var(--color-orange-light)]">
                Since 2001
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/65">
                Family-run · Owner-operated
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow={site.about.eyebrow}
              title={site.about.title}
              subtitle={site.about.lead}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {site.about.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-[var(--shadow-soft)]"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--color-orange)] text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-[color:var(--color-ink)]">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton to="/about" variant="secondary" withArrow>
                Our Story
              </CTAButton>
              <CTAButton to="/fleet" variant="ghost">
                Explore Fleet
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
