import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";
import { KitStyles } from "./mockups/kit";
import CONTENT_MOCKS, { ContentMockStyles, ContentHeroMock } from "./mockups/content";
import STRATEGY_MOCKS, { StrategyMockStyles, StrategyHeroMock } from "./mockups/strategy";
import RESEARCH_MOCKS, { ResearchMockStyles, ResearchHeroMock } from "./mockups/research";
import BACKLINK_MOCKS, { BacklinkMockStyles, BacklinkHeroMock } from "./mockups/backlink";
import OPTIMIZER_MOCKS, { OptimizerMockStyles, OptimizerHeroMock } from "./mockups/optimizer";
import ANALYZER_MOCKS, { AnalyzerMockStyles, AnalyzerHeroMock } from "./mockups/analyzer";
import AEO_MOCKS, { AeoMockStyles, AeoHeroMock } from "./mockups/aeo";
import AISEARCH_MOCKS, { AiSearchMockStyles, AiSearchHeroMock } from "./mockups/aisearch";
import TECH_MOCKS, { TechnicalSeoMockStyles, TechnicalSeoHeroMock } from "./mockups/technicalseo";
import REDDIT_MOCKS, { RedditMockStyles, RedditHeroMock } from "./mockups/reddit";
import CRO_MOCKS, { CroMockStyles, CroHeroMock } from "./mockups/cro";
import AD_MOCKS, { AdLandingMockStyles, AdsHeroMock, BuildMock } from "./mockups/adlanding";
import { IntentMock, SegmentMock, WidgetMock, HyperMockStyles } from "./mockups/personalize";

/** Hero-media registry: the overview product screen shown beside the hero copy. */
const HERO = {
  "content-agent": ContentHeroMock,
  "strategy-agent": StrategyHeroMock,
  "research-agent": ResearchHeroMock,
  "backlink-agent": BacklinkHeroMock,
  "optimizer-agent": OptimizerHeroMock,
  "analyzer-agent": AnalyzerHeroMock,
  "answer-engine-optimization": AeoHeroMock,
  "ai-seo": AiSearchHeroMock,
  "technical-seo": TechnicalSeoHeroMock,
  "reddit-marketing": RedditHeroMock,
  "conversion-rate-optimization": CroHeroMock,
  "ad-to-landing-pages": AdsHeroMock,
};

/** Each agent's styles bundle (base + screens + agent-specific). */
const HERO_STYLES = {
  "content-agent": ContentMockStyles,
  "strategy-agent": StrategyMockStyles,
  "research-agent": ResearchMockStyles,
  "backlink-agent": BacklinkMockStyles,
  "optimizer-agent": OptimizerMockStyles,
  "analyzer-agent": AnalyzerMockStyles,
  "answer-engine-optimization": AeoMockStyles,
  "ai-seo": AiSearchMockStyles,
  "technical-seo": TechnicalSeoMockStyles,
  "reddit-marketing": RedditMockStyles,
  "conversion-rate-optimization": CroMockStyles,
  "ad-to-landing-pages": AdLandingMockStyles,
};

export function hasHeroMedia(slug) {
  return Boolean(HERO[slug]);
}

/** Overview screen + the styles it needs (self-contained, used in the hero). */
export function AgentHeroMedia({ slug }) {
  const Hero = HERO[slug];
  const Styles = HERO_STYLES[slug];
  if (!Hero) return null;
  return (
    <div className="agent-hero-media">
      <Hero />
      <KitStyles />
      {Styles && <Styles />}
    </div>
  );
}

/**
 * Per-feature "zigzag" showcase for an agent detail page: each feature is a row
 * with copy on one side and a high-fidelity product mockup on the other,
 * alternating left/right down the page.
 *
 * Registry maps agent slug → { mocks: [Component per feature], styles: [<style> emitters] }.
 * Agents without an entry return null, so the page falls back to the simpler
 * DetailPage sections until their mockups are built.
 */
