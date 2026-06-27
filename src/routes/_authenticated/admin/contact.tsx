import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  ssr: false,
  component: ContactAdmin,
  head: () => ({ meta: [{ title: "Contact — Noori CMS" }] }),
});

function ContactAdmin() {
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState({
    phone: "+92-300-0000000",
    email: "info@nooritransport.in",
    address: "Noori Transport Office, Pakistan",
    whatsapp: "",
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
          .upsert({ key: contact_, value }, { onConflict: "key" });
        if (error) throw error;
      }
      toast.success("Contact info saved");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Site</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">Contact Info</h1>
      </header>
      <form onSubmit={save} className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-5">
        <div className="space-y-1.5"><Label>Phone</Label><Input value={fields.phone} onChange={set("phone")} /></div>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={fields.email} onChange={set("email")} /></div>
        <div className="space-y-1.5"><Label>WhatsApp number</Label><Input value={fields.whatsapp} onChange={set("whatsapp")} placeholder="+92 300 0000000" /></div>
        <div className="space-y-1.5"><Label>Address</Label><Textarea rows={3} value={fields.address} onChange={set("address")} /></div>
        <Button type="submit" disabled={saving} className="w-full gap-2 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
