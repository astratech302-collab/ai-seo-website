import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/data/services";
import DetailPage from "@/components/sections/DetailPage";
import AgentFeatureShowcase, {
  hasShowcase,
  hasHeroMedia,
  AgentHeroMedia,
} from "@/components/agents/AgentFeatureShowcase";
import FinalCTA from "@/components/sections/FinalCTA";
import { ASSET_BASE } from "@/config/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Geobuild`,
    description: service.short,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = {
    heading: "More services",
    hrefBase: "/services",
    items: SERVICES.filter((s) => s.slug !== slug).map((s) => ({
      slug: s.slug,
      name: s.name,
      short: s.short,
      icon: `${ASSET_BASE}/${s.slug}.png`,
    })),
  };

  return (
    <>
      <DetailPage
        kind="Service"
        data={service}
        icon={service.role.slice(0, 1)}
        heroMedia={hasHeroMedia(service.slug) ? <AgentHeroMedia slug={service.slug} /> : null}
        showcase={hasShowcase(service.slug) ? <AgentFeatureShowcase agent={service} /> : null}
        related={related}
      />
      <FinalCTA />
    </>
  );
}
