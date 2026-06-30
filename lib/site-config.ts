import { env } from "@/lib/env";

export const siteConfig = {
  name: "TRYN Studios",
  legalName: "TRYN Studios",
  tagline: "Building the Companies of Tomorrow.",
  description:
    "An early-stage product engineering studio under Itinero Travels, building ventures from within and partnering with selected founders.",
  url: "https://trynstudios.com",
  parentCompany: {
    name: "Itinero Travels",
    legalName: "Itinero Travels Private Limited",
    founder: "Jagannath",
    description:
      "Parent company behind TRYN Studios, founded by Jagannath and building an AI travel platform in pre-launch at itinero.company.",
    url: "https://itinero.company",
    logo: "/brand/itinero-logo.svg",
  },
  contact: {
    email: "support@tryn.studio",
    phone: null as string | null,
    phoneNote: "Contact via email. We respond within 24 hours.",
    location: "Global, remote first",
    whatsapp: env.whatsappUrl ?? null,
    calEmbedUrl: env.calEmbedUrl ?? null,
  },
  social: {
    linkedin: "https://linkedin.com/company/trynstudios",
    github: "https://github.com/trynstudios",
    x: "https://x.com/trynstudios",
  },
  ctas: {
    founders: { label: "Founders Program", href: "/founders-program" },
    hire: { label: "Hire TRYN", href: "/contact" },
    pitchDeck: { label: "Apply with Pitch Deck", href: "/founders-program" },
  },
} as const;

export const navLinks = [
  { label: "Founders Program", href: "/founders-program" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  product: [
    { label: "Founders Program", href: "/founders-program" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Engineering", href: "/engineering" },
    { label: "Insights", href: "/insights" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Portfolio", href: "/work" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const footerLinkGroups = [
  { title: "Product", links: footerLinks.product },
  { title: "Company", links: footerLinks.company },
  { title: "Legal", links: footerLinks.legal },
] as const;
