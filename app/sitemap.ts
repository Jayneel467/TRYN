import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { insightPosts } from "@/lib/insights";
import { marketingCategoryHref } from "@/lib/marketing-services";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/services",
    "/services/growth-brand",
    ...Object.values(marketingCategoryHref),
    "/work",
    "/testimonials",
    "/founders-program",
    "/engineering",
    "/mentorship",
    "/insights",
    "/solutions",
    "/about",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
  ];

  const servicePages = services.map((s) => `/services/${s.slug}`);
  const caseStudyPages = caseStudies.map((s) => `/work/${s.slug}`);
  const insightPages = insightPosts.map((p) => `/insights/${p.slug}`);
  const solutionPages = solutions.map((s) => `/solutions/${s.slug}`);

  return [...staticPages, ...servicePages, ...caseStudyPages, ...insightPages, ...solutionPages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
