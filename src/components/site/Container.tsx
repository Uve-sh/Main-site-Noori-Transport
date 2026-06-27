import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "navy";
}) {
  const toneClasses =
    tone === "muted"
      ? "bg-[color:var(--color-surface)]"
      : tone === "navy"
        ? "bg-[color:var(--color-navy)] text-white"
        : "bg-background";
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-28", toneClasses, className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
            invert ? "text-[color:var(--color-orange-light)]" : "text-[color:var(--color-orange)]",
          )}
        >
          <span className="h-px w-8 bg-current opacity-70" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          invert && "text-white",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            invert ? "text-white/75" : "text-[color:var(--color-ink-soft)]",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
