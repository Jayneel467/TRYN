import type { Metadata } from "next";
import { MarketingCategoryPage } from "@/components/services/marketing-category-page";
import { createPageMetadata } from "@/lib/metadata";
import { marketingCategoryHooks } from "@/lib/marketing-services";

export const metadata: Metadata = createPageMetadata({
  title: "Strategy Services",
  description: marketingCategoryHooks.Strategy,
  path: "/services/strategy",
});

export default function StrategyServicesPage() {
  return <MarketingCategoryPage category="Strategy" />;
}
