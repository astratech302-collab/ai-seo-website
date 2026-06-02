"use client";

/* eslint-disable react-hooks/set-state-in-effect -- timer-driven typing/cycling animation */
import { useEffect, useState } from "react";
import { EngineLogo } from "@/components/brand/EngineLogo";

const TABS = ["ChatGPT", "Claude", "Gemini"];

/**
 * Animated AI-answer card: cycles engines (ChatGPT/Claude/Gemini), types an
 * answer, and highlights the "Solorank" citation + source row.
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

  const showBrand = typed >= full.length;
  const headLen = Math.min(typed, full.length);
  const tailLen = Math.max(0, typed - full.length);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "12px 14px",
          borderBottom: "1px solid var(--line-soft)",
          background: "var(--surface-soft)",
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              cursor: "pointer",
              borderRadius: 8,
              padding: "6px 11px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: i === tab ? "#fff" : "transparent",
              color: i === tab ? "var(--ink)" : "var(--ink-3)",
              boxShadow: i === tab ? "var(--shadow-sm)" : "none",
              border: i === tab ? "1px solid var(--line)" : "1px solid transparent",
              transition: "all .2s",
              opacity: i === tab ? 1 : 0.6,
            }}
          >
            <EngineLogo name={t} size={14} />
            {t}
          </button>
        ))}
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#21c07a",
              boxShadow: "0 0 0 3px rgba(33,192,122,0.16)",
            }}
          />
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
            live
          </span>
        </span>
      </div>

      {/* body */}
      <div style={{ padding: compact ? "18px 18px 20px" : "22px 22px 24px" }}>
        <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 6 }}>
          USER
        </div>
        <div
          style={{
            fontSize: compact ? 15 : 16.5,
            fontWeight: 500,
            marginBottom: 18,
            color: "var(--ink)",
          }}
        >
          &quot;What&apos;s the best AEO platform for my brand?&quot;
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <EngineLogo name={tabs[tab]} size={15} />
          <span className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>
            {tabs[tab].toUpperCase()}
          </span>
        </div>
        <div
          style={{
            fontSize: compact ? 14.5 : 15.5,
            lineHeight: 1.62,
            color: "var(--ink-2)",
            minHeight: 88,
          }}
        >
          {full.slice(0, headLen)}
          {showBrand && (
            <span
              style={{
                display: "inline",
                background: "var(--brand-tint)",
                color: "var(--brand-600)",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: 6,
                border: "1px solid var(--brand-200)",
              }}
            >
              Solorank
            </span>
          )}
          {tail.slice(0, tailLen)}
          {typed < full.length + tail.length && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 15,
                background: "var(--brand)",
                marginLeft: 2,
                transform: "translateY(2px)",
                animation: "blink 1s steps(2) infinite",
              }}
            />
          )}
        </div>

        {/* citation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 18,
            paddingTop: 14,
            borderTop: "1px solid var(--line-soft)",
            opacity: typed >= full.length + tail.length ? 1 : 0,
            transition: "opacity .5s",
          }}
        >
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
            SOURCE
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: 12.5,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 7,
              background: "var(--surface-soft)",
              border: "1px solid var(--line)",
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--grad)" }} />
            solorank.com
          </span>
          <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 600, color: "#21a86a" }}>
            ↑ cited #1
          </span>
        </div>
      </div>
    </div>
  );
}
