import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, Loader2, ImageIcon, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/logo")({
  ssr: false,
  component: LogoAdmin,
  head: () => ({
    meta: [{ title: "Logo — Noori Transport CMS" }],
  }),
});

function LogoAdmin() {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState("Noori Transport");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `logo/logo.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(path);

      const { error: upsertError } = await supabase
        .from("site_settings")
        .upsert({ key: "logo_url", value: urlData.publicUrl }, { onConflict: "key" });
      if (upsertError) throw upsertError;

      const { error: altError } = await supabase
        .from("site_settings")
        .upsert({ key: "logo_alt", value: altText }, { onConflict: "key" });
      if (altError) throw altError;

      toast.success("Logo updated successfully");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">
          Site Settings
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">
          Company Logo
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          Upload a new logo to replace the one displayed in the navbar and footer.
          Recommended: PNG or SVG with transparent background, at least 300px wide.
        </p>
      </header>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] space-y-6">
        {/* Preview */}
        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-[color:var(--color-surface)] p-8 min-h-[160px]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Logo preview"
              className="max-h-[100px] max-w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[color:var(--color-ink-soft)]">
              <ImageIcon className="h-10 w-10 opacity-30" />
              <span className="text-sm">No preview — select a file below</span>
            </div>
          )}
        </div>

        {/* File picker */}
        <div className="space-y-1.5">
          <Label htmlFor="logo-file">Logo file (PNG, SVG, WebP)</Label>
          <Input
            id="logo-file"
            type="file"
            accept="image/png,image/svg+xml,image/webp,image/jpeg"
            ref={fileRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Alt text */}
        <div className="space-y-1.5">
          <Label htmlFor="logo-alt">Alt text</Label>
          <Input
            id="logo-alt"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Noori Transport"
          />
          <p className="text-[11px] text-[color:var(--color-ink-soft)]">
            Describes the logo for screen readers and SEO.
          </p>
        </div>

        <Button
          onClick={handleUpload}
          disabled={uploading || !previewUrl}
          className="w-full gap-2 bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? "Uploading…" : "Upload logo"}
        </Button>

        <div className="flex items-start gap-2 rounded-xl bg-[color:var(--color-surface)] p-4 text-[11px] leading-relaxed text-[color:var(--color-ink-soft)]">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--color-orange)]" />
          Changes go live immediately after upload. Hard-refresh the website to see the updated logo.
        </div>
      </div>
    </div>
  );
}
