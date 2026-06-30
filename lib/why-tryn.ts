/** Homepage — studio philosophy pillars with layout variants (section 05). */
export type WhyTrynPillar = {
  title: string;
  description: string;
  variant: "featured" | "emphasis" | "default";
  eyebrow?: string;
};

export const whyTrynFeatures: WhyTrynPillar[] = [
  {
    variant: "featured",
    eyebrow: "The difference",
    title: "We build companies",
    description:
      "A venture studio, not a dev shop. We engineer products end to end, whether the venture is ours or one we back through the Founders Program.",
  },
  {
    variant: "default",
    title: "Skin in the game",
    description:
      "Through the Founders Program we take equity alongside aligned founders. When we partner, we commit to the outcome, not a statement of work.",
  },
  {
    variant: "emphasis",
    title: "One team, one product",
    description:
      "Engineers embedded on your venture, not rotating across a roster of client projects. Focus is the studio model.",
  },
  {
    variant: "default",
    title: "Built to last",
    description:
      "Startup velocity with production-grade architecture. We ship fast because we plan for scale from day one.",
  },
];