const REGISTRY = {
  "content-agent": { mocks: CONTENT_MOCKS, styles: [ContentMockStyles] },
  "strategy-agent": { mocks: STRATEGY_MOCKS, styles: [StrategyMockStyles] },
  "research-agent": { mocks: RESEARCH_MOCKS, styles: [ResearchMockStyles] },
  "backlink-agent": { mocks: BACKLINK_MOCKS, styles: [BacklinkMockStyles] },
  "optimizer-agent": { mocks: OPTIMIZER_MOCKS, styles: [OptimizerMockStyles] },
  "analyzer-agent": { mocks: ANALYZER_MOCKS, styles: [AnalyzerMockStyles] },
  // Services
  "answer-engine-optimization": { mocks: AEO_MOCKS, styles: [AeoMockStyles] },
  "ai-seo": { mocks: AISEARCH_MOCKS, styles: [AiSearchMockStyles] },
  "technical-seo": { mocks: TECH_MOCKS, styles: [TechnicalSeoMockStyles] },
  "reddit-marketing": { mocks: REDDIT_MOCKS, styles: [RedditMockStyles] },
  "conversion-rate-optimization": { mocks: CRO_MOCKS, styles: [CroMockStyles] },
  "ad-to-landing-pages": { mocks: AD_MOCKS, styles: [AdLandingMockStyles] },
  hyperpersonalization: { mocks: [IntentMock, SegmentMock, WidgetMock, BuildMock], styles: [HyperMockStyles] },
};

export function hasShowcase(slug) {
  return Boolean(REGISTRY[slug]);
}

export default function AgentFeatureShowcase({ agent }) {
  const entry = REGISTRY[agent.slug];
  if (!entry) return null;
  const features = agent.features || [];

  return (
    <section className="section-pad afs" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="wrap">
        <Reveal>
          <div className="afs-head">
            <h2 className="h-tight afs-title">How it works</h2>
          </div>
        </Reveal>
        <div className="afs-rows">
          {features.map((f, i) => {
            const Mock = entry.mocks[i];
            return (
              <div className="afs-row" key={f.title}>
                <div className="afs-head-area">
                  <Reveal>
                    <span className="mono afs-num">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="h-tight afs-h">{f.title}</h2>
                  </Reveal>
                </div>
                <div className="afs-mock">
                  {Mock && (
                    <Reveal delay={80}>
                      <Mock />
                    </Reveal>
                  )}
                </div>
                <div className="afs-body-area">
                  <Reveal>
                    <p className="afs-d">{f.body || f.desc}</p>
                    {f.why?.length > 0 && (
                      <div className="afs-why">
                        <span className="afs-why-label">Why it matters</span>
                        <ul className="afs-why-list">
                          {f.why.map((w) => (
                            <li key={w}>
                              <span className="afs-why-check" aria-hidden>
                                ✓
                              </span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {f.cta && (
                      <div className="afs-cta">
                        <BookDemoButton label={f.cta} className="btn btn-primary" />
                      </div>
                    )}
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <KitStyles />
      {entry.styles.map((S, i) => (
        <S key={i} />
      ))}

      <style>{`
        .afs-head { text-align: center; margin-bottom: 8px; }
        .afs-head .eyebrow { display: inline-flex; margin-bottom: 14px; }
        .afs-title { font-size: clamp(30px, 4vw, 46px); letter-spacing: -0.025em; }
        .afs-rows { display: flex; flex-direction: column; gap: 104px; margin-top: 64px; }
        .afs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas: "head mock" "body mock";
          grid-template-rows: auto 1fr;
          column-gap: 56px;
          align-items: start;
        }
        .afs-head-area { grid-area: head; }
        .afs-body-area { grid-area: body; }
        .afs-mock { grid-area: mock; align-self: start; }
        /* Zigzag: even rows flip the mock to the left. */
        .afs-row:nth-child(even) { grid-template-areas: "mock head" "mock body"; }
        .afs-num { font-size: 13px; color: var(--brand-600); letter-spacing: 0.04em; }
        .afs-h { font-size: clamp(26px, 3.2vw, 38px); letter-spacing: -0.025em; margin-top: 14px; }
        .afs-d { font-size: 17px; color: var(--ink-2); line-height: 1.65; margin-top: 18px; max-width: 460px; }
        .afs-why { margin-top: 26px; }
        .afs-why-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--ink-3);
        }
        .afs-why-list { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-direction: column; gap: 13px; }
        .afs-why-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 15.5px; color: var(--ink); line-height: 1.45; }
        .afs-why-check {
          width: 22px; height: 22px; border-radius: 999px; flex-shrink: 0; margin-top: 1px;
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--brand-tint); color: var(--brand-600); font-size: 12px; font-weight: 800;
        }
        .afs-cta { margin-top: 28px; }
        .afs-mock { min-width: 0; }
        @media (max-width: 900px) {
          .afs-rows { gap: 68px; }
          /* Vertical order on mobile: heading → image → subheading/why/CTA. */
          .afs-row,
          .afs-row:nth-child(even) {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            grid-template-areas: "head" "mock" "body";
            row-gap: 22px;
          }
          .afs-mock { margin: 2px 0; }
        }
      `}</style>
    </section>
  );
}
