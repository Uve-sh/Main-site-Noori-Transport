import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Save, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  ssr: false,
  component: GalleryAdmin,
  head: () => ({ meta: [{ title: "Gallery — Noori CMS" }] }),
});

type GalleryItem = { id: string; image_url: string; caption: string | null; category: string | null; sort_order: number };

function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("gallery").select("*").order("sort_order").then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setItems(data ?? []);
      setLoading(false);
    });
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      try {
        const path = `gallery/${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: false, contentType: file.type });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
        const { data, error: dbErr } = await supabase.from("gallery")
          .insert({ image_url: urlData.publicUrl, sort_order: items.length, caption: null, category: null })
          .select().single();
        if (dbErr) throw dbErr;
        setItems((i) => [...i, data]);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      }
    }
    setUploading(false);
    toast.success("Images uploaded");
    e.target.value = "";
  }

  async function deleteItem(id: string, url: string) {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery").delete().eq("id", id);
    // Extract path from URL to delete from storage
    const path = url.split("/media/")[1];
    if (path) await supabase.storage.from("media").remove([path]);
    setItems((i) => i.filter((x) => x.id !== id));
    toast.success("Image deleted");
  }

  async function saveCaption(item: GalleryItem) {
    const { error } = await supabase.from("gallery").update({ caption: item.caption, category: item.category }).eq("id", item.id);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  }

  if (loading) return <div className="flex h-40 items-center justify-center text-sm text-[color:var(--color-ink-soft)]"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">Content</div>
          <h1 className="mt-1 font-display text-3xl font-bold text-[color:var(--color-navy)]">Gallery</h1>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[color:var(--color-orange)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-orange)]/90">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload images
          <input type="file" multiple accept="image/*" className="sr-only" onChange={handleUpload} disabled={uploading} />
        </label>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group rounded-2xl border border-black/5 bg-white shadow-[var(--shadow-soft)] overflow-hidden">
            <div className="relative aspect-video overflow-hidden bg-[color:var(--color-surface)]">
              <img src={item.image_url} alt={item.caption ?? ""} className="h-full w-full object-cover" />
              <button
                onClick={() => deleteItem(item.id, item.image_url)}
                className="absolute right-2 top-2 rounded-lg bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <Input
                placeholder="Caption (optional)"
                value={item.caption ?? ""}
                onChange={(e) => setItems((i) => i.map((x) => x.id === item.id ? { ...x, caption: e.target.value } : x))}
                className="text-xs"
              />
              <Input
                placeholder="Category (optional)"
                value={item.category ?? ""}
                onChange={(e) => setItems((i) => i.map((x) => x.id === item.id ? { ...x, category: e.target.value } : x))}
                className="text-xs"
              />
              <Button size="sm" onClick={() => saveCaption(item)} className="w-full gap-1 bg-[color:var(--color-navy)] text-white text-xs hover:bg-[color:var(--color-navy)]/90">
                <Save className="h-3 w-3" />Save
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-black/10 p-16 text-center text-sm text-[color:var(--color-ink-soft)]">No images yet. Upload some above.</div>
        )}
      </div>
    </div>
  );
}
