import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/navigation")({
  ssr: false,
  component: NavigationAdmin,
  head: () => ({ meta: [{ title: "Navigation — Noori CMS" }] }),
});

function NavigationAdmin() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Site</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">Navigation</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">Manage the navbar links and their order.</p>
      </header>
      <div className="rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center space-y-3">
        <Info className="mx-auto h-8 w-8 text-[color:var(--color-orange)]" />
        <p className="text-sm text-[color:var(--color-ink-soft)]">Navigation editor coming in the next phase. Currently managed in <code className="rounded bg-[color:var(--color-surface)] px-1 py-0.5 text-xs">src/components/site/Navbar.tsx</code>.</p>
      </div>
    </div>
  );
}
