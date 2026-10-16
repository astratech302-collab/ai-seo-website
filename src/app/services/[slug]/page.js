import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/data/services";
import DetailPage from "@/components/sections/DetailPage";
import AgentFeatureShowcase, {
  hasShowcase,
  hasHeroMedia,
  AgentHeroMedia,
} from "@/components/agents/AgentFeatureShowcase";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { ASSET_BASE } from "@/config/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title:
      service.metaTitle ||
      `${service.name} — AEO, GEO & SEO Service | Geobuild`,
    description: service.metaDescription || service.desc || service.short,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.standalone
    ? null
    : {
        heading: "More services",
        hrefBase: "/services",
        items: SERVICES.filter((s) => s.slug !== slug).map((s) => ({
          slug: s.slug,
          name: s.name,
          short: s.short,
          icon: `${ASSET_BASE}/${s.iconFile || s.slug}.png`,
        })),
      };

  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: service.name,
            description: service.short,
            path,
            serviceType: service.role,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: service.name, path },
          ]),
        ]}
      />
      <DetailPage
        kind="Service"
        data={service}
        icon={service.role.slice(0, 1)}
        heroMedia={hasHeroMedia(service.slug) ? <AgentHeroMedia slug={service.slug} /> : null}
        showcase={hasShowcase(service.slug) ? <AgentFeatureShowcase agent={service} /> : null}
        related={related}
      />
      {!service.standalone && <FinalCTA />}
    </>
  );
}
