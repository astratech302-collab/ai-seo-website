import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { PRICING_JSON_URL, FAQS_JSON_URL } from "@/config/site";

export const metadata = {
  title: "Pricing — Geobuild",
  description:
    "Transparent pricing for agent-run AEO, GEO and SEO. Every plan is human-approved. Start where you are today.",
};

export const revalidate = 3600;

async function getPricingData() {
  try {
    const res = await fetch(PRICING_JSON_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("[Pricing] Failed to fetch pricing JSON:", e.message);
    return null;
  }
}

async function getPricingFaqs() {
  try {
    const res = await fetch(FAQS_JSON_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.pricing_faqs ?? [];
  } catch (e) {
    console.error("[FAQs] Failed to fetch:", e.message);
    return [];
  }
}

export default async function PricingPage() {
  const [pricingData, faqs] = await Promise.all([getPricingData(), getPricingFaqs()]);

  return (
    <>
      <Pricing plans={pricingData?.pricing_plans ?? []} />
      <FAQ faqs={faqs} />
    </>
  );
}
