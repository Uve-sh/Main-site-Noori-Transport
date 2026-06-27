import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/services")({
  ssr: false,
  component: ServicesAdmin,
  head: () => ({ meta: [{ title: "Services — Noori CMS" }] }),
});

type Service = { id: string; title: string; description: string; sort_order: number; active: boolean };

function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("services").select("*").order("sort_order").then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setServices(data ?? []);
      setLoading(false);
    });
  }, []);

  async function saveRow(s: Service) {
    setSaving(s.id);
    const { error } = await supabase.from("services").upsert(s, { onConflict: "id" });
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  }

  async function deleteRow(id: string) {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else setServices((s) => s.filter((x) => x.id !== id));
  }

  async function addRow() {
    const blank = { title: "New Service", description: "", sort_order: services.length, active: true };
    const { data, error } = await supabase.from("services").insert(blank).select().single();
    if (error) { toast.error(error.message); return; }
    setServices((s) => [...s, data]);
  }

  function update(id: string, field: keyof Service, value: string | boolean | number) {
    setServices((s) => s.map((x) => x.id === id ? { ...x, [field]: value } : x));
  }

  if (loading) return <div className="flex h-40 items-center justify-center text-sm text-[color:var(--color-ink-soft)]"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Content</div>
          <h1 className="mt-1 font-display text-3xl font-bold text-[color:var(--color-navy)]">Services</h1>
        </div>
        <Button onClick={addRow} className="gap-2 bg-[color:var(--color-orange)] text-white hover:bg-[color:var(--color-orange)]/90">
          <Plus className="h-4 w-4" />Add service
        </Button>
      </header>
      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)] space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={s.title} onChange={(e) => update(s.id, "title", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={3} value={s.description ?? ""} onChange={(e) => update(s.id, "description", e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={() => saveRow(s)} disabled={saving === s.id} className="gap-1.5 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
                {saving === s.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deleteRow(s.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <label className="ml-auto flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] cursor-pointer">
                <input type="checkbox" checked={s.active} onChange={(e) => update(s.id, "active", e.target.checked)} />
                Visible
              </label>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center text-sm text-[color:var(--color-ink-soft)]">No services yet. Click "Add service" to create one.</div>
        )}
      </div>
    </div>
  );
}
