import { Quote } from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="In their words"
          title="What partners say about working with Noori Transport."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <figure
              key={i}
              className="relative flex flex-col rounded-3xl border border-black/5 bg-white p-7 shadow-[var(--shadow-soft)]"
            >
              <Quote className="h-7 w-7 text-[color:var(--color-orange)]" />
              <blockquote className="mt-5 flex-1 font-display text-base leading-relaxed text-[color:var(--color-ink)]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-black/5 pt-5">
                <div className="font-display font-semibold text-[color:var(--color-navy)]">
                  {t.name}
                </div>
                <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
