import { ENGINE_META } from "@/components/brand/EngineLogo";

/**
 * Bespoke, on-brand explainer mockups for each agent's "How it works" section.
 * Pure presentational (no interactivity) — a simple visual that shows, in plain
 * terms, what the agent actually does. Selected by agent slug.
 *
 * All styling uses brand CSS vars (colors.json → :root) so they stay on-token
 * and theme-consistent with the rest of the site.
 */

const ENGINES = [
  { key: "chatgpt", label: "ChatGPT" },
  { key: "claude", label: "Claude" },
  { key: "gemini", label: "Gemini" },
  { key: "perplexity", label: "Perplexity" },
];
const engColor = (k) =>
  k === "gemini" ? ENGINE_META.gemini.gradient[0] : ENGINE_META[k].color;

/* ---- shared frame -------------------------------------------------------- */
function Frame({ label, children }) {
  return (
    <div className="mk-frame">
      <div className="mk-bar">
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-bar-label mono">{label}</span>
      </div>
      <div className="mk-body">{children}</div>
    </div>
  );
}

function Dot({ color }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: color,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

/* ---- Strategy: the game plan --------------------------------------------- */
function StrategyMock() {
  return (
    <Frame label="strategy.plan">
      <div className="mk-chips">
        {["Business", "Competitors", "Ideal customer"].map((c) => (
          <span key={c} className="mk-chip">
            {c}
          </span>
        ))}
      </div>
      <div className="mk-arrow">↓</div>
      <div className="mk-eyebrow mono">Target questions to win</div>
      <ol className="mk-list">
        {[
          { t: "best CRM for startups", win: true },
          { t: "CRM with built-in AI", win: false },
          { t: "HubSpot alternative", win: false },
        ].map((row, i) => (
          <li key={row.t} className={`mk-row ${row.win ? "is-win" : ""}`}>
            <span className="mk-rank mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="mk-row-t">{row.t}</span>
            {row.win && <span className="mk-tag">priority</span>}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---- Research: how AI answers -------------------------------------------- */
function ResearchMock() {
  return (
    <Frame label="research.scan">
      <div className="mk-q">“Which CRM is best for a small team?”</div>
      <div className="mk-answer">
        A few tools stand out. Many teams recommend{" "}
        <mark className="mk-mark">YourBrand</mark> for its simple setup, alongside{" "}
        <span className="mk-muted">Competitor&nbsp;A</span> and{" "}
        <span className="mk-muted">Competitor&nbsp;B</span>.
      </div>
      <div className="mk-eyebrow mono">Where you’re cited</div>
      <div className="mk-engines">
        {ENGINES.map((e, i) => (
          <span key={e.key} className="mk-eng">
            <Dot color={engColor(e.key)} />
            {e.label}
            <span className={i < 2 ? "mk-yes" : "mk-no"}>{i < 2 ? "✓" : "gap"}</span>
          </span>
        ))}
      </div>
    </Frame>
  );
}

/* ---- Content: structured, human, reviewed -------------------------------- */
function ContentMock() {
  return (
    <Frame label="content.draft">
      <div className="mk-doc-h" />
      <div className="mk-answerblock">
        <span className="mk-eyebrow mono">Answer</span>
        <div className="mk-line" style={{ width: "100%" }} />
        <div className="mk-line" style={{ width: "88%" }} />
      </div>
      <div className="mk-faq">
        <div className="mk-faq-q">
          <span>How does it work?</span>
          <span className="mk-plus">+</span>
        </div>
        <div className="mk-faq-q">
          <span>Who is it for?</span>
          <span className="mk-plus">+</span>
        </div>
      </div>
      <div className="mk-badges">
        <span className="mk-badge is-on">✓ Human-reviewed</span>
        <span className="mk-badge">Reads natural</span>
        <span className="mk-badge">AI-readable</span>
      </div>
    </Frame>
  );
}

/* ---- Backlink: trusted-source network ------------------------------------ */
function BacklinkMock() {
  const sources = [
    { n: "TechCrunch", s: "DA 94" },
    { n: "G2", s: "DA 91" },
    { n: "Reddit", s: "DA 91" },
  ];
  return (
    <Frame label="backlink.map">
      <div className="mk-net">
        <div className="mk-net-center">Your brand</div>
        <div className="mk-net-col">
          {sources.map((s) => (
            <div key={s.n} className="mk-src">
              <span className="mk-src-line" />
              <span className="mk-src-card">
                <span className="mk-src-n">{s.n}</span>
                <span className="mk-src-s mono">{s.s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mk-badges">
        <span className="mk-badge is-on">+3 mentions earned</span>
        <span className="mk-badge">trusted sources</span>
      </div>
    </Frame>
  );
}

/* ---- Optimizer: page monitor --------------------------------------------- */
function OptimizerMock() {
  const rows = [
    { p: "/pricing", d: "up", v: "▲ 2" },
    { p: "/best-crm-for-startups", d: "fix", v: "rewritten" },
    { p: "/compare/hubspot", d: "up", v: "▲ 1" },
  ];
  return (
    <Frame label="optimizer.watch">
      <div className="mk-eyebrow mono">Page health</div>
      <div className="mk-pages">
        {rows.map((r) => (
          <div key={r.p} className={`mk-page mk-${r.d}`}>
            <span className="mk-page-p mono">{r.p}</span>
            <span className="mk-page-v">{r.v}</span>
          </div>
        ))}
      </div>
      <div className="mk-note">
        <span className="mk-note-dot" />
        <span>
          <b>1 page slipping</b> — rewritten &amp; climbing back
        </span>
      </div>
    </Frame>
  );
}

/* ---- Analyzer: share-of-voice dashboard ---------------------------------- */
function AnalyzerMock() {
  const bars = [
    { n: "You", v: 42, you: true },
    { n: "Competitor A", v: 28 },
    { n: "Competitor B", v: 18 },
    { n: "Others", v: 12 },
  ];
  return (
    <Frame label="analyzer.report">
      <div className="mk-metric">
        <span className="mk-metric-v">42%</span>
        <span className="mk-metric-l">
          share of voice <span className="mk-up mono">▲ 9 this month</span>
        </span>
      </div>
      <div className="mk-eyebrow mono">Who AI recommends</div>
      <div className="mk-bars">
        {bars.map((b) => (
          <div key={b.n} className="mk-barrow">
            <span className="mk-barlabel">{b.n}</span>
            <span className="mk-bartrack">
              <span
                className={`mk-barfill ${b.you ? "is-you" : ""}`}
                style={{ width: `${b.v}%` }}
              />
            </span>
            <span className="mk-barval mono">{b.v}%</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const MOCKS = {
  "strategy-agent": StrategyMock,
  "research-agent": ResearchMock,
  "content-agent": ContentMock,
  "backlink-agent": BacklinkMock,
  "optimizer-agent": OptimizerMock,
  "analyzer-agent": AnalyzerMock,
};

export default function AgentMockup({ slug }) {
  const Mock = MOCKS[slug];
  if (!Mock) return null;
  return (
    <div className="agent-mock">
      <Mock />
      <MockStyles />
    </div>
  );
}

function MockStyles() {
  return (
    <style>{`
      .agent-mock { width: 100%; }
      .mk-frame {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 18px;
        box-shadow: var(--shadow, 0 30px 60px -30px rgba(18,18,16,.18));
        overflow: hidden;
      }
      .mk-bar {
        display: flex; align-items: center; gap: 6px;
        padding: 11px 14px;
        background: var(--surface-soft);
        border-bottom: 1px solid var(--line);
      }
      .mk-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--line); display: inline-block; }
      .mk-bar-label { margin-left: 8px; font-size: 11px; color: var(--ink-3); letter-spacing: .02em; }
      .mk-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }

      .mk-eyebrow { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--ink-3); }

      /* strategy */
      .mk-chips { display: flex; gap: 8px; flex-wrap: wrap; }
      .mk-chip {
        font-size: 12.5px; font-weight: 600; color: var(--ink-2);
        background: var(--surface-soft); border: 1px solid var(--line);
        padding: 7px 12px; border-radius: 999px;
      }
      .mk-arrow { text-align: center; color: var(--brand-600); font-size: 16px; line-height: 1; margin: -4px 0; }
      .mk-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; }
      .mk-row {
        display: flex; align-items: center; gap: 12px;
        padding: 11px 13px; border-radius: 12px;
        border: 1px solid var(--line); background: var(--surface);
      }
      .mk-row.is-win { border-color: var(--brand-200); background: var(--brand-tint); }
      .mk-rank { font-size: 11px; color: var(--ink-3); }
      .mk-row.is-win .mk-rank { color: var(--brand-600); }
      .mk-row-t { font-size: 13.5px; font-weight: 500; color: var(--ink); flex: 1; }
      .mk-tag {
        font-size: 10.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
        color: #fff; background: var(--brand); padding: 3px 8px; border-radius: 999px;
      }

      /* research */
      .mk-q { font-size: 14px; font-weight: 600; color: var(--ink); }
      .mk-answer { font-size: 13px; line-height: 1.6; color: var(--ink-2); }
      .mk-mark { background: var(--brand-tint); color: var(--brand-600); font-weight: 700; padding: 1px 5px; border-radius: 5px; }
      .mk-muted { color: var(--ink-3); }
      .mk-engines { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .mk-eng {
        display: flex; align-items: center; gap: 7px;
        font-size: 12px; font-weight: 500; color: var(--ink-2);
        border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px;
      }
      .mk-yes { margin-left: auto; color: #17864b; font-weight: 700; }
      .mk-no { margin-left: auto; color: var(--ink-3); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }

      /* content */
      .mk-doc-h { height: 16px; width: 62%; border-radius: 6px; background: var(--grad); }
      .mk-answerblock { border-left: 3px solid var(--brand); padding: 4px 0 4px 12px; display: flex; flex-direction: column; gap: 8px; }
      .mk-line { height: 8px; border-radius: 5px; background: var(--surface-soft); border: 1px solid var(--line); }
      .mk-faq { display: flex; flex-direction: column; gap: 8px; }
      .mk-faq-q {
        display: flex; align-items: center; justify-content: space-between;
        font-size: 13px; font-weight: 500; color: var(--ink);
        border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px;
      }
      .mk-plus { color: var(--brand-600); font-weight: 700; }
      .mk-badges { display: flex; gap: 8px; flex-wrap: wrap; }
      .mk-badge {
        font-size: 11.5px; font-weight: 600; color: var(--ink-2);
        border: 1px solid var(--line); background: var(--surface-soft);
        padding: 6px 10px; border-radius: 999px;
      }
      .mk-badge.is-on { color: #17864b; border-color: rgba(23,134,75,.28); background: rgba(23,134,75,.08); }

      /* backlink */
      .mk-net { display: flex; align-items: center; gap: 14px; }
      .mk-net-center {
        font-size: 13px; font-weight: 700; color: #fff; text-align: center;
        background: var(--grad); border-radius: 14px; padding: 18px 14px;
        min-width: 96px; box-shadow: var(--shadow-orange, 0 16px 30px -14px rgba(255,90,31,.5));
      }
      .mk-net-col { display: flex; flex-direction: column; gap: 10px; flex: 1; }
      .mk-src { display: flex; align-items: center; }
      .mk-src-line { width: 20px; height: 2px; background: var(--brand-200); flex-shrink: 0; }
      .mk-src-card {
        display: flex; align-items: center; justify-content: space-between; gap: 10px; flex: 1;
        border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; background: var(--surface);
      }
      .mk-src-n { font-size: 13px; font-weight: 600; color: var(--ink); }
      .mk-src-s { font-size: 11px; color: var(--brand-600); }

      /* optimizer */
      .mk-pages { display: flex; flex-direction: column; gap: 8px; }
      .mk-page {
        display: flex; align-items: center; justify-content: space-between; gap: 10px;
        border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: var(--surface);
      }
      .mk-page-p { font-size: 12px; color: var(--ink-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .mk-page-v { font-size: 12px; font-weight: 700; flex-shrink: 0; }
      .mk-up .mk-page-v { color: #17864b; }
      .mk-fix { border-color: var(--brand-200); background: var(--brand-tint); }
      .mk-fix .mk-page-v { color: var(--brand-600); }
      .mk-note { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--ink-2); }
      .mk-note b { color: var(--ink); }
      .mk-note-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--brand); flex-shrink: 0; }

      /* analyzer */
      .mk-metric { display: flex; align-items: baseline; gap: 10px; }
      .mk-metric-v { font-size: 34px; font-weight: 700; letter-spacing: -0.02em; color: var(--ink); line-height: 1; }
      .mk-metric-l { font-size: 12.5px; color: var(--ink-2); }
      .mk-up { color: #17864b; font-size: 11px; margin-left: 4px; }
      .mk-bars { display: flex; flex-direction: column; gap: 9px; }
      .mk-barrow { display: flex; align-items: center; gap: 10px; }
      .mk-barlabel { font-size: 12px; color: var(--ink-2); width: 92px; flex-shrink: 0; }
      .mk-bartrack { flex: 1; height: 10px; border-radius: 999px; background: var(--surface-soft); border: 1px solid var(--line); overflow: hidden; }
      .mk-barfill { display: block; height: 100%; background: var(--ink-3); border-radius: 999px; }
      .mk-barfill.is-you { background: var(--grad); }
      .mk-barval { font-size: 11px; color: var(--ink-3); width: 32px; text-align: right; flex-shrink: 0; }
    `}</style>
  );
}
