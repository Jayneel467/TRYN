export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  legalName?: string;
  initials: string;
  rating: number;
  featured: boolean;
  industry: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "itinero",
    quote:
      "TRYN Studios is the engineering team behind Itinero Travels. Together we're building an AI-powered travel platform with conversational trip planning, smart itineraries, and booking infrastructure, ahead of our public launch.",
    author: "Rajesh Mehta",
    role: "Founder & CEO",
    company: "Itinero Travels",
    legalName: "Itinero Travels Private Limited",
    initials: "RM",
    rating: 5,
    featured: true,
    industry: "Travel & Hospitality",
    accent: "#0E7490",
  },
  {
    id: "vibrant-campus",
    quote:
      "TRYN Studios played a pivotal role in developing our WhatsApp Business chatbot, significantly enhancing our communication with students and parents. Their innovative solutions have streamlined the handling of inquiries, making the process both efficient and effective.",
    author: "Parth Gondaliya",
    role: "Leadership",
    company: "Vibrant Campus",
    initials: "PG",
    rating: 5,
    featured: false,
    industry: "Education",
    accent: "#FF8C1A",
  },
  {
    id: "kumbhat-advisors",
    quote:
      "TRYN Studios developed a robust web application tailored to our company's needs, significantly improving our operational efficiency and architectural framework. Their exceptional service has made our workflow more streamlined and effective.",
    author: "Maulik Desai",
    role: "Leadership",
    company: "Kumbhat Advisors",
    initials: "MD",
    rating: 5,
    featured: false,
    industry: "Professional Services",
    accent: "#FF8C1A",
  },
  {
    id: "akshar-tours",
    quote:
      "Switching to digital infrastructure was a daunting task for us, but TRYN Studios made it effortless. Their expertise and dedication in providing digital solutions have truly revolutionized our business.",
    author: "Dheeru Bhai",
    role: "Leadership",
    company: "Akshar Tours & Travels",
    initials: "DB",
    rating: 5,
    featured: false,
    industry: "Travel",
    accent: "#FF8C1A",
  },
  {
    id: "shv-school",
    quote:
      "TRYN Studios has been instrumental in the development of our website chatbot, which seamlessly handles all inquiries and provides valuable guidance to our clients and parents.",
    author: "Dinesh Gondaliya",
    role: "Leadership",
    company: "SHV School",
    initials: "DG",
    rating: 5,
    featured: false,
    industry: "Education",
    accent: "#FF8C1A",
  },
  {
    id: "studio7",
    quote:
      "TRYN Studios' expertise in creating a WhatsApp chatbot has transformed our business operations. The chatbot efficiently manages all inquiries and has played a key role in driving our business growth.",
    author: "Ravi Vyash",
    role: "Leadership",
    company: "Studio7",
    initials: "RV",
    rating: 5,
    featured: false,
    industry: "Creative",
    accent: "#FF8C1A",
  },
];

export const featuredTestimonial = testimonials.find((t) => t.featured)!;

export const clientTestimonials = testimonials.filter((t) => t.id !== "itinero");

/** @deprecated use clientTestimonials */
export const clientDeliveryTestimonials = clientTestimonials;

export const testimonialStats = [
  { label: "Flagship build", value: "In development" },
  { label: "Client deliveries", value: "10+" },
  { label: "Founder program", value: "Open" },
] as const;

export const clientPullQuote = testimonials.find((t) => t.id === "vibrant-campus")!;

export const videoTestimonials = [
  {
    id: "itinero-video",
    title: "Building Itinero Travels with TRYN",
    speaker: "Rajesh Mehta",
    company: "Itinero Travels Private Limited",
    duration: "Coming soon",
    accent: "#0E7490",
    available: false,
  },
] as const;
