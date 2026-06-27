import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Noori Transport Co." },
      {
        name: "description",
        content:
          "Government transport contracts, fleet operations, hazardous cargo, mining logistics, OB removal, excavation and FTL — full service portfolio.",
      },
      { property: "og:title", content: "Services — Noori Transport Co." },
      {
        property: "og:description",
        content: "Full portfolio of road transportation and logistics services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="What we do"
        title="Specialised logistics for India's most demanding industries."
        subtitle="Seven service lines, one operating standard: safety, transparency and on-time delivery."
      />
      <Services />
      <Process />
      <CTABanner />
    </>
  );
}
