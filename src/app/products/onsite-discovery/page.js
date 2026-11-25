import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";
import CloudSky from "@/components/hero/CloudSky";
import SortCompare from "@/components/onsite/SortCompare";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { ONSITE_PRODUCT, ONSITE_PATH, ONSITE_STEPS_TITLE } from "@/data/onsite";

export const metadata = {
  title: ONSITE_PRODUCT.metaTitle,
  description: ONSITE_PRODUCT.metaDescription,
  alternates: { canonical: ONSITE_PATH },
};

export default function OnsiteDiscoveryPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: ONSITE_PRODUCT.name,
            description: ONSITE_PRODUCT.metaDescription,
            path: ONSITE_PATH,
            serviceType: "Ecommerce collection personalization",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: ONSITE_PRODUCT.name, path: ONSITE_PATH },
          ]),
        ]}
      />

      <section className="sky-panel od-hero">
        <CloudSky />
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="tag-pill">
              {ONSITE_PRODUCT.name} · {ONSITE_PRODUCT.tagline}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="od-title">{ONSITE_PRODUCT.headline}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="od-sub">{ONSITE_PRODUCT.desc}</p>
          </Reveal>
          <Reveal delay={180} style={{ marginTop: 30 }}>
            <BookDemoButton
              event="button_clicked/book_demo_hero_onsite_discovery"
              className="btn btn-primary"
              style={{ padding: "16px 30px", fontSize: 17 }}
            />
          </Reveal>
        </div>
      </section>

      <div className="frame">
        <section className="wrap od-sec">
          <Reveal>
            <SortCompare location="page" />
          </Reveal>
        </section>

        <section className="wrap od-sec frame-rule">
          <Reveal>
            <h2 className="od-h2">{ONSITE_STEPS_TITLE}</h2>
          </Reveal>
          <div className="od-grid">
            {ONSITE_PRODUCT.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className={`flow flow-${step.tone} od-art`}>
                  <span className="flow-bubble">{step.bubble}</span>
                </div>
                <h3 className="od-h3">{step.title}</h3>
                <p className="od-body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

      </div>

      <FinalCTA />

      <style>{`
        .sky-panel.od-hero { padding: 150px 0 88px; }
        .od-title { font-size: clamp(36px, 5.4vw, 66px); line-height: 1.08; max-width: 860px; margin: 24px auto 0; }
        .od-sub { font-size: 18.5px; line-height: 1.55; max-width: 640px; margin: 22px auto 0; color: var(--ink); opacity: .78; }
        .od-sec { padding-top: 96px; padding-bottom: 96px; }
        .od-h2 { font-size: clamp(28px, 3.8vw, 44px); line-height: 1.15; text-align: center; max-width: 720px; margin: 0 auto 52px; }
        .od-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .od-art { height: 240px; border-radius: 14px; display: flex; align-items: center; justify-content: center; padding: 24px; text-align: center; }
        .od-h3 { font-size: 19px; font-weight: 500; margin: 22px 0 0; }
        .od-body { font-size: 16px; color: var(--ink-2); line-height: 1.6; margin-top: 8px; }
        @media (max-width: 900px) { .od-grid { grid-template-columns: 1fr; gap: 40px; } .od-sec { padding-top: 64px; padding-bottom: 64px; } }
        @media (max-width: 760px) { .sky-panel.od-hero { padding-top: 112px; padding-bottom: 12px; } .od-hero .wrap { padding-inline: 12px; } }
      `}</style>
    </>
  );
}
