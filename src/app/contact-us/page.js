import ContactForm from "./ContactForm";
import FAQ from "@/components/sections/FAQ";
import { FAQS_JSON_URL } from "@/config/site";

export const metadata = {
  title: "Book a Demo — Geobuild",
  description:
    "Tell us about your brand and book a 30-minute strategy session. We'll audit your AI visibility beforehand and come prepared.",
};

export const revalidate = 3600;

async function getFaqs() {
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
      <ContactForm />
      <FAQ faqs={faqs} />
    </>
  );
}
