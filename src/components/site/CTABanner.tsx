import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-navy)] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_oklch(0.68_0.18_45/0.22),_transparent_60%)]" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange-light)]">
              Ready to move?
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Get a transport quote in under 24 hours.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/70">
              Share your origin, destination and cargo details. Our dispatch desk will respond
              with a transparent, itemised proposal — usually within the same business day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <CTAButton to="/contact" withArrow>
              Request a Quote
            </CTAButton>
            <CTAButton
              href={`tel:${site.contact.phone}`}
              variant="white"
              className="border border-white/15 !bg-white/[0.06] !text-white hover:!bg-white/[0.12]"
            >
              <Phone className="h-4 w-4" /> {site.contact.phone}
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
