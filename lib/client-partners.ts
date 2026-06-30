import { clientTestimonials } from "@/lib/testimonials";

/** Client partner monograms for social proof without logo permissions. */
export const clientPartnerMonograms = clientTestimonials.map((t) => ({
  id: t.id,
  initials: t.initials,
  company: t.company,
  industry: t.industry,
}));
