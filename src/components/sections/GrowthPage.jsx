import DetailPage from "@/components/sections/DetailPage";
import AgentFeatureShowcase, { hasShowcase, AgentHeroMedia } from "@/components/agents/AgentFeatureShowcase";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export function growthMetadata(product) {
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: product.path },
  };
}

/** Shared page for the AI Visibility and Catalog Enrichment products (data/growth.js). */
export default function GrowthPage({ product }) {
  const { data, path } = product;
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: data.name,
            description: product.metaDescription,
            path,
            serviceType: product.serviceType,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: data.name, path },
          ]),
        ]}
      />
      <DetailPage
        kind="Product"
        data={data}
        icon={data.name.slice(0, 1)}
        heroMedia={<AgentHeroMedia slug={product.heroMedia} />}
        showcase={hasShowcase(data.slug) ? <AgentFeatureShowcase agent={data} /> : null}
      />
      <FinalCTA />
    </>
  );
}
