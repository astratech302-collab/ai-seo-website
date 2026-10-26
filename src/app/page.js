import Hero from "@/components/sections/Hero";
import HeroCro from "@/components/sections/HeroCro";
import HumanLoop from "@/components/sections/HumanLoop";
import SystemSection from "@/components/sections/SystemSection";
import ManualVsAgents from "@/components/sections/ManualVsAgents";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import AgentFeatureShowcase from "@/components/agents/AgentFeatureShowcase";
import ChannelShowcase from "@/components/cro/ChannelShowcase";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, faqPageSchema } from "@/lib/schema";
import { FAQS_JSON_URL, ORG_DESCRIPTION, AI_SEO_ENABLED } from "@/config/site";
import { HYPER_PRODUCT, CHANNELS } from "@/data/cro";

export const revalidate = 3600;

async function getFaqs() {
  // The homepage FAQ feed is AEO/GEO/SEO content; hidden while the product is CRO-only.
  if (!AI_SEO_ENABLED) return [];
  try {
    const res = await fetch(FAQS_JSON_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.homepage_faqs ?? [];
  } catch (e) {
    console.error("[FAQs] Failed to fetch:", e.message);
    return [];
  }
}

export default async function Home() {
  const faqs = await getFaqs();
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            name: AI_SEO_ENABLED
              ? "Geobuild — Be the Brand AI Recommends"
              : "Geobuild — Hyperpersonalization at Scale for Shopify Stores",
            description: ORG_DESCRIPTION,
            path: "/",
          }),
          ...(faqs.length ? [faqPageSchema(faqs)] : []),
        ]}
      />
      {AI_SEO_ENABLED ? (
        <>
          <Hero />
          <HumanLoop />
          <SystemSection />
          <ManualVsAgents />
          <FAQ faqs={faqs} />
        </>
      ) : (
        <>
          <HeroCro />
          <div id="how-it-works">
            <AgentFeatureShowcase agent={HYPER_PRODUCT} />
          </div>
          <ChannelShowcase data={CHANNELS} />
        </>
      )}
      <FinalCTA />
    </>
  );
}
