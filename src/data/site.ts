/**
 * Single source of truth for all editable content.
 * Each field maps 1:1 to a future CMS column so the admin dashboard
 * can update copy without code changes.
 */
import logoAsset from "@/assets/noori-logo.png.asset.json";
import heroFleet from "@/assets/hero-fleet.jpg";
import aboutOps from "@/assets/about-operations.jpg";
import sGov from "@/assets/service-government.jpg";
import sMining from "@/assets/service-mining.jpg";
import sHaz from "@/assets/service-hazardous.jpg";
import sOb from "@/assets/service-ob-removal.jpg";
import sExc from "@/assets/service-excavation.jpg";
import sFtl from "@/assets/service-ftl.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import leaderIbrahim from "@/assets/leader-ibrahim.jpg";
import leaderArshil from "@/assets/leader-arshil.jpg";
import leaderAyaan from "@/assets/leader-ayaan.jpg";

export const site = {
  brand: {
    name: "NOORI TRANSPORT CO.",
    short: "Noori Transport",
    tagline: "Delivering Trust. Driving Excellence.",
    logo: logoAsset.url,
  },
  contact: {
    phone: "+91 98242 66522",
    whatsapp: "+91 98242 66522",
    whatsappLink: "https://wa.me/919824266522",
    email: "noori_transport2001@yahoo.com",
    address:
      "5, Sabar Hotel Compound, Narmada Chokdi, N.H.-8, Bharuch, Gujarat - 392015",
    instagram: "https://instagram.com/noori_transport_co",
    instagramHandle: "@noori_transport_co",
    hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  },
  hero: {
    eyebrow: "Established Transport & Logistics Partner · Bharuch, Gujarat",
    title: "Moving India's Industries Forward — Safely, On Time, Every Time.",
    subtitle:
      "From government transport contracts to mining logistics and hazardous cargo, Noori Transport Co. delivers dependable road transportation across the region with a commitment to safety and operational excellence.",
    primaryCta: { label: "Request a Quote", href: "/contact" },
    secondaryCta: { label: "Explore Services", href: "/services" },
    image: heroFleet,
  },
  stats: [
    { value: "20+", label: "Years of Operations" },
    { value: "100+", label: "Vehicles in Fleet" },
    { value: "50+", label: "Government & Industrial Clients" },
    { value: "99.4%", label: "On-Time Delivery" },
  ],
  about: {
    eyebrow: "About Noori Transport Co.",
    title: "More than transport — a trusted logistics partner.",
    lead:
      "Founded by Mr. Ibrahim Saya, Noori Transport Co. was built on honesty, commitment, and customer satisfaction. Today, under the leadership of Mr. Arshil Saya (CEO) and Mr. Ayaan Saya (Director of Business Development & Strategic Operations), the company continues to expand its network and set new benchmarks in road transportation.",
    paragraphs: [
      "Based in Bharuch, Gujarat, we specialize in road transportation and logistics solutions for government bodies, mining operators, refineries, and industrial enterprises across the region.",
      "Whether it is full truck load (FTL), part-load transportation, hazardous cargo, or specialized mining and excavation logistics — every shipment is handled with professionalism, transparent communication, and uncompromising safety standards.",
    ],
    image: aboutOps,
    points: [
      "ISO-aligned safety & compliance practices",
      "Owned & maintained fleet — no broker dependence",
      "24×7 dispatch and live coordination",
      "Multi-industry experience: government, mining, chemicals",
    ],
  },
  services: [
    {
      slug: "government-transport",
      title: "Government Transport Contracts",
      summary:
        "Long-standing partner for state and central government transport requirements with full documentation, compliance, and audit-ready records.",
      image: sGov,
      icon: "Landmark",
    },
    {
      slug: "fleet-operations",
      title: "Fleet Operations",
      summary:
        "Owned and operated fleet of trailers, tippers, tankers and box trucks dispatched from a central Bharuch hub across western and central India.",
      image: heroFleet,
      icon: "Truck",
    },
    {
      slug: "hazardous-cargo",
      title: "Hazardous Material Transportation",
      summary:
        "Trained drivers, certified tankers and end-to-end safety protocols for chemicals, petrochemicals and other regulated cargo.",
      image: sHaz,
      icon: "ShieldAlert",
    },
    {
      slug: "mining-logistics",
      title: "Mining Logistics",
      summary:
        "Heavy-haul transportation for active mine sites — ore movement, internal site logistics and pit-to-plant operations.",
      image: sMining,
      icon: "Mountain",
    },
    {
      slug: "ob-removal",
      title: "Overburden (OB) Removal",
      summary:
        "Scaled OB removal and dumping operations with tippers and earth-movers, contracted by output volume and operational uptime.",
      image: sOb,
      icon: "Layers",
    },
    {
      slug: "excavation",
      title: "Excavation Services",
      summary:
        "Site excavation, trenching and earthwork for industrial, government and infrastructure projects of every scale.",
      image: sExc,
      icon: "Pickaxe",
    },
    {
      slug: "ftl-partload",
      title: "Full Truck Load & Part Load",
      summary:
        "Customised FTL and consolidated part-load solutions for industrial and commercial consignments — pan-India.",
      image: sFtl,
      icon: "Package",
    },
  ],
  process: [
    { step: "01", title: "Enquiry", body: "Share your route, cargo and timeline — we respond within hours, not days." },
    { step: "02", title: "Quotation", body: "Transparent, itemised pricing with no hidden surcharges." },
    { step: "03", title: "Dispatch", body: "Right vehicle, qualified driver, verified documentation — on the road on time." },
    { step: "04", title: "Tracking", body: "Live status updates from origin to destination through our control desk." },
    { step: "05", title: "Delivery & POD", body: "Signed proof of delivery and clean invoicing — every single trip." },
  ],
  fleet: [
    { name: "Heavy Trailers (40 ft)", capacity: "Up to 40 MT", use: "Industrial cargo, machinery" },
    { name: "Tippers (10 / 16 / 25 MT)", capacity: "10 – 25 MT", use: "Mining, OB removal, aggregates" },
    { name: "Chemical Tankers", capacity: "16 – 28 KL", use: "Hazardous & non-hazardous liquids" },
    { name: "Closed Body Trucks", capacity: "9 – 20 MT", use: "Government cargo, FMCG, electronics" },
    { name: "Flatbed Trailers", capacity: "20 – 32 MT", use: "Pipes, structures, project cargo" },
    { name: "Excavators & Earth Movers", capacity: "Site equipment", use: "Excavation & site preparation" },
  ],
  gallery: [
    { src: g3, alt: "Aerial view of fleet at depot" },
    { src: g4, alt: "Mining haul truck at quarry" },
    { src: g1, alt: "Heavy truck wheel detail at golden hour" },
    { src: g5, alt: "Tanker at refinery loading bay" },
    { src: g2, alt: "Long-haul truck on highway at twilight" },
    { src: g6, alt: "Excavator and tipper at sunset" },
  ],
  clients: [
    "Gujarat State Petronet",
    "ONGC",
    "GAIL India",
    "Reliance Industries",
    "GMDC",
    "Adani Group",
    "GIPCL",
    "Gujarat Mineral Corp.",
  ],
  testimonials: [
    {
      quote:
        "Noori Transport has handled our chemical movements for years without a single safety incident. Their discipline on the road is exceptional.",
      name: "Plant Logistics Head",
      role: "Petrochemical major, Dahej",
    },
    {
      quote:
        "Reliable, transparent and quick to respond. They are part of how we operate, not just a vendor.",
      name: "Procurement Director",
      role: "Mining contractor, Gujarat",
    },
    {
      quote:
        "Documentation, compliance and on-time delivery — three things government contracts demand, and Noori delivers on all three.",
      name: "Project Officer",
      role: "Government infrastructure project",
    },
  ],
  leadership: [
    {
      name: "Mr. Ibrahim Saya",
      role: "Founder",
      image: leaderIbrahim,
      bio: "The guiding force behind Noori Transport Co. Mr. Ibrahim Saya laid the foundation of the company on the values of honesty, commitment and customer satisfaction — principles that continue to shape every decision today.",
    },
    {
      name: "Mr. Arshil Saya",
      role: "Co-Founder & Chief Executive Officer",
      image: leaderArshil,
      bio: "Leads day-to-day operations, fleet expansion and long-term strategy. Under his stewardship the company has grown into a trusted logistics partner for government, mining and industrial clients across western India.",
    },
    {
      name: "Mr. Ayaan Saya",
      role: "Director — Business Development & Strategic Operations",
      image: leaderAyaan,
      bio: "Drives new client partnerships, technology adoption and operational modernisation. Focused on scaling Noori Transport into a next-generation, technology-led logistics enterprise.",
    },
  ],
  story: {
    mission:
      "To deliver dependable, safe and efficient road transportation that empowers India's industries to operate without compromise — every shipment, every kilometre, every time.",
    vision:
      "To be recognised as one of India's most trusted logistics partners — known for operational excellence, ethical business practices and long-standing client relationships built over generations.",
    journey: [
      {
        year: "2001",
        title: "Founded in Bharuch",
        body: "Mr. Ibrahim Saya started Noori Transport Co. with a handful of trucks and an uncompromising commitment to honest, on-time delivery.",
      },
      {
        year: "2008",
        title: "Industrial expansion",
        body: "Onboarded major refinery and chemical clients in the Bharuch–Dahej belt, building specialised hazardous cargo capability.",
      },
      {
        year: "2015",
        title: "Government contracts",
        body: "Became a long-standing transport partner for state and central government bodies with full compliance and audit-ready operations.",
      },
      {
        year: "2020",
        title: "Mining & heavy haulage",
        body: "Scaled into mining logistics, OB removal and excavation services for some of India's largest mineral operators.",
      },
      {
        year: "Today",
        title: "100+ vehicle fleet",
        body: "An owned, well-maintained fleet operating 24×7 across western and central India under second-generation leadership.",
      },
    ],
    whyChoose: [
      { title: "Timely Deliveries", body: "Disciplined dispatch and live coordination ensure 99.4% on-time performance across routes." },
      { title: "Experienced Drivers", body: "Trained, background-verified drivers — many with 10+ years on hazardous and heavy-haul routes." },
      { title: "Modern Fleet", body: "100+ owned trailers, tippers, tankers and closed-body trucks, maintained in-house." },
      { title: "Customer-First Service", body: "Single point of contact, transparent pricing and direct access to operations leadership." },
      { title: "Safe & Secure Transport", body: "ISO-aligned safety practices, defensive driving training and full insurance coverage." },
      { title: "Reliable Logistics", body: "Owned fleet means no broker chains — predictable capacity, predictable timelines." },
      { title: "Operational Excellence", body: "Audit-ready documentation, signed PODs and clean invoicing on every single trip." },
      { title: "24×7 Customer Support", body: "Round-the-clock dispatch desk that stays with your shipment from origin to destination." },
    ],
    trustPillars: [
      "Two decades of unbroken operations",
      "Direct family-led leadership",
      "Owned & maintained fleet — no broker dependence",
      "Compliance-first culture for government & industrial clients",
    ],
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  seo: {
    titleSuffix: "Noori Transport Co.",
    defaultDescription:
      "Noori Transport Co. — Bharuch-based road transportation and logistics specialist for government, mining, hazardous cargo and industrial clients across India.",
  },
} as const;

export type Service = (typeof site.services)[number];
