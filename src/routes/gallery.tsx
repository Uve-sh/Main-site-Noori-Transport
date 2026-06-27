import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Gallery } from "@/components/site/Gallery";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Noori Transport Co." },
      {
        name: "description",
        content: "A look at our fleet, our sites and our operations on the ground.",
      },
      { property: "og:title", content: "Gallery — Noori Transport Co." },
      { property: "og:description", content: "Operations, fleet and sites in pictures." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Gallery"
        eyebrow="In pictures"
        title="From depot floor to highway to mine site."
      />
      <Gallery />
      <CTABanner />
    </>
  );
}
