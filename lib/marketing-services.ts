import type { Service } from "@/lib/service-types";

export type MarketingCategory =
  | "Brand"
  | "Growth"
  | "Customer Engagement"
  | "Commerce"
  | "Strategy";

export const marketingCategoryOrder: MarketingCategory[] = [
  "Brand",
  "Growth",
  "Customer Engagement",
  "Commerce",
  "Strategy",
];

export const marketingCategoryBySlug: Record<string, MarketingCategory> = {
  "brand-strategy": "Brand",
  "creative-content-studio": "Brand",
  "public-relations-influencer-marketing": "Brand",
  seo: "Growth",
  "performance-marketing": "Growth",
  "social-media-management": "Growth",
  "website-conversion-optimization": "Growth",
  "email-crm-marketing": "Customer Engagement",
  "marketing-automation": "Customer Engagement",
  "marketplace-ecommerce-growth": "Commerce",
  "analytics-growth-intelligence": "Strategy",
  "fractional-cmo-services": "Strategy",
};

export const marketingCategoryDotClass: Record<MarketingCategory, string> = {
  Brand: "category-dot-brand",
  Growth: "category-dot-growth",
  "Customer Engagement": "category-dot-engagement",
  Commerce: "category-dot-commerce",
  Strategy: "category-dot-strategy",
};

export const marketingCategorySlug: Record<MarketingCategory, string> = {
  Brand: "brand",
  Growth: "growth",
  "Customer Engagement": "customer-engagement",
  Commerce: "commerce",
  Strategy: "strategy",
};

export const marketingCategoryHref: Record<MarketingCategory, string> = {
  Brand: "/services/brand",
  Growth: "/services/growth",
  "Customer Engagement": "/services/customer-engagement",
  Commerce: "/services/commerce",
  Strategy: "/services/strategy",
};

export function getMarketingCategoryFromSlug(
  slug: string,
): MarketingCategory | undefined {
  const entry = Object.entries(marketingCategorySlug).find(([, s]) => s === slug);
  return entry ? (entry[0] as MarketingCategory) : undefined;
}

export const marketingCategoryHooks: Record<MarketingCategory, string> = {
  Brand:
    "Positioning, creative production, and reputation work that gives ventures a voice in market.",
  Growth:
    "Demand generation across search, paid media, social, and conversion surfaces.",
  "Customer Engagement":
    "Lifecycle marketing that turns signups into loyal customers through email, CRM, and automation.",
  Commerce:
    "Marketplace and e-commerce growth across Shopify, Amazon, and custom storefronts.",
  Strategy:
    "Measurement, attribution, and executive marketing leadership for ventures scaling past product-market fit.",
};

export const growthBrandOverview = {
  title: "Growth & Brand",
  lead: "TRYN builds products and drives growth. Marketing, brand, and revenue capabilities sit alongside our engineering disciplines so ventures launch with momentum, not just code.",
  href: "/services/growth-brand",
};

export const growthBrandHomepageCategories: {
  category: MarketingCategory;
  hook: string;
  items: readonly string[];
  href: string;
}[] = [
  {
    category: "Brand",
    hook: marketingCategoryHooks.Brand,
    items: ["Brand Strategy", "Creative Studio", "PR & Influencers"],
    href: marketingCategoryHref.Brand,
  },
  {
    category: "Growth",
    hook: marketingCategoryHooks.Growth,
    items: ["SEO", "Performance Marketing", "Social Media", "CRO"],
    href: marketingCategoryHref.Growth,
  },
  {
    category: "Customer Engagement",
    hook: marketingCategoryHooks["Customer Engagement"],
    items: ["Email & CRM", "Marketing Automation"],
    href: marketingCategoryHref["Customer Engagement"],
  },
  {
    category: "Commerce",
    hook: marketingCategoryHooks.Commerce,
    items: ["Shopify", "Amazon", "Marketplaces"],
    href: marketingCategoryHref.Commerce,
  },
  {
    category: "Strategy",
    hook: marketingCategoryHooks.Strategy,
    items: ["Analytics", "Fractional CMO"],
    href: marketingCategoryHref.Strategy,
  },
];

