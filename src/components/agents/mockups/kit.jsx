/**
 * High-fidelity mockup kit — shared primitives that make every agent feature
 * mockup look like a real, polished product UI (app chrome, tables, floating
 * panels, gradient stage) while staying on brand tokens (colors.json → vars).
 *
 * All pieces are purely presentational (no interactivity), so mockups can be
 * server components. Render <KitStyles/> ONCE per page (the showcase does this).
 */

// Subtle film grain for the mockup stage backgrounds (same texture the header uses).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Gradient backdrop tile that holds an app card + floating panels. */
export function MockStage({ children, className = "" }) {
  return (
    <div className={`hf-stage ${className}`}>
      <span className="hf-stage-shape" aria-hidden />
      <span className="hf-stage-shape hf-stage-shape-2" aria-hidden />
      <span className="hf-stage-grain" aria-hidden />
      <div className="hf-stage-inner">{children}</div>
    </div>
  );
}

/* The main white application card with a header row. */
export function AppCard({ icon, title, subtitle, toolbar, children, className = "", style }) {
  return (
    <div className={`hf-card ${className}`} style={style}>
      {(title || toolbar) && (
        <div className="hf-card-head">
          <div className="hf-card-id">
            {icon != null && <span className="hf-appicon">{icon}</span>}
            <div>
              <div className="hf-card-title">{title}</div>
              {subtitle && <div className="hf-card-sub">{subtitle}</div>}
            </div>
          </div>
          {toolbar}
        </div>
      )}
      <div className="hf-card-body">{children}</div>
    </div>
  );
}

