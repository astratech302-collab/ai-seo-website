import { MockStage } from "./kit";
import { DashBaseStyles, Chip } from "./dash";
import { ScreensStyles, TrackedPromptsScreen, ShareBarsScreen, AnswerCard } from "./screens";

export function AeoHeroMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="AI visibility"
        meta="Where your brand shows up in AI answers"
        badge="24 prompts"
        rows={[
          { q: "best CRM for creative agencies", pos: "#2", brands: ["Acme", "HubSpot", "Pipedrive"], cited: true },
          { q: "affordable HubSpot alternative", pos: "#4", brands: ["HubSpot", "Acme", "Close"], cited: true },
          { q: "CRM with a built-in client portal", pos: "", brands: ["Copper", "Notion"], cited: false },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -16, top: 70, width: 176 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#1A9E63", letterSpacing: "-.02em" }}>+14</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 2 }}>new AI citations this month</p>
      </div>
    </MockStage>
  );
}

/* 0 — Map the prompts that matter */
function MapMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Prompt map"
        meta="The high-intent questions worth winning"
        badge="42 prompts"
        rows={[
          { q: "best CRM for creative agencies", pos: "#2", brands: ["Acme", "HubSpot", "Pipedrive"], cited: true },
          { q: "CRM with a built-in client portal", pos: "", brands: ["Copper", "Notion"], cited: false },
          { q: "affordable HubSpot alternative", pos: "#4", brands: ["HubSpot", "Acme", "Close"], cited: true },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -14, top: 70, width: 168 }}>
        <Chip tone="amber">18 to win</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>High-intent prompts, ranked by opportunity</p>
      </div>
    </MockStage>
  );
}

/* 1 — Build answer-first content */
function AnswerFirstMock() {
  return (
    <MockStage>
      <AnswerCard
        engine="ChatGPT"
        label="ChatGPT"
        q="“Which CRM is best for a small creative agency?”"
        answer={<>A few tools stand out. Many teams recommend <mark>Acme</mark> for its built-in client portal and simple setup, alongside HubSpot and Pipedrive.</>}
        engines={["ChatGPT", "Perplexity"]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 182 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Answer-first</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Structured so the model lifts you as the source.</p>
      </div>
    </MockStage>
  );
}

/* 2 — Earn the citation */
function CitationMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Citations"
        meta="Where your brand is named across engines"
        rows={[
          { q: "best CRM for creative agencies", pos: "#2", brands: ["Acme", "HubSpot"], cited: true },
          { q: "affordable HubSpot alternative", pos: "#4", brands: ["HubSpot", "Acme"], cited: true },
          { q: "CRM with client portal", pos: "#3", brands: ["Copper", "Acme"], cited: true },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -14, top: 68, width: 160 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#1A9E63", letterSpacing: "-.02em" }}>+14</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 2 }}>new citations this month</p>
      </div>
    </MockStage>
  );
}

/* 3 — Track share of voice */
function SovMock() {
  return (
    <MockStage>
      <ShareBarsScreen
        title="Share of voice"
        meta="How often AI recommends you vs. rivals"
        rows={[
          { name: "HubSpot", hex: "#14ACBC", share: 30, change: -2 },
          { name: "Acme (you)", hex: "#FB5418", share: 24, change: 5 },
          { name: "Pipedrive", hex: "#7C5CD1", share: 21, change: 1 },
          { name: "Copper", hex: "#1A9E63", share: 15, change: 0 },
        ]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 172 }}>
        <Chip tone="green">▲ climbing</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>+5 pts vs last month</p>
      </div>
    </MockStage>
  );
}

const AEO_MOCKS = [MapMock, AnswerFirstMock, CitationMock, SovMock];
export default AEO_MOCKS;

export function AeoMockStyles() {
  return (<><DashBaseStyles /><ScreensStyles /></>);
}
