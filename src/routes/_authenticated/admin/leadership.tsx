import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/leadership")({
  ssr: false,
  component: LeadershipAdmin,
  head: () => ({ meta: [{ title: "Leadership — Noori CMS" }] }),
});

type Leader = { id: string; name: string; title: string; sort_order: number };

function LeadershipAdmin() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("leadership").select("*").order("sort_order").then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setLeaders(data ?? []);
      setLoading(false);
    });
  }, []);

  function update(id: string, field: keyof Leader, value: string | number) {
    setLeaders((l) => l.map((x) => x.id === id ? { ...x, [field]: value } : x));
  }

  async function saveRow(l: Leader) {
    setSaving(l.id);
    const { error } = await supabase.from("leadership").upsert(l, { onConflict: "id" });
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  }

  async function deleteRow(id: string) {
    if (!confirm("Delete this person?")) return;
    await supabase.from("leadership").delete().eq("id", id);
    setLeaders((l) => l.filter((x) => x.id !== id));
    toast.success("Deleted");
  }

  async function addRow() {
    const { data, error } = await supabase.from("leadership")
      .insert({ name: "New Person", title: "Title", sort_order: leaders.length })
      .select().single();
    if (error) { toast.error(error.message); return; }
    setLeaders((l) => [...l, data]);
  }

  if (loading) return <div className="flex h-40 items-center justify-center text-sm text-[color:var(--color-ink-soft)]"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading…</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Content</div>
          <h1 className="mt-1 font-display text-3xl font-bold text-[color:var(--color-navy)]">Leadership</h1>
        </div>
        <Button onClick={addRow} className="gap-2 bg-[color:var(--color-orange)] text-white hover:bg-[color:var(--color-orange)]/90">
          <Plus className="h-4 w-4" />Add person
        </Button>
      </header>
      <div className="space-y-4">
        {leaders.map((l) => (
          <div key={l.id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)] space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full name</Label>
                <Input value={l.name} onChange={(e) => update(l.id, "name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Title / Role</Label>
                <Input value={l.title} onChange={(e) => update(l.id, "title", e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={() => saveRow(l)} disabled={saving === l.id} className="gap-1.5 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
                {saving === l.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}Save
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deleteRow(l.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
        {leaders.length === 0 && <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center text-sm text-[color:var(--color-ink-soft)]">No leaders yet.</div>}
      </div>
    </div>
  );
}
