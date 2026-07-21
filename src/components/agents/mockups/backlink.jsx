import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip, StatCard, Gauge } from "./dash";
import { ScreensStyles } from "./screens";
import { EngineLogo } from "@/components/brand/EngineLogo";

/* DA band → color class */
function Da({ v }) {
  const cls = v >= 90 ? "dash-da-hi" : v >= 70 ? "dash-da-mid" : v >= 40 ? "dash-da-low" : "dash-da-min";
  return <span className={`dash-da ${cls}`}>{v}</span>;
}

export function BacklinkHeroMock() {
  const rows = [
    { s: "TechCrunch — “10 AEO tools to watch”", da: 94, type: ["Editorial", "cyan"], st: ["Live", "greenDark"] },
    { s: "G2 Grid Report — AI SEO", da: 91, type: ["Review", "violet"], st: ["Live", "greenDark"] },
    { s: "Reddit r/SaaS recommendation", da: 91, type: ["Community", "neutral"], st: ["Live", "greenDark"] },
    { s: "Search Engine Journal guest post", da: 86, type: ["Editorial", "cyan"], st: ["Pending", "amber"] },
    { s: "Zapier blog integration mention", da: 92, type: ["Partner", "neutral"], st: ["In review", "cyan"] },
  ];
  return (
    <MockStage>
      <div className="dash-card bl-scale">
        <TopHead title="Backlinks" meta="Earned references AI models trust" />
        <div className="dash-table" style={{ paddingTop: 4 }}>
          <div className="dash-tr dash-th bl-ref-row"><span>Source</span><span>DA</span><span>Type</span><span>Status</span></div>
          {rows.map((r) => (
            <div className="dash-tr bl-ref-row" key={r.s}>
              <span className="dash-td-title">{r.s}</span>
              <span><Da v={r.da} /></span>
              <span><Chip tone={r.type[1]}>{r.type[0]}</Chip></span>
              <span><Chip tone={r.st[1]}>{r.st[0]}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -18, top: 60, width: 200 }}>
        <Gauge value={72} label="Authority" sub="142 referring domains" tone="green" />
        <div className="bl-up">▲ +6 this month</div>
      </div>
    </MockStage>
  );
}

/* 0 — Find trusted sources */
function SourcesMock() {
  const rows = [
    { d: "g2.com", da: 91, cited: ["ChatGPT", "Perplexity"], op: ["High", "orange"] },
    { d: "reddit.com", da: 91, cited: ["ChatGPT", "Gemini", "Claude"], op: ["High", "orange"] },
    { d: "capterra.com", da: 84, cited: ["Perplexity"], op: ["Medium", "amber"] },
    { d: "news.ycombinator.com", da: 90, cited: ["Claude", "ChatGPT"], op: ["High", "orange"] },
  ];
  return (
    <MockStage>
      <div className="dash-card bl-scale">
        <TopHead title="Source discovery" meta="Domains ChatGPT, Claude, Gemini & Perplexity cite" />
        <div className="dash-table" style={{ paddingTop: 4 }}>
          <div className="dash-tr dash-th bl-src-row"><span>Domain</span><span>DA</span><span>Cited by</span><span>Opp.</span></div>
          {rows.map((r) => (
            <div className="dash-tr bl-src-row" key={r.d}>
              <span className="dash-td-title">{r.d}</span>
              <span><Da v={r.da} /></span>
              <span className="bl-dots">{r.cited.map((e) => <EngineLogo key={e} name={e} size={15} />)}</span>
              <span><Chip tone={r.op[1]}>{r.op[0]}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 190 }}>
        <span className="dash-eyebrow" style={{ color: "#14ACBC" }}>Insight</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", lineHeight: 1.5, marginTop: 7 }}>
          Perplexity cites g2.com in 4 of your 12 tracked prompts.
        </p>
      </div>
    </MockStage>
  );
}

/* 1 — Earn real mentions (outreach) */
function OutreachMock() {
  const rows = [
    { t: "TechCrunch", da: 94, st: ["Negotiating", "amber"] },
    { t: "Zapier blog", da: 92, st: ["Replied", "cyan"] },
    { t: "G2 category listing", da: 91, st: ["Published", "greenDark"] },
    { t: "SaaStr guest post", da: 83, st: ["Pitched", "neutral"] },
  ];
  return (
    <MockStage>
      <div className="dash-card bl-scale">
        <TopHead title="Outreach" meta="Pitches & placements in flight" />
        <div className="dash-statrow" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <StatCard label="Active pitches" value="18" />
          <StatCard label="Reply rate" value="34%" delta="2.1× avg" />
          <StatCard label="Placed / mo" value="7" delta="+3" />
        </div>
        <div className="dash-table" style={{ paddingTop: 0 }}>
          <div className="dash-tr dash-th bl-out-row"><span>Target</span><span>DA</span><span>Stage</span></div>
          {rows.map((r) => (
            <div className="dash-tr bl-out-row" key={r.t}>
              <span className="dash-td-title">{r.t}</span>
              <span><Da v={r.da} /></span>
              <span><Chip tone={r.st[1]}>{r.st[0]}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, top: 72, width: 168 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>▲ 34%</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>reply rate · 2.1× industry avg</p>
      </div>
    </MockStage>
  );
}

/* 2 — Build reputation (authority signals) */
function ReputationMock() {
  const rows = [
    { sig: "G2 rating 4.7★ (212 reviews)", w: ["High", "orange"], st: ["Strong", "greenDark"] },
    { sig: "Wikipedia entity / knowledge panel", w: ["High", "orange"], st: ["Missing", "orange"] },
    { sig: "Founder quoted in TechCrunch", w: ["Medium", "amber"], st: ["Strong", "greenDark"] },
    { sig: "Crunchbase profile complete", w: ["Medium", "amber"], st: ["Partial", "amber"] },
  ];
  return (
    <MockStage>
      <div className="dash-card bl-scale">
        <TopHead title="Authority signals" meta="The trust signals AI weighs when recommending you" />
        <div className="dash-pad" style={{ paddingBottom: 4 }}><Gauge value={72} label="Authority score" sub="+6 vs last month" tone="green" /></div>
        <div className="dash-table" style={{ paddingTop: 0 }}>
          <div className="dash-tr dash-th bl-sig-row"><span>Signal</span><span>Weight</span><span>Status</span></div>
          {rows.map((r) => (
            <div className="dash-tr bl-sig-row" key={r.sig}>
              <span className="dash-td-title">{r.sig}</span>
              <span><Chip tone={r.w[1]}>{r.w[0]}</Chip></span>
              <span><Chip tone={r.st[1]}>{r.st[0]}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow" style={{ color: "#C98A12" }}>★ Reviews</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>+18 new reviews this month</p>
      </div>
    </MockStage>
  );
}

/* 3 — Grow footprint (link growth) */
function GrowthMock() {
  const rows = [
    { c: ["Gained", "green"], d: "zapier.com", da: 92 },
    { c: ["Gained", "green"], d: "producthunt.com", da: 90 },
    { c: ["Lost", "orange"], d: "oldblog.net", da: 41 },
    { c: ["Gained", "green"], d: "g2.com", da: 91 },
  ];
  return (
    <MockStage>
      <div className="dash-card bl-scale">
        <TopHead title="Link growth" meta="New & lost references, week by week" />
        <div className="dash-statrow">
          <StatCard label="Referring domains" value="142" delta="+11" />
          <StatCard label="New (30d)" value="27" delta="+9" />
          <StatCard label="Lost (30d)" value="4" delta="−1" deltaTone="orange" />
        </div>
        <div className="bl-trend">
          <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{ width: "100%", height: 60 }}>
            <polyline points="0,46 50,40 100,42 150,28 200,30 250,16 300,10" fill="none" stroke="#1A9E63" strokeWidth="2.5" strokeLinecap="round" />
            <polyline points="0,52 50,54 100,50 150,55 200,53 250,56 300,54" fill="none" stroke="#E5533A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
        <div className="dash-table" style={{ paddingTop: 0 }}>
          <div className="dash-tr dash-th bl-grow-row"><span>Change</span><span>Domain</span><span>DA</span></div>
          {rows.map((r) => (
            <div className="dash-tr bl-grow-row" key={r.d}>
              <span><Chip tone={r.c[1]}>{r.c[0] === "Gained" ? "▲ Gained" : "▼ Lost"}</Chip></span>
              <span className="dash-td-title">{r.d}</span>
              <span><Da v={r.da} /></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ left: -14, bottom: -16, width: 190 }}>
        <span className="dash-eyebrow" style={{ color: "#0A6E3D" }}>✓ Milestone</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Crossed 140 referring domains</p>
      </div>
    </MockStage>
  );
}

const BACKLINK_MOCKS = [SourcesMock, OutreachMock, ReputationMock, GrowthMock];
export default BACKLINK_MOCKS;

export function BacklinkMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <ScreensStyles />
      <style>{`
        .bl-scale { max-width:560px; }
        .bl-ref-row { grid-template-columns: 2.2fr 0.5fr 0.9fr 0.9fr; }
        .bl-src-row { grid-template-columns: 1.6fr 0.5fr 1fr 0.7fr; }
        .bl-out-row { grid-template-columns: 1.8fr 0.5fr 1fr; }
        .bl-sig-row { grid-template-columns: 2.2fr 0.8fr 0.9fr; }
        .bl-grow-row { grid-template-columns: 1fr 1.4fr 0.5fr; }
        .bl-dots { display:inline-flex; gap:4px; }
        .bl-dot { width:11px; height:11px; border-radius:999px; display:inline-block; }
        .bl-up { font-size:11px; font-weight:700; color:var(--d-green); margin-top:10px; }
        .bl-trend { padding:4px 16px 12px; }
      `}</style>
    </>
  );
}
