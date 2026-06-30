/** Studio pods — organizational structure until named team profiles are published. */
export const studioPods = [
  {
    name: "Product",
    role: "Strategy & roadmaps",
    bio: "Founder-aligned product direction, discovery, and milestone planning for every venture and client build.",
    initials: "PR",
  },
  {
    name: "Engineering",
    role: "Full-stack delivery",
    bio: "Production-grade web, mobile, and platform engineering with long-term ownership, not ticket handoffs.",
    initials: "EN",
  },
  {
    name: "AI",
    role: "LLMs, agents & RAG",
    bio: "Production AI systems: chatbots, retrieval, agents, and analytics shipped across client deliveries.",
    initials: "AI",
  },
  {
    name: "Design",
    role: "Product experience",
    bio: "UI systems, design tokens, and interfaces that match the engineering quality of the products we ship.",
    initials: "DS",
  },
] as const;

/** @deprecated use studioPods */
export const teamMembers = studioPods;
