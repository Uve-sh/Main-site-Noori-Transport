import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/fleet")({
  ssr: false,
  component: FleetAdmin,
  head: () => ({ meta: [{ title: "Fleet — Noori CMS" }] }),
});

function FleetAdmin() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Content</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">Fleet</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">Manage your fleet vehicles, specs, and availability.</p>
      </header>
      <div className="rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center space-y-3">
        <Info className="mx-auto h-8 w-8 text-[color:var(--color-orange)]" />
        <p className="text-sm text-[color:var(--color-ink-soft)]">Fleet management editor is coming in the next phase. Currently managed in source code at <code className="rounded bg-[color:var(--color-surface)] px-1 py-0.5 text-xs">src/components/site/Fleet.tsx</code>.</p>
      </div>
    </div>
  );
}