export const marketingServices: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and identity development that gives your venture a clear place in market.",
    intro:
      "Most ventures ship strong products with weak stories. Brand strategy defines where you sit in the market, what you promise, and how every touchpoint reinforces that promise. TRYN builds strategy that connects product reality to customer perception, so sales, fundraising, and launch campaigns speak with one voice.",
    icon: "Target",
    capabilities: [
      "Market positioning and competitive differentiation analysis",
      "Messaging frameworks and value proposition architecture",
      "Brand identity development and visual direction briefs",
      "Go-to-market strategy and phased launch planning",
      "Audience segmentation and ideal customer profile definition",
      "Brand voice, tone, and narrative guidelines",
      "Sales enablement narratives and investor story development",
      "Competitive battlecards and category framing for GTM teams",
    ],
    audience: [
      "Pre-launch founders defining their market entry",
      "Ventures repositioning after a product pivot",
      "Companies preparing for fundraising or a major launch",
      "Technical founders who need a clear external narrative",
    ],
    studioAngle:
      "TRYN pairs brand strategists with the engineers building your product. Positioning is grounded in what the product actually does, not aspirational slides. When strategy and roadmap stay aligned, messaging survives due diligence, demos, and the first hundred customer conversations.",
    approach: [
      {
        title: "Discover",
        description:
          "Research market landscape, competitors, and customer motivations to find a defensible position.",
      },
      {
        title: "Define",
        description:
          "Craft positioning, messaging architecture, and identity direction aligned to business goals.",
      },
      {
        title: "Activate",
        description:
          "Translate strategy into launch plans, sales narratives, and creative briefs your team can execute.",
      },
    ],
    outcomes: [
      "Clear positioning that differentiates in crowded markets",
      "Consistent messaging across sales, product, and marketing",
      "Identity direction ready for creative production",
      "Go-to-market plan with prioritized channels and milestones",
      "Investor-ready narrative tied to product capabilities",
      "Sales and marketing teams working from the same story",
    ],
    technologies: ["Positioning", "Messaging", "Identity", "GTM", "ICP"],
  },
  {
    slug: "creative-content-studio",
    title: "Creative & Content Studio",
    description:
      "Design, video, copy, photography, motion, and storytelling produced to studio standards.",
    intro:
      "Great products lose attention when creative looks like an afterthought. Our studio produces the visual and verbal assets ventures need to look credible on day one: product demos, launch films, ad creative, sales decks, and social content built to a single brand standard. You get agency-quality output without the handoff friction between brand, product, and engineering.",
    icon: "Palette",
    capabilities: [
      "Graphic design for digital campaigns, decks, and sales collateral",
      "Video production and editing for product demos and brand films",
      "Copywriting for web, ads, email, and long-form content",
      "Photography direction and visual asset production",
      "Motion graphics and animated product explainers",
      "Brand storytelling across formats and channels",
      "UI marketing assets aligned to product design systems",
      "Creative adaptation for paid, organic, and sales channels",
    ],
    audience: [
      "Founders without an in-house creative team",
      "Ventures launching new products or entering new markets",
      "Companies refreshing brand presence before fundraising",
      "Product teams needing launch creative without a full agency",
    ],
    studioAngle:
      "Creative sits inside the same studio as your engineers and product designers. Assets are built from real product screenshots, working demos, and accurate feature sets. When the website, ads, and pitch deck show the same product your team ships, trust compounds faster.",
    approach: [
      {
        title: "Brief",
        description:
          "Align on brand strategy, audience, and deliverables before production begins.",
      },
      {
        title: "Produce",
        description:
          "Design, write, shoot, and edit assets with consistent quality and brand guardrails.",
      },
      {
        title: "Distribute",
        description:
          "Package assets for web, social, paid media, and sales with format-specific optimization.",
      },
    ],
    outcomes: [
      "Production-ready creative across web, social, and paid channels",
      "Consistent visual and verbal identity in every touchpoint",
      "Faster campaign turnaround without agency overhead",
      "Reusable asset library for launches and ongoing marketing",
      "Creative that reflects the actual product, not stock mockups",
      "Channel-specific formats optimized for performance",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Video", "Copy", "Motion"],
  },
  {
    slug: "public-relations-influencer-marketing",
    title: "Public Relations & Influencer Marketing",
    description:
      "Media relations, influencer campaigns, partnerships, reputation management, and launch PR.",
    intro:
      "Earned attention builds credibility that paid media cannot buy alone. We plan and execute PR programs, influencer collaborations, and partnership activations that put your venture in front of the audiences that matter. From launch announcements to sustained thought leadership, every story ties back to business goals and measurable awareness.",
    icon: "Newspaper",
    capabilities: [
      "Media relations and journalist outreach programs",
      "Influencer identification, vetting, and campaign management",
      "Brand partnership development and co-marketing activations",
      "Reputation monitoring and crisis communication planning",
      "Product launch PR and announcement strategy",
      "Thought leadership and founder visibility programs",
      "Analyst and industry briefing coordination",
      "Press kit, fact sheet, and spokesperson preparation",
    ],
    audience: [
      "Consumer and B2B ventures preparing for launch",
      "Companies building credibility in new or crowded categories",
      "Founders seeking earned media and partnership leverage",
      "Brands expanding into new geographies or verticals",
    ],
    studioAngle:
      "PR narratives are written alongside product and engineering teams, so journalists and influencers receive accurate technical detail and demo access. TRYN can supply working product, data, and founder access that generic PR shops struggle to coordinate when they are disconnected from the build.",
    approach: [
      {
        title: "Plan",
        description:
          "Define narrative angles, target outlets, and influencer tiers aligned to launch goals.",
      },
      {
        title: "Pitch",
        description:
          "Execute outreach, secure coverage, and coordinate influencer and partner activations.",
      },
      {
        title: "Amplify",
        description:
          "Repurpose earned media across owned channels and measure impact on awareness and pipeline.",
      },
    ],
    outcomes: [
      "Press coverage in relevant industry and mainstream outlets",
      "Influencer partnerships that drive authentic reach",
      "Stronger brand credibility at launch and beyond",
      "Reputation framework for ongoing visibility management",
      "Partnership pipeline beyond one-off launch moments",
      "Amplified earned media across owned channels",
    ],
    technologies: ["PR", "Influencer", "Partnerships", "Launch", "Media"],
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Technical SEO, on-page optimization, content strategy, and link building for durable organic visibility.",
    intro:
      "Organic search is the highest-intent, most capital-efficient acquisition channel when done right. We combine technical audits, content strategy, and authority building so your product ranks for the queries that drive revenue, not vanity traffic. SEO at TRYN is engineered: fast sites, clean architecture, and content tied to real search intent.",
    icon: "Search",
    capabilities: [
      "Technical SEO audits and site architecture optimization",
      "On-page optimization for product, pricing, and content pages",
      "Content strategy and editorial calendar development",
      "Keyword research and search intent mapping",
      "Link building and digital PR for domain authority",
      "Local and international SEO where relevant",
      "Core Web Vitals and crawl efficiency improvements",
      "Structured data and SERP feature optimization",
    ],
    audience: [
      "SaaS and product companies investing in inbound growth",
      "E-commerce brands competing for category keywords",
      "Ventures reducing paid dependency with organic channels",
      "Content-led companies scaling editorial production",
    ],
    studioAngle:
      "Our SEO team works directly with the engineers who built your site. Technical fixes ship in the same sprint as content updates. No waiting on a separate dev agency to implement schema, fix Core Web Vitals, or restructure routes. Product, content, and infrastructure move together.",
    approach: [
      {
        title: "Audit",
        description:
          "Assess technical health, content gaps, and competitive positioning in target keywords.",
      },
      {
        title: "Build",
        description:
          "Fix technical issues, optimize pages, and publish content aligned to search intent.",
      },
      {
        title: "Earn",
        description:
          "Grow authority through links, mentions, and sustained content production.",
      },
    ],
    outcomes: [
      "Improved rankings for high-intent commercial keywords",
      "Technical foundation that supports scale and indexation",
      "Content engine producing consistent organic traffic",
      "Reduced customer acquisition cost from paid channels",
      "Faster implementation of technical SEO recommendations",
      "Clear reporting on rankings, traffic, and conversion from organic",
    ],
    technologies: ["Technical SEO", "Content", "Link Building", "Analytics", "Schema"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    description:
      "Paid campaigns across Google, Meta, LinkedIn, and YouTube with disciplined targeting and ROI accountability.",
    intro:
      "Paid acquisition only works when tracking, creative, and landing pages operate as one system. We run performance campaigns with clear unit economics: structured accounts, rigorous testing, and budget scaled on proven winners. Every dollar ties to pipeline, revenue, or defined growth milestones.",
    icon: "TrendingUp",
    capabilities: [
      "Google Search, Display, and Shopping campaigns",
      "Meta and Instagram paid social advertising",
      "LinkedIn B2B lead generation campaigns",
      "YouTube and video advertising",
      "Campaign structure, bidding, and budget optimization",
      "Creative testing and landing page alignment",
      "Conversion tracking and attribution setup",
      "Retargeting and full-funnel audience strategies",
    ],
    audience: [
      "Ventures with product-market fit ready to scale acquisition",
      "B2B companies building predictable pipeline",
      "E-commerce brands optimizing ROAS across channels",
      "Founders who need paid growth without hiring a full in-house team",
    ],
    studioAngle:
      "When landing pages underperform, our engineers rebuild them in the same engagement. Tracking pixels, event pipelines, and CRM integrations are implemented by the team that owns your product stack. Paid media stops leaking budget into broken funnels.",
    approach: [
      {
        title: "Structure",
        description:
          "Design account architecture, audience segments, and conversion tracking before spend.",
      },
      {
        title: "Test",
        description:
          "Run creative and audience experiments to find efficient acquisition paths.",
      },
      {
        title: "Scale",
        description:
          "Increase budget on winning campaigns while maintaining target CAC and ROAS.",
      },
    ],
    outcomes: [
      "Predictable lead and revenue volume from paid channels",
      "Clear attribution from ad click to conversion",
      "Optimized CAC through continuous creative and audience testing",
      "Cross-channel budget allocation based on performance data",
      "Landing pages and tracking aligned to campaign goals",
      "Documented playbooks for scaling winning campaigns",
    ],
    technologies: ["Google Ads", "Meta", "LinkedIn", "YouTube", "Analytics"],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "Content planning, publishing, community management, and audience growth across priority platforms.",
    intro:
      "Social is where brands earn attention between launches. We run content programs that keep your venture visible, credible, and engaged with the audiences you need to reach. From editorial calendars to community response, social becomes a growth channel with clear performance metrics, not a posting chore.",
    icon: "Share2",
    capabilities: [
      "Content calendar planning and editorial strategy",
      "Platform-native content creation and publishing",
      "Community management and engagement response",
      "Audience growth and follower acquisition programs",
      "Social listening and trend monitoring",
      "Performance reporting and content optimization",
      "Founder and executive personal brand support",
      "Social creative tied to product launches and campaigns",
    ],
    audience: [
      "Consumer brands building community around product",
      "B2B companies establishing thought leadership",
      "Founders who need consistent presence without daily posting",
      "Ventures entering new markets that need local social presence",
    ],
    studioAngle:
      "Social content is produced with access to real product updates, engineering milestones, and customer stories from inside the studio. When your build team and growth team share a workspace, social reflects what is actually shipping, not recycled industry commentary.",
    approach: [
      {
        title: "Plan",
        description:
          "Define platform priorities, content pillars, and posting cadence aligned to brand strategy.",
      },
      {
        title: "Publish",
        description:
          "Create and schedule content that fits each platform's format and audience expectations.",
      },
      {
        title: "Engage",
        description:
          "Respond to community, grow followers, and iterate based on engagement data.",
      },
    ],
    outcomes: [
      "Consistent brand presence across priority social platforms",
      "Growing engaged audience aligned to target customers",
      "Community that supports launches and customer retention",
      "Content performance insights driving better creative decisions",
      "Reduced founder time spent on daily posting",
      "Social programs integrated with paid and PR campaigns",
    ],
    technologies: ["LinkedIn", "Instagram", "X", "YouTube", "Scheduling Tools"],
  },
  {
    slug: "website-conversion-optimization",
    title: "Website & Conversion Optimization",
    description:
      "Landing pages, CRO, A/B testing, user journeys, and lead generation flows that turn traffic into revenue.",
    intro:
      "Traffic without conversion is wasted spend. We design and build high-performing landing pages, optimize signup and checkout flows, and run structured experiments that compound lift over time. CRO at TRYN spans design, copy, analytics, and front-end engineering in one team.",
    icon: "MousePointerClick",
    capabilities: [
      "High-converting landing page design and development",
      "Conversion rate optimization and funnel analysis",
      "A/B and multivariate testing programs",
      "User journey mapping and friction reduction",
      "Lead generation form and CTA optimization",
      "Analytics setup for conversion tracking and attribution",
      "Mobile and international UX optimization",
      "Personalization and segment-specific landing experiences",
    ],
    audience: [
      "Ventures driving paid traffic to underperforming pages",
      "SaaS companies optimizing trial and demo conversion",
      "Companies launching new products needing dedicated landing experiences",
      "E-commerce brands improving checkout and product page conversion",
    ],
    studioAngle:
      "TRYN builds the pages we optimize. Experiments ship on your actual Next.js or React stack with proper event tracking, not bolt-on widgets that fight your codebase. Engineers implement winners the same week tests conclude.",
    approach: [
      {
        title: "Analyze",
        description:
          "Map user journeys, identify drop-off points, and benchmark against conversion goals.",
      },
      {
        title: "Design",
        description:
          "Build landing pages and flows optimized for clarity, trust, and action.",
      },
      {
        title: "Test",
        description:
          "Run experiments on copy, layout, and offers to improve conversion rates over time.",
      },
    ],
    outcomes: [
      "Higher conversion rates on key landing pages and signup flows",
      "Clear user journeys from first visit to qualified lead",
      "Testing program producing measurable lift month over month",
      "Landing pages aligned to campaign messaging and audience segments",
      "Faster experiment velocity with engineering support built in",
      "Documented funnel metrics leadership can track weekly",
    ],
    technologies: ["Next.js", "A/B Testing", "Analytics", "Heatmaps", "CRO"],
  },
  {
    slug: "email-crm-marketing",
    title: "Email & CRM Marketing",
    description:
      "Automated campaigns, nurture sequences, customer journeys, and CRM integration across the lifecycle.",
    intro:
      "Email remains the highest-ROI owned channel when lifecycle programs are built with intent. We design nurture sequences, onboarding flows, and retention campaigns that move prospects and customers through your funnel automatically. CRM data stays clean, segments stay sharp, and sales gets leads at the right moment.",
    icon: "Mail",
    capabilities: [
      "Email campaign strategy and lifecycle design",
      "Automated nurture sequences for leads and trials",
      "Customer onboarding and retention email programs",
      "CRM integration and data hygiene",
      "Segmentation based on behavior, firmographics, and lifecycle stage",
      "Deliverability optimization and list management",
      "Sales and marketing alignment on lead handoff triggers",
      "Re-engagement and win-back campaign programs",
    ],
    audience: [
      "SaaS companies with trial-to-paid conversion gaps",
      "B2B ventures nurturing long sales cycles",
      "E-commerce brands driving repeat purchase and loyalty",
      "Teams migrating to a new CRM or marketing platform",
    ],
    studioAngle:
      "CRM integrations are built by engineers who understand your product events and data model. Behavioral triggers fire on real in-app actions, not manual list uploads. When product and marketing share infrastructure, lifecycle emails reflect what users actually do.",
    approach: [
      {
        title: "Map",
        description:
          "Design lifecycle journeys from first touch through retention and expansion.",
      },
      {
        title: "Build",
        description:
          "Create email templates, automation flows, and CRM integrations.",
      },
      {
        title: "Optimize",
        description:
          "Test subject lines, content, and timing to improve open, click, and conversion rates.",
      },
    ],
    outcomes: [
      "Automated nurture that converts leads without manual follow-up",
      "Higher trial-to-paid and lead-to-opportunity conversion",
      "CRM data that sales and marketing teams actually use",
      "Retention programs reducing churn and increasing LTV",
      "Improved deliverability and inbox placement",
      "Lifecycle reporting tied to revenue outcomes",
    ],
    technologies: ["HubSpot", "Mailchimp", "Klaviyo", "Salesforce", "Automation"],
  },
  {
    slug: "marketing-automation",
    title: "Marketing Automation",
    description:
      "AI-powered workflows, segmentation, lead scoring, and personalized engagement at scale.",
    intro:
      "Manual marketing breaks at scale. We architect automation systems that score leads, trigger personalized journeys, and route prospects to sales at the right moment. AI assists segmentation and content personalization without replacing the strategy and data discipline underneath.",
    icon: "Workflow",
    capabilities: [
      "Marketing automation platform setup and integration",
      "AI-driven workflow design for lead routing and nurturing",
      "Behavioral segmentation and dynamic content",
      "Lead scoring models aligned to sales readiness",
      "Personalized engagement across email, web, and in-app",
      "Cross-channel trigger campaigns based on user actions",
      "Data pipeline connections between product, CRM, and ads",
      "Governance, testing, and workflow documentation",
    ],
    audience: [
      "Growth-stage companies outgrowing manual marketing",
      "B2B ventures aligning marketing and sales handoffs",
      "Product-led companies personalizing onboarding at scale",
      "Teams consolidating fragmented martech stacks",
    ],
    studioAngle:
      "Automation is wired into your product and data infrastructure by the same studio that built them. Event streams, webhooks, and CRM fields are designed for marketing use cases from the start, not retrofitted after launch.",
    approach: [
      {
        title: "Architect",
        description:
          "Map data flows, triggers, and segments across your marketing and product stack.",
      },
      {
        title: "Automate",
        description:
          "Build workflows for scoring, routing, nurturing, and re-engagement.",
      },
      {
        title: "Refine",
        description:
          "Use performance data and AI insights to improve targeting and personalization.",
      },
    ],
    outcomes: [
      "Marketing operations that scale without proportional headcount",
      "Leads scored and routed to sales at the right moment",
      "Personalized experiences based on real user behavior",
      "Reduced manual work through intelligent automation",
      "Unified data flows across product, CRM, and campaigns",
      "Documented workflows your team can maintain and extend",
    ],
    technologies: ["HubSpot", "Marketo", "AI Workflows", "Segmentation", "Lead Scoring"],
  },
  {
    slug: "marketplace-ecommerce-growth",
    title: "Marketplace & E-Commerce Growth",
    description:
      "Growth strategy and execution across Shopify, Amazon, Flipkart, Etsy, and custom storefronts.",
    intro:
      "Selling online means competing on more than product quality. We grow revenue across owned storefronts and third-party marketplaces with listing optimization, channel-specific campaigns, and operational discipline. Whether you are launching on Amazon or scaling a Shopify brand internationally, growth is treated as a system, not a series of one-off promotions.",
    icon: "ShoppingCart",
    capabilities: [
      "Shopify store setup, optimization, and app integration",
      "Amazon, Flipkart, and marketplace listing optimization",
      "Etsy and niche marketplace growth strategies",
      "Custom e-commerce platform marketing support",
      "Product listing SEO and conversion optimization",
      "Inventory-linked campaign management and seasonal planning",
      "Marketplace advertising and sponsored product campaigns",
      "Omnichannel pricing, bundling, and promotion strategy",
    ],
    audience: [
      "D2C brands expanding across multiple sales channels",
      "E-commerce ventures launching on marketplaces",
      "Companies migrating from single-channel to omnichannel retail",
      "Brands entering India or global markets via Flipkart and Amazon",
    ],
    studioAngle:
      "TRYN builds custom storefronts and integrates marketplace APIs when off-the-shelf tools hit limits. Engineering support sits alongside growth: checkout fixes, feed automation, and analytics pipelines ship in the same studio engagement.",
    approach: [
      {
        title: "Audit",
        description:
          "Review store health, listings, and channel performance to find growth opportunities.",
      },
      {
        title: "Optimize",
        description:
          "Improve listings, storefront UX, and campaigns across priority channels.",
      },
      {
        title: "Expand",
        description:
          "Launch on new marketplaces and scale winning products with disciplined ad spend.",
      },
    ],
    outcomes: [
      "Improved conversion and AOV across owned and marketplace channels",
      "Optimized product listings ranking in marketplace search",
      "Omnichannel presence without operational chaos",
      "Revenue growth from channels beyond direct-to-consumer",
      "Campaign calendars aligned to inventory and seasonality",
      "Clear channel-level profitability reporting",
    ],
    technologies: ["Shopify", "Amazon", "Flipkart", "Etsy", "E-commerce"],
  },
  {
    slug: "analytics-growth-intelligence",
    title: "Analytics & Growth Intelligence",
    description:
      "Dashboards, attribution, growth insights, predictive analytics, and executive reporting.",
    intro:
      "Growth decisions fail when data lives in silos. We build analytics systems that connect ads, web, product, and CRM into dashboards leadership actually uses. Attribution models, KPI frameworks, and predictive signals turn raw events into budget decisions, board narratives, and weekly operating rhythms.",
    icon: "LineChart",
    capabilities: [
      "Marketing and product analytics dashboard development",
      "Multi-touch attribution and channel performance analysis",
      "Growth metric definition and KPI framework design",
      "Predictive analytics for churn, LTV, and demand forecasting",
      "Executive reporting and board-ready growth narratives",
      "Data pipeline integration across marketing and product tools",
      "Cohort analysis and funnel diagnostics",
      "Experiment tracking and incrementality measurement",
    ],
    audience: [
      "Founders who need visibility into what drives growth",
      "Marketing leaders preparing data for board and investor updates",
      "Companies fragmented across tools without a single source of truth",
      "Ventures scaling spend without confidence in channel ROI",
    ],
    studioAngle:
      "Analytics is built by engineers who own your data stack. Pipelines, warehouses, and product instrumentation are designed together, so marketing metrics reflect product reality. No more reconciling three dashboards that disagree.",
    approach: [
      {
        title: "Unify",
        description:
          "Connect data sources across ads, web, CRM, and product into a coherent analytics layer.",
      },
      {
        title: "Measure",
        description:
          "Build dashboards and attribution models that answer real business questions.",
      },
      {
        title: "Act",
        description:
          "Deliver insights and recommendations that change budget, channel, and product decisions.",
      },
    ],
    outcomes: [
      "Single dashboard view of marketing and product performance",
      "Attribution clarity across paid, organic, and referral channels",
      "Predictive signals for churn, expansion, and demand",
      "Board-ready reporting that builds investor confidence",
      "KPI frameworks the whole leadership team adopts",
      "Faster answers to where to invest the next growth dollar",
    ],
    technologies: ["GA4", "Mixpanel", "Looker", "Attribution", "Predictive"],
  },
  {
    slug: "fractional-cmo-services",
    title: "Fractional CMO Services",
    description:
      "Executive marketing leadership for ventures that need strategy and execution without a full-time CMO.",
    intro:
      "Early and growth-stage ventures need marketing leadership before they can justify a full-time executive hire. Fractional CMO coverage brings strategic direction, budget discipline, team structure, and hands-on execution oversight. You get a marketing counterpart who sits alongside product and engineering, not a consultant who delivers slides and leaves.",
    icon: "Briefcase",
    capabilities: [
      "Marketing strategy and annual planning",
      "Budget allocation across channels and initiatives",
      "Team structure, hiring support, and vendor management",
      "Growth execution oversight across brand, demand, and retention",
      "Board and investor marketing narrative development",
      "Cross-functional alignment between product, sales, and marketing",
      "Quarterly OKRs and performance review cadence",
      "Vendor selection and agency oversight with accountability",
    ],
    audience: [
      "Seed and Series A founders without marketing leadership",
      "Companies between CMO hires needing interim executive coverage",
      "Technical founders who need a marketing counterpart",
      "Ventures preparing for fundraise with weak GTM narrative",
    ],
    studioAngle:
      "A TRYN fractional CMO leads both marketing and coordinates with the engineering studio building your product. Roadmap, launch timing, and GTM stay in sync because the same partner owns both sides of the venture.",
    approach: [
      {
        title: "Assess",
        description:
          "Audit current marketing, team, spend, and growth metrics to establish baseline.",
      },
      {
        title: "Plan",
        description:
          "Build marketing strategy, budget, and team roadmap aligned to business goals.",
      },
      {
        title: "Execute",
        description:
          "Lead growth initiatives, manage vendors, and report progress to leadership and board.",
      },
    ],
    outcomes: [
      "Clear marketing strategy with prioritized initiatives and budget",
      "Team and vendor structure that executes without founder bottleneck",
      "Measurable growth progress against quarterly targets",
      "Investor-ready marketing narrative and reporting cadence",
      "Aligned product, sales, and marketing operating rhythm",
      "Path to full-time marketing leadership when the venture is ready",
    ],
    technologies: ["Strategy", "Budgeting", "Team Building", "GTM", "Reporting"],
  },
];

export function getMarketingCategory(slug: string): MarketingCategory | undefined {
  return marketingCategoryBySlug[slug];
}

export function getServicesByMarketingCategory(category: MarketingCategory): Service[] {
  return marketingServices.filter((s) => marketingCategoryBySlug[s.slug] === category);
}
