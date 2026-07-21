import { TopHead, Chip, TabNav } from "./dash";
import { EngineLogo } from "@/components/brand/EngineLogo";

/**
 * Reusable dashboard SCREENS composed from the shared dash kit, reused across
 * multiple agents (Tracked Prompts, Technical audit, engine-share bars, KPI row,
 * GEO checklist, approval queue). Faithful to ../ai-seo-frontend. Data-driven.
 */

const AVA = ["#FB5418", "#14ACBC", "#7C5CD1", "#1A9E63", "#C98A12", "#20808D"];

function Avatars({ names }) {
  const shown = names.slice(0, 3);
  const extra = names.length - shown.length;
  return (
    <span className="scr-avatars">
      {shown.map((n, i) => (
        <span key={n} className="scr-ava" style={{ background: AVA[i % AVA.length] }}>{n[0]}</span>
      ))}
      {extra > 0 && <span className="scr-ava scr-ava-more">+{extra}</span>}
    </span>
  );
}

/* Tracked Prompts — how AI engines mention/rank the brand across engines. */
export function TrackedPromptsScreen({ title = "Tracked Prompts", meta = "How AI engines mention and rank your brand", badge, rows, engine = "ChatGPT", compact }) {
  return (
    <div className={`dash-card ${compact ? "scr-compact" : ""}`}>
      <TopHead
        title={<span className="scr-title-badge">{title}{badge && <span className="dash-chip dash-chip-neutral">{badge}</span>}</span>}
        meta={meta}
      />
      <div className="scr-engpills">
        {["ChatGPT", "Claude", "Gemini", "Perplexity"].map((e) => (
          <span key={e} className={`scr-engpill ${e === engine ? "is-on" : ""}`}>
            <EngineLogo name={e} size={13} />{e}
          </span>
        ))}
      </div>
      <div className="dash-table">
        <div className="dash-tr dash-th scr-tp-row">
          <span>Prompt</span><span>Position</span><span>Brands mentioned</span><span>Cited</span>
        </div>
        {rows.map((r) => (
          <div className="dash-tr scr-tp-row" key={r.q}>
            <span className="dash-td-title">{r.q}</span>
            <span className="scr-pos">{r.pos || "—"}</span>
            <Avatars names={r.brands} />
            <span>{r.cited ? <Chip tone="green">✓ Cited</Chip> : <Chip tone="neutral">Not cited</Chip>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Technical SEO / GEO audit issue list. */
export function TechnicalScreen({ title = "Technical SEO / GEO", meta = "Last crawl 6m ago", rows, tabs = true }) {
  return (
    <div className="dash-card">
      <TopHead title={title} meta={meta} right={<span className="dash-btn-outline">↻ Re-run</span>} />
      {tabs && <TabNav tabs={[{ label: "Global", count: rows.length }, { label: "Pages", count: 23 }]} active="Global" />}
      <div className="dash-table" style={{ paddingTop: tabs ? 8 : 0 }}>
        <div className="dash-tr dash-th scr-tech-row">
          <span>Issue</span><span>Channel</span><span>Priority</span><span></span>
        </div>
        {rows.map((r) => (
          <div className="dash-tr scr-tech-row" key={r.issue}>
            <span className="dash-td-title">{r.issue}</span>
            <span><Chip tone={r.channel === "GEO" ? "violet" : "cyan"}>{r.channel}</Chip></span>
            <span>
              {r.fixing
                ? <Chip tone="cyan">Agent fixing</Chip>
                : <Chip tone={r.priority === "High" ? "orange" : r.priority === "Medium" ? "amber" : "neutral"}>{r.priority}</Chip>}
            </span>
            <span className="scr-solution">{r.fixing ? "" : "⚡ Solution"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Engine / competitor share bars. rows: [{name, hex, share, change, you}] */
export function ShareBarsScreen({ title = "Share of AI citations", meta, rows, head = true }) {
  return (
    <div className="dash-card">
      {head && <TopHead title={title} meta={meta} />}
      <div className="dash-pad">
        {!head && <span className="dash-eyebrow" style={{ display: "block", marginBottom: 12 }}>{title}</span>}
        <div className="scr-ebars">
          {rows.map((b) => (
            <div className="scr-ebar" key={b.name}>
              <span className="scr-ebar-name"><span className="scr-engdot" style={{ background: b.hex }} />{b.name}</span>
              <span className="scr-ebar-track"><span className="scr-ebar-fill" style={{ width: `${b.share}%`, background: b.hex }} /></span>
              <span className="scr-ebar-share">{b.share}%</span>
              <span className={`scr-ebar-chg ${b.change >= 0 ? "up" : "dn"}`}>{b.change >= 0 ? "+" : ""}{b.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* KPI tile row. cards: [{label, value, suffix, delta, up}] */
export function KpiRow({ cards, title, meta, right }) {
  return (
    <div className="dash-card">
      {title && <TopHead title={title} meta={meta} right={right} />}
      <div className="scr-kpis">
        {cards.map((c) => (
          <div className="scr-kpi" key={c.label}>
            <div className="scr-kpi-top">
              <span className="dash-eyebrow">{c.label}</span>
              <span className={`scr-kpi-d ${c.up ? "up" : "dn"}`}>{c.up ? "▲" : "▼"} {c.delta}</span>
            </div>
            <div className="scr-kpi-v">{c.value}<span className="scr-kpi-s">{c.suffix}</span></div>
            <svg className="scr-spark" viewBox="0 0 120 28" preserveAspectRatio="none">
              <polyline points={c.up ? "0,22 20,18 40,20 60,12 80,14 100,6 120,4" : "0,6 20,10 40,8 60,16 80,14 100,20 120,24"}
                fill="none" stroke={c.up ? "#1A9E63" : "#FB5418"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* GEO readiness checklist. rows: [{label, desc, done}] */
export function GeoCheckScreen({ title = "GEO readiness", meta, rows }) {
  return (
    <div className="dash-card">
      <TopHead title={title} meta={meta} />
      <div className="scr-geo">
        {rows.map((r) => (
          <div className="scr-geo-row" key={r.label}>
            <span className={`scr-geo-node ${r.done ? "is-done" : ""}`}>{r.done ? "✓" : ""}</span>
            <div className="scr-geo-txt">
              <b>{r.label}</b>
              <span>{r.desc}</span>
            </div>
            {!r.done && <span className="dash-btn-outline scr-queue">Queue</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Approval / recommendations queue. rows: [{tag, tone, title, desc, approved}] */
export function TaskQueueScreen({ title, meta, rows, right }) {
  return (
    <div className="dash-card">
      <TopHead title={title} meta={meta} right={right} />
      <div className="scr-tasks">
        {rows.map((t) => (
          <div className={`scr-task ${t.approved ? "is-approved" : ""}`} key={t.title}>
            <div className="scr-task-b">
              <Chip tone={t.tone}>{t.tag}</Chip>
              <div className="scr-task-t">{t.title}</div>
              <div className="scr-task-d">{t.desc}</div>
            </div>
            <div className="scr-task-a">
              {t.approved
                ? <Chip tone="green">✓ Approved</Chip>
                : <><span className="dash-btn-outline">Review</span><span className="dash-btn-primary">Approve</span></>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* AI answer card — a chat/AI-Overview answer citing the brand. */
export function AnswerCard({ label = "ChatGPT", engine = "ChatGPT", q, answer, engines = [], overview }) {
  return (
    <div className="dash-card">
      <div className="scr-ac-head">
        {overview ? <span className="scr-ac-g">G</span> : <EngineLogo name={engine} size={18} />}
        <span className="scr-ac-label">{label}</span>
      </div>
      <div className="scr-ac-body">
        <div className="scr-ac-q">{q}</div>
        <div className="scr-ac-a">{answer}</div>
        {engines.length > 0 && (
          <div className="scr-ac-cite">
            <span className="scr-ac-cite-l">Cited</span>
            {engines.map((e) => <EngineLogo key={e} name={e} size={15} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* Reddit threads the AI pulls from. rows: [{up, sub, title, cited}] */
export function RedditThreads({ title = "Community threads", meta = "Where AI reads opinions in your category", rows }) {
  return (
    <div className="dash-card">
      <TopHead title={title} meta={meta} />
      <div className="scr-rt">
        {rows.map((r) => (
          <div className="scr-rt-row" key={r.title}>
            <span className="scr-rt-up"><span className="scr-rt-arrow">▲</span>{r.up}</span>
            <div className="scr-rt-b">
              <span className="scr-rt-sub">r/{r.sub}</span>
              <span className="scr-rt-t">{r.title}</span>
            </div>
            {r.cited && <Chip tone="green">✓ Cited by AI</Chip>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreensStyles() {
  return (
    <style>{`
      .scr-title-badge { display:inline-flex; align-items:center; gap:9px; }
      .scr-compact { max-width:560px; }
      .scr-engpills { display:flex; gap:7px; padding:12px 16px 0; flex-wrap:wrap; }
      .scr-engpill { display:inline-flex; align-items:center; gap:6px; font-size:11.5px; font-weight:500;
        color:var(--d-text2); border:1px solid var(--d-border); border-radius:999px; padding:5px 11px; }
      .scr-engpill.is-on { color:var(--d-orangeText); background:var(--d-orangeSoft); border-color:var(--d-orange); }
      .scr-engdot { width:9px; height:9px; border-radius:999px; display:inline-block; flex-shrink:0; }

      .scr-tp-row { grid-template-columns: 2fr 0.6fr 1.3fr 0.9fr; }
      .scr-tech-row { grid-template-columns: 2.2fr 0.7fr 0.9fr 0.8fr; }
      .scr-pos { font-size:12.5px; font-weight:700; color:var(--d-text); }
      .scr-solution { font-size:11.5px; font-weight:600; color:var(--d-orangeText); text-align:right; }

      .scr-avatars { display:inline-flex; align-items:center; }
      .scr-ava { width:24px; height:24px; border-radius:999px; margin-left:-7px; border:2px solid #fff;
        color:#fff; font-size:10px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; }
      .scr-ava:first-child { margin-left:0; }
      .scr-ava-more { background:var(--d-surface3) !important; color:var(--d-text2); }

      .scr-ebars { display:flex; flex-direction:column; gap:12px; }
      .scr-ebar { display:flex; align-items:center; gap:10px; }
      .scr-ebar-name { display:inline-flex; align-items:center; gap:8px; width:116px; flex-shrink:0; font-size:13px; font-weight:600; }
      .scr-ebar-track { flex:1; height:9px; border-radius:999px; background:var(--d-surface3); overflow:hidden; }
      .scr-ebar-fill { display:block; height:100%; border-radius:999px; }
      .scr-ebar-share { font-size:12.5px; font-weight:700; width:38px; text-align:right; }
      .scr-ebar-chg { font-size:11px; font-weight:600; width:30px; text-align:right; }
      .scr-ebar-chg.up { color:var(--d-green); } .scr-ebar-chg.dn { color:var(--d-text3); }

      .scr-kpis { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--d-border); }
      .scr-kpi { background:#fff; padding:15px 16px; }
      .scr-kpi-top { display:flex; align-items:center; justify-content:space-between; gap:8px; }
      .scr-kpi-d { font-size:10.5px; font-weight:700; padding:2px 7px; border-radius:999px; }
      .scr-kpi-d.up { color:var(--d-green); background:var(--d-greenSoft); }
      .scr-kpi-d.dn { color:var(--d-orangeText); background:var(--d-orangeSoft); }
      .scr-kpi-v { font-size:26px; font-weight:800; letter-spacing:-.02em; margin-top:8px; }
      .scr-kpi-s { font-size:14px; color:var(--d-text3); font-weight:700; margin-left:2px; }
      .scr-spark { width:100%; height:26px; margin-top:6px; display:block; }

      .scr-geo { padding:6px 16px 14px; }
      .scr-geo-row { display:flex; align-items:center; gap:12px; padding:11px 0; border-top:1px solid var(--d-border); }
      .scr-geo-row:first-child { border-top:none; }
      .scr-geo-node { width:22px; height:22px; border-radius:999px; flex-shrink:0; display:inline-flex; align-items:center;
        justify-content:center; font-size:11px; font-weight:800; color:#fff; background:var(--d-surface3); border:2px solid var(--d-borderStrong); }
      .scr-geo-node.is-done { background:var(--d-green); border-color:var(--d-green); }
      .scr-geo-txt { flex:1; display:flex; flex-direction:column; }
      .scr-geo-txt b { font-size:13px; font-weight:600; } .scr-geo-txt span { font-size:11.5px; color:var(--d-text3); margin-top:1px; }
      .scr-queue { padding:5px 12px; }

      .scr-tasks { display:flex; flex-direction:column; gap:10px; padding:14px 16px; }
      .scr-task { display:flex; align-items:center; justify-content:space-between; gap:12px;
        background:var(--d-surface2); border:1px solid var(--d-border); border-radius:12px; padding:12px 14px; }
      .scr-task.is-approved { opacity:.62; }
      .scr-task-t { font-size:13px; font-weight:700; margin-top:7px; }
      .scr-task-d { font-size:11.5px; color:var(--d-text2); margin-top:3px; }
      .scr-task-a { display:flex; align-items:center; gap:8px; flex-shrink:0; }

      /* answer card */
      .scr-ac-head { display:flex; align-items:center; gap:9px; padding:13px 16px; border-bottom:1px solid var(--d-border); }
      .scr-ac-g { width:22px; height:22px; border-radius:999px; background:conic-gradient(#4285F4,#EA4335,#FBBC05,#34A853,#4285F4); color:#fff; font-size:12px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }
      .scr-ac-label { font-size:13px; font-weight:700; color:var(--d-text); }
      .scr-ac-body { padding:16px; }
      .scr-ac-q { font-size:14.5px; font-weight:700; color:var(--d-text); }
      .scr-ac-a { font-size:13.5px; line-height:1.6; color:var(--d-text2); margin-top:10px; }
      .scr-ac-a mark { background:var(--d-orangeSoft); color:var(--d-orangeText); font-weight:700; padding:1px 5px; border-radius:5px; }
      .scr-ac-cite { display:flex; align-items:center; gap:8px; margin-top:14px; padding-top:12px; border-top:1px solid var(--d-border); }
      .scr-ac-cite-l { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--d-text3); }

      /* reddit threads */
      .scr-rt { padding:6px 12px 12px; }
      .scr-rt-row { display:flex; align-items:center; gap:12px; padding:11px 6px; border-top:1px solid var(--d-border); }
      .scr-rt-row:first-child { border-top:none; }
      .scr-rt-up { display:flex; flex-direction:column; align-items:center; gap:1px; width:34px; flex-shrink:0; font-size:12px; font-weight:700; color:var(--d-text2); }
      .scr-rt-arrow { color:#FF4500; font-size:11px; }
      .scr-rt-b { flex:1; display:flex; flex-direction:column; min-width:0; }
      .scr-rt-sub { font-size:11px; font-weight:600; color:#FF4500; }
      .scr-rt-t { font-size:13px; font-weight:600; color:var(--d-text); margin-top:2px; line-height:1.3; }
    `}</style>
  );
}
