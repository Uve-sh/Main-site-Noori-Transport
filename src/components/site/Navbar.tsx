import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden border-b border-white/10 bg-[color:var(--color-navy)] py-2 text-xs text-white/80 lg:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-12">
          <span className="tracking-wide">
            {site.brand.tagline}
          </span>
          <div className="flex items-center gap-6">
            <a href={`tel:${site.contact.phone}`} className="hover:text-white">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">
              {site.contact.email}
            </a>
            <span>{site.contact.hours}</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-black/5 bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            : "bg-white",
        )}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 lg:px-12 lg:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={site.brand.logo}
              alt={site.brand.name}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-[15px] font-bold tracking-tight text-[color:var(--color-navy)] sm:text-base">
                NOORI TRANSPORT
              </div>
              <div className="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
                Logistics · Mining · Government
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 lg:flex">
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href as never}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-[color:var(--color-navy)]"
                        : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-navy)]",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[color:var(--color-orange)]" />
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="ml-2 hidden lg:block">
              <CTAButton to="/contact" withArrow>
                Get a Quote
              </CTAButton>
            </div>

            <a
              href={`tel:${site.contact.phone}`}
              aria-label="Call Noori Transport"
              className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-navy)] text-white lg:hidden"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-[color:var(--color-navy)] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-[color:var(--color-navy)]/40 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <img src={site.brand.logo} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
              <span className="truncate font-display text-sm font-bold text-[color:var(--color-navy)]">
                NOORI TRANSPORT
              </span>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href as never}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium transition-colors",
                    active
                      ? "bg-[color:var(--color-surface)] text-[color:var(--color-navy)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface)]",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-opacity",
                      active ? "bg-[color:var(--color-orange)] opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="space-y-3 border-t border-black/5 px-5 py-5">
            <CTAButton to="/contact" className="w-full" withArrow>
              Request a Quote
            </CTAButton>
            <CTAButton href={`tel:${site.contact.phone}`} variant="secondary" className="w-full">
              Call {site.contact.phone}
            </CTAButton>
            <p className="pt-1 text-center text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
              {site.brand.tagline}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
