import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip, TabNav, StatCard, Bars } from "./dash";
import { StorePage } from "@/components/cro/AdCreatives";
import { DEMO_IMG } from "@/data/demoAssets";

/**
 * CRO (e-commerce) feature mockups, composed from the shared dash kit so they
 * match the other service pages. Store/product data is fictional.
 */

/* Sessions table used by the hero + feature 1 */
function SessionsTable({ rows }) {
  return (
    <div className="dash-table">
      <div className="dash-tr dash-th cm-row cm-row-4">
        <span>Session</span><span>Device</span><span>Time on page</span><span>Signal</span>
      </div>
      {rows.map((r) => (
        <div className="dash-tr cm-row cm-row-4" key={r.id}>
          <span className="dash-td-title">{r.id}</span>
          <span className="dash-td-muted">{r.device}</span>
          <span className="dash-td-muted">{r.time}</span>
          <span><Chip tone={r.tone}>{r.signal}</Chip></span>
        </div>
      ))}
    </div>
  );
}

const SESSIONS = [
  { id: "Session #4821", device: "Mobile", time: "0:42", signal: "Rage clicks", tone: "orange" },
  { id: "Session #4822", device: "Desktop", time: "1:58", signal: "Left at shipping", tone: "amber" },
  { id: "Session #4823", device: "Mobile", time: "0:19", signal: "Never saw reviews", tone: "neutral" },
  { id: "Session #4824", device: "Desktop", time: "2:36", signal: "Added to cart", tone: "green" },
];

/* Session replay: real product page with a heatmap, cursor path and rage-click rings. */
function Replay({ compact }) {
  return (
    <div className="dash-card">
      <TopHead title="Session replay" meta="Mobile · 0:42 · Glow Serum" right={<Chip tone="orange">● Rage clicks</Chip>} />
      <div className="cm-replay">
        <StorePage
          image={DEMO_IMG.product}
          headline="Glow Serum, 30 ml"
          sub="Vitamin C serum for a brighter look."
          chips={["30 ml", "50 ml"]}
          price="$34"
          compact
        >
          <span className="cm-heat" style={{ left: "58%", top: "62%", width: 120, height: 120 }} />
          <span className="cm-heat" style={{ left: "12%", top: "30%", width: 90, height: 90, opacity: 0.5 }} />
          <svg className="cm-trace" viewBox="0 0 300 380" preserveAspectRatio="none" aria-hidden>
            <path d="M30 60 C 90 40, 120 150, 170 190 S 250 230, 232 296" fill="none" stroke="#FB5418" strokeWidth="2.2" strokeDasharray="5 5" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx="232" cy="296" r={7 + i * 8} fill="none" stroke="#FB5418" strokeWidth="1.6" opacity={0.85 - i * 0.28} />
            ))}
            <circle cx="232" cy="296" r="4" fill="#FB5418" />
            <path d="M232 300l0 16 5-4 4 9 4-2-4-9 7 0z" fill="#111" stroke="#fff" strokeWidth="1" />
          </svg>
        </StorePage>
      </div>
      {!compact && (
        <div className="cm-timeline">
          <span className="cm-timeline-fill" />
          <span className="cm-mark" style={{ left: "34%" }} />
          <span className="cm-mark" style={{ left: "62%" }} />
        </div>
      )}
    </div>
  );
}

export function CroHeroMock() {
  return (
    <MockStage>
      <Replay />
      <div className="dash-float" style={{ right: -16, top: 70, width: 184 }}>
        <Chip tone="orange">Pain point found</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Shoppers tap the size options again and again, then leave.</p>
      </div>
    </MockStage>
  );
}

/* 0 — Watch session recordings */
function RecordingsMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Session recordings" meta="Product page · Glow Serum" right={<Chip tone="orange">● Recording</Chip>} />
        <TabNav tabs={[{ label: "All", count: 128 }, { label: "Rage clicks", count: 14 }, { label: "Drop-offs", count: 37 }]} active="All" />
        <div style={{ height: 8 }} />
        <SessionsTable rows={SESSIONS} />
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 172 }}>
        <Chip tone="orange">Rage clicks ×6</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>On the size options, 0:21 in</p>
      </div>
    </MockStage>
  );
}

