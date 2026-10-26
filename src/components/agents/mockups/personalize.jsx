import { MockStage } from "./kit";
import { TopHead, Chip } from "./dash";
import { AdLandingMockStyles } from "./adlanding";
import { DEMO_STORE } from "@/data/demoAssets";

/**
 * Hyperpersonalization mockups (intent -> segment -> widgets), built from the shared
 * dash kit. The store (Dewlab), visitor and numbers are fictional.
 */

/* 0 — Capture visitor intent */
function IntentMock() {
  const signals = [
    { k: "Scroll depth", v: "72%", bar: 72 },
    { k: "Product viewed", v: `${DEMO_STORE.product} ×3` },
    { k: "Time on page", v: "2m 10s" },
    { k: "Came from", v: "Instagram" },
    { k: "Cart", v: "1 item added" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Live visitor" meta={`${DEMO_STORE.domain} · ${DEMO_STORE.product}`} right={<Chip tone="green">● Live</Chip>} />
        <div className="dash-table">
          {signals.map((s) => (
            <div className="dash-tr hp-row" key={s.k}>
              <span className="dash-td-muted">{s.k}</span>
              <span className="dash-td-title hp-val">
                {s.bar != null && <span className="hp-bar"><span style={{ width: `${s.bar}%` }} /></span>}
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow">Captured</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>Scrolls, views, clicks and source, as they happen.</p>
      </div>
    </MockStage>
  );
}

/* 1 — Segment every visitor */
function SegmentMock() {
  const segs = [
    { n: "Enthusiastic", share: 22, tone: "orange", hit: true },
    { n: "Hesitant", share: 31, tone: "amber" },
    { n: "Just browsing", share: 47, tone: "neutral" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Segments" meta="Updated as each visitor behaves" right={<Chip tone="neutral">3 segments</Chip>} />
        <div className="dash-table">
          {segs.map((s) => (
            <div className={`dash-tr hp-seg${s.hit ? " is-hit" : ""}`} key={s.n}>
              <span><Chip tone={s.tone}>{s.n}</Chip></span>
              <span className="hp-bar hp-bar-wide"><span style={{ width: `${s.share * 2}%` }} /></span>
              <span className="dash-td-muted">{s.share}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, top: 70, width: 176 }}>
        <Chip tone="orange">This visitor</Chip>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--d-text)", marginTop: 8 }}>Enthusiastic · score 86</p>
      </div>
    </MockStage>
  );
}

/* 2 — Place widgets dynamically */
function WidgetMock() {
  const rows = [
    { w: "Bundle & save 15%", where: "Below the product", who: "Enthusiastic", tone: "orange" },
    { w: "Free shipping bar", where: "Top of page", who: "Hesitant", tone: "amber" },
    { w: "Reviews carousel", where: "Under the title", who: "Just browsing", tone: "neutral" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Widgets" meta="Placed where they fit, per segment" right={<span className="dash-btn-primary">+ Add widget</span>} />
        <div className="dash-table">
          <div className="dash-tr dash-th hp-wrow">
            <span>Widget</span><span>Where</span><span>Shown to</span>
          </div>
          {rows.map((r) => (
            <div className="dash-tr hp-wrow" key={r.w}>
              <span className="dash-td-title">{r.w}</span>
              <span className="dash-td-muted">{r.where}</span>
              <span><Chip tone={r.tone}>{r.who}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <Chip tone="green">✓ Live on store</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>No theme edits. Change any time.</p>
      </div>
    </MockStage>
  );
}

export function HyperMockStyles() {
  return (
    <>
      <AdLandingMockStyles />
      <style>{`
        .hp-row { grid-template-columns: 1fr auto; }
        .hp-val { display: inline-flex; align-items: center; gap: 10px; justify-content: flex-end; }
        .hp-bar { display: inline-block; width: 70px; height: 6px; border-radius: 99px; background: var(--d-surface3); overflow: hidden; }
        .hp-bar > span { display: block; height: 100%; background: var(--d-orange); border-radius: 99px; }
        .hp-bar-wide { width: 100%; }
        .hp-seg { grid-template-columns: auto 1fr auto; }
        .hp-seg.is-hit { background: var(--d-orangeSoft2); }
        .hp-wrow { grid-template-columns: 1.3fr 1fr 1fr; }
      `}</style>
    </>
  );
}

export { IntentMock, SegmentMock, WidgetMock };