/* Small floating panel that overlaps the main card. Position via style. */
export function FloatingCard({ children, className = "", style }) {
  return (
    <div className={`hf-float ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Segmented({ options, active }) {
  return (
    <div className="hf-seg">
      {options.map((o) => (
        <span key={o} className={`hf-seg-opt ${o === active ? "is-on" : ""}`}>
          <span className="hf-seg-box" />
          {o}
        </span>
      ))}
    </div>
  );
}

export function SearchBar({ placeholder = "Search…", style }) {
  return (
    <div className="hf-search" style={style}>
      <span className="hf-search-ic" />
      <span className="hf-search-ph">{placeholder}</span>
    </div>
  );
}

export function Pill({ children, tone = "default" }) {
  return <span className={`hf-pill hf-pill-${tone}`}>{children}</span>;
}

export function Avatar({ initials, tone = "brand" }) {
  return <span className={`hf-avatar hf-avatar-${tone}`}>{initials}</span>;
}

/* Circular progress ring — used for the "human %" / score gauges. */
export function Gauge({ value, label, sub, tone = "green" }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const stroke = tone === "green" ? "#17864b" : "var(--brand)";
  return (
    <div className="hf-gauge">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="var(--surface-soft)" strokeWidth="8" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="hf-gauge-mid">
        <span className="hf-gauge-v">{value}%</span>
      </div>
      <div className="hf-gauge-lbl">
        <b>{label}</b>
        {sub && <span>{sub}</span>}
      </div>
    </div>
  );
}

export function Btn({ children }) {
  return <span className="hf-btn">{children}</span>;
}

export function KitStyles() {
  return (
    <style>{`
      .hf-stage {
        position: relative;
        border-radius: 24px;
        padding: 34px;
        background: linear-gradient(150deg, #fff4ea 0%, #ffe9db 55%, #ffe1cf 100%);
        overflow: hidden;
        isolation: isolate;
      }
      .hf-stage-shape {
        position: absolute; z-index: 0;
        width: 46%; height: 130%; left: -6%; top: 18%;
        background: #FF9E5B; opacity: 0.5;
        border-radius: 40px; transform: rotate(-9deg);
      }
      .hf-stage-shape-2 {
        left: auto; right: -10%; top: auto; bottom: -34%;
        width: 62%; height: 46%;
        background: #FF9E5B; opacity: 0.55; transform: rotate(-4deg);
      }
      .hf-stage-grain {
        position: absolute; inset: 0; z-index: 0; pointer-events: none;
        background-image: ${GRAIN};
        background-size: 72px 72px;
        opacity: 1; mix-blend-mode: overlay;
      }
      .hf-stage-inner { position: relative; z-index: 1; }

      .hf-card {
        background: var(--surface);
        border: 1px solid rgba(18,18,16,0.05);
        border-radius: 18px;
        box-shadow: 0 40px 80px -34px rgba(20,16,12,0.45), 0 8px 20px -12px rgba(20,16,12,0.2);
        overflow: hidden;
      }
      .hf-card-head {
        display: flex; align-items: center; justify-content: space-between; gap: 12px;
        padding: 16px 18px; border-bottom: 1px solid var(--line-soft);
      }
      .hf-card-id { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .hf-appicon {
        width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
        display: inline-flex; align-items: center; justify-content: center;
        background: var(--grad); color: #fff; font-size: 18px;
        box-shadow: var(--shadow-orange);
      }
      .hf-card-title { font-size: 16px; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; line-height: 1.15; }
      .hf-card-sub { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
      .hf-card-body { padding: 16px 18px; }

      .hf-float {
        position: absolute; z-index: 3;
        background: var(--surface);
        border: 1px solid rgba(18,18,16,0.05);
        border-radius: 15px;
        box-shadow: 0 30px 60px -22px rgba(20,16,12,0.5), 0 6px 16px -10px rgba(20,16,12,0.25);
        padding: 15px 16px;
      }

      .hf-seg {
        display: inline-flex; gap: 2px; padding: 4px;
        background: var(--surface-soft); border: 1px solid var(--line); border-radius: 11px;
      }
      .hf-seg-opt {
        display: inline-flex; align-items: center; gap: 7px;
        font-size: 12.5px; font-weight: 600; color: var(--ink-3);
        padding: 6px 12px; border-radius: 8px; white-space: nowrap;
      }
      .hf-seg-opt.is-on { background: var(--surface); color: var(--brand-600); box-shadow: var(--shadow-sm); }
      .hf-seg-box { width: 12px; height: 12px; border-radius: 4px; border: 1.5px solid currentColor; opacity: .6; }

      .hf-search {
        display: flex; align-items: center; gap: 10px;
        border: 1px solid var(--line); border-radius: 999px; padding: 10px 16px;
        background: var(--surface);
      }
      .hf-search-ic { width: 14px; height: 14px; border-radius: 999px; border: 2px solid var(--ink-3); opacity: .5; flex-shrink: 0; }
      .hf-search-ph { font-size: 13.5px; color: var(--ink-3); }

      .hf-pill {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 999px; white-space: nowrap;
      }
      .hf-pill-default { color: var(--ink-2); border: 1px solid var(--line); background: var(--surface); }
      .hf-pill-active { color: var(--brand-600); background: var(--brand-tint); border: 1px solid var(--brand-200); }
      .hf-pill-type { color: var(--brand-600); background: var(--brand-tint); }
      .hf-pill-amber { color: #9a6700; background: rgba(240,180,41,0.16); }
      .hf-pill-green { color: #17864b; background: rgba(23,134,75,0.12); }
      .hf-pill-muted { color: var(--ink-3); background: var(--surface-soft); }

      .hf-avatar {
        width: 28px; height: 28px; border-radius: 999px; flex-shrink: 0;
        display: inline-flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700; color: #fff;
      }
      .hf-avatar-brand { background: var(--grad); }
      .hf-avatar-ink { background: var(--ink); }

      .hf-gauge { display: flex; align-items: center; gap: 12px; position: relative; }
      .hf-gauge-mid { position: absolute; left: 0; top: 0; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; }
      .hf-gauge-v { font-size: 16px; font-weight: 800; color: var(--ink); }
      .hf-gauge-lbl { display: flex; flex-direction: column; }
      .hf-gauge-lbl b { font-size: 14px; color: var(--ink); }
      .hf-gauge-lbl span { font-size: 12px; color: var(--ink-3); margin-top: 2px; }

      .hf-btn {
        display: inline-flex; align-items: center; justify-content: center;
        font-size: 13.5px; font-weight: 700; color: #fff;
        background: var(--grad); border-radius: 11px; padding: 11px 18px;
        box-shadow: var(--shadow-orange);
      }

      /* generic table + text helpers reused by mockups */
      .hf-th { font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
      .hf-td-title { font-size: 13.5px; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; }
      .hf-td { font-size: 12.5px; color: var(--ink-2); }
      .hf-eyebrow { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--ink-3); font-weight: 700; }
      .hf-textline { height: 8px; border-radius: 5px; background: var(--surface-soft); }
      .hf-check { color: #17864b; font-weight: 800; }

      /* Mobile: shrink the decorative stage and pin the overlay panel to overlap
         the card's bottom-right corner (contained), for a short "screenshot" look. */
      @media (max-width: 640px) {
        .hf-stage { padding: 14px; border-radius: 18px; }
        .hf-float {
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
        .hf-card-body { padding: 14px; }
        .hf-card-head { padding: 13px 14px; }
      }
    `}</style>
  );
}
