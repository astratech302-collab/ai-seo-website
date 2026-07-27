import { MockStage } from "./kit";

/**
 * Faithful reproductions of the real Geobuild dashboard screens
 * (../ai-seo-frontend) for the Content agent page — NOT invented UIs.
 *
 * Palette, type, chip tones, columns, statuses and copy are mapped 1:1 from the
 * actual product (src/theme/foundations/colors.js, ContentPage.jsx,
 * ContentEditorPage.jsx). Rendered on the marketing "stage" backdrop so they read
 * like product screenshots. Dashboard tokens are hard-coded here (.dash-*) because
 * they are the product's real values, distinct from the marketing brand palette.
 */

/* ── Shared bits ─────────────────────────────────────────────────────────── */
function AppIcon() {
  return (
    <span className="dash-appicon" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="3.2" fill="#fff" />
      </svg>
    </span>
  );
}

function TopHead({ title, meta, right }) {
  return (
    <div className="dash-top">
      <div className="dash-top-id">
        <AppIcon />
        <div>
          <div className="dash-top-title">{title}</div>
          <div className="dash-top-meta">{meta}</div>
        </div>
      </div>
      {right}
    </div>
  );
}

function Segmented() {
  return (
    <div className="dash-seg">
      <span className="dash-seg-opt is-on">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="9" x2="9" y2="21" />
        </svg>
        Table
      </span>
      <span className="dash-seg-opt">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Calendar
      </span>
    </div>
  );
}

function Chip({ tone, children }) {
  return <span className={`dash-chip dash-chip-${tone}`}>{children}</span>;
}

/* ── HERO — Content overview (ContentPage table) ─────────────────────────── */
const ROWS = [
  { t: "Best Project Management Tools for Remote Teams", k: "remote team management software", s: "draft" },
  { t: "How to Choose the Right CRM in 2026", k: "best CRM for small business", s: "draft" },
  { t: "The 2026 Content Marketing Playbook", k: "content marketing strategy 2026", s: "scheduled", d: "Jun 21, 2026" },
];

