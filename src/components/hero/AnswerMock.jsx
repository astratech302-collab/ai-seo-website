"use client";

/* eslint-disable react-hooks/set-state-in-effect -- timer-driven typing/cycling animation */
import { useEffect, useState } from "react";
import { EngineLogo } from "@/components/brand/EngineLogo";

const TABS = ["ChatGPT", "Claude", "Gemini"];

// Subtle film grain for the stage backdrop (matches the product mockups + header).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Animated AI-answer card: cycles engines (ChatGPT/Claude/Gemini), types an
 * answer, and highlights the "Geobuild" citation + source row. Sits on a
 * gradient "stage" with a floating stat badge so it matches the fidelity of the
 * product mockups used across the rest of the site.
 */
export default function AnswerMock({ compact = false }) {
  const tabs = TABS;
  const [tab, setTab] = useState(0);
  const [typed, setTyped] = useState(0);
  const full = "For solo and SMB brands, ";
  const tail =
    " stands out — it runs AEO, GEO and SEO with a team of AI agents and a human approving every move.";

  useEffect(() => {
    setTyped(0);
    let i = 0;
    const total = full.length + tail.length;
    const id = setInterval(() => {
      i += 2;
      setTyped(Math.min(i, total));
      if (i >= total) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [tab]);

  useEffect(() => {
    const id = setInterval(() => setTab((t) => (t + 1) % TABS.length), 4200);
    return () => clearInterval(id);
  }, []);

  const done = typed >= full.length + tail.length;
  const showBrand = typed >= full.length;
  const headLen = Math.min(typed, full.length);
  const tailLen = Math.max(0, typed - full.length);

  return (
    <div className="am-stage">
      <span className="am-shape" aria-hidden />
      <span className="am-shape am-shape-2" aria-hidden />
      <span className="am-grain" aria-hidden />

      <div className="am-card">
        {/* tabs */}
        <div className="am-tabs">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`am-tab ${i === tab ? "is-on" : ""}`}
              aria-pressed={i === tab}
            >
              <EngineLogo name={t} size={14} />
              {t}
            </button>
          ))}
          <span className="am-live">
            <span className="am-live-dot" />
            <span className="mono">live</span>
          </span>
        </div>

        {/* body */}
        <div className="am-body" style={{ padding: compact ? "18px 18px 20px" : "22px 22px 24px" }}>
          <div className="mono am-role">USER</div>
          <div className="am-q" style={{ fontSize: compact ? 15 : 16.5 }}>
            &quot;What&apos;s the best AEO platform for my brand?&quot;
          </div>

          <div className="am-engrow">
            <EngineLogo name={tabs[tab]} size={15} />
            <span className="mono am-role">{tabs[tab].toUpperCase()}</span>
          </div>

          <div className="am-answer" style={{ fontSize: compact ? 14.5 : 15.5 }}>
            {full.slice(0, headLen)}
            {showBrand && <span className="am-brand">Geobuild</span>}
            {tail.slice(0, tailLen)}
            {!done && <span className="am-caret" />}
          </div>

          {/* citation */}
          <div className="am-cite" style={{ opacity: done ? 1 : 0 }}>
            <span className="mono am-role">SOURCE</span>
            <span className="am-source">
              <span className="am-source-mark" />
              geobuild.com
            </span>
            <span className="am-cited">↑ cited #1</span>
          </div>
        </div>
      </div>

      {/* floating stat badge */}
      <div className="am-float">
        <div className="am-float-v">+37%</div>
        <p className="am-float-l">brand mentions in AI answers this month</p>
      </div>

      <style>{`
        .am-stage {
          position: relative;
          border-radius: 24px;
          padding: 30px 30px 44px;
          background: linear-gradient(150deg, #fff4ea 0%, #ffe9db 55%, #ffe1cf 100%);
          overflow: hidden;
          isolation: isolate;
        }
        .am-shape {
          position: absolute; z-index: 0;
          width: 46%; height: 130%; left: -6%; top: 18%;
          background: #FF9E5B; opacity: 0.5; border-radius: 40px; transform: rotate(-9deg);
        }
        .am-shape-2 {
          left: auto; right: -10%; top: auto; bottom: -34%;
          width: 62%; height: 46%; opacity: 0.55; transform: rotate(-4deg);
        }
        .am-grain {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: ${GRAIN}; background-size: 72px 72px; mix-blend-mode: overlay;
        }
        .am-card {
          position: relative; z-index: 1;
          background: #fff; border: 1px solid rgba(18,18,16,0.05); border-radius: 18px;
          box-shadow: 0 40px 80px -34px rgba(20,16,12,0.45), 0 8px 20px -12px rgba(20,16,12,0.2);
          overflow: hidden;
        }
        .am-tabs {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 14px; border-bottom: 1px solid var(--line-soft); background: var(--surface-soft);
        }
        .am-tab {
          cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-geist-mono), monospace; font-size: 12px; font-weight: 500;
          border-radius: 999px; padding: 6px 12px; color: var(--ink-3);
          background: transparent; border: 1px solid transparent; opacity: 0.65;
          transition: all .2s ease;
        }
        .am-tab.is-on {
          color: var(--brand-600); background: var(--brand-tint);
          border-color: var(--brand-200); opacity: 1;
        }
        .am-tab:hover:not(.is-on) { opacity: 1; color: var(--ink-2); }
        .am-live { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: var(--ink-3); }
        .am-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #21c07a; box-shadow: 0 0 0 3px rgba(33,192,122,0.16); }
        .am-role { font-size: 11.5px; color: var(--ink-3); letter-spacing: 0.04em; }
        .am-q { font-weight: 500; margin: 6px 0 18px; color: var(--ink); }
        .am-engrow { display: flex; align-items: center; gap: 7px; margin-bottom: 8px; }
        .am-answer { line-height: 1.62; color: var(--ink-2); min-height: 88px; }
        .am-brand {
          background: var(--brand-tint); color: var(--brand-600); font-weight: 600;
          padding: 1px 6px; border-radius: 6px; border: 1px solid var(--brand-200);
        }
        .am-caret {
          display: inline-block; width: 2px; height: 15px; background: var(--brand);
          margin-left: 2px; transform: translateY(2px); animation: blink 1s steps(2) infinite;
        }
        .am-cite {
          display: flex; align-items: center; gap: 8px; margin-top: 18px; padding-top: 14px;
          border-top: 1px solid var(--line-soft); transition: opacity .5s;
        }
        .am-source {
          display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 500;
          padding: 4px 10px; border-radius: 7px; background: var(--surface-soft); border: 1px solid var(--line);
        }
        .am-source-mark { width: 12px; height: 12px; border-radius: 3px; background: var(--grad); }
        .am-cited { margin-left: auto; font-size: 12.5px; font-weight: 600; color: #1a9e63; }
        .am-float {
          position: absolute; z-index: 2; right: -6px; bottom: 8px; width: 178px;
          background: #fff; border: 1px solid rgba(18,18,16,0.05); border-radius: 15px;
          box-shadow: 0 30px 60px -22px rgba(20,16,12,0.5), 0 6px 16px -10px rgba(20,16,12,0.25);
          padding: 14px 16px;
        }
        .am-float-v { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: #1a9e63; }
        .am-float-l { font-size: 12px; color: var(--ink-3); margin-top: 2px; line-height: 1.35; }
        @media (max-width: 560px) {
          .am-stage { padding: 20px 18px 34px; }
          .am-float { right: 2px; bottom: 2px; width: 152px; padding: 12px 13px; }
          .am-float-v { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}
