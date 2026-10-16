import DetailPage from "@/components/sections/DetailPage";
import AgentFeatureShowcase, { AgentHeroMedia } from "@/components/agents/AgentFeatureShowcase";
import ChannelShowcase from "@/components/cro/ChannelShowcase";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { ADS_PRODUCT, ADS_PATH, CHANNELS } from "@/data/cro";

export const metadata = {
  title: ADS_PRODUCT.metaTitle,
  description: ADS_PRODUCT.metaDescription,
  alternates: { canonical: ADS_PATH },
};

export default function AdToLandingPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: ADS_PRODUCT.name,
            description: ADS_PRODUCT.metaDescription,
            path: ADS_PATH,
            serviceType: "Landing page personalization",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: ADS_PRODUCT.name, path: ADS_PATH },
          ]),
        ]}
      />
      <DetailPage
        kind="Product"
        data={ADS_PRODUCT}
        icon="A"
        heroMedia={<AgentHeroMedia slug={ADS_PRODUCT.slug} />}
        showcase={
          <>
            <ChannelShowcase data={CHANNELS} />
            <AgentFeatureShowcase agent={ADS_PRODUCT} />
          </>
        }
      />
    </>
  );
}
