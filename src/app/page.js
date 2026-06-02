import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import HumanLoop from "@/components/sections/HumanLoop";
import SystemSection from "@/components/sections/SystemSection";
import ManualVsAgents from "@/components/sections/ManualVsAgents";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HumanLoop />
      <SystemSection />
      <ManualVsAgents />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