export function ContentHeroMock() {
  return (
    <MockStage className="grain-strong">
      <div className="dash-card dash-overview">
        <TopHead title="Content" meta="Create & manage AI-optimized content" right={<Segmented />} />
        <div className="dash-toolbar">
          <div className="dash-search">
            <span className="dash-search-ic" />
            Search title or keyword…
          </div>
          <div className="dash-filters">
            <span className="dash-fpill is-on">All</span>
            <span className="dash-fpill">Draft</span>
            <span className="dash-fpill">Approved</span>
            <span className="dash-fpill">Published</span>
            <span className="dash-fpill">Scheduled</span>
          </div>
        </div>
        <div className="dash-table">
          <div className="dash-tr dash-th">
            <span>Title</span>
            <span>Type</span>
            <span>Target keyword</span>
            <span>Status</span>
            <span>Scheduled</span>
          </div>
          {ROWS.map((r) => (
            <div className="dash-tr" key={r.t}>
              <span className="dash-td-title">{r.t}</span>
              <span><Chip tone="violet">Landing Page</Chip></span>
              <span className="dash-td-muted">{r.k}</span>
              <span>
                {r.s === "scheduled" ? <Chip tone="amber">Scheduled</Chip> : <Chip tone="neutral">Draft</Chip>}
              </span>
              <span className="dash-td-muted">{r.d || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: Generate with AI */}
      <div className="dash-float dash-float-gen">
        <span className="dash-eyebrow">Generate with AI</span>
        <div className="dash-genrow"><span className="dash-swatch sw-violet" />Optimize for AI search</div>
        <div className="dash-genrow"><span className="dash-swatch sw-green" />Schedule to calendar</div>
        <div className="dash-genrow"><span className="dash-swatch sw-orange" />Publish to website</div>
        <div className="dash-genbtn">Generate content</div>
      </div>

      {/* Floating: Create new content */}
      <div className="dash-float dash-float-create">
        <div className="dash-create-h">Create new content</div>
        <div className="dash-createrow is-on"><span className="dash-swatch sw-violet" />Landing Page</div>
        <div className="dash-createrow"><span className="dash-swatch sw-green" />Blog Post</div>
        <div className="dash-createrow"><span className="dash-swatch sw-amber" />Comparison Page</div>
      </div>
    </MockStage>
  );
}

/* ── 0 — Finds the right angle (New content: type + keyword + why) ───────── */
const TYPES = [
  { n: "Landing Page", tone: "violet", on: true },
  { n: "Blog Post", tone: "cyan" },
  { n: "Comparison", tone: "amber" },
  { n: "FAQ", tone: "orange" },
];
function AngleMock() {
  return (
    <MockStage className="grain-strong">
      <div className="dash-card">
        <TopHead title="New content" meta="Set the angle before we write" />
        <div className="dash-pad">
          <span className="dash-eyebrow">Content type</span>
          <div className="dash-typegrid">
            {TYPES.map((t) => (
              <div key={t.n} className={`dash-type ${t.on ? "is-on" : ""}`}>
                <span className={`dash-swatch sw-${t.tone}`} />
                {t.n}
              </div>
            ))}
          </div>
          <span className="dash-eyebrow" style={{ marginTop: 18, display: "block" }}>Target keyword</span>
          <div className="dash-input">best CRM for a small startup<span className="dash-caret" /></div>
          <div className="dash-why">
            <div className="dash-why-h">
              <span className="dash-why-i">i</span>
              Why write this
            </div>
            <p>A small-team comparison is the gap AI keeps surfacing — rivals only rank generic guides.</p>
          </div>
        </div>
      </div>
      <div className="dash-float dash-float-tr">
        <span className="dash-eyebrow">Angle match</span>
        <div className="dash-metric">94%</div>
        <div className="dash-metric-l">fits searcher intent</div>
      </div>
    </MockStage>
  );
}

/* ── 1 — Writes like a human (editor canvas) ─────────────────────────────── */
function HumanMock() {
  return (
    <MockStage className="grain-strong">
      <div className="dash-card">
        <div className="dash-edit-head">
          <span className="dash-back">←</span>
          <span className="dash-edit-title">Best CRM for a small startup</span>
          <Chip tone="neutral">Draft</Chip>
          <span className="dash-save">Saved</span>
        </div>
        <div className="dash-stats">
          <span>1,240 words</span>
          <span className="dash-statdot" />
          <span>6 min read</span>
        </div>
        <div className="dash-doc">
          <h3 className="dash-h1">Best CRM for a small startup</h3>
          <p>If you’re a five-person team, you don’t need enterprise software. You need something you can set up in an afternoon and actually keep using.</p>
          <p>Here’s how the top options really compare for a team like yours — no jargon, no fluff.</p>
          <div className="dash-line" style={{ width: "96%" }} />
          <div className="dash-line" style={{ width: "82%" }} />
        </div>
      </div>
      <div className="dash-float dash-float-br">
        <div className="dash-bubble">✎ Sounds human, reads clean</div>
      </div>
    </MockStage>
  );
}

/* ── 2 — Structures it for AI (editor + heading outline) ─────────────────── */
const OUTLINE = [
  { t: "Best CRM for a small startup", lvl: 1, on: true },
  { t: "The short answer", lvl: 2 },
  { t: "Top options compared", lvl: 2 },
  { t: "Pricing at a glance", lvl: 3 },
  { t: "FAQ", lvl: 2 },
];
function StructureMock() {
  return (
    <MockStage className="grain-strong">
      <div className="dash-card dash-split">
        <div className="dash-split-main">
          <div className="dash-stats">
            <span>1,240 words</span>
            <span className="dash-statdot" />
            <span>6 min read</span>
          </div>
          <div className="dash-doc">
            <h3 className="dash-h1">Best CRM for a small startup</h3>
            <h4 className="dash-h2">The short answer</h4>
            <p>For most small teams, three tools cover 90% of what you need.</p>
            <table className="dash-mtable">
              <tbody>
                <tr><th>Tool</th><th>Best for</th></tr>
                <tr><td>Option A</td><td>Simplicity</td></tr>
                <tr><td>Option B</td><td>Automation</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="dash-outline">
          <span className="dash-eyebrow">Outline</span>
          {OUTLINE.map((h) => (
            <div key={h.t} className={`dash-ol lvl-${h.lvl} ${h.on ? "is-on" : ""}`}>{h.t}</div>
          ))}
        </div>
      </div>
      <div className="dash-float dash-float-bl">
        <span className="dash-eyebrow">Machine-readable</span>
        <div className="dash-mr"><span className="dash-check">✓</span> Answer up top</div>
        <div className="dash-mr"><span className="dash-check">✓</span> FAQ schema added</div>
      </div>
    </MockStage>
  );
}

/* ── 3 — Expert-reviewed (editor + comment + approve) ────────────────────── */
function ReviewMock() {
  return (
    <MockStage className="grain-strong">
      <div className="dash-card">
        <div className="dash-edit-head">
          <span className="dash-edit-title">Best CRM for a small startup</span>
          <Chip tone="neutral">Draft</Chip>
          <span className="dash-spacer" />
          <span className="dash-btn-outline">Comments <span className="dash-chip dash-chip-orange">1</span></span>
          <span className="dash-btn-primary">Approve</span>
        </div>
        <div className="dash-doc">
          <h3 className="dash-h1">Best CRM for a small startup</h3>
          <p><span className="dash-hl">Most small teams overspend on CRM software.</span> The data suggests three tools cover almost everything a startup needs.</p>
        </div>
        <div className="dash-comment">
          <span className="dash-avatar">PR</span>
          <div>
            <div className="dash-comment-h">Priya · SEO Lead <span className="dash-comment-t">5m ago</span></div>
            <p>Add a source for the “overspend” claim — makes it easy for AI to cite us.</p>
          </div>
        </div>
      </div>
      <div className="dash-float dash-float-tr">
        <span className="dash-eyebrow">Before publish</span>
        <div className="dash-flow">
          <span className="dash-flow-step is-done">Draft</span>
          <span className="dash-flow-arrow">→</span>
          <span className="dash-flow-step is-now">Approved</span>
          <span className="dash-flow-arrow">→</span>
          <span className="dash-flow-step">Published</span>
        </div>
      </div>
    </MockStage>
  );
}

const CONTENT_MOCKS = [AngleMock, HumanMock, StructureMock, ReviewMock];
export default CONTENT_MOCKS;

/* ── Styles (real dashboard palette) ─────────────────────────────────────── */
export function ContentMockStyles() {
  return (
    <style>{`
      /* Dashboard tokens — defined on the stage so BOTH the card and the
         floating panels (which are its siblings, not children) inherit them. */
      .hf-stage {
        --d-orange:#FB5418; --d-orangeText:#CF400E; --d-orangeSoft:#FFEDE3;
        --d-text:#1C1916; --d-text2:#6C665E; --d-text3:#9E978D;
        --d-border:#EBE6DF; --d-surface2:#FBFAF8; --d-surface3:#F1EEE9;
        --d-violet:#7C5CD1; --d-violetSoft:#EEE9FB; --d-green:#1A9E63; --d-greenSoft:#E2F4EB;
        --d-amber:#C98A12; --d-amberSoft:#FBEFD6; --d-cyan:#14ACBC; --d-cyanSoft:#DDF4F6;
      }
      .dash-card {
        background:#fff; border:1px solid var(--d-border); border-radius:16px;
        box-shadow:0 40px 80px -34px rgba(20,16,12,.4), 0 8px 20px -12px rgba(20,16,12,.18);
        overflow:hidden; color:var(--d-text); font-size:14px;
      }
      .dash-overview { max-width:560px; }
      /* Compact overrides — the hero overview sits in a half-width column, so
         shrink its contents to keep the card from running long. */
      .dash-overview .dash-top { padding:11px 14px; }
      .dash-overview .dash-appicon { width:30px; height:30px; border-radius:8px; }
      .dash-overview .dash-top-title { font-size:14px; }
      .dash-overview .dash-top-meta { font-size:11px; }
      .dash-overview .dash-seg-opt { font-size:11px; padding:5px 9px; gap:5px; }
      .dash-overview .dash-toolbar { padding:10px 14px; gap:9px; }
      .dash-overview .dash-search { padding:7px 11px; font-size:11.5px; }
      .dash-overview .dash-fpill { font-size:11px; padding:5px 10px; }
      .dash-overview .dash-table { padding:0 4px 5px; }
      .dash-overview .dash-tr { padding:9px 10px; gap:8px; }
      .dash-overview .dash-th span { font-size:9px; }
      .dash-overview .dash-td-title { font-size:11.5px; line-height:1.28;
        display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
      .dash-overview .dash-td-muted { font-size:11px; }
      .dash-overview .dash-chip { font-size:10px; padding:3px 8px; }
      /* pushed right so the stage clips it to ~half — the "peeking panel" look */
      .dash-float-gen { width:200px; padding:13px 14px; top:56px; right:-128px; }
      .dash-float-gen .dash-genrow { font-size:12px; padding:7px 3px; }
      .dash-float-gen .dash-genbtn { font-size:12px; padding:9px; }
      .dash-float-create { width:184px; padding:13px 14px; }
      .dash-float-create .dash-create-h { font-size:12.5px; }
      .dash-float-create .dash-createrow { font-size:12px; padding:7px 3px; }

      .dash-top { display:flex; align-items:center; justify-content:space-between; gap:12px;
        padding:15px 18px; border-bottom:1px solid var(--d-border); }
      .dash-top-id { display:flex; align-items:center; gap:11px; }
      .dash-appicon { width:36px; height:36px; border-radius:9px; flex-shrink:0;
        display:inline-flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#FF7A45,#FB5418); box-shadow:0 8px 18px -8px rgba(251,84,24,.6); }
      .dash-top-title { font-size:16px; font-weight:700; letter-spacing:-.01em; line-height:1.1; }
      .dash-top-meta { font-size:12px; color:var(--d-text3); margin-top:2px; }

      .dash-seg { display:inline-flex; gap:2px; padding:3px; background:var(--d-surface2);
        border:1px solid var(--d-border); border-radius:10px; }
      .dash-seg-opt { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:500;
        color:var(--d-text3); padding:6px 11px; border-radius:8px; white-space:nowrap; }
      .dash-seg-opt.is-on { background:#fff; color:var(--d-orangeText);
        box-shadow:0 1px 2px rgba(28,25,22,.06); border:1px solid var(--d-border); font-weight:600; }

      .dash-toolbar { display:flex; align-items:center; gap:12px; padding:14px 18px; flex-wrap:wrap; }
      .dash-search { display:flex; align-items:center; gap:9px; flex:1; min-width:150px;
        border:1px solid var(--d-border); border-radius:10px; padding:9px 13px;
        font-size:13px; color:var(--d-text3); }
      .dash-search-ic { width:13px; height:13px; border-radius:999px; border:2px solid var(--d-text3); opacity:.6; }
      .dash-filters { display:flex; gap:7px; flex-wrap:nowrap; overflow:hidden; }
      .dash-fpill { font-size:12.5px; font-weight:500; color:var(--d-text2); border:1px solid var(--d-border);
        background:#fff; padding:6px 13px; border-radius:999px; white-space:nowrap; }
      .dash-fpill.is-on { color:var(--d-orangeText); background:var(--d-orangeSoft); border-color:var(--d-orange); }

      .dash-table { padding:0 6px 8px; }
      .dash-tr { display:grid; grid-template-columns:1.7fr .9fr 1.3fr .7fr .7fr; align-items:center;
        gap:10px; padding:13px 12px; border-top:1px solid var(--d-border); }
      .dash-th { border-top:none; }
      .dash-th span { font-size:10.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:var(--d-text3); }
      .dash-td-title { font-size:13.5px; font-weight:600; color:var(--d-text); line-height:1.3; }
      .dash-td-muted { font-size:12.5px; color:var(--d-text2); }

      .dash-chip { display:inline-flex; align-items:center; gap:5px; font-size:11.5px; font-weight:500;
        letter-spacing:.02em; padding:4px 10px; border-radius:999px; white-space:nowrap; }
      .dash-chip-violet { background:var(--d-violetSoft); color:var(--d-violet); }
      .dash-chip-amber { background:var(--d-amberSoft); color:var(--d-amber); }
      .dash-chip-green { background:var(--d-greenSoft); color:var(--d-green); }
      .dash-chip-orange { background:var(--d-orangeSoft); color:var(--d-orangeText); }
      .dash-chip-neutral { background:var(--d-surface3); color:var(--d-text2); }
      .dash-chip-cyan { background:var(--d-cyanSoft); color:var(--d-cyan); }

      /* floating panels */
      .dash-float { position:absolute; z-index:3; background:#fff; border:1px solid var(--d-border);
        border-radius:15px; box-shadow:0 30px 60px -22px rgba(20,16,12,.5), 0 6px 16px -10px rgba(20,16,12,.24);
        padding:15px 16px; }
      .dash-float-gen { right:-16px; top:64px; width:224px; }
      .dash-float-create { left:-14px; bottom:-20px; width:206px; }
      .dash-float-tr { right:-16px; top:40px; width:186px; }
      .dash-float-br { right:-14px; bottom:-16px; width:auto; }
      .dash-float-bl { left:-14px; bottom:-18px; width:196px; }

      .dash-eyebrow { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--d-text3); }
      .dash-genrow, .dash-createrow { display:flex; align-items:center; gap:10px; font-size:13.5px;
        font-weight:600; color:var(--d-text); padding:8px 4px; }
      .dash-genrow { padding:9px 4px; }
      .dash-swatch { width:16px; height:16px; border-radius:6px; flex-shrink:0; }
      .sw-violet { background:var(--d-violetSoft); border:1px solid var(--d-violet); }
      .sw-green { background:var(--d-greenSoft); border:1px solid var(--d-green); }
      .sw-orange { background:var(--d-orangeSoft); border:1px solid var(--d-orange); }
      .sw-amber { background:var(--d-amberSoft); border:1px solid var(--d-amber); }
      .sw-cyan { background:var(--d-cyanSoft); border:1px solid var(--d-cyan); }
      .dash-genbtn { margin-top:8px; text-align:center; font-size:13.5px; font-weight:700; color:#fff;
        background:linear-gradient(135deg,#FF7A45,#FB5418); border-radius:11px; padding:11px;
        box-shadow:0 10px 24px -10px rgba(251,84,24,.6); }
      .dash-create-h { font-size:13.5px; font-weight:700; margin-bottom:6px; }
      .dash-createrow.is-on { background:var(--d-orangeSoft); border-radius:9px; margin:0 -6px; padding-left:10px; padding-right:10px; }

      .dash-pad { padding:18px; }
      .dash-typegrid { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-top:10px; }
      .dash-type { display:flex; align-items:center; gap:9px; font-size:13.5px; font-weight:600;
        border:1px solid var(--d-border); border-radius:11px; padding:11px 13px; }
      .dash-type.is-on { border-color:var(--d-orange); background:var(--d-orangeSoft); color:var(--d-orangeText); }
      .dash-input { margin-top:9px; border:1px solid var(--d-orange); box-shadow:0 0 0 4px rgba(251,84,24,.14);
        border-radius:10px; padding:11px 13px; font-size:13.5px; font-weight:500; color:var(--d-text);
        display:flex; align-items:center; }
      .dash-caret { width:1.5px; height:16px; background:var(--d-orange); margin-left:2px; }
      .dash-why { margin-top:16px; background:var(--d-surface2); border:1px solid var(--d-border); border-radius:12px; padding:13px; }
      .dash-why-h { display:flex; align-items:center; gap:8px; font-size:9.5px; font-weight:700;
        letter-spacing:.1em; text-transform:uppercase; color:var(--d-text3); }
      .dash-why-i { width:15px; height:15px; border-radius:999px; border:1.5px solid var(--d-text3);
        display:inline-flex; align-items:center; justify-content:center; font-size:9px; }
      .dash-why p { font-size:13px; color:var(--d-text2); line-height:1.5; margin-top:7px; }
      .dash-metric { font-size:30px; font-weight:800; letter-spacing:-.02em; margin-top:8px; }
      .dash-metric-l { font-size:12px; color:var(--d-text3); }

      /* editor */
      .dash-edit-head { display:flex; align-items:center; gap:10px; padding:13px 16px;
        border-bottom:1px solid var(--d-border); }
      .dash-back { color:var(--d-text2); font-size:16px; }
      .dash-edit-title { font-size:15px; font-weight:700; letter-spacing:-.02em;
        border-bottom:1.5px dashed transparent; }
      .dash-save { margin-left:auto; font-size:12px; color:var(--d-text3); }
      .dash-spacer { margin-left:auto; }
      .dash-btn-outline { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600;
        color:var(--d-text2); border:1px solid var(--d-border); border-radius:9px; padding:7px 11px; }
      .dash-btn-primary { font-size:12.5px; font-weight:700; color:#fff;
        background:linear-gradient(135deg,#FF7A45,#FB5418); border-radius:9px; padding:8px 15px;
        box-shadow:0 8px 18px -8px rgba(251,84,24,.6); }
      .dash-stats { display:flex; align-items:center; gap:12px; padding:9px 16px;
        border-bottom:1px solid var(--d-border); font-size:12.5px; font-weight:500; color:var(--d-text3); }
      .dash-statdot { width:3px; height:3px; border-radius:999px; background:var(--d-text3); opacity:.6; }
      .dash-doc { padding:20px; }
      .dash-h1 { font-size:22px; font-weight:700; letter-spacing:-.01em; margin:0 0 10px; color:var(--d-text); }
      .dash-h2 { font-size:16px; font-weight:700; margin:16px 0 7px; color:var(--d-text); }
      .dash-doc p { font-size:14px; line-height:1.7; color:var(--d-text); margin:0 0 11px; }
      .dash-line { height:9px; border-radius:5px; background:var(--d-surface3); margin-top:9px; }
      .dash-hl { background:var(--d-orangeSoft); border-bottom:2px solid var(--d-orange); border-radius:2px; padding:0 2px; }
      .dash-mtable { width:100%; border-collapse:collapse; margin-top:12px; font-size:12.5px; }
      .dash-mtable th, .dash-mtable td { border:1px solid var(--d-border); padding:7px 10px; text-align:left; }
      .dash-mtable th { background:var(--d-surface2); font-weight:700; }

      .dash-split { display:grid; grid-template-columns:1.5fr 1fr; }
      .dash-split-main { border-right:1px solid var(--d-border); }
      .dash-split .dash-doc { padding:16px; }
      .dash-outline { padding:16px; display:flex; flex-direction:column; gap:2px; }
      .dash-ol { font-size:12.5px; color:var(--d-text2); padding:7px 10px; border-radius:8px; border-left:2px solid transparent; }
      .dash-ol.lvl-2 { padding-left:20px; font-size:12px; }
      .dash-ol.lvl-3 { padding-left:32px; font-size:12px; color:var(--d-text3); }
      .dash-ol.is-on { color:var(--d-orangeText); background:var(--d-orangeSoft); border-left-color:var(--d-orange); font-weight:600; }
      .dash-mr { display:flex; align-items:center; gap:8px; font-size:12.5px; color:var(--d-text2); margin-top:8px; }
      .dash-check { color:var(--d-green); font-weight:800; }

      .dash-comment { display:flex; gap:11px; margin:0 16px 16px; padding:12px;
        background:var(--d-surface2); border:1px solid var(--d-border); border-radius:12px; }
      .dash-avatar { width:28px; height:28px; border-radius:999px; flex-shrink:0; color:#fff; font-size:11px; font-weight:700;
        display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#FF7A45,#FB5418); }
      .dash-comment-h { font-size:12.5px; font-weight:700; }
      .dash-comment-t { font-size:11px; font-weight:500; color:var(--d-text3); margin-left:6px; }
      .dash-comment p { font-size:12.5px; color:var(--d-text2); line-height:1.5; margin-top:4px; }
      .dash-bubble { font-size:12.5px; font-weight:600; color:var(--d-text); white-space:nowrap; }
      .dash-flow { display:flex; align-items:center; gap:7px; margin-top:9px; flex-wrap:wrap; }
      .dash-flow-step { font-size:11.5px; font-weight:600; color:var(--d-text3); padding:4px 9px; border-radius:999px; background:var(--d-surface3); }
      .dash-flow-step.is-done { color:var(--d-green); background:var(--d-greenSoft); }
      .dash-flow-step.is-now { color:var(--d-orangeText); background:var(--d-orangeSoft); }
      .dash-flow-arrow { color:var(--d-text3); font-size:11px; }

      /* Mobile: un-float every overlay panel (stack in flow), stack the split
         editor, and let the wide markdown table scroll instead of crushing. */
      @media (max-width: 640px) {
        .dash-float,
        .dash-float-gen,
        .dash-float-create,
        .dash-float-tr,
        .dash-float-br,
        .dash-float-bl {
          position: static !important;
          inset: auto !important;
          width: auto !important;
          margin-top: 12px;
          box-shadow: 0 12px 26px -16px rgba(20,16,12,0.4);
        }
        .dash-split { grid-template-columns: 1fr; }
        .dash-split-main { border-right: none; border-bottom: 1px solid var(--d-border); }
        .dash-mtable { display: block; overflow-x: auto; }
        .dash-h1 { font-size: 20px; }
      }
    `}</style>
  );
}
