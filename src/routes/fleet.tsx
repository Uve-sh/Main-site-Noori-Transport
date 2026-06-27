import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Fleet } from "@/components/site/Fleet";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Fleet — Noori Transport Co." },
      {
        name: "description",
        content:
          "100+ owned vehicles — trailers, tippers, tankers, closed-body trucks and earth-movers — calibrated for India's industrial diversity.",
      },
      { property: "og:title", content: "Fleet — Noori Transport Co." },
      {
        property: "og:description",
        content: "Owned, maintained fleet built for every kind of cargo.",
      },
    ],
  }),
  component: FleetPage,
});

function FleetPage() {
  return (
    <>
      <PageHero
        breadcrumb="Fleet"
        eyebrow="The fleet"
        title="100+ owned vehicles, ready for the road."
        subtitle="An owned, well-maintained fleet means dependable dispatch — no broker chains, no last-minute surprises."
      />
      <Fleet />
      <CTABanner />
    </>
  );
}
