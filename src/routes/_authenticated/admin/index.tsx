import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Wrench,
  Truck,
  Image as ImageIcon,
  Users,
  Mail,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  ssr: false,
  component: AdminDashboard,
});

const quickActions = [
  { title: "Edit Hero", href: "/admin/hero", Icon: Sparkles, description: "Headline, subheading and CTAs" },
  { title: "Logo", href: "/admin/logo", Icon: Layers, description: "Upload company logo" },
  { title: "Manage Services", href: "/admin/services", Icon: Wrench, description: "Add, edit or reorder services" },
  { title: "Manage Fleet", href: "/admin/fleet", Icon: Truck, description: "Vehicles, specs and availability" },
  { title: "Gallery", href: "/admin/gallery", Icon: ImageIcon, description: "Upload and organise images" },
  { title: "Leadership", href: "/admin/leadership", Icon: Users, description: "Profiles and ordering" },
  { title: "Contact info", href: "/admin/contact", Icon: Mail, description: "Phone, email, social and address" },
];

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">
          Dashboard
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--color-navy)]">
          Welcome back.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          You can edit every section of the public website from here. Changes go live immediately after you confirm a save.
        </p>
      </header>

      {/* Counts will be wired up in a later phase */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
          Quick actions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map(({ title, href, Icon, description }) => (
            <Link
              key={href}
              to={href}
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--color-surface)] text-[color:var(--color-navy)] transition-colors group-hover:bg-[color:var(--color-orange)] group-hover:text-white">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="mt-4 font-display text-sm font-semibold text-[color:var(--color-navy)]">
                {title}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
                {description}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-black/10 bg-white/60 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-orange)]">
          Coming next
        </div>
        <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
          The full CMS modules — content editors with image uploads, drag-to-reorder, and live publishing — are being built in the next phases. The dashboard sidebar links above will start working as each module ships.
        </p>
      </section>
    </div>
  );
}
