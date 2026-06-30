export const fellowshipPillars = [
  {
    title: "Modern engineering craft",
    description:
      "Full-stack development, AI/ML fundamentals, cloud infrastructure, and production practices, taught through real codebases, not tutorials.",
  },
  {
    title: "Venture studio exposure",
    description:
      "Work alongside TRYN engineers on Itinero Travels, client deliveries, and studio tooling. See how companies are built end to end.",
  },
  {
    title: "Mentorship with accountability",
    description:
      "Senior engineers review your work, pair on hard problems, and hold you to the same standards we apply on client and venture builds.",
  },
  {
    title: "Pathways into studio work",
    description:
      "Top performers may join TRYN or group ventures full-time. The fellowship is a pipeline into the studio, not a certificate program.",
  },
] as const;

export const fellowshipAudience = [
  "Engineering students seeking real production experience",
  "Junior developers ready to level up on AI and full-stack",
  "Career switchers committed to building, not just learning",
] as const;

export const fellowshipTimeline = [
  { step: "01", title: "Apply", description: "Share your background, portfolio, and what you want to build." },
  { step: "02", title: "Interview", description: "Technical conversation and culture fit with TRYN engineering leads." },
  { step: "03", title: "Embed", description: "Join a venture squad with weekly mentorship and shipped deliverables." },
  { step: "04", title: "Grow", description: "Expand scope, lead features, and explore full-time studio roles." },
] as const;
