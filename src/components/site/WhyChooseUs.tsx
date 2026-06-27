import { useState } from "react";
import {
  Award,
  Clock,
  Headset,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "./Container";
import { cn } from "@/lib/utils";
import truckImg from "@/assets/truck-topdown.png";

type Feature = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Timely Deliveries",
    body: "Disciplined dispatch and 99.4% on-time performance across high-volume routes.",
    Icon: Clock,
  },
  {
    title: "Experienced Drivers",
    body: "Trained, verified drivers — many with 10+ years on hazardous and heavy-haul routes.",
    Icon: Users,
  },
  {
    title: "Modern Fleet",
    body: "100+ owned trailers, tippers and tankers — maintained entirely in-house.",
    Icon: Truck,
  },
  {
    title: "Safe & Secure Transport",
    body: "ISO-aligned safety practices, defensive-driving training and full insurance.",
    Icon: ShieldCheck,
  },
  {
    title: "24×7 Customer Support",
    body: "Round-the-clock dispatch desk staying with your shipment from origin to delivery.",
    Icon: Headset,
  },
  {
    title: "Operational Excellence",
    body: "Audit-ready documentation, signed PODs and clean invoicing — every trip.",
    Icon: Award,
  },
];

const leftFeatures = features.slice(0, 3);
const rightFeatures = features.slice(3, 6);

