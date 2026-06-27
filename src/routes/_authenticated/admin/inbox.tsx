import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Mail, Trash2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/inbox")({
  ssr: false,
  component: InboxAdmin,
  head: () => ({ meta: [{ title: "Inbox — Noori CMS" }] }),
});

type Enquiry = { id: string; name: string; company: string | null; phone: string; service: string | null; message: string; is_read: boolean; created_at: string };

function InboxAdmin() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    supabase.from("contact_enquiries").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setItems(data ?? []);
      setLoading(false);
    });
  }, []);

  async function markRead(id: string) {
    await supabase.from("contact_enquiries").update({ is_read: true }).eq("id", id);
    setItems((i) => i.map((x) => x.id === id ? { ...x, is_read: true } : x));
    if (selected?.id === id) setSelected((s) => s ? { ...s, is_read: true } : null);
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("contact_enquiries").delete().eq("id", id);
    setItems((i) => i.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Deleted");
  }

  if (loading) return <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Site</div>
        <h1 className="mt-1 font-display text-3xl font-bold text-[color:var(--color-navy)]">Inbox <span className="ml-2 rounded-full bg-[color:var(--color-orange)] px-2.5 py-0.5 text-sm text-white">{items.filter((x) => !x.is_read).length}</span></h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-2">
          {items.length === 0 && <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center text-sm text-[color:var(--color-ink-soft)]">No enquiries yet.</div>}
          {items.map((item) => (
            <button key={item.id} onClick={() => { setSelected(item); markRead(item.id); }}
              className={cn("w-full text-left rounded-xl border p-4 transition-all hover:shadow-md", selected?.id === item.id ? "border-[color:var(--color-orange)] bg-orange-50" : "border-black/5 bg-white", !item.is_read && "font-semibold")}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm text-[color:var(--color-navy)]">{item.name}</span>
                {!item.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-orange)]" />}
              </div>
              <div className="mt-1 truncate text-xs text-[color:var(--color-ink-soft)]">{item.service ?? "General enquiry"}</div>
              <div className="mt-1 text-[11px] text-[color:var(--color-ink-soft)]">{new Date(item.created_at).toLocaleDateString()}</div>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-[color:var(--color-navy)]">{selected.name}</h2>
                {selected.company && <div className="text-sm text-[color:var(--color-ink-soft)]">{selected.company}</div>}
              </div>
              <div className="flex gap-2">
                {!selected.is_read && <Button size="sm" variant="outline" onClick={() => markRead(selected.id)} className="gap-1"><CheckCircle className="h-3.5 w-3.5" />Mark read</Button>}
                <Button size="sm" variant="destructive" onClick={() => deleteItem(selected.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[color:var(--color-surface)] p-4 text-sm">
              <div><span className="text-[color:var(--color-ink-soft)]">Phone:</span> <span className="font-medium">{selected.phone}</span></div>
              <div><span className="text-[color:var(--color-ink-soft)]">Service:</span> <span className="font-medium">{selected.service ?? "—"}</span></div>
              <div className="col-span-2"><span className="text-[color:var(--color-ink-soft)]">Date:</span> <span className="font-medium">{new Date(selected.created_at).toLocaleString()}</span></div>
            </div>
            <div className="rounded-xl border border-black/5 p-4 text-sm leading-relaxed">{selected.message}</div>
            <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
              <Mail className="h-4 w-4" />Reply on WhatsApp
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center justify-center rounded-2xl border border-dashed border-black/10 text-sm text-[color:var(--color-ink-soft)]">Select an enquiry to read it.</div>
        )}
      </div>
    </div>
  );
}
