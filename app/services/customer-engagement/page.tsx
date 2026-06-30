import type { Metadata } from "next";
import { MarketingCategoryPage } from "@/components/services/marketing-category-page";
import { createPageMetadata } from "@/lib/metadata";
import { marketingCategoryHooks } from "@/lib/marketing-services";

export const metadata: Metadata = createPageMetadata({
  title: "Customer Engagement Services",
  description: marketingCategoryHooks["Customer Engagement"],
  path: "/services/customer-engagement",
});

export default function CustomerEngagementServicesPage() {
  return <MarketingCategoryPage category="Customer Engagement" />;
}
