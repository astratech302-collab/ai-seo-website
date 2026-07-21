import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import {
  ScreensStyles, TechnicalScreen, TrackedPromptsScreen, KpiRow, GeoCheckScreen,
} from "./screens";

const ISSUES = [
  { issue: "Missing Organization schema (JSON-LD)", channel: "GEO", priority: "High" },
  { issue: "14 pages missing a canonical tag", channel: "SEO", priority: "High" },
  { issue: "FAQ blocks lack FAQPage schema", channel: "GEO", priority: "Medium", fixing: true },
  { issue: "Meta description exceeds 160 chars", channel: "SEO", priority: "Low" },
];

export function OptimizerHeroMock() {
  return (
    <MockStage>
      <div className="op-scale"><TechnicalScreen rows={ISSUES} /></div>
      <div className="dash-float" style={{ right: -18, top: 60, width: 208 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Copied for AI agents</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          Every open issue as Markdown — paste into Claude Code to fix at once.
        </p>
      </div>
    </MockStage>
  );
}

/* 0 — Keeps constant watch */
function WatchMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Live monitor"
        meta="Rank & citations re-checked automatically"
        rows={[
          { q: "best CRM for agencies", pos: "#2", brands: ["Acme", "HubSpot"], cited: true },
          { q: "CRM with client portal", pos: "#5", brands: ["Copper", "Acme"], cited: true },
          { q: "affordable CRM for startups", pos: "#1", brands: ["Acme", "Close"], cited: true },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -14, bottom: -14, width: 172 }}>
        <span className="dash-eyebrow">Last check</span>
        <p style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>12 minutes ago</p>
      </div>
    </MockStage>
  );
}

/* 1 — Catches slipping content */
function SlippingMock() {
  return (
    <MockStage>
      <KpiRow cards={[
        { label: "AI citation share", value: "18", suffix: "%", delta: "4.2%", up: false },
        { label: "Avg brand position", value: "4.6", suffix: "", delta: "0.8", up: false },
        { label: "Prompts cited", value: "9", suffix: "/24", delta: "3", up: false },
        { label: "Pages indexed", value: "212", suffix: "", delta: "6", up: true },
      ]} />
      <div className="dash-float" style={{ right: -16, bottom: -18, width: 210 }}>
        <span className="dash-eyebrow" style={{ color: "#CF400E" }}>↓ Slipping</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 7 }}>
          3 pages lost citations this week — Optimizer queued a refresh.
        </p>
      </div>
    </MockStage>
  );
}

/* 2 — Rewrites & refreshes */
const PIPE = [
  { t: "Refresh: CFO Services — add answer block + FAQ schema", type: "Landing Page", tone: "violet", s: "Approved", sTone: "green" },
  { t: "Rewrite: “Best CRM for agencies” — thin sections", type: "Guide", tone: "green", s: "Generating", sTone: "cyan" },
  { t: "AI Tax Prep vs Traditional — comparison", type: "Comparison", tone: "amber", s: "Draft", sTone: "neutral" },
];
function RefreshMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Content" meta="Weak pages, rewritten and re-shipped" />
        <div className="dash-table" style={{ paddingTop: 4 }}>
          <div className="dash-tr dash-th op-pipe-row"><span>Page</span><span>Type</span><span>Status</span></div>
          {PIPE.map((r) => (
            <div className="dash-tr op-pipe-row" key={r.t}>
              <span className="dash-td-title">{r.t}</span>
              <span><Chip tone={r.tone}>{r.type}</Chip></span>
              <span><Chip tone={r.sTone}>{r.s}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 180 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>▲ Recovering</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Refreshed pages climbing back into answers.</p>
      </div>
    </MockStage>
  );
}

/* 3 — Keeps pages machine-readable */
function SchemaMock() {
  return (
    <MockStage>
      <GeoCheckScreen
        title="GEO readiness"
        meta="Structure & schema AI engines can parse"
        rows={[
          { label: "Organization schema present", desc: "Valid JSON-LD detected sitewide", done: true },
          { label: "Sitemap discoverable", desc: "/sitemap.xml reachable · 212 URLs", done: true },
          { label: "FAQPage schema on Q&A pages", desc: "4 pages have FAQs but no markup", done: false },
          { label: "llms.txt published", desc: "No llms.txt at site root", done: false },
        ]}
      />
      <div className="dash-float mono" style={{ left: -14, bottom: -18, width: 196 }}>
        <span className="dash-eyebrow">schema.org</span>
        <div style={{ fontSize: 11, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          {"{"}<br />&nbsp;&nbsp;"@type": "FAQPage",<br />&nbsp;&nbsp;"mainEntity": […]<br />{"}"}
        </div>
      </div>
    </MockStage>
  );
}

const OPTIMIZER_MOCKS = [WatchMock, SlippingMock, RefreshMock, SchemaMock];
export default OPTIMIZER_MOCKS;

export function OptimizerMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .op-scale { max-width: 560px; }
        .op-pipe-row { grid-template-columns: 2.3fr 0.9fr 0.8fr; }
      `}</style>
    </>
  );
}
