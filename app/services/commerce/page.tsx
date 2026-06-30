import type { Metadata } from "next";
import { MarketingCategoryPage } from "@/components/services/marketing-category-page";
import { createPageMetadata } from "@/lib/metadata";
import { marketingCategoryHooks } from "@/lib/marketing-services";

export const metadata: Metadata = createPageMetadata({
  title: "Commerce Services",
  description: marketingCategoryHooks.Commerce,
  path: "/services/commerce",
});

export default function CommerceServicesPage() {
  return <MarketingCategoryPage category="Commerce" />;
}
