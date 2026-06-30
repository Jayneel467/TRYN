export type MindMapLane = "input" | "studio" | "output";

export type MindMapNode = {
  id: string;
  lane: MindMapLane;
  label: string;
  summary: string;
  detail: string;
};

export const mindMapLanes: { id: MindMapLane; label: string }[] = [
  { id: "input", label: "Venture inputs" },
  { id: "studio", label: "TRYN studio layers" },
  { id: "output", label: "Outcomes" },
];

export const mindMapNodes: MindMapNode[] = [
  {
    id: "itinero",
    lane: "input",
    label: "Itinero Travels",
    summary: "Group venture · flagship build",
    detail:
      "Our primary engineering focus: an AI travel platform in pre-launch. TRYN embeds as the dedicated product team from architecture through launch.",
  },
  {
    id: "founders",
    lane: "input",
    label: "Founders Program",
    summary: "Select external partners",
    detail:
      "Equity or hybrid engagements for founders who need a technical co-founder, with the same studio discipline we apply to Itinero.",
  },
  {
    id: "hire-tryn",
    lane: "input",
    label: "Hire TRYN",
    summary: "Client engineering engagements",
    detail:
      "Dedicated engineering for companies with product in market: chatbots, web apps, and AI systems shipped under the TRYN Studios delivery model.",
  },
  {
    id: "discovery",
    lane: "studio",
    label: "Discovery",
    summary: "Vision, users, constraints",
    detail:
      "We map business goals, technical feasibility, and success metrics before writing production code, whether for a group venture or founder partner.",
  },
  {
    id: "product",
    lane: "studio",
    label: "Product",
    summary: "Strategy & roadmap",
    detail:
      "Roadmap prioritization, UX direction, and milestone planning. Product thinking embedded in every engineering decision.",
  },
  {
    id: "architecture",
    lane: "studio",
    label: "Architecture",
    summary: "Scalable foundations",
    detail:
      "Multi-tenant patterns, security baselines, and cloud architecture designed to carry a company, not just ship a feature.",
  },
  {
    id: "engineering",
    lane: "studio",
    label: "Engineering",
    summary: "Build & iterate",
    detail:
      "Full-stack delivery with CI/CD, observability, and code review culture. Shared venture-ops tooling accelerates every build.",
  },
  {
    id: "launch",
    lane: "studio",
    label: "Launch",
    summary: "Ship with confidence",
    detail:
      "Production deployment, monitoring, and launch support. We stay accountable through go-live, not hand off at MVP.",
  },
  {
    id: "scale",
    lane: "studio",
    label: "Scale",
    summary: "Grow with the venture",
    detail:
      "Performance, cost optimization, and team expansion as the product finds market fit. Long-term partnership, not project handoff.",
  },
  {
    id: "prelaunch",
    lane: "output",
    label: "Pre-launch product",
    summary: "itinero.company",
    detail:
      "Flagship venture approaching public launch. The reference implementation for how TRYN builds companies.",
  },
  {
    id: "delivered",
    lane: "output",
    label: "Delivered work",
    summary: "10+ client deliveries",
    detail:
      "Production chatbots, web apps, and AI systems shipped for real businesses. Proof that the studio model delivers outside our own ventures.",
  },
  {
    id: "roadmap",
    lane: "output",
    label: "Roadmap ventures",
    summary: "Ecosystem extensions",
    detail:
      "Sequenced capabilities (partner distribution, payments, new founder partnerships) built on shared studio infrastructure.",
  },
];

export const defaultMindMapNodeId = "engineering";
