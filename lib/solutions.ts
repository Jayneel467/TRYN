import { clientDeliveries } from "@/lib/case-studies";

export type Solution = {
  slug: string;
  title: string;
  category: string;
  description: string;
  deliverySlugs: string[];
};

const categoryDescriptions: Record<string, string> = {
  Healthcare:
    "AI chatbots and patient-facing automation for healthcare education and institutes.",
  EdTech:
    "Web and WhatsApp assistants that scale academic program support without adding headcount.",
  Wellness:
    "AI-augmented wellness products, from virtual instruction to therapeutic roleplay tools.",
  Marketing:
    "Content and social automation with brand-consistent generative workflows.",
  Manufacturing:
    "Computer vision, analytics, and decision intelligence for production environments.",
  "Voice AI": "Voice-enabled knowledge systems for hands-free enterprise retrieval.",
  "Fashion AI": "Guided experiences for traditional retail and fashion education.",
  Sales: "WhatsApp sales assistants that qualify leads and automate order flows.",
  "3D Technology":
    "Conversational layers on 3D product experiences for guided discovery and conversion.",
};

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const categories = [...new Set(clientDeliveries.map((d) => d.category))];

export const solutions: Solution[] = categories.map((category) => ({
  slug: slugifyCategory(category),
  title: `${category} solutions`,
  category,
  description:
    categoryDescriptions[category] ??
    `Production AI and software deliveries engineered by TRYN Studios for ${category.toLowerCase()} businesses.`,
  deliverySlugs: clientDeliveries
    .filter((d) => d.category === category)
    .map((d) => d.slug),
}));

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
