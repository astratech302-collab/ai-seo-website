import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import {
  ScreensStyles, TaskQueueScreen, TrackedPromptsScreen, TechnicalScreen,
} from "./screens";

const PLAN = [
  { n: "3 blog posts", s: "Answer-first, week 1", tone: "cyan", pr: ["High", "orange"] },
  { n: "10 landing pages", s: "High-intent prompts, weeks 1–4", tone: "violet", pr: ["High", "orange"] },
  { n: "Backlinks", s: "8 placements on trusted sources", tone: "green", pr: ["High", "orange"] },
  { n: "Reddit marketing", s: "5 community threads / month", tone: "amber", pr: ["Medium", "amber"] },
];

export function StrategyHeroMock() {
  return (
    <MockStage>
      <div className="dash-card st-scale">
        <TopHead title="Strategy plan" meta="Acme · the 30-day game plan" right={<Chip tone="green">● Deciding</Chip>} />
        <div className="st-plan">
          <span className="dash-eyebrow" style={{ display: "block", marginBottom: 4 }}>Recommended plan</span>
          {PLAN.map((p) => (
            <div className="st-plan-row" key={p.n}>
              <span className={`st-plan-ic st-ic-${p.tone}`} />
              <div className="st-plan-t">
                <b>{p.n}</b>
                <span>{p.s}</span>
              </div>
              <Chip tone={p.pr[1]}>{p.pr[0]}</Chip>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, top: 16, width: 158 }}>
        <Chip tone="green">● Agent active</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Sequenced from your market &amp; competitors</p>
      </div>
    </MockStage>
  );
}

/* 0 — Learns your business (Brand profile) */
const CHIPS = ["Agency owners", "Account managers", "Freelance studios"];
const DIFF = ["Client portals", "Time tracking", "Proposals"];
function BrandMock() {
  return (
    <MockStage>
      <div className="dash-card" style={{ maxWidth: 480 }}>
        <TopHead title="Brand" meta="The details we use to optimize Acme" right={<span className="dash-btn-primary">Save</span>} />
        <div className="dash-pad">
          <span className="dash-eyebrow">Business name</span>
          <div className="st-field">Acme</div>
          <span className="dash-eyebrow" style={{ display: "block", marginTop: 13 }}>One-line description</span>
          <div className="st-field">A CRM built for creative &amp; marketing agencies.</div>
          <span className="dash-eyebrow" style={{ display: "block", marginTop: 13 }}>Target audience</span>
          <div className="st-chips">{CHIPS.map((c) => <span className="st-tag" key={c}>{c}</span>)}</div>
          <span className="dash-eyebrow" style={{ display: "block", marginTop: 13 }}>Key differentiators</span>
          <div className="st-chips">{DIFF.map((c) => <span className="st-tag" key={c}>{c}</span>)}</div>
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 194 }}>
        <span className="dash-eyebrow">◍ Agent</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 7 }}>
          The more you tell me here, the sharper every recommendation gets.
        </p>
      </div>
    </MockStage>
  );
}

/* 1 — Studies the competition */
function CompeteMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Competitor intel"
        meta="Who AI names in your category — and where"
        rows={[
          { q: "best CRM for creative agencies", pos: "#3", brands: ["HubSpot", "Copper", "Pipedrive", "Acme"], cited: true },
          { q: "agency CRM with client portals", pos: "", brands: ["HubSpot", "Pipedrive", "Close"], cited: false },
          { q: "HubSpot alternative for studios", pos: "#2", brands: ["HubSpot", "Acme", "Close"], cited: true },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -16, top: 66, width: 178 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#CF400E", letterSpacing: "-.02em" }}>62%</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 4 }}>of answers name a rival, not you — 12 prompts to close</p>
      </div>
    </MockStage>
  );
}

/* 2 — Builds the game plan */
function PlanMock() {
  return (
    <MockStage>
      <TaskQueueScreen
        title="The game plan"
        meta="Prioritized, in the order that wins fastest"
        rows={[
          { tag: "CONTENT", tone: "orange", title: "Publish “Best CRM for agencies (2026)”", desc: "3 competitors rank for this; you don't" },
          { tag: "TECHNICAL", tone: "cyan", title: "Add FAQ schema to /pricing", desc: "Unlocks rich results + AI extraction" },
          { tag: "PROMPT", tone: "violet", title: "Track 5 new competitor prompts", desc: "Gemini surfaces rivals here" },
        ]}
      />
      <div className="dash-float" style={{ right: -14, top: 72, width: 168 }}>
        <Chip tone="orange">Agent proposed</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Ranked by opportunity × effort</p>
      </div>
    </MockStage>
  );
}

/* 3 — Watches results & adapts */
function AdaptMock() {
  return (
    <MockStage>
      <div className="st-scale">
        <TechnicalScreen
          title="Results & fixes"
          meta="Continuously audited — and auto-corrected"
          tabs={false}
          rows={[
            { issue: "Missing FAQ schema on /pricing", channel: "GEO", priority: "High" },
            { issue: "Duplicate meta descriptions (8 pages)", channel: "SEO", priority: "Medium" },
            { issue: "No summary block on 6 blog posts", channel: "GEO", priority: "Medium", fixing: true },
            { issue: "Missing sameAs entity links", channel: "GEO", priority: "Low" },
          ]}
        />
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -14, width: 184 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Auto-fixed</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>3 issues fixed since last crawl — no action needed.</p>
      </div>
    </MockStage>
  );
}

const STRATEGY_MOCKS = [BrandMock, CompeteMock, PlanMock, AdaptMock];
export default STRATEGY_MOCKS;

export function StrategyMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .st-stack { display:flex; flex-direction:column; gap:12px; max-width:520px; }
        .st-scale { max-width:520px; }
        .st-plan { padding:14px 16px; }
        .st-plan-row { display:flex; align-items:center; gap:12px; padding:11px 0; border-top:1px solid var(--d-border); }
        .st-plan-row:first-of-type { border-top:none; }
        .st-plan-ic { width:10px; height:10px; border-radius:3px; flex-shrink:0; }
        .st-ic-cyan { background:var(--d-cyan); } .st-ic-violet { background:var(--d-violet); }
        .st-ic-green { background:var(--d-green); } .st-ic-amber { background:var(--d-amber); }
        .st-plan-t { flex:1; display:flex; flex-direction:column; }
        .st-plan-t b { font-size:14px; font-weight:700; letter-spacing:-.01em; }
        .st-plan-t span { font-size:12px; color:var(--d-text2); margin-top:2px; }
        .st-field { margin-top:8px; border:1px solid var(--d-border); background:var(--d-surface2);
          border-radius:10px; padding:11px 13px; font-size:13.5px; color:var(--d-text); }
        .st-chips { display:flex; gap:7px; flex-wrap:wrap; margin-top:9px; }
        .st-tag { font-size:12px; font-weight:600; color:var(--d-text2); background:var(--d-surface3);
          border-radius:999px; padding:5px 11px; }
      `}</style>
    </>
  );
}
