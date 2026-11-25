import SectionHead from "@/components/sections/SectionHead";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { CASE_STUDIES, CASE_STUDIES_PAGE, CASE_STUDIES_PATH } from "@/data/caseStudies";

export const metadata = {
  title: "Case Studies — Shopify Conversion Scenarios | Geobuild",
  description:
    "Modelled Shopify scenarios across five store categories, showing how session sort and matched landing pages can lift conversion rate by between 5% and 15%.",
  alternates: { canonical: CASE_STUDIES_PATH },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({ name: metadata.title, description: metadata.description, path: CASE_STUDIES_PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: CASE_STUDIES_PATH },
          ]),
        ]}
      />
      <section style={{ paddingTop: "clamp(52px, 5vw, 76px)" }}>
        <div className="wrap">
          <SectionHead
            as="h1"
            eyebrow={CASE_STUDIES_PAGE.eyebrow}
            title={CASE_STUDIES_PAGE.title}
            sub={CASE_STUDIES_PAGE.sub}
          />
          <div style={{ marginTop: 40 }}>
            <CaseStudyGrid studies={CASE_STUDIES} featureFirst location="case_studies" />
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
