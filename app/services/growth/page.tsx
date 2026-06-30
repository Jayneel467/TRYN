import type { Metadata } from "next";
import { MarketingCategoryPage } from "@/components/services/marketing-category-page";
import { createPageMetadata } from "@/lib/metadata";
import { marketingCategoryHooks } from "@/lib/marketing-services";

export const metadata: Metadata = createPageMetadata({
  title: "Growth Services",
  description: marketingCategoryHooks.Growth,
  path: "/services/growth",
});

export default function GrowthServicesPage() {
  return <MarketingCategoryPage category="Growth" />;
}
