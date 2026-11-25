"use client";

import { useEffect, useState } from "react";
import { MockStage, KitStyles } from "@/components/agents/mockups/kit";
import { NEEDS, PRODUCTS } from "@/data/onsite";
import { sortForNeed } from "@/lib/collectionSort";

const SIGNALS = [
  { k: "Searched", v: "laptop backpack" },
  { k: "Viewed", v: "Metro Slim ×3" },
  { k: "Time on page", v: "2m 10s" },
  { k: "Came from", v: "Instagram ad" },
];

const STEPS = ["Read intent", "Sort 1:1", "Match the landing page"];
const TOP = sortForNeed(PRODUCTS, NEEDS[0]).slice(0, 3);

/**
 * Hero visual: shopper intent -> collection sorted for this session -> audience matched
 * to its landing page. Cycles through the three steps. Store and shopper are fictional.
 */
export default function FunnelMock() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStep(3));
      return () => cancelAnimationFrame(raf);
    }
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2600);
    return () => clearInterval(id);
  }, []);

  // step 3 = hold with everything shown, then loop back to 0
  const state = (i) => `${step >= i ? " is-on" : ""}${Math.min(step, 2) === i ? " is-live" : ""}`;

  return (
    <div className="fn-wrap" style={{ maxWidth: 1040, margin: "0 auto" }}>
      <MockStage>
        <div className="fn-funnel">
          <div className={`fn-step${state(0)}`}>
            <div className="fn-head">
              <span className="fn-num">1</span>
              <span className="fn-title">{STEPS[0]}</span>
              <span className="fn-tag">Live shopper</span>
            </div>
            <div className="fn-signals">
              {SIGNALS.map((s) => (
                <div key={s.k} className="fn-sig">
                  <span className="fn-sig-k">{s.k}</span>
                  <span className="fn-sig-v">{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="fn-link" aria-hidden>→</span>

          <div className={`fn-step${state(1)}`}>
            <div className="fn-head">
              <span className="fn-num">2</span>
              <span className="fn-title">{STEPS[1]}</span>
              <span className="fn-tag">This session</span>
            </div>
            <div className="fn-products">
              {TOP.map((p, i) => (
                <div key={p.id} className="fn-product" style={{ transitionDelay: `${i * 0.14}s` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.name} backpack`} width="360" height="450" />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="fn-link" aria-hidden>→</span>

          <div className={`fn-step${state(2)}`}>
            <div className="fn-head">
              <span className="fn-num">3</span>
              <span className="fn-title">{STEPS[2]}</span>
            </div>
            <span className="fn-audience">Audience: commuters from Instagram</span>
            <div className="fn-page">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TOP[0].image} alt="" width="360" height="450" />
              <div className="fn-page-col">
                <b>Your commute, carried well</b>
                <span className="fn-line" style={{ width: "80%" }} />
                <span className="fn-line" style={{ width: "55%" }} />
                <span className="fn-btn">Shop laptop packs</span>
              </div>
            </div>
          </div>
        </div>
      </MockStage>
      <KitStyles />
      <style>{`
        .fn-funnel { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); align-items: stretch; gap: 0; text-align: left; }
        .fn-step {
          background: var(--surface); border: 1px solid var(--line); border-radius: 16px;
          padding: 14px 16px; box-shadow: var(--shadow-sm);
          opacity: .45; transition: opacity .4s ease, border-color .4s ease, box-shadow .4s ease;
        }
        .fn-step.is-on { opacity: 1; }
        .fn-step.is-live { border-color: var(--brand); box-shadow: var(--shadow-orange); }
        .fn-head { display: flex; align-items: center; gap: 9px; margin-bottom: 11px; }
        .fn-num {
          width: 22px; height: 22px; border-radius: 99px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: var(--surface); background: var(--grad);
        }
        .fn-title { font-size: 14px; font-weight: 600; color: var(--ink); }
        .fn-tag {
          margin-left: auto; font-size: 11px; font-weight: 600; color: var(--brand-600);
          background: var(--brand-tint); border-radius: 99px; padding: 3px 9px; white-space: nowrap;
        }
        .fn-signals { display: flex; flex-direction: column; gap: 7px; }
        .fn-sig {
          background: var(--surface-soft); border: 1px solid var(--line); border-radius: 10px;
          padding: 8px 10px; display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px;
        }
        .fn-sig-k { color: var(--ink-3); }
        .fn-sig-v { font-weight: 600; color: var(--ink); text-align: right; }
        .fn-products { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; }
        .fn-product { display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; line-height: 1.3; color: var(--ink-2); transform: translateY(8px); transition: transform .45s ease; }
        .fn-step.is-on .fn-product { transform: none; }
        .fn-product img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 9px; }
        .fn-link { align-self: center; color: var(--brand); font-size: 20px; font-weight: 600; line-height: 1; padding: 0 10px; }
        .fn-audience { display: inline-block; font-size: 11.5px; font-weight: 600; color: var(--brand-600); background: var(--brand-tint); border-radius: 99px; padding: 4px 10px; margin-bottom: 10px; }
        .fn-page { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 12px; align-items: center; }
        .fn-page img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 10px; }
        .fn-page-col { display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; line-height: 1.35; color: var(--ink); }
        .fn-line { height: 7px; border-radius: 99px; background: var(--line); display: block; }
        .fn-btn { font-size: 11.5px; font-weight: 600; text-align: center; color: var(--surface); background: var(--surface-ink); border-radius: 8px; padding: 7px 4px; }
        @media (prefers-reduced-motion: reduce) { .fn-step, .fn-product { transition: none; } }
        @media (max-width: 860px) {
          .fn-funnel { grid-template-columns: 1fr; }
          .fn-link { transform: rotate(90deg); padding: 8px 0; justify-self: center; }
        }
      `}</style>
    </div>
  );
}
