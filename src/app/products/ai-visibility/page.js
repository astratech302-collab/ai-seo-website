import GrowthPage, { growthMetadata } from "@/components/sections/GrowthPage";
import { getGrowthProduct } from "@/data/growth";

const product = getGrowthProduct("ai_visibility");

export const metadata = growthMetadata(product);

export default function AiVisibilityPage() {
  return <GrowthPage product={product} />;
}
