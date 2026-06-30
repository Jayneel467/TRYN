import { clientCaseStudies } from "@/lib/client-case-studies";

export type CaseStudyStatus =
  | "In development"
  | "Pre-launch"
  | "Planned"
  | "Internal"
  | "Delivered";

export type CaseStudy = {
  slug: string;
  title: string;
  legalName?: string;
  category: string;
  status: CaseStudyStatus;
  description: string;
  summary: string;
  metrics: readonly { label: string; value: string }[];
  color: string;
  featured: boolean;
  isInternal: boolean;
  externalUrl?: string;
  /** Local path under public/ e.g. /work/whatsapp-healthcare.jpg */
  image?: string;
  /** Shown when image is illustrative, not a client screenshot */
  imageCaption?: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
};

const itineroCaseStudies: CaseStudy[] = [
  {
    slug: "itinero-travels",
    title: "Itinero Travels",
    legalName: "Itinero Travels Private Limited",
    category: "Travel & AI",
    status: "In development",
    externalUrl: "https://itinero.company",
    description:
      "AI travel buddy for personalized trip planning, smart itineraries, and booking, in active development ahead of public launch.",
    summary:
      "TRYN Studios is the dedicated engineering team building Itinero Travels, an AI-powered travel platform currently in pre-launch.",
    metrics: [
      { label: "Status", value: "Pre-launch" },
      { label: "Launch", value: "Jun 2026" },
      { label: "Focus", value: "AI planning" },
      { label: "Site", value: "itinero.company" },
    ],
    color: "from-cyan-600/20 to-teal-500/20",
    featured: true,
    isInternal: true,
    challenge:
      "Itinero is building a consumer travel product that combines conversational AI, itinerary planning, and booking into one experience, without the complexity of stitching together multiple tools.",
    solution:
      "TRYN is engineering the platform end to end: web and mobile experiences, AI-assisted trip planning, booking infrastructure, and the operational tooling the Itinero team needs during build and launch.",
    outcomes: [
      "Unified product surface for discovery, planning, and booking",
      "Pre-launch waitlist live at itinero.company",
      "Engineering foundation designed for launch and post-launch scale",
    ],
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    slug: "itinero-ecosystem",
    title: "Itinero Ecosystem",
    legalName: "Itinero Travels Private Limited",
    category: "Roadmap",
    status: "Planned",
    description:
      "Planned B2B partner distribution and payments capabilities under the Itinero group, sequenced after the core travel platform launch.",
    summary:
      "Future Itinero group capabilities on the roadmap: partner distribution and multi-currency payments, not live products today.",
    metrics: [
      { label: "Status", value: "Roadmap" },
      { label: "Scope", value: "B2B + payments" },
      { label: "Timing", value: "Post-launch" },
      { label: "Owner", value: "Itinero group" },
    ],
    color: "from-orange-500/20 to-amber-500/20",
    featured: false,
    isInternal: true,
    challenge:
      "As Itinero scales beyond consumer travel, the group will need partner distribution tooling and a payments layer that supports multi-currency bookings and settlements.",
    solution:
      "TRYN is scoping modular services: partner portals, catalog sync, and payment rails, to extend the core platform once the flagship product is in market.",
    outcomes: [
      "Clear sequencing: consumer platform first, ecosystem extensions next",
      "Shared architecture with the Itinero Travels core stack",
      "No separate vendor lock-in for future group products",
    ],
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
  },
  {
    slug: "tryn-venture-ops",
    title: "TRYN Venture Ops",
    category: "Internal Platform",
    status: "Internal",
    description:
      "Internal venture platform: shared auth, design system, CI/CD, and product tooling that lets TRYN ship new builds with consistency.",
    summary:
      "The operating system behind TRYN's engineering model: repeatable infrastructure and process for group ventures and selected founder partners.",
    metrics: [
      { label: "Purpose", value: "Ship faster" },
      { label: "Scope", value: "Shared tooling" },
      { label: "Model", value: "Venture studio" },
      { label: "Stage", value: "Early" },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    featured: false,
    isInternal: true,
    challenge:
      "TRYN needed repeatable tooling to move from product idea to production without reinventing infrastructure for every new venture or founder engagement.",
    solution:
      "An internal platform with shared auth patterns, a design system, CI/CD templates, and product analytics. This is the backbone of how TRYN engineers group ventures.",
    outcomes: [
      "Consistent security and compliance baselines across builds",
      "Faster MVP cycles for new ventures and founder partnerships",
      "Shared learnings applied to the Itinero flagship build",
    ],
    technologies: ["Next.js", "Turborepo", "Vercel", "Terraform", "OpenTelemetry"],
  },
];

export const caseStudies: CaseStudy[] = [...itineroCaseStudies, ...clientCaseStudies];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export const featuredCaseStudy = caseStudies.find(
  (s) => s.featured && s.slug === "itinero-travels",
)!;

export const clientDeliveries = clientCaseStudies;

export const featuredClientCaseStudy =
  clientCaseStudies.find((s) => s.featured) ?? clientCaseStudies[0]!;

export const itineroGroupCaseStudies = itineroCaseStudies;
