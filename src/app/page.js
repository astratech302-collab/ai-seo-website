import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import HumanLoop from "@/components/sections/HumanLoop";
import SystemSection from "@/components/sections/SystemSection";
import ManualVsAgents from "@/components/sections/ManualVsAgents";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { FAQS_JSON_URL } from "@/config/site";

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

export default async function Home() {
  const faqs = await getFaqs();
  return (
    <>
      <Hero />
      <ProblemSection />
      <HumanLoop />
      <SystemSection />
      <ManualVsAgents />
      <FAQ faqs={faqs} />
      <FinalCTA />
    </>
  );
}
