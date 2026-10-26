import ContactForm from "./ContactForm";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { contactPageSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { FAQS_JSON_URL, AI_SEO_ENABLED } from "@/config/site";

export const metadata = {
  title: AI_SEO_ENABLED
    ? "Book a Demo — Free AI Visibility Audit | Geobuild"
    : "Book a Demo — Hyperpersonalization for Shopify | Geobuild",
  description: AI_SEO_ENABLED
    ? "Tell us about your brand and book a 30-minute strategy session. We'll audit your AI visibility beforehand and come prepared."
    : "Tell us about your Shopify store and book a 30-minute session. We'll review your ads and product pages beforehand and show you what a personalized landing page for every ad looks like.",
  alternates: { canonical: "/contact-us" },
};

export const revalidate = 3600;

async function getFaqs() {
  // The FAQ feed is AI-SEO content; hidden while the product is CRO-only.
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

export default async function ContactUsPage() {
  const faqs = await getFaqs();
  return (
    <>
      <JsonLd
        schema={[
          contactPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: "/contact-us",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a Demo", path: "/contact-us" },
          ]),
          faqPageSchema(faqs),
        ]}
      />
      <ContactForm />
      {faqs.length > 0 && <FAQ faqs={faqs} />}
    </>
  );
}
