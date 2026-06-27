import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Container";
// (CTAButton not used here; we render a native submit button for proper form semantics)

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Noori Transport Co." },
      {
        name: "description",
        content:
          "Get a transport quote in under 24 hours. Call, WhatsApp or email Noori Transport Co. — Bharuch, Gujarat.",
      },
      { property: "og:title", content: "Contact Noori Transport Co." },
      { property: "og:description", content: "Reach our dispatch desk — usually a same-day response." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Talk to us"
        title="Get a transport quote in under 24 hours."
        subtitle="Share your route, cargo and timeline. Our dispatch desk responds the same business day, every time."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Form */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-orange)] text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--color-navy)]">
                    Thank you — message received.
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--color-ink-soft)]">
                    Our dispatch desk will get back to you within one business day. For urgent
                    enquiries please call {site.contact.phone}.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <h2 className="font-display text-2xl font-semibold text-[color:var(--color-navy)]">
                    Request a quote
                  </h2>
                  <p className="text-sm text-[color:var(--color-ink-soft)]">
                    Fill in the form below — we'll respond within hours.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" required />
                    <Field label="Company" name="company" />
                    <Field label="Phone" name="phone" type="tel" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Origin (from)" name="from" required />
                    <Field label="Destination (to)" name="to" required />
                  </div>
                  <Field label="Service required" name="service" />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
                      Cargo & requirements
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-[color:var(--color-surface)] px-4 py-3 text-sm focus:border-[color:var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-navy)]/15"
                      placeholder="Tell us about the consignment, timeline and any special handling needs."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-orange)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.68_0.18_45/0.5)] transition-all hover:-translate-y-0.5 hover:bg-[color:var(--color-orange-light)] sm:w-auto"
                  >
                    Send enquiry →
                  </button>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="Call us"
                primary={site.contact.phone}
                href={`tel:${site.contact.phone}`}
                meta={site.contact.hours}
              />
              <ContactCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="WhatsApp"
                primary={site.contact.whatsapp}
                href={site.contact.whatsappLink}
                meta="Fastest response · usually under an hour"
              />
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                primary={site.contact.email}
                href={`mailto:${site.contact.email}`}
                meta="Same business day reply"
              />
              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                title="Head office"
                primary={site.contact.address}
                meta="Bharuch, Gujarat"
              />
              <ContactCard
                icon={<Instagram className="h-5 w-5" />}
                title="Instagram"
                primary={site.contact.instagramHandle}
                href={site.contact.instagram}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
        {label}
        {required && <span className="text-[color:var(--color-orange)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-[color:var(--color-surface)] px-4 py-3 text-sm focus:border-[color:var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-navy)]/15"
      />
    </div>
  );
}

function ContactCard({
  icon,
  title,
  primary,
  meta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  meta?: string;
  href?: string;
}) {
  const inner = (
    <div className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--color-navy)] text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
          {title}
        </div>
        <div className="mt-1 break-words font-display text-base font-semibold text-[color:var(--color-navy)]">
          {primary}
        </div>
        {meta && <div className="mt-1 text-xs text-[color:var(--color-ink-soft)]">{meta}</div>}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
