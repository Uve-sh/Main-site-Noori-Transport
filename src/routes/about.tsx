import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Clock,
  Headset,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Container";
import { CTABanner } from "@/components/site/CTABanner";
import { Process } from "@/components/site/Process";
import { CTAButton } from "@/components/site/CTAButton";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Noori Transport Co." },
      {
        name: "description",
        content:
          "Founded in 2001 in Bharuch and led by the Saya family, Noori Transport Co. has spent over two decades building India's most trusted road logistics operation.",
      },
      { property: "og:title", content: "About Noori Transport Co." },
      {
        property: "og:description",
        content:
          "Two decades of trusted road transportation for government, mining and industrial clients across India.",
      },
    ],
  }),
  component: AboutPage,
});

const whyIcons: LucideIcon[] = [
  Clock,
  UserCheck,
  Truck,
  Users,
  ShieldCheck,
  PackageCheck,
  Award,
  Headset,
];

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Our story"
        title="Built on trust. Driven by excellence."
        subtitle={
          site.brand.tagline +
          " — that's not a slogan, it's how Noori Transport Co. has operated every single day for more than two decades."
        }
      />

      {/* INTRO + STORY */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            {/* LEFT — image + stats */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
                  <img
                    src={site.about.image}
                    alt="Noori Transport operations team coordinating fleet dispatch"
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

              <div className="mt-10 grid grid-cols-2 gap-4">
                {site.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)]"
                  >
                    <div className="font-display text-3xl font-bold text-[color:var(--color-navy)]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-black/5 bg-[color:var(--color-surface)] p-5 text-sm text-[color:var(--color-ink-soft)]">
                <div className="font-display text-base font-semibold text-[color:var(--color-navy)]">
                  Headquartered in Bharuch, Gujarat
                </div>
                <p className="mt-1">{site.contact.address}</p>
              </div>
            </div>

            {/* RIGHT — narrative */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
                Our Story
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.5rem]">
                More than transport — a trusted logistics partner to India's industries.
              </h2>
              <p className="mt-7 font-display text-xl font-medium leading-snug text-[color:var(--color-navy)]">
                {site.about.lead}
              </p>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                {site.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p>
                  Two decades of operations have taught us that logistics is not just
                  about vehicles and routes — it is about discipline, accountability and
                  the relationships we build with every client. From the first call to
                  the signed proof-of-delivery, every shipment is handled with the same
                  care we'd give our own consignment.
                </p>
                <p>
                  Today, under second-generation leadership, Noori Transport Co. is
                  investing in modern fleet technology, driver development and digital
                  coordination — preparing the company for the next twenty years of
                  growth while staying anchored in the values it was founded on.
                </p>
              </div>

              {/* Mission / Vision */}
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                <article className="group rounded-3xl border border-black/5 bg-white p-7 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--color-navy)] text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--color-navy)]">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                    {site.story.mission}
                  </p>
                </article>
                <article className="group rounded-3xl border border-black/5 bg-white p-7 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--color-orange)] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--color-navy)]">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                    {site.story.vision}
                  </p>
                </article>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <CTAButton to="/services" variant="primary" withArrow>
                  Our Services
                </CTAButton>
                <CTAButton to="/contact" variant="ghost">
                  Talk to our team
                </CTAButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* JOURNEY TIMELINE */}
      <Section tone="muted">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
              Our Journey
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              Two decades of building India's road transport infrastructure.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              Every milestone reflects the same operating principle — earn trust, then earn it again on the next shipment.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {site.story.journey.map((m) => (
              <li
                key={m.year}
                className="relative rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">
                  {m.year}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-[color:var(--color-navy)]">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* WHY CHOOSE US — interactive truck section */}
      <WhyChooseUs />

      {/* LEADERSHIP */}
      <Section tone="muted">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
              Leadership
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              The people behind every shipment.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              Three generations of the Saya family lead Noori Transport with the same operating principle — be the partner clients can call at 2 AM and know it will get done.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:gap-12 lg:grid-cols-3 lg:gap-14">
            {site.leadership.map((person) => (
              <article
                key={person.name}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={person.image}
                    alt={`Portrait of ${person.name}, ${person.role} at Noori Transport Co.`}
                    loading="lazy"
                    width={768}
                    height={960}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--color-navy)]/40 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-bold leading-tight text-[color:var(--color-navy)] sm:text-[26px]">
                    {person.name}
                  </h3>

                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full bg-[color:var(--color-orange)]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-orange)]">
                      {person.role}
                    </span>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                    {person.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Process />
      <CTABanner />
    </>
  );
}
