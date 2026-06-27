import { Phone, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-navy)] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={site.hero.image}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-navy)]/95 via-[color:var(--color-navy)]/80 to-[color:var(--color-navy)]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.68_0.18_45/0.18),_transparent_55%)]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-32 lg:pb-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
              {site.hero.eyebrow}
            </div>

            <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
              {site.hero.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {site.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton to={site.hero.primaryCta.href} withArrow>
                {site.hero.primaryCta.label}
              </CTAButton>
              <CTAButton
                href={`tel:${site.contact.phone}`}
                variant="white"
                className="border border-white/15 !bg-white/[0.06] !text-white hover:!bg-white/[0.12]"
              >
                <Phone className="h-4 w-4" /> {site.contact.phone}
              </CTAButton>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Trust card */}
          <div className="relative lg:pt-6">
            <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-orange)] text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-white">
                    Bharuch · Gujarat
                  </div>
                  <div className="text-xs text-white/60">
                    Operational since the early 2000s
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-white/80">
                {[
                  "Owned fleet of trailers, tippers, tankers",
                  "Trained drivers for hazardous & heavy cargo",
                  "Government contract documentation expertise",
                  "24×7 dispatch & live coordination desk",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-orange-light)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-white/[0.06] p-4 text-xs text-white/65">
                Serving government bodies, refineries, mining operators and
                industrial enterprises across Western & Central India.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
