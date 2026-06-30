export const faqItems = [
  {
    question: "Do you build MVPs?",
    answer:
      "Yes. We specialize in taking founders from idea to launch-ready MVP in weeks. Our dedicated teams move at startup speed while maintaining production-quality code that scales beyond the MVP phase.",
  },
  {
    question: "Can you become our engineering team?",
    answer:
      "Absolutely. That's our core model. TRYN becomes your dedicated engineering organization. You get frontend, backend, AI, DevOps, QA, and product strategy under one roof, without the hiring overhead.",
  },
  {
    question: "How does the Founders Program work?",
    answer:
      "Selected startups submit a pitch deck through our application. Our team reviews your company, market, vision, and execution potential. If accepted, TRYN may partner through equity or hybrid engagements. This program is highly selective.",
  },
  {
    question: "Do you work with funded startups?",
    answer:
      "Yes. We work with pre-seed through Series C companies, as well as bootstrapped founders and enterprises. Our engagement models flex to match your stage and budget.",
  },
  {
    question: "Can you build AI products?",
    answer:
      "AI is one of our core strengths. We build LLM-powered applications, AI agents, RAG systems, computer vision products, and custom ML pipelines using OpenAI, Anthropic, LangChain, and more.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We're technology agnostic. We choose the right stack based on your business goals: React, Next.js, Python, Go, Flutter, AWS, and dozens more. See our Engineering page for the full stack.",
  },
  {
    question: "Do you offer long-term support?",
    answer:
      "Yes. Most of our partnerships are long-term. We support products from MVP through scale, including ongoing development, maintenance, infrastructure, and strategic advisory.",
  },
] as const;

/** Homepage FAQ — 3 high-intent questions only */
export const homepageFaqItems = [
  faqItems[1],
  faqItems[2],
  faqItems[6],
] as const;
