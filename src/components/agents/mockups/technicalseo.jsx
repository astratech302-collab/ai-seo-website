import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import { ScreensStyles, TechnicalScreen, GeoCheckScreen, KpiRow } from "./screens";

export function TechnicalSeoHeroMock() {
  return (
    <MockStage>
      <div className="ts-scale">
        <TechnicalScreen
          title="Technical SEO / GEO"
          meta="Last crawl 6m ago"
          rows={[
            { issue: "Missing Organization schema (JSON-LD)", channel: "GEO", priority: "High" },
            { issue: "14 pages missing a canonical tag", channel: "SEO", priority: "High" },
            { issue: "FAQ blocks lack FAQPage schema", channel: "GEO", priority: "Medium", fixing: true },
            { issue: "Meta description exceeds 160 chars", channel: "SEO", priority: "Low" },
          ]}
        />
      </div>
      <div className="dash-float" style={{ right: -16, top: 60, width: 200 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Copied for AI agents</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          Every issue as Markdown — paste into Claude Code to fix at once.
        </p>
      </div>
    </MockStage>
  );
}

/* 0 — Schema & structured data */
function SchemaMock() {
  return (
    <MockStage>
      <div className="ts-scale">
        <TechnicalScreen
          title="Structured data"
          meta="Markup AI can parse, attribute & quote"
          tabs={false}
          rows={[
            { issue: "Organization schema (JSON-LD)", channel: "GEO", priority: "High", fixing: true },
            { issue: "FAQPage schema on 4 pages", channel: "GEO", priority: "High" },
            { issue: "Product markup incomplete", channel: "SEO", priority: "Medium" },
            { issue: "Breadcrumb schema missing", channel: "SEO", priority: "Low" },
          ]}
        />
      </div>
      <div className="dash-float mono" style={{ right: -14, bottom: -16, width: 200 }}>
        <span className="dash-eyebrow">JSON-LD</span>
        <div style={{ fontSize: 11, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          {"{"}<br />&nbsp;&nbsp;"@type": "Organization",<br />&nbsp;&nbsp;"name": "Acme" …<br />{"}"}
        </div>
      </div>
    </MockStage>
  );
}

/* 1 — Crawl & render hygiene */
function CrawlMock() {
  return (
    <MockStage>
      <GeoCheckScreen
        title="Crawl & indexing"
        meta="Can bots reach and read every page?"
        rows={[
          { label: "Sitemap discoverable", desc: "/sitemap.xml · 212 URLs indexed", done: true },
          { label: "robots.txt allows AI bots", desc: "GPTBot, ClaudeBot, PerplexityBot", done: true },
          { label: "14 pages missing canonical", desc: "Duplicate signals confuse crawlers", done: false },
          { label: "JS-rendered content", desc: "3 pages need pre-render for bots", done: false },
        ]}
      />
      <div className="dash-float" style={{ right: -14, top: 66, width: 168 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Crawlable</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>206 of 212 pages fully readable</p>
      </div>
    </MockStage>
  );
}

/* 2 — Speed & Core Web Vitals */
function SpeedMock() {
  return (
    <MockStage>
      <div className="ts-scale">
        <KpiRow
          title="Core Web Vitals"
          meta="Fast for users, favored by rankings"
          cards={[
            { label: "LCP", value: "1.2", suffix: "s", delta: "0.6s", up: true },
            { label: "INP", value: "180", suffix: "ms", delta: "90ms", up: true },
            { label: "CLS", value: "0.02", suffix: "", delta: "good", up: true },
            { label: "Perf score", value: "96", suffix: "/100", delta: "12", up: true },
          ]}
        />
      </div>
      <div className="dash-float" style={{ right: -16, bottom: -16, width: 200 }}>
        <span className="dash-eyebrow" style={{ color: "#CF400E" }}>Only 33%</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 6 }}>
          of sites pass all Core Web Vitals — yours does.
        </p>
      </div>
    </MockStage>
  );
}

/* 3 — Internal links & structure */
const LINKS = [
  { from: "Homepage", to: "/best-crm-for-agencies", anchor: "best CRM for agencies" },
  { from: "Blog: retainers", to: "/features/client-portal", anchor: "client portal" },
  { from: "/pricing", to: "/compare/hubspot", anchor: "Acme vs HubSpot" },
];
function LinksMock() {
  return (
    <MockStage>
      <div className="dash-card ts-scale">
        <TopHead title="Internal links" meta="Authority flowing to your key pages" />
        <div className="ts-links">
          {LINKS.map((l) => (
            <div className="ts-link" key={l.to}>
              <span className="ts-link-from">{l.from}</span>
              <span className="ts-link-arrow">→</span>
              <div className="ts-link-b">
                <span className="ts-link-anchor">“{l.anchor}”</span>
                <span className="ts-link-to mono">{l.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -14, width: 176 }}>
        <Chip tone="green">+3 hubs linked</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Equity pushed to your money pages</p>
      </div>
    </MockStage>
  );
}

const TECH_MOCKS = [SchemaMock, CrawlMock, SpeedMock, LinksMock];
export default TECH_MOCKS;

export function TechnicalSeoMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .ts-scale { max-width: 540px; }
        .ts-links { padding:6px 16px 14px; }
        .ts-link { display:flex; align-items:center; gap:10px; padding:11px 0; border-top:1px solid var(--d-border); }
        .ts-link:first-child { border-top:none; }
        .ts-link-from { font-size:12.5px; font-weight:600; color:var(--d-text2); width:120px; flex-shrink:0; }
        .ts-link-arrow { color:var(--d-orange); font-size:13px; }
        .ts-link-b { display:flex; flex-direction:column; min-width:0; }
        .ts-link-anchor { font-size:13px; font-weight:600; color:var(--d-orangeText); }
        .ts-link-to { font-size:11px; color:var(--d-text3); margin-top:1px; }
      `}</style>
    </>
  );
}
