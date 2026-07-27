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
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
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
    title: `${agent.name} — Agent-Run AEO, GEO & SEO | Geobuild`,
    description: agent.desc || agent.short,
    alternates: { canonical: `/agents/${slug}` },
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

  const path = `/agents/${agent.slug}`;

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: agent.name,
            description: agent.short,
            path,
            serviceType: agent.role,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: agent.name, path },
          ]),
        ]}
      />
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
