import { siteConfig } from "./site-config";

export const portfolioBrands = [
  {
    id: "itinero-travels",
    name: "Itinero Travels",
    legalName: "Itinero Travels Private Limited",
    industry: "Travel & AI",
    role: "Parent Company · In development",
    description:
      "Itinero is building an AI travel buddy for personalized trip planning, itineraries, and smarter bookings. TRYN Studios engineers the platform ahead of its public launch at itinero.company.",
    href: "/work/itinero-travels",
    featured: true,
    metrics: [
      { label: "Status", value: "Pre-launch" },
      { label: "Launch", value: "Jun 2026" },
      { label: "Site", value: "itinero.company" },
    ],
    accent: "#0E7490",
    logo: siteConfig.parentCompany.logo,
  },
  {
    id: "tryn-studios",
    name: "TRYN Studios",
    industry: "Product Engineering",
    role: "Engineering Studio",
    description:
      "TRYN is Itinero's dedicated product engineering arm, building the flagship travel platform, shipping client AI deliveries, and open to selected founder partnerships through the Founders Program.",
    href: "/about",
    featured: false,
    metrics: [
      { label: "Focus", value: "Itinero build" },
      { label: "Deliveries", value: "10+" },
      { label: "Partners", value: "Selective" },
    ],
    accent: "#FF8C1A",
    logo: "/brand/tryn-logo-header-light.png",
  },
] as const;

export const featuredBrand = portfolioBrands.find((b) => b.featured)!;
