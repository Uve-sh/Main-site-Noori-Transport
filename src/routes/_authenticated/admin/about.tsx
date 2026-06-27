import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/about")({
  ssr: false,
  component: AboutAdmin,
  head: () => ({ meta: [{ title: "About — Noori CMS" }] }),
});

function AboutAdmin() {
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState({
    heading: "About Noori Transport",
    body: "Since 1998, Noori Transport has served Pakistan's most demanding logistics routes.",
    founded: "1998",
    fleet_count: "100+",
    routes: "50+",
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
        const { error } = await supabase.from("settings").upsert({ key: `about_${key}`, value }, { onConflict: "key" });
        if (error) throw error;
      }
      toast.success("About section saved");
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
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">About Section</h1>
      </header>
      <form onSubmit={save} className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-5">
        <div className="space-y-1.5"><Label>Heading</Label><Input value={fields.heading} onChange={set("heading")} /></div>
        <div className="space-y-1.5"><Label>Body text</Label><Textarea rows={5} value={fields.body} onChange={set("body")} /></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5"><Label>Founded</Label><Input value={fields.founded} onChange={set("founded")} /></div>
          <div className="space-y-1.5"><Label>Fleet count</Label><Input value={fields.fleet_count} onChange={set("fleet_count")} /></div>
          <div className="space-y-1.5"><Label>Routes</Label><Input value={fields.routes} onChange={set("routes")} /></div>
        </div>
        <Button type="submit" disabled={saving} className="w-full gap-2 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
