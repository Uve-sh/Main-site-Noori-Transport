import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "white";
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-orange)]";

const variants = {
  primary:
    "bg-[color:var(--color-orange)] text-white shadow-[0_8px_24px_-8px_oklch(0.68_0.18_45/0.5)] hover:bg-[color:var(--color-orange-light)] hover:-translate-y-0.5",
  secondary:
    "bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy-light)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)]/5",
  white:
    "bg-white text-[color:var(--color-navy)] hover:bg-white/90 hover:-translate-y-0.5",
};

export function CTAButton({
  to,
  href,
  variant = "primary",
  children,
  className,
  withArrow,
}: Props) {
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" />}
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={(to ?? "/") as never} className={cls}>
      {content}
    </Link>
  );
}
