import { notFound } from "next/navigation";
import { AGENTS, AGENT_ICONS } from "@/data/agents";
import DetailPage from "@/components/sections/DetailPage";
import AgentMockup from "@/components/agents/AgentMockup";
import AgentFeatureShowcase, {
  hasShowcase,
  hasHeroMedia,
  AgentHeroMedia,
} from "@/components/agents/AgentFeatureShowcase";
import FinalCTA from "@/components/sections/FinalCTA";
import { ASSET_BASE } from "@/config/site";

const getAgent = (slug) => AGENTS.find((a) => a.slug === slug) || null;

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — Geobuild`,
    description: agent.short,
  };
}

export default async function AgentPage({ params }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const related = {
    heading: "The rest of the team",
    hrefBase: "/agents",
    items: AGENTS.filter((a) => a.slug !== slug).map((a) => ({
      slug: a.slug,
      name: a.name,
      short: a.short,
      icon: `${ASSET_BASE}/${a.slug}.png`,
    })),
  };

  return (
    <>
      <DetailPage
        kind="Agent"
        data={agent}
        icon={AGENT_ICONS[agent.code]}
        mockup={<AgentMockup slug={agent.slug} />}
        heroMedia={hasHeroMedia(agent.slug) ? <AgentHeroMedia slug={agent.slug} /> : null}
        showcase={hasShowcase(agent.slug) ? <AgentFeatureShowcase agent={agent} /> : null}
        related={related}
      />
      <FinalCTA />
    </>
  );
}
