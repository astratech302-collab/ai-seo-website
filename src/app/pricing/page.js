import CloudSky from "@/components/hero/CloudSky";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { PRICING } from "@/data/pricing";
import { PRICING_FAQS } from "@/data/faqs";

export const metadata = {
  title: "Pricing — Plans for Self-Improving Storefronts | Geobuild",
  description:
    "Geobuild plans for Shopify stores: 1:1 session sort, catalog enrichment, audience-matched landing pages, AI visibility and services. Book a demo for a quote.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: "/pricing",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          faqPageSchema(PRICING_FAQS),
        ]}
      />
      <div className="sky-panel">
        <CloudSky />
        <Pricing plans={PRICING} />
      </div>
      <FAQ faqs={PRICING_FAQS} />
    </>
  );
}