export function WhyChooseUs() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pinIdx, setPinIdx] = useState<number | null>(null);
  const activeIdx = hoverIdx ?? pinIdx;

  const onLeft = activeIdx !== null && activeIdx < 3;
  const onRight = activeIdx !== null && activeIdx >= 3;
  const truckShift = onLeft ? -8 : onRight ? 8 : 0;
  const truckRotate = onLeft ? -1.6 : onRight ? 1.6 : 0;

  const renderCard = (f: Feature, i: number, isLeft: boolean) => {
    const Icon = f.Icon;
    const active = activeIdx === i;
    return (
      <article
        key={f.title}
        onMouseEnter={() => setHoverIdx(i)}
        onMouseLeave={() => setHoverIdx(null)}
        onFocus={() => setHoverIdx(i)}
        onBlur={() => setHoverIdx(null)}
        onClick={() => setPinIdx((p) => (p === i ? null : i))}
        tabIndex={0}
        role="button"
        aria-pressed={active}
        className={cn(
          "why-card-anim relative cursor-pointer rounded-3xl border p-6 shadow-[var(--shadow-soft)] outline-none transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out sm:p-7",
          "motion-safe:[animation:whyCardEnter_600ms_ease-out_both]",
          "focus-visible:ring-2 focus-visible:ring-[color:var(--color-orange)] focus-visible:ring-offset-2",
          active
            ? "-translate-y-2 border-transparent bg-[color:var(--color-orange)] shadow-[var(--shadow-elevated)]"
            : "border-black/5 bg-white hover:-translate-y-0.5",
        )}
        style={{ animationDelay: `${i * 90}ms` }}
      >
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-300",
            active
              ? "bg-white/15 text-white"
              : "bg-[color:var(--color-surface)] text-[color:var(--color-navy)]",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3
          className={cn(
            "mt-5 font-display text-lg font-semibold transition-colors duration-300",
            active ? "text-white" : "text-[color:var(--color-navy)]",
          )}
        >
          {f.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 text-sm leading-relaxed transition-colors duration-300",
            active ? "text-white/90" : "text-[color:var(--color-ink-soft)]",
          )}
        >
          {f.body}
        </p>

        {/* Connection line to the truck — desktop only */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 hidden h-[2px] w-12 -translate-y-1/2 rounded-full bg-[color:var(--color-orange)] shadow-[0_0_12px_rgba(241,90,36,0.8)] transition-all duration-300 ease-out lg:block",
            isLeft
              ? "right-0 translate-x-full origin-right"
              : "left-0 -translate-x-full origin-left",
            active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          )}
        />
      </article>
    );
  };

  return (
    <Section tone="muted" id="why-choose-us" className="py-24 sm:py-28 lg:py-36">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
            <span className="h-px w-8 bg-current opacity-70" />
            Why Choose Us
            <span className="h-px w-8 bg-current opacity-70" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Built around your shipment — every kilometre.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)] sm:text-lg">
            Hover a feature on desktop, or tap one on mobile, to see how Noori Transport keeps cargo moving with precision.
          </p>
        </header>

        {/* ===== MOBILE: stacked grid ===== */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:hidden">
          {/* Truck on mobile — centered above cards */}
          <div className="col-span-full flex items-center justify-center py-4">
            <div
              className="relative mx-auto w-[220px] sm:w-[260px]"
              style={{ aspectRatio: "1 / 2.4" }}
            >
              <div
                className="truck-anim relative h-full w-full motion-safe:[animation:truckEnter_900ms_cubic-bezier(.2,.7,.2,1)_both,truckFloat_7s_ease-in-out_900ms_infinite]"
              >
                <div
                  className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: `translateX(${truckShift}px) rotate(${truckRotate}deg)`,
                  }}
                >
                  <img
                    src={truckImg}
                    alt="Noori Transport branded logistics truck — top-down view"
                    width={768}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain drop-shadow-[0_28px_36px_rgba(13,59,102,0.22)]"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Mobile cards */}
          {features.map((f, i) => renderCard(f, i, i < 3))}
        </div>

        {/* ===== DESKTOP: flex row — truck provably centered ===== */}
        <div className="mt-24 hidden items-center gap-8 lg:flex xl:gap-12">

          {/* Left card stack — flex-1 so it takes exactly 50% of the remaining space */}
          <div className="flex flex-1 flex-col gap-6">
            {leftFeatures.map((f) => renderCard(f, features.indexOf(f), true))}
          </div>

          {/* Center truck column — fixed width, perfectly centered by flex */}
          <div className="w-[300px] shrink-0 xl:w-[340px]">
            <div
              className="relative mx-auto"
              style={{ aspectRatio: "1 / 2.4" }}
            >
              {/* Chassis glow */}
              <div
                aria-hidden
                className={cn(
                  "absolute left-1/2 top-1/2 -z-10 h-[78%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-orange)] blur-3xl transition-opacity duration-500",
                  activeIdx !== null ? "opacity-30" : "opacity-0",
                )}
              />

              {/* Float + entrance wrapper */}
              <div
                className="truck-anim relative h-full w-full motion-safe:[animation:truckEnter_900ms_cubic-bezier(.2,.7,.2,1)_both,truckFloat_7s_ease-in-out_900ms_infinite]"
              >
                {/* Lean wrapper */}
                <div
                  className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: `translateX(${truckShift}px) rotate(${truckRotate}deg)`,
                  }}
                >
                  <img
                    src={truckImg}
                    alt="Noori Transport branded logistics truck — top-down view"
                    width={768}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain drop-shadow-[0_28px_36px_rgba(13,59,102,0.22)]"
                  />

                  {/* Headlights */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-[1%] -translate-x-1/2 transition-all duration-500",
                      activeIdx !== null
                        ? "opacity-100 scale-110"
                        : "opacity-30 scale-100",
                    )}
                  >
                    <div className="h-14 w-28 rounded-full bg-white blur-2xl" />
                  </div>

                  {/* Cargo shimmer */}
                  {activeIdx !== null && (
                    <div
                      key={activeIdx}
                      aria-hidden
                      className="pointer-events-none absolute inset-x-[18%] top-[26%] bottom-[6%] overflow-hidden rounded-[6px]"
                    >
                      <div className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/65 to-transparent motion-safe:[animation:cargoShimmer_650ms_ease-out_forwards]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right card stack — flex-1 so it takes exactly 50% of the remaining space */}
          <div className="flex flex-1 flex-col gap-6">
            {rightFeatures.map((f) => renderCard(f, features.indexOf(f), false))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
