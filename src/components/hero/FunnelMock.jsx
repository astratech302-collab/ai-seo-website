"use client";

import { useEffect, useState } from "react";
import { MockStage, KitStyles } from "@/components/agents/mockups/kit";

const SIGNALS = [
  { k: "Scroll depth", v: "72%" },
  { k: "Viewed", v: "Glow Serum ×3" },
  { k: "Time on page", v: "2m 10s" },
  { k: "Came from", v: "Instagram" },
];

const SEGMENTS = ["Just browsing", "Hesitant", "Enthusiastic"];

const STEPS = ["Capture intent", "Segment the visitor", "Place widgets"];

/**
 * Hero visual: the personalization funnel. Intent signals -> visitor segment ->
 * widgets placed where they fit. Cycles through the three steps (state-driven loop).
 * Store and numbers are fictional.
 */
export default function FunnelMock() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2600);
    return () => clearInterval(id);
  }, []);

  // step 3 = hold with everything shown, then loop back to 0
  const on = (i) => step >= i;
  const live = Math.min(step, 2);

  return (
    <div className="fn-wrap" style={{ maxWidth: 1040, margin: "0 auto" }}>
      <MockStage>
        <div className="fn-funnel">
          {/* 1 — capture intent */}
          <div className={`fn-step fn-s1${on(0) ? " is-on" : ""}${live === 0 ? " is-live" : ""}`}>
            <div className="fn-head">
              <span className="fn-num">1</span>
              <span className="fn-title">{STEPS[0]}</span>
              <span className="fn-tag">Live visitor</span>
            </div>
            <div className="fn-signals">
              {SIGNALS.map((s) => (
                <div key={s.k} className="fn-sig">
                  <span className="fn-sig-k">{s.k}</span>
                  <span className="fn-sig-v">{s.v}</span>
                </div>
              ))}
            </div>
            <div className="fn-bar" aria-hidden>
              <span style={{ width: on(0) ? "72%" : "0%" }} />
            </div>
          </div>

          <span className="fn-link" aria-hidden>→</span>

          {/* 2 — segment */}
          <div className={`fn-step fn-s2${on(1) ? " is-on" : ""}${live === 1 ? " is-live" : ""}`}>
            <div className="fn-head">
              <span className="fn-num">2</span>
              <span className="fn-title">{STEPS[1]}</span>
              <span className="fn-tag">Intent score 86</span>
            </div>
            <div className="fn-segs">
              {SEGMENTS.map((s, i) => (
                <span key={s} className={`fn-seg${i === 2 && on(1) ? " is-hit" : ""}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <span className="fn-link" aria-hidden>→</span>

          {/* 3 — place widgets */}
          <div className={`fn-step fn-s3${on(2) ? " is-on" : ""}${live === 2 ? " is-live" : ""}`}>
            <div className="fn-head">
              <span className="fn-num">3</span>
              <span className="fn-title">{STEPS[2]}</span>
              <span className="fn-tag">Shown to this visitor</span>
            </div>
            <div className="fn-page">
              <div className="fn-page-img" />
              <div className="fn-page-col">
                <span className="fn-line" style={{ width: "70%" }} />
                <span className="fn-line" style={{ width: "40%" }} />
                <span className={`fn-widget fn-w1${on(2) ? " is-in" : ""}`}>Bundle &amp; save 15%</span>
                <span className="fn-btn">Add to cart</span>
                <span className={`fn-widget fn-w2${on(2) ? " is-in" : ""}`}>Free shipping unlocked</span>
              </div>
            </div>
          </div>
        </div>
      </MockStage>
      <KitStyles />
      <style>{`
        .fn-funnel { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); align-items: stretch; gap: 0; }
        .fn-step {
          background: var(--surface); border: 1px solid var(--line); border-radius: 16px;
          padding: 14px 16px; box-shadow: var(--shadow-sm);
          opacity: .45; transition: opacity .4s ease, border-color .4s ease, box-shadow .4s ease, transform .4s ease;
        }
        .fn-step.is-on { opacity: 1; }
        .fn-step.is-live { border-color: var(--brand); box-shadow: var(--shadow-orange); }
        .fn-head { display: flex; align-items: center; gap: 9px; margin-bottom: 11px; }
        .fn-num {
          width: 22px; height: 22px; border-radius: 99px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff; background: var(--grad);
        }
        .fn-title { font-size: 14px; font-weight: 600; color: var(--ink); }
        .fn-tag {
          margin-left: auto; font-size: 11px; font-weight: 600; color: var(--brand-600);
          background: var(--brand-tint); border-radius: 99px; padding: 3px 9px; white-space: nowrap;
        }
        .fn-signals { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; }
        .fn-sig {
          background: var(--surface-soft); border: 1px solid var(--line); border-radius: 10px;
          padding: 8px 10px; display: flex; flex-direction: column; gap: 2px;
        }
        .fn-sig-k { font-size: 11px; color: var(--ink-3); }
        .fn-sig-v { font-size: 13px; font-weight: 600; color: var(--ink); }
        .fn-bar { height: 5px; border-radius: 99px; background: var(--line); margin-top: 11px; overflow: hidden; }
        .fn-bar span { display: block; height: 100%; background: var(--grad); border-radius: 99px; transition: width 1.1s ease; }
        .fn-link { align-self: center; color: var(--brand); font-size: 20px; font-weight: 600; line-height: 1; padding: 0 10px; }
        .fn-segs { display: flex; gap: 8px; flex-wrap: wrap; }
        .fn-seg {
          font-size: 12.5px; font-weight: 600; color: var(--ink-2); background: var(--surface-soft);
          border: 1px solid var(--line); border-radius: 99px; padding: 6px 12px;
          transition: all .35s ease;
        }
        .fn-seg.is-hit { color: #fff; background: var(--grad); border-color: transparent; box-shadow: var(--shadow-orange); }
        .fn-page { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 12px; align-items: stretch; }
        .fn-page-img { border-radius: 10px; min-height: 96px; background: linear-gradient(160deg, var(--brand-tint), var(--surface-soft)); border: 1px solid var(--line); }
        .fn-page-col { display: flex; flex-direction: column; gap: 7px; justify-content: center; }
        .fn-line { height: 8px; border-radius: 99px; background: var(--line); display: block; }
        .fn-btn {
          font-size: 12px; font-weight: 600; text-align: center; color: #fff; background: var(--surface-ink);
          border-radius: 8px; padding: 7px 0;
        }
        .fn-widget {
          font-size: 11.5px; font-weight: 600; color: var(--brand-600); background: var(--brand-tint);
          border: 1.5px dashed var(--brand); border-radius: 8px; padding: 6px 9px;
          opacity: 0; transform: translateY(6px) scale(.97); transition: opacity .45s ease, transform .45s ease;
        }
        .fn-widget.is-in { opacity: 1; transform: none; }
        .fn-w2.is-in { transition-delay: .35s; }
        @media (prefers-reduced-motion: reduce) {
          .fn-step, .fn-seg, .fn-widget, .fn-bar span { transition: none; }
        }
        @media (max-width: 860px) {
          .fn-funnel { grid-template-columns: 1fr; }
          .fn-link { transform: rotate(90deg); padding: 8px 0; }
        }
      `}</style>
    </div>
  );
}
