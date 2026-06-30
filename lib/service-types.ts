export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Longer hero intro (2–3 sentences) when the short description is not enough */
  intro?: string;
  icon: string;
  capabilities: string[];
  audience: string[];
  approach: { title: string; description: string }[];
  technologies: string[];
  outcomes?: string[];
  /** Venture studio + engineering angle for marketing services */
  studioAngle?: string;
};
