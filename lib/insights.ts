export type InsightInlineLink = {
  phrase: string;
  href: string;
};

export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  category: string;
  body: string[];
  inlineLinks?: readonly InsightInlineLink[];
};

export type InsightParagraphSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export function parseInsightParagraph(
  text: string,
  links?: readonly InsightInlineLink[],
): InsightParagraphSegment[] {
  if (!links?.length) return [{ type: "text", value: text }];

  const segments: InsightParagraphSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let nearest: { index: number; link: InsightInlineLink } | null = null;

    for (const link of links) {
      const index = text.indexOf(link.phrase, cursor);
      if (index !== -1 && (nearest === null || index < nearest.index)) {
        nearest = { index, link };
      }
    }

    if (!nearest) {
      segments.push({ type: "text", value: text.slice(cursor) });
      break;
    }

    if (nearest.index > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, nearest.index) });
    }

    segments.push({
      type: "link",
      label: nearest.link.phrase,
      href: nearest.link.href,
    });
    cursor = nearest.index + nearest.link.phrase.length;
  }

  return segments.length ? segments : [{ type: "text", value: text }];
}

export const insightPosts: InsightPost[] = [
  {
    slug: "venture-studio-vs-agency",
    title: "Venture studio vs agency: what founders should ask",
    description:
      "How to tell whether a partner will embed as your engineering org or deliver a project and leave.",
    publishedAt: "2026-06-01",
    readMinutes: 6,
    category: "Founders",
    body: [
      "Agencies optimize for throughput. Venture studios optimize for ownership. The difference shows up in how they staff your work, how they price, and what happens after launch.",
      "Ask who owns the roadmap after MVP. Ask whether engineers rotate across clients. Ask for examples of products still running two years later, not just shipped demos.",
      "TRYN operates as the engineering organization behind Itinero Travels and selective founder partnerships. We do not run a bench of contractors billing hours.",
      "If you need a scoped build with a handoff, hire TRYN as a dedicated team. If you need a co-builder with equity alignment, apply to the Founders Program.",
    ],
  },
  {
    slug: "whatsapp-ai-for-education",
    title: "How we build WhatsApp AI for education",
    description:
      "Patterns from production chatbot deliveries for schools and institutes on WhatsApp Business API.",
    publishedAt: "2026-06-08",
    readMinutes: 7,
    category: "Delivery",
    inlineLinks: [
      { phrase: "Vibrant Campus case study", href: "/work/whatsapp-healthcare" },
      { phrase: "engineering snippets", href: "/engineering" },
    ],
    body: [
      "Education clients converge on WhatsApp first. Parents and students already live there, so the bot must feel native to the channel, not like a web form pasted into chat.",
      "We start with a structured knowledge base: programs, fees, eligibility, and FAQs. Staff update content without redeploying code, usually via spreadsheets or a lightweight admin.",
      "LLM layers handle paraphrased questions, but critical paths use guided flows for admissions and escalation to humans when confidence is low.",
      "See a live delivery pattern on our Vibrant Campus case study and the webhook handler in our engineering snippets.",
    ],
  },
  {
    slug: "rag-patterns-in-production",
    title: "RAG patterns we use in production",
    description:
      "Retrieval, tool calling, and guardrails from Itinero and client chatbot deliveries.",
    publishedAt: "2026-06-15",
    readMinutes: 5,
    category: "Engineering",
    body: [
      "Production RAG is less about the model and more about retrieval quality, citation discipline, and escalation paths.",
      "We ground agents in updatable knowledge bases, restrict answers to retrieved context, and expose tools for search rather than hallucinating facts.",
      "Multi-tenant setups isolate embeddings per client or product surface so data never crosses boundaries.",
      "Browse the code patterns we ship on the Engineering page, including RAG agents, middleware, and CI gates.",
    ],
  },
  {
    slug: "founders-program-fit",
    title: "What we look for in Founders Program applications",
    description:
      "Signals that tell us a startup is ready for an equity-backed engineering partnership.",
    publishedAt: "2026-06-22",
    readMinutes: 4,
    category: "Founders",
    body: [
      "We take a small number of founder partnerships each quarter. Fit matters more than idea novelty.",
      "Strong applications show early traction or deep domain insight, a clear wedge, and a founder who can sell while we build.",
      "We look for technical risk we can own: AI products, platforms, and infrastructure that needs a dedicated team, not a freelancer patch.",
      "Submit your pitch deck through the Founders Program page. Engineers seeking mentorship should explore the TRYN Fellowship instead.",
    ],
  },
];

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((post) => post.slug === slug);
}
