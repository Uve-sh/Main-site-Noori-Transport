import { site } from "@/data/site";
import { Container, Section, SectionHeader } from "./Container";

export function Gallery() {
  return (
    <Section id="gallery">
      <Container>
        <SectionHeader
          eyebrow="On the ground"
          title="A look at our fleet, our sites, our operations."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {site.gallery.map((g, idx) => (
            <figure
              key={g.src}
              className={`group relative overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ${
                idx === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/5]" : "aspect-square"
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy)]/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <figcaption className="absolute bottom-3 left-3 right-3 translate-y-2 text-xs font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
