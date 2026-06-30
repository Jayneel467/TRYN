import type { CaseStudy } from "@/lib/case-studies";

const workImage = (slug: string) => `/work/${slug}.jpg` as const;

const deliveryMeta = (slug: string) => ({
  image: workImage(slug),
  imageCaption: "Illustrative" as const,
});

export const clientCaseStudies: CaseStudy[] = [
  {
    slug: "whatsapp-healthcare",
    title: "WhatsApp Chatbot for Healthcare Institute",
    category: "Healthcare",
    status: "Delivered",
    description:
      "Automated student support via conversational AI on WhatsApp, reducing staff workload for handling repetitive course queries by over 60%.",
    summary:
      "TRYN Studios built an LLM-powered WhatsApp chatbot for a healthcare education institute, providing 24/7 course inquiry resolution on their primary channel.",
    metrics: [
      { label: "Efficiency", value: "60%" },
      { label: "Queries", value: "10K+" },
      { label: "Availability", value: "24/7" },
      { label: "Satisfaction", value: "95%" },
    ],
    color: "from-emerald-600/20 to-teal-500/20",
    featured: true,
    isInternal: false,
    ...deliveryMeta("whatsapp-healthcare"),
    challenge:
      "A growing healthcare education institute introduced multiple new programs, leading to a high volume of inquiries from prospective students. Staff struggled to manage repetitive queries related to course offerings, eligibility criteria, fee structure, and admission procedures, especially across WhatsApp, which had become their primary communication channel.",
    solution:
      "TRYN Studios developed an AI-powered WhatsApp chatbot with seamless WhatsApp Business API integration, LLM-powered natural language understanding, a dynamic updatable knowledge base, and automated guided flows for program navigation and eligibility.",
    outcomes: [
      "Reduced staff workload for handling repetitive queries by over 60%",
      "Improved user experience with instant answers on WhatsApp",
      "Higher inquiry engagement and conversion due to reduced response delays",
      "Professional, tech-forward communication channel for the institute",
    ],
    technologies: [
      "WhatsApp Business API (Twilio)",
      "LLM-based NLP",
      "Python",
      "Custom admin tools",
    ],
  },
  {
    slug: "3d-product-chatbot",
    title: "AI Chatbot with 3D Product Experience",
    category: "3D Technology",
    status: "Delivered",
    description:
      "Interactive conversational layer for enhanced user engagement, transforming a passive 3D viewer into an interactive, guided product experience.",
    summary:
      "TRYN Studios integrated an LLM chatbot with Unity 3D product visualization. Users query products in natural language while the model highlights, rotates, and zooms in real time.",
    metrics: [
      { label: "Engagement", value: "85%" },
      { label: "Conversion", value: "40%" },
      { label: "Retention", value: "70%" },
      { label: "Languages", value: "EN + DE" },
    ],
    color: "from-violet-600/20 to-purple-500/20",
    featured: true,
    isInternal: false,
    ...deliveryMeta("3d-product-chatbot"),
    challenge:
      "A 3D solution company offered impressive virtual product visualizations but lacked an engaging communication channel. Customers could view 3D models but had no real-time assistance or interactive explanations, limiting immersive exploration and sales conversion.",
    solution:
      "TRYN Studios built an LLM-based knowledge chatbot integrated with the 3D environment, triggering real-time model actions (rotate, zoom, highlight), contextual product understanding, multilingual English/German support, and per-product knowledge bases.",
    outcomes: [
      "Transformed a passive 3D viewer into an interactive, guided product experience",
      "Increased user engagement and session time significantly",
      "Simplified product education for technical or complex machinery",
      "Scalable framework for future product-specific chatbots",
    ],
    technologies: [
      "LLM (multi-language)",
      "Unity 3D integration",
      "Python",
      "WebSocket real-time communication",
    ],
  },
  {
    slug: "excel-education",
    title: "Excel-Driven Web Chatbot for Educational Institute",
    category: "EdTech",
    status: "Delivered",
    description:
      "Scalable query resolution for academic programs, reducing manual handling of general queries by over 70% with an Excel-powered knowledge base.",
    summary:
      "TRYN Studios delivered a web chatbot where non-technical staff update course data in Excel and the bot reflects changes in real time, with no CMS or developer needed.",
    metrics: [
      { label: "Reduction", value: "70%" },
      { label: "Response", value: "24/7" },
      { label: "Accuracy", value: "98%" },
      { label: "Updates", value: "Same-day" },
    ],
    color: "from-blue-600/20 to-indigo-500/20",
    featured: true,
    isInternal: false,
    ...deliveryMeta("excel-education"),
    challenge:
      "An educational institute experienced a surge in inquiries due to growing course offerings. Repetitive questions about program structure, duration, fees, and eligibility overwhelmed administrative staff. They needed a lightweight solution without complex CMS systems or technical support.",
    solution:
      "TRYN Studios built a web-based chatbot running on an Excel-powered knowledge base, with natural language understanding, plug-and-play website embedding, and an admin-friendly interface for non-technical staff to upload or replace the Excel file.",
    outcomes: [
      "Reduced manual handling of general queries by over 70%",
      "Enabled same-day content updates for new courses or curriculum changes",
      "Improved user experience and response speed for prospective students",
      "Empowered non-technical staff to manage bot content independently",
    ],
    technologies: [
      "LLM chatbot framework",
      "Pandas Excel ingestion",
      "React frontend",
      "Python backend",
    ],
  },
  {
    slug: "virtual-yoga",
    title: "Virtual Yoga Instructor",
    category: "Wellness",
    status: "Delivered",
    description:
      "AI-augmented services for yoga professionals, empowering instructors to provide round-the-clock personalized sessions to students.",
    summary:
      "TRYN Studios built a virtual yoga instructor that generates structured, personalized sessions from user prompts, with pose correction via MediaPipe and TTS audio guidance.",
    metrics: [
      { label: "Availability", value: "24/7" },
      { label: "Sessions", value: "500+" },
      { label: "Rating", value: "4.9/5" },
      { label: "Support", value: "Personalized" },
    ],
    color: "from-rose-600/20 to-pink-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("virtual-yoga"),
    challenge:
      "A professional yoga instructor wanted to offer a richer, more scalable experience to online subscribers. Students needed flexibility to practice at their own pace with personalized routines based on goals, without the instructor being present for every session.",
    solution:
      "TRYN Studios developed an AI-powered Virtual Yoga Instructor generating structured sessions (intro, warm-up, asana flow, end note) with step-by-step instructions, audio cues, pose metadata, and optional live correction via webcam pose detection.",
    outcomes: [
      "Empowered the instructor to provide round-the-clock value to students",
      "Helped users stay consistent through flexible, guided routines",
      "Enabled the instructor to scale offerings without compromising quality",
      "Positive feedback for combining professional guidance with AI assistance",
    ],
    technologies: [
      "Chained LLMs",
      "MediaPipe pose tracking",
      "TTS audio system",
      "Python",
      "JSON output format",
    ],
  },
  {
    slug: "social-media-ai",
    title: "AI Social Media Assistant",
    category: "Marketing",
    status: "Delivered",
    description:
      "Intelligent content creation and engagement strategies, boosting social media performance and brand consistency for creators and businesses.",
    summary:
      "TRYN Studios built a persona-based social media assistant with prompt-to-post generation: captions, hashtags, AI images, and platform-optimized content.",
    metrics: [
      { label: "Growth", value: "300%" },
      { label: "Reach", value: "1M+" },
      { label: "Engagement", value: "450%" },
      { label: "Platforms", value: "5+" },
    ],
    color: "from-fuchsia-600/20 to-pink-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("social-media-ai"),
    challenge:
      "From solo creators to small businesses, many struggle to maintain a consistent social media presence: ideating fresh content, keeping up with trends, writing captions, choosing hashtags, and designing visuals without a dedicated creative team.",
    solution:
      "TRYN Studios developed an AI Social Media Content Assistant with persona-based suggestions and a prompt-to-post generator producing captions, hashtags, AI-generated images, and platform-optimized content for Instagram, LinkedIn, X, Facebook, and more.",
    outcomes: [
      "Enabled creators to build and grow their personal brand consistently",
      "Helped small teams stay visible without content burnout",
      "Made content creation as simple as talking to a virtual assistant",
      "Increased engagement and follower growth across platforms",
    ],
    technologies: [
      "GPT-based LLMs",
      "DALL·E / SDXL",
      "Real-time trend APIs",
      "Web persona configurator",
    ],
  },
  {
    slug: "diamond-analytics",
    title: "AI-Powered Analytical System for Diamond Manufacturer",
    category: "Manufacturing",
    status: "Delivered",
    description:
      "Data-driven business intelligence and product optimization for enhanced market competitiveness and operational efficiency in diamond manufacturing.",
    summary:
      "TRYN Studios implemented computer vision and predictive analytics for diamond quality assessment, delivering 85% accuracy improvement and 30% material waste reduction.",
    metrics: [
      { label: "Efficiency", value: "45%" },
      { label: "Revenue", value: "+$2M" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Inspection", value: "60% faster" },
    ],
    color: "from-amber-600/20 to-yellow-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("diamond-analytics"),
    challenge:
      "A leading diamond manufacturing company needed advanced analytics to predict diamond quality and optimize cutting processes. Traditional assessment relied on human expertise, causing inconsistent evaluations, high material waste, time-intensive inspection, and difficulty predicting optimal cutting patterns.",
    solution:
      "TRYN Studios implemented a comprehensive AI analytics platform with computer vision for clarity assessment, ML predictive modeling for cutting strategies, automated 4C grading (Cut, Color, Clarity, Carat), and yield optimization algorithms.",
    outcomes: [
      "85% improvement in quality assessment accuracy",
      "30% reduction in material waste",
      "60% faster inspection processes",
      "$2M+ in annual savings",
    ],
    technologies: [
      "Computer vision",
      "Deep learning",
      "Predictive modeling",
      "Python",
      "BI dashboards",
    ],
  },
  {
    slug: "voice-knowledge",
    title: "Voice Knowledge Assistant",
    category: "Voice AI",
    status: "Delivered",
    description:
      "Voice-activated systems for instant information retrieval and knowledge management in enterprise environments.",
    summary:
      "TRYN Studios built a voice-enabled knowledge chatbot for a tech company with speech interaction, admin-managed knowledge base, and domain-tuned accuracy.",
    metrics: [
      { label: "Accuracy", value: "96%" },
      { label: "Response", value: "<2s" },
      { label: "Usage", value: "80%" },
      { label: "Modes", value: "Chat + Voice" },
    ],
    color: "from-sky-600/20 to-cyan-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("voice-knowledge"),
    challenge:
      "A tech company with a growing product portfolio faced difficulty organizing and sharing knowledge. They wanted a human-like, accessible solution allowing users to speak naturally instead of typing, with accurate instant answers from a curated knowledge base.",
    solution:
      "TRYN Studios designed a voice-enabled knowledge chatbot combining LLM natural conversation with voice interaction, including an admin-managed knowledge base, contextual follow-up understanding, and both typed chat and voice UI modes.",
    outcomes: [
      "Significantly improved user engagement and ease of access to company knowledge",
      "Reduced dependency on support staff for routine queries",
      "Enhanced accessibility for hands-free environments",
      "Faster, more intuitive information discovery",
    ],
    technologies: [
      "OpenAI LLMs",
      "Google Speech-to-Text & TTS",
      "React + Tailwind",
      "FastAPI",
      "Document processing",
    ],
  },
  {
    slug: "saree-draping",
    title: "AI Saree Draping Assistant",
    category: "Fashion AI",
    status: "Delivered",
    description:
      "Traditional fashion AI guide helping users learn and master various saree draping styles with step-by-step guidance and AR try-on.",
    summary:
      "TRYN Studios built an AI-powered saree draping platform with 3D tutorials, AR try-on, and style recommendations, driving a 250% increase in online engagement.",
    metrics: [
      { label: "Engagement", value: "250%" },
      { label: "Sales", value: "+180%" },
      { label: "Users", value: "15K+" },
      { label: "Styles", value: "25+" },
    ],
    color: "from-orange-600/20 to-red-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("saree-draping"),
    challenge:
      "A traditional saree retailer needed to bridge traditional fashion and modern technology. Young customers lacked draping knowledge, in-store assistance was limited, and the retailer needed to preserve and digitize traditional fashion knowledge for online shoppers.",
    solution:
      "TRYN Studios created an AI-powered saree draping platform with interactive 3D tutorials, AR try-on experience, AI style recommendations based on occasion and body type, and educational content about regional draping traditions.",
    outcomes: [
      "250% increase in online engagement",
      "180% boost in sales conversion",
      "15K+ users learned new draping styles",
      "25+ traditional styles digitized and preserved",
    ],
    technologies: [
      "Computer vision",
      "3D modeling",
      "AR pose estimation",
      "Machine learning recommendations",
    ],
  },
  {
    slug: "roleplay-wellness",
    title: "RolePlay AI for Mental Wellness",
    category: "Wellness",
    status: "Delivered",
    description:
      "AI mental health support through interactive roleplay scenarios, providing accessible mental wellness assistance in safe environments.",
    summary:
      "TRYN Studios developed a therapeutic roleplay platform for mental health practice with customizable scenarios, adaptive AI characters, and progress tracking for therapists.",
    metrics: [
      { label: "Sessions", value: "1K+" },
      { label: "Improvement", value: "75%" },
      { label: "Confidence", value: "+85%" },
      { label: "Engagement", value: "90%" },
    ],
    color: "from-teal-600/20 to-emerald-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("roleplay-wellness"),
    challenge:
      "A mental health organization needed innovative tools for therapy practice. Patients had limited safe opportunities to practice social interactions, with anxiety and fear of judgment preventing honest engagement and consistent practice partners.",
    solution:
      "TRYN Studios created an AI roleplay platform with customizable therapeutic scenarios, adaptive AI characters tailored to patient progress, a non-judgmental safe environment, and detailed analytics for therapists to monitor improvement.",
    outcomes: [
      "85% improvement in patient confidence levels",
      "70% better therapy outcomes",
      "90% patient engagement rate",
      "50% reduction in therapy duration",
    ],
    technologies: [
      "LLM roleplay engine",
      "Emotional intelligence models",
      "Encrypted healthcare storage",
      "Therapist dashboard",
    ],
  },
  {
    slug: "wyndham-long-island-ai",
    title: "Hotel AI for Direct Bookings",
    legalName: "Wyndham Long Island, USA",
    category: "Hospitality",
    status: "Delivered",
    description:
      "AI guest engagement and booking assistant that drove measurable uplift in direct reservations and reduced reliance on OTAs for Wyndham Long Island.",
    summary:
      "TRYN Studios engineered a hospitality AI system for Wyndham Long Island that captures more direct bookings, automates guest communication, and strengthens the property's direct revenue channel.",
    metrics: [
      { label: "Direct bookings", value: "Uplift" },
      { label: "Guest comms", value: "24/7" },
      { label: "OTA reliance", value: "Reduced" },
      { label: "Channels", value: "Web + chat" },
    ],
    color: "from-slate-600/20 to-blue-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("wyndham-long-island-ai"),
    challenge:
      "Wyndham Long Island depended heavily on online travel agencies for visibility and bookings. Commission costs cut into margins, and front-desk staff spent hours answering repetitive questions about rates, amenities, and availability. Guests who wanted to book direct often bounced before completing a reservation.",
    solution:
      "TRYN Studios built an AI hospitality assistant integrated with the property's booking flow and guest communication channels. The system answers pre-stay questions in natural language, guides visitors toward direct reservations, and keeps guests informed from inquiry through check-in without adding headcount.",
    outcomes: [
      "Measurable uplift in direct bookings alongside reduced OTA dependency",
      "Faster, consistent guest responses across common pre-arrival questions",
      "Front-desk team freed from repetitive inquiries to focus on in-person hospitality",
      "Stronger direct revenue channel with improved guest communication before arrival",
    ],
    technologies: [
      "LLM conversational AI",
      "Booking flow integration",
      "Knowledge base for property amenities",
      "Web and messaging channels",
      "Analytics dashboard",
    ],
  },
  {
    slug: "whatsapp-sales",
    title: "WhatsApp Sales Assistant",
    category: "Sales",
    status: "Delivered",
    description:
      "AI sales assistant for WhatsApp, automating lead qualification and customer support for improved sales conversion in e-commerce.",
    summary:
      "TRYN Studios built a WhatsApp AI sales assistant for a fashion e-commerce brand, delivering a 220% conversion increase and response time reduced from hours to seconds.",
    metrics: [
      { label: "Conversion", value: "220%" },
      { label: "Response", value: "95% faster" },
      { label: "Automation", value: "80%" },
      { label: "Sales growth", value: "150%" },
    ],
    color: "from-green-600/20 to-lime-500/20",
    featured: false,
    isInternal: false,
    ...deliveryMeta("whatsapp-sales"),
    challenge:
      "A rapidly growing e-commerce fashion brand faced high WhatsApp inquiry volume overwhelming support staff. Delayed responses led to lost sales, and manual order tracking consumed significant resources without personalized product recommendations.",
    solution:
      "TRYN Studios implemented a comprehensive WhatsApp AI sales assistant with intelligent product recommendations, automated order processing within WhatsApp, real-time inventory integration, smart order tracking, and visual catalog integration.",
    outcomes: [
      "220% increase in conversion rates",
      "95% reduction in response time",
      "80% automated query resolution",
      "150% growth in WhatsApp sales channel",
    ],
    technologies: [
      "WhatsApp Business API",
      "LLM personalization engine",
      "Inventory integration",
      "Payment processing",
      "Visual catalog API",
    ],
  },
];
