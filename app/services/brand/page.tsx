import type { Metadata } from "next";
import { MarketingCategoryPage } from "@/components/services/marketing-category-page";
import { createPageMetadata } from "@/lib/metadata";
import { marketingCategoryHooks } from "@/lib/marketing-services";

export const metadata: Metadata = createPageMetadata({
  title: "Brand Services",
  description: marketingCategoryHooks.Brand,
  path: "/services/brand",
});

export default function BrandServicesPage() {
  return <MarketingCategoryPage category="Brand" />;
}
