import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  ssr: false,
  component: SettingsAdmin,
  head: () => ({ meta: [{ title: "Settings — Noori CMS" }] }),
});

function SettingsAdmin() {
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState({
    site_name: "Noori Transport",
    meta_description: "Pakistan's most trusted logistics, mining and government cargo transport company.",
  });

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Settings saved (local only — wire to DB when needed)");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Site</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">Settings</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">Global site settings, SEO defaults, and metadata.</p>
      </header>
      <form onSubmit={save} className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-5">
        <div className="space-y-1.5"><Label>Site name</Label><Input value={fields.site_name} onChange={set("site_name")} /></div>
        <div className="space-y-1.5"><Label>Default meta description</Label><Input value={fields.meta_description} onChange={set("meta_description")} /></div>
        <Button type="submit" disabled={saving} className="w-full gap-2 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </form>
    </div>
  );
}
