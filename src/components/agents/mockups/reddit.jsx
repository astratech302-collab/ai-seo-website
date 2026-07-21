import { MockStage } from "./kit";
import { DashBaseStyles, Chip } from "./dash";
import { ScreensStyles, RedditThreads, ShareBarsScreen, AnswerCard } from "./screens";

export function RedditHeroMock() {
  return (
    <MockStage>
      <RedditThreads
        title="Community threads"
        meta="Where AI reads opinions in your category"
        rows={[
          { up: "2.4k", sub: "agency", title: "What CRM does your agency actually use?", cited: true },
          { up: "890", sub: "SaaS", title: "Best CRM with a built-in client portal?", cited: true },
          { up: "1.2k", sub: "marketing", title: "HubSpot alternatives for small teams", cited: false },
        ]}
      />
      <div className="dash-float" style={{ right: -14, top: 66, width: 168 }}>
        <span className="dash-eyebrow" style={{ color: "#FF4500" }}>Reddit</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>The #1 source AI cites in your category</p>
      </div>
    </MockStage>
  );
}

/* 0 — Find the threads AI cites */
function FindMock() {
  return (
    <MockStage>
      <RedditThreads
        title="Community threads"
        meta="Where AI reads opinions in your category"
        rows={[
          { up: "2.4k", sub: "agency", title: "What CRM does your agency actually use?", cited: true },
          { up: "890", sub: "SaaS", title: "Best CRM with a built-in client portal?", cited: true },
          { up: "1.2k", sub: "marketing", title: "HubSpot alternatives for small teams", cited: false },
        ]}
      />
      <div className="dash-float" style={{ right: -14, top: 66, width: 168 }}>
        <span className="dash-eyebrow" style={{ color: "#FF4500" }}>Reddit</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>The #1 source AI cites in your category</p>
      </div>
    </MockStage>
  );
}

/* 1 — Earn genuine mentions */
function MentionMock() {
  return (
    <MockStage>
      <RedditThreads
        title="Earned mentions"
        meta="Authentic, on-topic — never spam"
        rows={[
          { up: "2.4k", sub: "agency", title: "What CRM does your agency actually use?", cited: true },
          { up: "612", sub: "smallbusiness", title: "Tools that saved your team hours?", cited: true },
          { up: "430", sub: "freelance", title: "Client portal recommendations?", cited: false },
        ]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 186 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Your mention</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Top comment · +340 upvotes, on-topic</p>
      </div>
    </MockStage>
  );
}

/* 2 — Shape the narrative */
function NarrativeMock() {
  return (
    <MockStage>
      <ShareBarsScreen
        title="Share of the conversation"
        meta="Who the community recommends"
        rows={[
          { name: "Acme (you)", hex: "#FB5418", share: 32, change: 9 },
          { name: "HubSpot", hex: "#14ACBC", share: 28, change: -3 },
          { name: "Pipedrive", hex: "#7C5CD1", share: 22, change: 1 },
          { name: "Copper", hex: "#1A9E63", share: 18, change: -1 },
        ]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <Chip tone="green">▲ now #1</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>+9 pts of mentions this quarter</p>
      </div>
    </MockStage>
  );
}

/* 3 — Turn mentions into citations */
function CitationMock() {
  return (
    <MockStage>
      <AnswerCard
        engine="Perplexity"
        label="Perplexity"
        q="“What CRM do creative agencies recommend?”"
        answer={<>Agencies on Reddit frequently recommend <mark>Acme</mark> for its client portal — a popular r/agency thread calls it the best fit for small teams.</>}
        engines={["Perplexity", "ChatGPT"]}
      />
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 184 }}>
        <span className="dash-eyebrow" style={{ color: "#FF4500" }}>Reddit → AI</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Your thread is now the cited source.</p>
      </div>
    </MockStage>
  );
}

const REDDIT_MOCKS = [FindMock, MentionMock, NarrativeMock, CitationMock];
export default REDDIT_MOCKS;

export function RedditMockStyles() {
  return (<><DashBaseStyles /><ScreensStyles /></>);
}