/* 1 — Find the pain points */
function PainPointsMock() {
  const rows = [
    { t: "Shoppers can't find sizing info", s: "38%", tone: "orange", sev: "High" },
    { t: "Shipping cost appears only at checkout", s: "27%", tone: "orange", sev: "High" },
    { t: "Reviews sit below the fold", s: "19%", tone: "amber", sev: "Medium" },
    { t: "Gallery hard to swipe on mobile", s: "11%", tone: "neutral", sev: "Low" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Pain points" meta="Ranked for Glow Serum" right={<Chip tone="neutral">4 found</Chip>} />
        <div className="dash-table">
          <div className="dash-tr dash-th cm-row cm-row-3">
            <span>Pain point</span><span>Sessions hit</span><span>Severity</span>
          </div>
          {rows.map((r) => (
            <div className="dash-tr cm-row cm-row-3" key={r.t}>
              <span className="dash-td-title">{r.t}</span>
              <span className="dash-td-muted">{r.s}</span>
              <span><Chip tone={r.tone}>{r.sev}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, top: 70, width: 168 }}>
        <span className="dash-eyebrow">Top issue</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Sizing info is the #1 reason shoppers leave.</p>
      </div>
    </MockStage>
  );
}

/* 2 — Get the insights */
function InsightsMock() {
  const rows = [
    { t: "Move size guide beside add-to-cart", i: "High", e: "Low" },
    { t: "Show delivery cost on the product page", i: "High", e: "Low" },
    { t: "Bring rating summary above the fold", i: "Medium", e: "Low" },
    { t: "Make the image gallery swipeable", i: "Medium", e: "Medium" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Recommended changes" meta="What to change, in priority order" right={<span className="dash-btn-primary">Approve all</span>} />
        <div className="dash-table">
          <div className="dash-tr dash-th cm-row cm-row-3">
            <span>Change</span><span>Impact</span><span>Effort</span>
          </div>
          {rows.map((r) => (
            <div className="dash-tr cm-row cm-row-3" key={r.t}>
              <span className="dash-td-title">{r.t}</span>
              <span><Chip tone={r.i === "High" ? "green" : "amber"}>{r.i}</Chip></span>
              <span><Chip tone="neutral">{r.e}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Strategist reviewed</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>Every change gets a human sign-off.</p>
      </div>
    </MockStage>
  );
}

/* 3 — Implement and test */
function TestMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="A/B test" meta="Product page · size guide placement" right={<Chip tone="green">● Running</Chip>} />
        <div className="dash-statrow" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <StatCard label="Current page" value="2.1%" delta="Control" deltaTone="orange" />
          <StatCard label="New version" value="2.9%" delta="▲ Leading" />
        </div>
        <div className="dash-pad" style={{ paddingTop: 0 }}>
          <Bars rows={[{ n: "Current page", v: 42 }, { n: "New version", v: 58, you: true }]} />
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 168 }}>
        <Chip tone="green">✓ Keep the winner</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Changes that win get shipped.</p>
      </div>
    </MockStage>
  );
}

const CRO_MOCKS = [RecordingsMock, PainPointsMock, InsightsMock, TestMock];
export default CRO_MOCKS;

export function CroMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <style>{`
        .cm-row-4 { grid-template-columns: 1.4fr 0.8fr 0.9fr 1.3fr; }
        .cm-row-3 { grid-template-columns: 2.2fr 0.9fr 0.8fr; }
        .cm-replay { padding: 16px; }
        .cm-heat { position: absolute; z-index: 2; border-radius: 99px; background: radial-gradient(circle, rgba(251,84,24,.55), rgba(251,84,24,0) 70%); pointer-events: none; transform: translate(-50%,-50%); }
        .cm-trace { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; }
        .cm-timeline { position: relative; height: 6px; margin: 0 16px 16px; border-radius: 99px; background: var(--d-surface3); }
        .cm-timeline-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 46%; border-radius: 99px; background: linear-gradient(90deg,#FF7A45,#FB5418); }
        .cm-mark { position: absolute; top: -3px; width: 4px; height: 12px; border-radius: 2px; background: var(--d-danger); }
        @media (max-width: 640px) {
          .cm-row-4 { grid-template-columns: 1fr auto; gap: 12px; }
          .cm-row-4 > :nth-child(2), .cm-row-4 > :nth-child(3) { display: none; }
          .cm-row-3 { grid-template-columns: 1fr auto; gap: 12px; }
          .cm-row-3 > :nth-child(2) { display: none; }
        }
      `}</style>
    </>
  );
}
