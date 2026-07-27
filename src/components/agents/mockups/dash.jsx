/**
 * Shared dashboard-reproduction kit for the agent feature mockups.
 *
 * These primitives + tokens mirror the real Geobuild product
 * (../ai-seo-frontend: colors.js, Chip, Card, Topbar, DataTable) so every agent's
 * mockups look like authentic product screenshots. Content-agent has its own
 * bespoke file (content.jsx); the other agents compose from this kit.
 *
 * Pure presentational (server components). Render <DashBaseStyles/> once per page
 * (each agent's styles component does this).
 */

export function AppIcon({ children }) {
  return (
    <span className="dash-appicon" aria-hidden>
      {children || (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2.4" />
          <circle cx="12" cy="12" r="3.2" fill="#fff" />
        </svg>
      )}
    </span>
  );
}

export function TopHead({ title, meta, right, icon }) {
  return (
    <div className="dash-top">
      <div className="dash-top-id">
        <AppIcon>{icon}</AppIcon>
        <div>
          <div className="dash-top-title">{title}</div>
          {meta && <div className="dash-top-meta">{meta}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

export function Chip({ tone = "neutral", children }) {
  return <span className={`dash-chip dash-chip-${tone}`}>{children}</span>;
}

export function TabNav({ tabs, active }) {
  return (
    <div className="dash-tabs">
      {tabs.map((t) => {
        const label = typeof t === "string" ? t : t.label;
        const count = typeof t === "string" ? null : t.count;
        return (
          <span key={label} className={`dash-tab ${label === active ? "is-on" : ""}`}>
            {label}
            {count != null && <span className="dash-tab-c">{count}</span>}
          </span>
        );
      })}
    </div>
  );
}

export function StatCard({ label, value, delta, deltaTone = "green" }) {
  return (
    <div className="dash-stat">
      <div className="dash-stat-v">{value}</div>
      <div className="dash-stat-l">{label}</div>
      {delta && <div className={`dash-stat-d dash-d-${deltaTone}`}>{delta}</div>}
    </div>
  );
}

/** Circular score ring. */
export function Gauge({ value, label, sub, tone = "orange" }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const stroke = tone === "green" ? "#1A9E63" : "#FB5418";
  return (
    <div className="dash-gauge">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#F1EEE9" strokeWidth="8" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={stroke} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 36 36)" />
        <text x="36" y="37" textAnchor="middle" dominantBaseline="central"
          fontSize="18" fontWeight="800" fill="#1C1916">{value}</text>
      </svg>
      <div className="dash-gauge-l"><b>{label}</b>{sub && <span>{sub}</span>}</div>
    </div>
  );
}

const ENGINE_HEX = {
  ChatGPT: "#10A37F",
  Perplexity: "#20808D",
  Claude: "#D97757",
  Gemini: "#4081EC",
};
export function EngineDot({ name, on = true }) {
  return (
    <span className="dash-engdot" title={name}>
      <span className="dash-engdot-d" style={{ background: on ? ENGINE_HEX[name] : "transparent", borderColor: ENGINE_HEX[name], opacity: on ? 1 : 0.4 }} />
    </span>
  );
}

/** Horizontal share-of-voice bars. rows: [{n, v, you}] */
export function Bars({ rows }) {
  return (
    <div className="dash-bars">
      {rows.map((b) => (
        <div className="dash-barrow" key={b.n}>
          <span className="dash-barlabel">{b.n}</span>
          <span className="dash-bartrack"><span className={`dash-barfill ${b.you ? "is-you" : ""}`} style={{ width: `${b.v}%` }} /></span>
          <span className="dash-barval">{b.v}%</span>
        </div>
      ))}
    </div>
  );
}

export function Btn({ children, tone = "primary" }) {
  return <span className={tone === "primary" ? "dash-btn-primary" : "dash-btn-outline"}>{children}</span>;
}

export function DashBaseStyles() {
  return (
    <style>{`
      .hf-stage {
        --d-orange:#FB5418; --d-orangeHover:#E5430C; --d-orangeText:#CF400E; --d-orangeSoft:#FFEDE3; --d-orangeSoft2:#FFF6F0;
        --d-text:#1C1916; --d-text2:#6C665E; --d-text3:#9E978D;
        --d-border:#EBE6DF; --d-borderStrong:#DCD5CB; --d-surface2:#FBFAF8; --d-surface3:#F1EEE9; --d-bgGrid:#F1EDE7;
        --d-violet:#7C5CD1; --d-violetSoft:#EEE9FB; --d-green:#1A9E63; --d-greenSoft:#E2F4EB;
        --d-greenDark:#0A6E3D; --d-greenDarkSoft:#D3EBDB; --d-amber:#C98A12; --d-amberSoft:#FBEFD6;
        --d-cyan:#14ACBC; --d-cyanSoft:#DDF4F6; --d-danger:#E5533A;
      }
      .dash-card {
        background:#fff; border:1px solid var(--d-border); border-radius:16px;
        box-shadow:0 40px 80px -34px rgba(20,16,12,.4), 0 8px 20px -12px rgba(20,16,12,.18);
        overflow:hidden; color:var(--d-text); font-size:14px;
      }
      .dash-top { display:flex; align-items:center; justify-content:space-between; gap:12px;
        padding:14px 16px; border-bottom:1px solid var(--d-border); }
      .dash-top-id { display:flex; align-items:center; gap:11px; min-width:0; }
      .dash-appicon { width:34px; height:34px; border-radius:9px; flex-shrink:0; display:inline-flex;
        align-items:center; justify-content:center; background:linear-gradient(135deg,#FF7A45,#FB5418);
        box-shadow:0 8px 18px -8px rgba(251,84,24,.6); color:#fff; }
      .dash-top-title { font-size:15px; font-weight:700; letter-spacing:-.01em; line-height:1.1; }
      .dash-top-meta { font-size:11.5px; color:var(--d-text3); margin-top:2px; }

      .dash-eyebrow { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--d-text3); }

      .dash-chip { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:500;
        letter-spacing:.02em; padding:4px 10px; border-radius:999px; white-space:nowrap; }
      .dash-chip-violet { background:var(--d-violetSoft); color:var(--d-violet); }
      .dash-chip-amber { background:var(--d-amberSoft); color:var(--d-amber); }
      .dash-chip-green { background:var(--d-greenSoft); color:var(--d-green); }
      .dash-chip-greenDark { background:var(--d-greenDarkSoft); color:var(--d-greenDark); }
      .dash-chip-orange { background:var(--d-orangeSoft); color:var(--d-orangeText); }
      .dash-chip-neutral { background:var(--d-surface3); color:var(--d-text2); }
      .dash-chip-cyan { background:var(--d-cyanSoft); color:var(--d-cyan); }

      .dash-tabs { display:flex; gap:6px; padding:12px 16px 0; flex-wrap:wrap; }
      .dash-tab { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:500;
        color:var(--d-text2); padding:6px 12px; border-radius:999px; border:1px solid var(--d-border); background:#fff; }
      .dash-tab.is-on { color:var(--d-orangeText); background:var(--d-orangeSoft); border-color:var(--d-orange); }
      .dash-tab-c { font-size:11px; font-weight:600; opacity:.7; }

      /* table */
      .dash-table { padding:0 6px 8px; }
      .dash-th span { font-size:9.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:var(--d-text3); }
      .dash-tr { display:grid; align-items:center; gap:10px; padding:11px 12px; border-top:1px solid var(--d-border); }
      .dash-th { border-top:none; }
      .dash-td-title { font-size:12.5px; font-weight:600; color:var(--d-text); line-height:1.3; }
      .dash-td-muted { font-size:12px; color:var(--d-text2); }
      .dash-da { font-weight:700; font-size:13px; }
      .dash-da-hi { color:var(--d-greenDark); } .dash-da-mid { color:var(--d-green); }
      .dash-da-low { color:var(--d-amber); } .dash-da-min { color:var(--d-text3); }

      /* floats */
      .dash-float { position:absolute; z-index:3; background:#fff; border:1px solid var(--d-border);
        border-radius:15px; box-shadow:0 30px 60px -22px rgba(20,16,12,.5), 0 6px 16px -10px rgba(20,16,12,.24);
        padding:14px 15px; }

      /* stat cards */
      .dash-statrow { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:14px 16px; }
      .dash-stat { border:1px solid var(--d-border); border-radius:12px; padding:12px 13px; background:var(--d-surface2); }
      .dash-stat-v { font-size:22px; font-weight:800; letter-spacing:-.02em; }
      .dash-stat-l { font-size:11px; color:var(--d-text3); margin-top:2px; }
      .dash-stat-d { font-size:11px; font-weight:700; margin-top:6px; }
      .dash-d-green { color:var(--d-green); } .dash-d-orange { color:var(--d-orangeText); }

      /* gauge */
      .dash-gauge { display:flex; align-items:center; gap:12px; position:relative; }
      .dash-gauge-mid { position:absolute; left:0; top:0; width:72px; height:72px; display:flex; align-items:center; justify-content:center; }
      .dash-gauge-mid span { font-size:17px; font-weight:800; }
      .dash-gauge-l { display:flex; flex-direction:column; }
      .dash-gauge-l b { font-size:14px; } .dash-gauge-l span { font-size:12px; color:var(--d-text3); margin-top:2px; }

      /* engine dots */
      .dash-engines { display:inline-flex; gap:5px; align-items:center; }
      .dash-engdot-d { width:12px; height:12px; border-radius:999px; border:1.5px solid; display:inline-block; }

      /* bars */
      .dash-bars { display:flex; flex-direction:column; gap:9px; }
      .dash-barrow { display:flex; align-items:center; gap:10px; }
      .dash-barlabel { font-size:12px; color:var(--d-text2); width:96px; flex-shrink:0; }
      .dash-bartrack { flex:1; height:10px; border-radius:999px; background:var(--d-surface3); overflow:hidden; }
      .dash-barfill { display:block; height:100%; background:var(--d-text3); border-radius:999px; }
      .dash-barfill.is-you { background:linear-gradient(90deg,#FF7A45,#FB5418); }
      .dash-barval { font-size:11px; color:var(--d-text3); width:32px; text-align:right; flex-shrink:0; }

      /* buttons + misc */
      .dash-btn-primary { font-size:12.5px; font-weight:700; color:#fff; background:linear-gradient(135deg,#FF7A45,#FB5418);
        border-radius:10px; padding:8px 15px; box-shadow:0 8px 18px -8px rgba(251,84,24,.6); }
      .dash-btn-outline { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600;
        color:var(--d-text2); border:1px solid var(--d-border); border-radius:9px; padding:7px 11px; }
      .dash-pad { padding:16px; }
      .dash-check { color:var(--d-green); font-weight:800; }
      .dash-note { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--d-text2); }
      .dash-search { display:flex; align-items:center; gap:9px; border:1px solid var(--d-border); border-radius:10px;
        padding:8px 12px; font-size:12.5px; color:var(--d-text3); }
      .dash-search-ic { width:12px; height:12px; border-radius:999px; border:2px solid var(--d-text3); opacity:.6; }

      /* Mobile: crop the mock to a short "screenshot" — the overlay badge is
         pinned to overlap the card's bottom-right corner (contained, so it never
         overflows the viewport), and table rows are trimmed (see screens.jsx). */
      @media (max-width: 640px) {
        .dash-float {
          position: absolute !important;
          left: auto !important;
          top: auto !important;
          right: 8px !important;
          bottom: 8px !important;
          width: auto !important;
          max-width: 64%;
          padding: 11px 13px;
          box-shadow: 0 14px 30px -14px rgba(20,16,12,0.5);
        }
        .dash-top-title { font-size: 15px; }
        .dash-top-meta { font-size: 12px; }
        .dash-td-title { font-size: 13.5px; }
        .dash-chip { font-size: 12px; padding: 4px 11px; }
        .dash-barlabel { font-size: 13px; width: auto; }
      }
    `}</style>
  );
}
