import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import {
  ScreensStyles, TrackedPromptsScreen, ShareBarsScreen, KpiRow, GeoCheckScreen, TaskQueueScreen,
} from "./screens";

export function AnalyzerHeroMock() {
  return (
    <MockStage>
      <div className="az-scale">
        <KpiRow
          title="Visibility overview"
          meta="Acme · across 4 engines · updated 2m ago"
          cards={[
            { label: "AI visibility", value: "72", suffix: "/100", delta: "9", up: true },
            { label: "Share of voice", value: "21.4", suffix: "%", delta: "3.1", up: true },
            { label: "Citations / wk", value: "348", suffix: "", delta: "42", up: true },
            { label: "Avg rank", value: "#3.2", suffix: "", delta: "0.4", up: true },
          ]}
        />
      </div>
      <div className="dash-float" style={{ right: -16, top: 20, width: 150 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>▲ +3.1 pts</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>share of voice vs last week</p>
      </div>
    </MockStage>
  );
}

/* 0 — Tracks visibility live */
function LiveMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        badge="Live"
        meta="Rankings & mentions across every engine"
        rows={[
          { q: "best CRM for agencies", pos: "#2", brands: ["Acme", "HubSpot", "Pipedrive"], cited: true },
          { q: "HubSpot alternative", pos: "#4", brands: ["HubSpot", "Acme", "Close"], cited: true },
          { q: "CRM with client portal", pos: "", brands: ["Copper", "Notion"], cited: false },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -14, bottom: -14, width: 168 }}>
        <span className="dash-eyebrow">Updated</span>
        <p style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>2 minutes ago</p>
      </div>
    </MockStage>
  );
}

/* 1 — Measures share of voice */
function SovMock() {
  return (
    <MockStage>
      <ShareBarsScreen
        title="Share of voice vs competitors"
        meta="Your slice of AI answers · last 30 days"
        rows={[
          { name: "HubSpot", hex: "#14ACBC", share: 28, change: -1 },
          { name: "Acme (you)", hex: "#FB5418", share: 21, change: 3 },
          { name: "Pipedrive", hex: "#7C5CD1", share: 19, change: 1 },
          { name: "Copper", hex: "#1A9E63", share: 16, change: 0 },
        ]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 178 }}>
        <Chip tone="green">▲ overtook Copper</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>+3 pts share this week</p>
      </div>
    </MockStage>
  );
}

/* 2 — Plain reports */
function ReportMock() {
  return (
    <MockStage>
      <div className="dash-card" style={{ maxWidth: 500 }}>
        <TopHead title="Weekly report" meta="Auto-generated · Jul 10 – Jul 17" right={<span className="dash-btn-primary">Export PDF</span>} />
        <div className="dash-pad">
          <div className="az-summary">
            <span className="az-bot">◍</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Visibility up 9 points this week</div>
              <p style={{ fontSize: 13, color: "var(--d-text2)", lineHeight: 1.55, marginTop: 6 }}>
                Your brand is cited in roughly 1 in 5 relevant answers — solid, with clear room to grow.
              </p>
            </div>
          </div>
          {["Won 42 new citations, led by ChatGPT", "Share of voice overtook Copper", "3 pages still missing FAQ schema"].map((t) => (
            <div className="az-bullet" key={t}><span className="dash-check">✓</span>{t}</div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ left: -14, bottom: -16, width: 186 }}>
        <span className="dash-eyebrow">Delivered</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>To Slack #growth · Mondays 9am</p>
      </div>
    </MockStage>
  );
}

/* 3 — Feeds the next sprint */
function HandoffMock() {
  return (
    <MockStage>
      <TaskQueueScreen
        title="Recommendations"
        meta="Analyzer findings queued for the next Strategy sprint"
        rows={[
          { tag: "SCHEMA", tone: "orange", title: "Add FAQ schema to 6 pages", desc: "Projected +40 citations/wk across ChatGPT & Perplexity", approved: true },
          { tag: "CONTENT", tone: "cyan", title: "Publish “Acme vs HubSpot” comparison", desc: "Closes a gap where competitors win 3 of 4 answers" },
          { tag: "KEYWORDS", tone: "violet", title: "Target 12 mid-intent prompts", desc: "Competitors rank; low difficulty" },
        ]}
        right={<span className="dash-btn-primary">Approve all</span>}
      />
      <div className="dash-float" style={{ right: -14, top: 74, width: 176 }}>
        <span className="dash-eyebrow" style={{ color: "#CF400E" }}>→ Strategy sprint</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 7 }}>3 approved · est. +18 visibility pts</p>
      </div>
    </MockStage>
  );
}

const ANALYZER_MOCKS = [LiveMock, SovMock, ReportMock, HandoffMock];
export default ANALYZER_MOCKS;

export function AnalyzerMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .az-scale { max-width:520px; }
        .az-stack { display:flex; flex-direction:column; gap:12px; max-width:520px; }
        .az-summary { display:flex; gap:12px; align-items:flex-start; margin-bottom:14px; }
        .az-bot { width:34px; height:34px; border-radius:10px; flex-shrink:0; display:inline-flex; align-items:center;
          justify-content:center; background:var(--d-orangeSoft); color:var(--d-orangeText); font-size:18px; }
        .az-bullet { display:flex; align-items:center; gap:9px; font-size:13.5px; color:var(--d-text); padding:6px 0; }
      `}</style>
    </>
  );
}
