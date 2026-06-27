import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/hero")({
  ssr: false,
  component: HeroAdmin,
  head: () => ({ meta: [{ title: "Hero — Noori CMS" }] }),
});

function HeroAdmin() {
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState({
    heading: "Pakistan's Most Trusted Logistics Partner",
    subheading: "Hauling bulk commodities, mining material and government cargo across Pakistan since 1998.",
    cta_primary: "Get a Quote",
    cta_secondary: "Our Services",
  });

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(fields)) {
        const { error } = await supabase
          .from("settings")
          .upsert({ key: `hero_${key}`, value }, { onConflict: "key" });
        if (error) throw error;
      }
      toast.success("Hero section saved");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Content</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">Hero Section</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">Edit the main headline, subheading and call-to-action buttons shown at the top of the homepage.</p>
      </header>
      <form onSubmit={save} className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="hero-heading">Heading</Label>
          <Textarea id="hero-heading" rows={2} value={fields.heading} onChange={set("heading")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hero-sub">Subheading</Label>
          <Textarea id="hero-sub" rows={3} value={fields.subheading} onChange={set("subheading")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="hero-cta1">Primary CTA label</Label>
            <Input id="hero-cta1" value={fields.cta_primary} onChange={set("cta_primary")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-cta2">Secondary CTA label</Label>
            <Input id="hero-cta2" value={fields.cta_secondary} onChange={set("cta_secondary")} />
          </div>
        </div>
        <Button type="submit" disabled={saving} className="w-full gap-2 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
