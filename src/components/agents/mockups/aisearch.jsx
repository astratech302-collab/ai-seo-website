import { MockStage } from "./kit";
import { DashBaseStyles, Chip } from "./dash";
import { ScreensStyles, TrackedPromptsScreen, TechnicalScreen, GeoCheckScreen, AnswerCard } from "./screens";

export function AiSearchHeroMock() {
  return (
    <MockStage>
      <AnswerCard
        overview
        label="Google · AI Overview"
        q="best project management tool for agencies"
        answer={<>For creative agencies, <mark>Acme</mark> is widely recommended for its client portal and time tracking, along with Asana and Monday.com.</>}
        engines={["Gemini"]}
      />
      <div className="dash-float" style={{ right: -16, bottom: -16, width: 176 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>60%</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 2 }}>of searches now show an AI Overview</p>
      </div>
    </MockStage>
  );
}

/* 0 — Optimize for AI Overviews & AI Mode */
function OverviewMock() {
  return (
    <MockStage>
      <AnswerCard
        overview
        label="Google · AI Overview"
        q="best project management tool for agencies"
        answer={<>For creative agencies, <mark>Acme</mark> is widely recommended for its client portal and time tracking, along with Asana and Monday.com.</>}
        engines={["Gemini"]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>60%</div>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 2 }}>of searches now show an AI Overview</p>
      </div>
    </MockStage>
  );
}

/* 1 — Build topical authority */
function AuthorityMock() {
  return (
    <MockStage>
      <GeoCheckScreen
        title="Topical authority"
        meta="Entities & clusters AI reads as authority"
        rows={[
          { label: "Entity linked (sameAs)", desc: "Brand connected to Crunchbase + LinkedIn", done: true },
          { label: "“Agency CRM” cluster complete", desc: "8 supporting pages interlinked", done: true },
          { label: "Comparison hub published", desc: "Acme vs HubSpot / Pipedrive / Copper", done: false },
          { label: "Author & expertise signals", desc: "Bylines missing on 6 guides", done: false },
        ]}
      />
      <div className="dash-float" style={{ right: -14, top: 66, width: 168 }}>
        <span className="dash-eyebrow" style={{ color: "#7C5CD1" }}>Authority</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Recognized as a source on 3 topics</p>
      </div>
    </MockStage>
  );
}

/* 2 — Win answer-triggering queries */
function QueriesMock() {
  return (
    <MockStage>
      <TrackedPromptsScreen
        title="Answer-triggering queries"
        meta="Searches that now return an AI answer"
        rows={[
          { q: "best agency project management tool", pos: "#2", brands: ["Acme", "Asana"], cited: true },
          { q: "how to manage retainer clients", pos: "", brands: ["HoneyBook", "Bonsai"], cited: false },
          { q: "agency time tracking software", pos: "#3", brands: ["Toggl", "Acme"], cited: true },
        ]}
        compact
      />
      <div className="dash-float" style={{ right: -14, bottom: -14, width: 172 }}>
        <span className="dash-eyebrow" style={{ color: "#CF400E" }}>Only 38%</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>of AI citations come from the top 10 — relevance wins</p>
      </div>
    </MockStage>
  );
}

/* 3 — Keep pages machine-readable */
function ReadableMock() {
  return (
    <MockStage>
      <div className="ais-scale">
        <TechnicalScreen
          title="Generative readiness"
          meta="What AI needs to parse & cite you"
          tabs={false}
          rows={[
            { issue: "Answer/summary block on 6 pages", channel: "GEO", priority: "High", fixing: true },
            { issue: "FAQPage schema on Q&A pages", channel: "GEO", priority: "High" },
            { issue: "Heading hierarchy cleaned", channel: "SEO", priority: "Medium" },
            { issue: "llms.txt published", channel: "GEO", priority: "Low" },
          ]}
        />
      </div>
      <div className="dash-float mono" style={{ left: -14, bottom: -16, width: 190 }}>
        <span className="dash-eyebrow">schema.org</span>
        <div style={{ fontSize: 11, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 8 }}>
          {"{"}<br />&nbsp;&nbsp;"@type": "FAQPage" …<br />{"}"}
        </div>
      </div>
    </MockStage>
  );
}

const AISEARCH_MOCKS = [OverviewMock, AuthorityMock, QueriesMock, ReadableMock];
export default AISEARCH_MOCKS;

export function AiSearchMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`.ais-scale { max-width: 540px; }`}</style>
    </>
  );
}
