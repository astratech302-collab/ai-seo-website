"use client";

import Reveal from "@/components/motion/Reveal";
import TypedEngine from "@/components/hero/TypedEngine";
import AnswerMock from "@/components/hero/AnswerMock";
import BookDemoButton from "@/components/demo/BookDemoButton";

const SUB =
  "Solorank runs AEO, GEO and SEO with a team of AI agents — and a human strategist who makes the final call. Get cited on ChatGPT, Claude, Gemini and Perplexity.";

function GlowBg() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -80,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,138,61,0.20), rgba(255,90,31,0.06) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: -180,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,90,31,0.10), transparent 68%)",
        }}
      />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
        <defs>
          <pattern id="heroGrid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46 0H0V46" fill="none" stroke="rgba(18,18,16,0.045)" strokeWidth="1" />
          </pattern>
          <radialGradient id="heroFade" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
        <rect width="100%" height="100%" fill="url(#heroFade)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" style={{ position: "relative", paddingTop: 80, paddingBottom: 96 }}>
      <GlowBg />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal style={{ display: "inline-block", marginBottom: 26 }}>
          <span
            className="tag-pill"
            style={{
              borderColor: "var(--brand-200)",
              background: "var(--brand-tint)",
              color: "var(--brand-600)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
            Agent-run AEO · GEO · SEO
          </span>
        </Reveal>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <Reveal delay={40}>
              <h1 style={{ fontSize: "clamp(40px, 5.4vw, 70px)", fontWeight: 600, lineHeight: 1.02 }}>
                Be the brand <TypedEngine /> <span>recommends</span>.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  fontSize: 18.5,
                  color: "var(--ink-2)",
                  maxWidth: 520,
                  marginTop: 22,
                  lineHeight: 1.55,
                }}
              >
                {SUB}
              </p>
            </Reveal>
            <Reveal delay={200} style={{ marginTop: 30 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <BookDemoButton
                  className="btn btn-primary"
                  style={{ padding: "15px 26px", fontSize: 15.5 }}
                />
                <a
                  href="#system"
                  className="btn btn-ghost"
                  style={{ padding: "15px 24px", fontSize: 15.5 }}
                >
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <AnswerMock />
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .hero-grid{ grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
