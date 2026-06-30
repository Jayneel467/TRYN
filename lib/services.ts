export type { Service } from "@/lib/service-types";
import type { Service } from "@/lib/service-types";
import {
  marketingCategoryBySlug,
  marketingCategoryDotClass,
  marketingServices,
  type MarketingCategory,
} from "@/lib/marketing-services";

export type { MarketingCategory };
export {
  getServicesByMarketingCategory,
  growthBrandHomepageCategories,
  growthBrandOverview,
  marketingCategoryDotClass,
  marketingCategoryHooks,
  marketingCategoryHref,
  marketingCategoryOrder,
  marketingCategorySlug,
  getMarketingCategory,
  getMarketingCategoryFromSlug,
} from "@/lib/marketing-services";

export const services: Service[] = [
  {
    slug: "ai-products",
    title: "AI Products",
    description: "Intelligent products powered by cutting-edge AI models and custom ML pipelines.",
    icon: "Brain",
    capabilities: [
      "Custom AI model integration",
      "LLM-powered applications",
      "Computer vision systems",
      "Natural language processing",
      "AI-powered analytics dashboards",
    ],
    audience: ["AI startup founders", "Enterprises adopting AI", "Product teams exploring ML"],
    approach: [
      { title: "Assess", description: "Evaluate AI feasibility and define the right model strategy." },
      { title: "Build", description: "Develop production-ready AI features with robust evaluation." },
      { title: "Scale", description: "Optimize inference, costs, and reliability at scale." },
    ],
    technologies: ["OpenAI", "Anthropic", "LangChain", "Python", "FastAPI"],
  },
  {
    slug: "ai-chatbots",
    title: "AI-Powered Chatbots",
    description:
      "Intelligent conversational AI for WhatsApp, web, and voice, with multi-language support, CRM integration, and 24/7 availability.",
    icon: "MessageSquare",
    capabilities: [
      "WhatsApp Business chatbots",
      "Website conversational AI",
      "Voice-enabled assistants",
      "Multi-language NLP",
      "CRM and helpdesk integration",
    ],
    audience: ["Customer support teams", "Sales organizations", "Education and healthcare"],
    approach: [
      { title: "Design", description: "Map conversation flows, intents, and escalation paths." },
      { title: "Build", description: "Deploy NLP-driven bots across WhatsApp, web, and voice channels." },
      { title: "Optimize", description: "Iterate on accuracy, handoff rules, and automation coverage." },
    ],
    technologies: ["WhatsApp Business API", "NLP", "Node.js", "Python", "RAG"],
  },
  {
    slug: "generative-ai",
    title: "Generative AI Solutions",
    description:
      "Creative AI for text, image, and persona applications: content automation and role-play experiences at production scale.",
    icon: "Sparkles",
    capabilities: [
      "Text generation and summarization",
      "Image creation and editing",
      "Persona and role-play AI",
      "Content automation pipelines",
      "Brand-safe output guardrails",
    ],
    audience: ["Marketing teams", "Content platforms", "Consumer app founders"],
    approach: [
      { title: "Scope", description: "Define use cases, safety requirements, and output quality bars." },
      { title: "Integrate", description: "Wire generative models into product workflows with evaluation." },
      { title: "Scale", description: "Optimize costs, latency, and content moderation at volume." },
    ],
    technologies: ["OpenAI", "Stable Diffusion", "LangChain", "Python", "Content APIs"],
  },
  {
    slug: "custom-ml-models",
    title: "Custom ML Models",
    description:
      "Tailored machine learning for recommendation systems, quality detection, and predictive analytics.",
    icon: "Cpu",
    capabilities: [
      "Recommendation engines",
      "Quality and anomaly detection",
      "Predictive analytics models",
      "Custom classification algorithms",
      "Model training and evaluation pipelines",
    ],
    audience: ["Manufacturing teams", "E-commerce platforms", "Data-driven enterprises"],
    approach: [
      { title: "Assess", description: "Evaluate data readiness and model feasibility for your domain." },
      { title: "Train", description: "Build, validate, and benchmark custom models on your data." },
      { title: "Deploy", description: "Production inference with monitoring and retraining paths." },
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "MLflow"],
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence & Analytics",
    description:
      "Multi-agent decision intelligence, predictive modeling, and dashboards that turn raw data into actionable insights.",
    icon: "BarChart3",
    capabilities: [
      "Predictive analytics dashboards",
      "Decision intelligence systems",
      "Data visualization and reporting",
      "Real-time operational insights",
      "Market and trend forecasting",
    ],
    audience: ["Operations leaders", "Manufacturing executives", "Growth-stage companies"],
    approach: [
      { title: "Unify", description: "Aggregate fragmented data sources into a coherent analytics layer." },
      { title: "Model", description: "Build predictive models and decision-support dashboards." },
      { title: "Act", description: "Surface insights that drive measurable business outcomes." },
    ],
    technologies: ["Python", "PostgreSQL", "BI Dashboards", "Apache Spark", "Predictive Analytics"],
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    description: "Autonomous agents that automate workflows and augment your team.",
    icon: "Bot",
    capabilities: [
      "Multi-agent orchestration",
      "Tool-calling agents",
      "RAG-powered knowledge agents",
      "MCP integrations",
      "Agent monitoring and guardrails",
    ],
    audience: ["SaaS companies", "Operations teams", "AI-first startups"],
    approach: [
      { title: "Design", description: "Map agent workflows to business processes." },
      { title: "Develop", description: "Build agents with tool use, memory, and safety rails." },
      { title: "Deploy", description: "Production deployment with observability and iteration." },
    ],
    technologies: ["OpenAI", "LangChain", "MCP", "Python", "Node.js"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS Platforms",
    description: "Multi-tenant SaaS products built for scale, security, and growth.",
    icon: "Cloud",
    capabilities: [
      "Multi-tenant architecture",
      "Subscription billing integration",
      "Role-based access control",
      "Analytics and reporting",
      "API-first design",
    ],
    audience: ["B2B SaaS founders", "Venture-backed startups", "Enterprise product teams"],
    approach: [
      { title: "Architect", description: "Design tenant isolation, billing, and growth foundations." },
      { title: "Engineer", description: "Build core platform with best-in-class UX." },
      { title: "Grow", description: "Optimize onboarding, retention, and infrastructure costs." },
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
  },
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    description: "Mission-critical systems for large organizations with compliance requirements.",
    icon: "Building2",
    capabilities: [
      "Enterprise SSO integration",
      "Audit logging and compliance",
      "High-availability architecture",
      "Legacy system integration",
      "Custom workflow engines",
    ],
    audience: ["Enterprise CTOs", "Digital transformation leads", "Regulated industries"],
    approach: [
      { title: "Discover", description: "Map enterprise requirements, compliance, and integrations." },
      { title: "Deliver", description: "Build secure, auditable systems with enterprise SLAs." },
      { title: "Support", description: "Long-term maintenance, upgrades, and scaling." },
    ],
    technologies: [".NET", "Java", "PostgreSQL", "Kubernetes", "Azure"],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    description: "High-performance web apps with exceptional user experiences.",
    icon: "Globe",
    capabilities: [
      "Progressive web applications",
      "Real-time collaboration features",
      "Complex dashboard UIs",
      "E-commerce platforms",
      "Content management systems",
    ],
    audience: ["Startup founders", "Product managers", "Marketing-led companies"],
    approach: [
      { title: "Design", description: "Craft intuitive interfaces with performance in mind." },
      { title: "Develop", description: "Build with modern frameworks and best practices." },
      { title: "Optimize", description: "Core Web Vitals, SEO, and conversion optimization." },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: "Smartphone",
    capabilities: [
      "iOS and Android native apps",
      "Cross-platform with React Native",
      "Offline-first architecture",
      "Push notifications",
      "App Store optimization",
    ],
    audience: ["Consumer app founders", "Enterprise mobility teams", "Marketplace startups"],
    approach: [
      { title: "Prototype", description: "Validate UX with rapid prototypes and user testing." },
      { title: "Build", description: "Develop performant apps for both platforms." },
      { title: "Launch", description: "App store submission, analytics, and iteration." },
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
  },
  {
    slug: "marketplace-platforms",
    title: "Marketplace Platforms",
    description: "Two-sided marketplaces connecting buyers and sellers at scale.",
    icon: "Store",
    capabilities: [
      "Multi-vendor marketplace architecture",
      "Payment splitting and escrow",
      "Search and discovery engines",
      "Rating and review systems",
      "Logistics integration",
    ],
    audience: ["Marketplace founders", "Platform economy startups", "Vertical marketplace builders"],
    approach: [
      { title: "Model", description: "Define marketplace dynamics, trust, and monetization." },
      { title: "Build", description: "Engineer matching, payments, and growth loops." },
      { title: "Scale", description: "Optimize liquidity, trust, and platform economics." },
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe Connect", "Elasticsearch", "AWS"],
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    description: "Intelligent automation that eliminates manual work and accelerates operations.",
    icon: "Workflow",
    capabilities: [
      "Business process automation",
      "Workflow orchestration",
      "Data pipeline automation",
      "Integration platforms",
      "RPA and AI automation",
    ],
    audience: ["Operations leaders", "Scale-up companies", "Enterprise efficiency teams"],
    approach: [
      { title: "Map", description: "Identify high-impact automation opportunities." },
      { title: "Automate", description: "Build reliable, observable automation pipelines." },
      { title: "Iterate", description: "Measure ROI and expand automation coverage." },
    ],
    technologies: ["Python", "Node.js", "Airflow", "Zapier", "Custom APIs"],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Scalable, secure cloud architecture on AWS, Azure, and GCP.",
    icon: "Server",
    capabilities: [
      "Cloud architecture design",
      "Infrastructure as Code",
      "Auto-scaling and load balancing",
      "Disaster recovery planning",
      "Cost optimization",
    ],
    audience: ["CTOs", "DevOps teams", "High-growth startups"],
    approach: [
      { title: "Design", description: "Architect resilient, cost-effective cloud infrastructure." },
      { title: "Implement", description: "Deploy with IaC and security best practices." },
      { title: "Optimize", description: "Monitor, scale, and reduce cloud spend." },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Cloudflare"],
  },
  {
    slug: "devops",
    title: "DevOps",
    description: "CI/CD pipelines, monitoring, and deployment automation for rapid delivery.",
    icon: "GitBranch",
    capabilities: [
      "CI/CD pipeline setup",
      "Container orchestration",
      "Monitoring and alerting",
      "Security scanning",
      "Release management",
    ],
    audience: ["Engineering teams", "Startups scaling delivery", "Enterprise DevOps"],
    approach: [
      { title: "Assess", description: "Audit current deployment and monitoring practices." },
      { title: "Automate", description: "Build pipelines for fast, safe deployments." },
      { title: "Monitor", description: "Establish observability and incident response." },
    ],
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Datadog", "AWS"],
  },
  {
    slug: "product-design",
    title: "Product Design",
    description: "User-centered design that drives engagement and conversion.",
    icon: "Palette",
    capabilities: [
      "UX research and strategy",
      "UI design systems",
      "Interactive prototypes",
      "Usability testing",
      "Design-to-development handoff",
    ],
    audience: ["Founders without design teams", "Product-led companies", "Enterprise UX initiatives"],
    approach: [
      { title: "Research", description: "Understand users, competitors, and opportunities." },
      { title: "Design", description: "Create intuitive, beautiful product experiences." },
      { title: "Validate", description: "Test with users and iterate before engineering." },
    ],
    technologies: ["Figma", "Framer", "Design Systems", "User Testing", "Prototyping"],
  },
  {
    slug: "dedicated-engineering-teams",
    title: "Dedicated Engineering Teams",
    description: "Your full engineering organization, without the hiring overhead.",
    icon: "Users",
    capabilities: [
      "Full-stack engineering teams",
      "Embedded product managers",
      "QA and DevOps engineers",
      "Sprint planning and delivery",
      "Long-term team retention",
    ],
    audience: ["Non-technical founders", "Companies without eng teams", "Scale-ups needing capacity"],
    approach: [
      { title: "Staff", description: "Assemble a team matched to your product and stage." },
      { title: "Integrate", description: "Embed with your workflows, tools, and culture." },
      { title: "Deliver", description: "Ship consistently with transparent communication." },
    ],
    technologies: ["Full Stack", "Agile", "Jira", "GitHub", "Slack"],
  },
  {
    slug: "api-development",
    title: "API Development",
    description: "Robust, well-documented APIs that power products and integrations.",
    icon: "Code2",
    capabilities: [
      "RESTful API design",
      "GraphQL APIs",
      "API documentation",
      "Rate limiting and auth",
      "Third-party integrations",
    ],
    audience: ["Platform companies", "B2B SaaS", "Integration-heavy products"],
    approach: [
      { title: "Design", description: "Define API contracts, versioning, and developer experience." },
      { title: "Build", description: "Implement secure, performant API endpoints." },
      { title: "Document", description: "Comprehensive docs and SDK generation." },
    ],
    technologies: ["Node.js", "FastAPI", "GraphQL", "PostgreSQL", "OpenAPI"],
  },
  {
    slug: "system-architecture",
    title: "System Architecture",
    description: "Scalable system design that grows with your business.",
    icon: "Network",
    capabilities: [
      "Microservices architecture",
      "Event-driven systems",
      "Database design and optimization",
      "Performance engineering",
      "Technical due diligence",
    ],
    audience: ["CTOs", "Technical co-founders", "Companies preparing to scale"],
    approach: [
      { title: "Analyze", description: "Assess current architecture and future requirements." },
      { title: "Design", description: "Create scalable, maintainable system blueprints." },
      { title: "Guide", description: "Support implementation and architectural decisions." },
    ],
    technologies: ["Kubernetes", "Kafka", "PostgreSQL", "Redis", "AWS"],
  },
  {
    slug: "manpower-development",
    title: "Manpower Development",
    description:
      "Training engineers in science and technology: mentorship, real venture exposure, and production discipline through the TRYN Fellowship.",
    icon: "GraduationCap",
    capabilities: [
      "Engineer mentorship programs",
      "Hands-on venture studio exposure",
      "AI and full-stack skill development",
      "Production engineering practices",
      "Career pathways into studio work",
    ],
    audience: ["Engineering students", "Junior developers", "Career switchers into tech"],
    approach: [
      { title: "Learn", description: "Structured curriculum on modern AI, web, and cloud engineering." },
      { title: "Build", description: "Contribute to real ventures: Itinero, client deliveries, studio tooling." },
      { title: "Grow", description: "Mentorship from senior engineers with accountability to shipped work." },
    ],
    technologies: ["Next.js", "Python", "AI/ML", "Cloud", "Agile"],
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    description: "Strategic technology guidance from experienced engineering leaders.",
    icon: "Lightbulb",
    capabilities: [
      "Technology stack evaluation",
      "Architecture reviews",
      "Technical hiring support",
      "Due diligence for investors",
      "Roadmap planning",
    ],
    audience: ["Founders", "Investors", "Enterprise technology leaders"],
    approach: [
      { title: "Evaluate", description: "Deep-dive into technology, team, and product." },
      { title: "Advise", description: "Provide actionable recommendations and roadmaps." },
      { title: "Support", description: "Ongoing advisory as you execute." },
    ],
    technologies: ["Strategy", "Architecture", "Due Diligence", "Roadmapping", "CTO Advisory"],
  },
  ...marketingServices,
];

export const homepageServiceSlugs = [
  "ai-products",
  "ai-agents",
  "saas-platforms",
  "enterprise-software",
  "web-applications",
  "mobile-apps",
] as const;

export type HomepageServiceSlug = (typeof homepageServiceSlugs)[number];

export type EngineeringCategory = "Intelligence" | "Platforms" | "Applications" | "Engineering";

export type ServiceCategory = EngineeringCategory | MarketingCategory;

export const engineeringCategoryOrder: EngineeringCategory[] = [
  "Intelligence",
  "Platforms",
  "Applications",
  "Engineering",
];

export const serviceCategoryBySlug: Record<string, ServiceCategory> = {
  "ai-products": "Intelligence",
  "ai-chatbots": "Intelligence",
  "generative-ai": "Intelligence",
  "custom-ml-models": "Intelligence",
  "business-intelligence": "Intelligence",
  "ai-agents": "Intelligence",
  "saas-platforms": "Platforms",
  "enterprise-software": "Platforms",
  "web-applications": "Applications",
  "mobile-apps": "Applications",
  "marketplace-platforms": "Platforms",
  "automation-systems": "Applications",
  "cloud-infrastructure": "Engineering",
  "devops": "Engineering",
  "product-design": "Applications",
  "dedicated-engineering-teams": "Engineering",
  "api-development": "Engineering",
  "system-architecture": "Engineering",
  "technical-consulting": "Engineering",
  "manpower-development": "Engineering",
  ...marketingCategoryBySlug,
};

export const serviceCategoryDotClass: Record<ServiceCategory, string> = {
  Intelligence: "category-dot-intelligence",
  Platforms: "category-dot-platforms",
  Applications: "category-dot-applications",
  Engineering: "category-dot-engineering",
  ...marketingCategoryDotClass,
};

export function isMarketingCategory(category: ServiceCategory): category is MarketingCategory {
  return category in marketingCategoryDotClass;
}

export function getRelatedServices(service: Service, limit = 3): Service[] {
  const category = getServiceCategory(service.slug);
  const sameCategory = services.filter(
    (s) => s.slug !== service.slug && getServiceCategory(s.slug) === category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const rest = services.filter(
    (s) => s.slug !== service.slug && getServiceCategory(s.slug) !== category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getServiceCategory(slug: string): ServiceCategory {
  return serviceCategoryBySlug[slug] ?? "Applications";
}

/** Shorter hooks for homepage service rows */
export const homepageServiceDescriptions: Partial<Record<HomepageServiceSlug, string>> = {
  "ai-products": "LLM-powered products and custom ML pipelines for production.",
  "ai-agents": "Autonomous agents that automate workflows and augment teams.",
  "saas-platforms": "Multi-tenant SaaS built for scale, security, and growth.",
  "enterprise-software": "Mission-critical systems with compliance and SSO.",
  "web-applications": "High-performance web apps with exceptional UX.",
  "mobile-apps": "Native and cross-platform apps for iOS and Android.",
};

export function getHomepageServices(): Service[] {
  return homepageServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => s !== undefined);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export type HomepageCategory = "Intelligence" | "Platforms" | "Applications";

export const homepageServiceCategoryHref: Record<HomepageCategory, string> = {
  Intelligence: "/services/ai-products",
  Platforms: "/services/saas-platforms",
  Applications: "/services/web-applications",
};

export const homepageServiceCategories: {
  category: HomepageCategory;
  hook: string;
  items: readonly string[];
  href: string;
}[] = [
  {
    category: "Intelligence",
    hook: "AI-native products, the layer powering Itinero, client deliveries, and every venture we take on.",
    items: ["AI Products", "AI Chatbots", "Generative AI", "Custom ML"],
    href: homepageServiceCategoryHref.Intelligence,
  },
  {
    category: "Platforms",
    hook: "Multi-tenant systems and enterprise foundations built to carry a company, not a feature.",
    items: ["SaaS Platforms", "Enterprise Software"],
    href: homepageServiceCategoryHref.Platforms,
  },
  {
    category: "Applications",
    hook: "Web and mobile surfaces where users meet the product, crafted for launch and scale.",
    items: ["Web Applications", "Mobile Apps"],
    href: homepageServiceCategoryHref.Applications,
  },
];
