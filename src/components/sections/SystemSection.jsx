"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import { AGENTS, AGENT_ICONS } from "@/data/agents";

function AgentCard({ a, i }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={i * 60} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          height: "100%",
          background: a.lead ? "var(--surface-ink)" : "#fff",
          color: a.lead ? "#fff" : "var(--ink)",
          border: a.lead ? "none" : "1px solid var(--line)",
          borderRadius: 18,
          padding: "26px 24px",
          overflow: "hidden",
          boxShadow: hover
            ? a.lead
              ? "0 22px 50px -18px rgba(0,0,0,0.5)"
              : "var(--shadow)"
            : a.lead
              ? "var(--shadow)"
              : "var(--shadow-sm)",
          transform: hover ? "translateY(-4px)" : "none",
          transition: "transform .25s ease, box-shadow .3s ease",
        }}
      >
        {a.lead && (
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,90,31,0.45), transparent 65%)",
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
              background: a.lead ? "var(--grad)" : "var(--brand-tint)",
              color: a.lead ? "#fff" : "var(--brand-600)",
            }}
          >
            {AGENT_ICONS[a.code]}
          </span>
        </div>
        <div style={{ position: "relative", marginTop: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ fontSize: 18.5, fontWeight: 600 }}>{a.name}</h3>
            {a.lead && (
              <span
                className="tag-pill"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: 10,
                }}
              >
                MAIN
              </span>
            )}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11.5,
              color: a.lead ? "var(--brand-200)" : "var(--brand-600)",
              marginTop: 5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {a.role}
          </div>
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              marginTop: 12,
              color: a.lead ? "rgba(255,255,255,0.72)" : "var(--ink-2)",
            }}
          >
            {a.short}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function SystemSection() {
  return (
    <section
      id="system"
      className="section-pad"
      style={{
        background: "var(--surface-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHead
          eyebrow="The system"
          title="One strategy agent. Five specialists. Zero idle time."
          sub="Solorank works like a real growth team — except it never sleeps. The Strategy Agent sets direction and delegates to five sub-agents that research, create, build authority, optimize and measure in parallel."
          center
        />
        <div style={{ marginTop: 56 }}>
          <div
            className="agent-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {AGENTS.map((a, i) => (
              <AgentCard key={a.code} a={a} i={i} />
            ))}
            <style>{`@media (max-width: 900px){ .agent-grid{ grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px){ .agent-grid{ grid-template-columns: 1fr !important; } }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
