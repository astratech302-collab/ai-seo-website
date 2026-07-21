import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import {
  ScreensStyles, TrackedPromptsScreen, ShareBarsScreen,
} from "./screens";
import { EngineLogo } from "@/components/brand/EngineLogo";

const B = { // consistent sample brand + competitors (CRM for agencies)
  cited: [
    { q: "best CRM for creative agencies", pos: "#2", brands: ["Acme", "HubSpot", "Pipedrive", "Copper", "Close"], cited: true },
    { q: "HubSpot alternative for small teams", pos: "#4", brands: ["HubSpot", "Acme", "Close"], cited: true },
    { q: "CRM with a built-in client portal", pos: "", brands: ["Copper", "Notion", "Pipedrive"], cited: false },
    { q: "affordable CRM for startups", pos: "#1", brands: ["Acme", "Close", "Copper"], cited: true },
  ],
  gaps: [
    { q: "CRM for agency resource planning", pos: "", brands: ["Float", "Runn", "Mosaic"], cited: false },
    { q: "how to manage retainer clients", pos: "", brands: ["HoneyBook", "Bonsai", "Dubsado"], cited: false },
    { q: "CRM with time tracking built in", pos: "", brands: ["ClickUp", "Copper", "Toggl"], cited: false },
  ],
  targets: [
    { q: "best CRM for creative agencies", pos: "#2", brands: ["Acme", "HubSpot", "Pipedrive"], cited: true },
    { q: "CRM for agency resource planning", pos: "", brands: ["Float", "Runn", "Mosaic"], cited: false },
    { q: "CRM with a built-in client portal", pos: "", brands: ["Copper", "Notion"], cited: false },
  ],
};

export function ResearchHeroMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen badge="24 prompts" rows={B.cited} compact />
      <div className="dash-float" style={{ right: -18, top: 74, width: 210 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Run triggered</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          Active prompts running across all 4 engines in the background.
        </p>
      </div>
    </MockStage>
  );
}

/* 0 — Asks the AIs (Track a prompt modal) */
function AskMock() {
  return (
    <MockStage>
      <div className="dash-card" style={{ maxWidth: 480 }}>
        <TopHead title="Track a prompt" meta="Ask every engine the questions your buyers ask" />
        <div className="dash-pad">
          <span className="dash-eyebrow">Prompt</span>
          <div className="rs-input">which CRM do agencies recommend<span className="rs-caret" /></div>
          <span className="dash-eyebrow" style={{ display: "block", marginTop: 16 }}>Models</span>
          <div className="rs-models">
            {["ChatGPT", "Claude", "Gemini", "Perplexity"].map((n) => (
              <span key={n} className="rs-model">
                <span className="rs-checkbox">✓</span>
                <EngineLogo name={n} size={16} />
                {n}
              </span>
            ))}
          </div>
          <div className="rs-foot"><span className="dash-btn-primary">Add 4 prompts</span></div>
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 190 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ 4 prompts added</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>ChatGPT · Claude · Gemini · Perplexity</p>
      </div>
    </MockStage>
  );
}

/* 1 — Finds where you're invisible (gap rows) */
function GapsMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen title="Coverage gaps" meta="Prompts where AI names rivals — but not you" rows={B.gaps} compact />
      <div className="dash-float" style={{ right: -16, top: 68, width: 176 }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: "#E5533A", letterSpacing: "-.02em" }}>12</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 2 }}>prompts where your brand is invisible</p>
      </div>
    </MockStage>
  );
}

/* 2 — Tracks competitor mentions (share bars) */
function CompetitorsMock() {
  return (
    <MockStage>
      <ShareBarsScreen
        title="Who AI recommends"
        meta="Share of answers across your tracked prompts"
        rows={[
          { name: "HubSpot", hex: "#14ACBC", share: 34, change: 1 },
          { name: "Pipedrive", hex: "#7C5CD1", share: 26, change: 2 },
          { name: "Copper", hex: "#C98A12", share: 19, change: -3 },
          { name: "Acme (you)", hex: "#FB5418", share: 12, change: 5 },
        ]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>▲ climbing</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>+5 pts share vs last week</p>
      </div>
    </MockStage>
  );
}

/* 3 — Hands Strategy the target list */
function TargetsMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Target list"
        meta="The winnable prompts, handed to Strategy"
        rows={B.targets}
        compact
      />
      <div className="dash-float" style={{ right: -14, top: 70, width: 172 }}>
        <Chip tone="amber">5 quick wins</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Near-miss prompts where you rank #2–#4.</p>
      </div>
    </MockStage>
  );
}

const RESEARCH_MOCKS = [AskMock, GapsMock, CompetitorsMock, TargetsMock];
export default RESEARCH_MOCKS;

export function ResearchMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .rs-input { margin-top:9px; border:1px solid var(--d-orange); box-shadow:0 0 0 4px rgba(251,84,24,.14);
          border-radius:10px; padding:11px 13px; font-size:13.5px; font-weight:500; display:flex; align-items:center; }
        .rs-caret { width:1.5px; height:16px; background:var(--d-orange); margin-left:2px; }
        .rs-models { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-top:10px; }
        .rs-model { display:flex; align-items:center; gap:9px; font-size:13px; font-weight:600;
          border:1px solid var(--d-border); border-radius:10px; padding:10px 12px; }
        .rs-checkbox { width:16px; height:16px; border-radius:5px; background:var(--d-orange); color:#fff; font-size:10px;
          display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
        .rs-foot { margin-top:16px; display:flex; justify-content:flex-end; }
      `}</style>
    </>
  );
}
