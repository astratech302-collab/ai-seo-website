import GrowthPage, { growthMetadata } from "@/components/sections/GrowthPage";
import { getGrowthProduct } from "@/data/growth";

const product = getGrowthProduct("catalog_enrichment");

export const metadata = growthMetadata(product);

export default function CatalogEnrichmentPage() {
  return <GrowthPage product={product} />;
}
