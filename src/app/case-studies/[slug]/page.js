import { notFound } from "next/navigation";
import CaseStudyCover, { pct } from "@/components/sections/CaseStudyCover";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import { BackToCaseStudies, ProductsUsed } from "@/components/sections/CaseStudyLinks";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import {
  CASE_STUDIES,
  CASE_STUDIES_PATH,
  caseStudyHref,
  getCaseStudy,
} from "@/data/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: caseStudyHref(slug) },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const at = CASE_STUDIES.indexOf(study);
  const more = [1, 2].map((n) => CASE_STUDIES[(at + n) % CASE_STUDIES.length]);

  const stats = [
    ["Conversion rate lift", `+${study.lift}%`],
    ["Before", pct(study.before)],
    ["After", pct(study.after)],
  ];

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({ name: study.metaTitle, description: study.metaDescription, path: caseStudyHref(slug) }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: CASE_STUDIES_PATH },
            { name: study.title, path: caseStudyHref(slug) },
          ]),
        ]}
      />

      <article className="wrap csd">
        <BackToCaseStudies slug={slug} />

        <div className="csd-top">
        <header className="csd-head">
          <div className="csd-tags">
            <span className="csd-cat">{study.category}</span>
              {study.label && <span className="csd-flag">{study.label}</span>}
          </div>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
        </header>
          <div className="csd-cover">
            <CaseStudyCover study={study} />
          </div>
        </div>

        <dl className="csd-stats">
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="csd-cols">
          <div className="csd-main">
            <section>
              <h2>The problem</h2>
              {study.challenge.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
            <section>
              <h2>What we do</h2>
              <ol>
                {study.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="csd-step" aria-hidden>{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2>How we measure it</h2>
              <p>{study.measure}</p>
            </section>
          </div>
          <aside>
            <h2>Used in this scenario</h2>
            <ProductsUsed slug={slug} products={study.products} />
          </aside>
        </div>

        <section className="csd-related">
          <h2>More case studies</h2>
          <div className="csd-more">
            <CaseStudyGrid studies={more} location="related_case_studies" />
          </div>
        </section>
      </article>
      <FinalCTA />

      <style>{`
        .csd { padding-top: 36px; }
        .csd-back { display: inline-flex; gap: 8px; font-size: 14.5px; color: var(--ink-2); text-decoration: none; }
        .csd-back:hover { color: var(--ink); }
        .csd-top { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 44px; align-items: center; margin-top: 30px; }
        .csd-cover { overflow: hidden; border-radius: var(--r-lg); }
        .csd-cover .csc { min-height: 300px; }
        .csd-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
        .csd-cat { font-size: 14px; font-weight: 600; color: var(--brand-600); }
        .csd-flag { font-size: 12px; color: var(--ink-2); border: 1px solid var(--line); border-radius: 99px; padding: 3px 10px; }
        .csd-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 32px; border: 1px solid var(--line); border-radius: var(--r-lg); }
        .csd-stats div { display: flex; flex-direction: column; gap: 6px; padding: 22px 24px; }
        .csd-stats div + div { border-left: 1px solid var(--line); }
        .csd-stats dt { font-size: 13px; color: var(--ink-2); }
        .csd-stats dd { font-size: clamp(24px, 3.4vw, 38px); letter-spacing: -0.03em; color: var(--ink); }
        @media (max-width: 520px) { .csd-stats { grid-template-columns: 1fr; } .csd-stats div + div { border-left: 0; border-top: 1px solid var(--line); } }
        .csd-head h1 { margin-top: 16px; font-size: clamp(34px, 5vw, 56px); line-height: 1.08; }
        .csd-head p { margin-top: 18px; font-size: 18px; line-height: 1.55; color: var(--ink-2); }
        .csd-cols { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 64px; align-items: start; margin-top: 56px; }
        .csd-main { display: flex; flex-direction: column; gap: 46px; max-width: 720px; }
        .csd-main h2, .csd-related > h2 { font-size: 28px; line-height: 1.2; }
        .csd-main section > p { margin-top: 14px; font-size: 16.5px; line-height: 1.65; color: var(--ink-2); }
        .csd-main ol { display: flex; flex-direction: column; gap: 22px; margin-top: 22px; padding: 0; list-style: none; }
        .csd-main li { display: flex; gap: 16px; }
        .csd-step { flex: 0 0 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; background: var(--ink); color: var(--surface); font-size: 14px; }
        .csd-main h3 { font-size: 18px; font-weight: 600; line-height: 32px; }
        .csd-main li p { margin-top: 4px; font-size: 15.5px; line-height: 1.6; color: var(--ink-2); }
        .csd aside { position: sticky; top: 96px; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 22px; }
        .csd aside h2 { font-size: 14px; font-weight: 600; }
        .csd-products { display: flex; flex-direction: column; gap: 8px; margin: 14px 0 0; padding: 0; list-style: none; }
        .csd-products a { display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 1px solid var(--line); border-radius: 12px; padding: 11px 14px; font-size: 14px; color: var(--ink); text-decoration: none; }
        .csd-products a:hover { background: var(--surface-soft); }
        .csd-related { margin-top: 80px; }
        .csd-more { margin-top: 24px; }
        @media (max-width: 860px) { .csd-top { grid-template-columns: 1fr; gap: 28px; } .csd-cols { grid-template-columns: 1fr; gap: 40px; } .csd aside { position: static; } }
      `}</style>
    </>
  );
}
