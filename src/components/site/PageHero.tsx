import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-navy)] pt-14 pb-16 text-white sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.68_0.18_45/0.18),_transparent_55%)]" />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/55">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/85">{breadcrumb}</span>
        </nav>
        {eyebrow && (
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange-light)]">
            <span className="h-px w-8 bg-current opacity-70" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
