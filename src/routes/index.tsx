import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { AboutPreview } from "@/components/site/AboutPreview";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Fleet } from "@/components/site/Fleet";
import { Gallery } from "@/components/site/Gallery";
import { Clients } from "@/components/site/Clients";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noori Transport Co. — Delivering Trust. Driving Excellence." },
      {
        name: "description",
        content:
          "Premium road transportation and logistics from Bharuch, Gujarat — government contracts, mining, hazardous cargo, fleet operations and excavation services across India.",
      },
      { property: "og:title", content: "Noori Transport Co. — Delivering Trust. Driving Excellence." },
      {
        property: "og:description",
        content:
          "Road transportation specialist for government, mining and industrial clients across India.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <Services limit={6} />
      <Process />
      <Fleet />
      <Gallery />
      <Clients />
      <Testimonials />
      <CTABanner />
    </>
  );
}
