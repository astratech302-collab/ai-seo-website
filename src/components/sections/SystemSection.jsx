"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import { AGENTS, AGENT_ICONS } from "@/data/agents";
import { track } from "@/lib/track";
import { ASSET_BASE } from "@/config/site";

function AgentCard({ a, i }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={i * 60} style={{ height: "100%" }}>
      <Link
        href={`/agents/${a.slug}`}
        onClick={() => track("button_clicked/agent_card_system", { agent: a.slug })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          display: "block",
          height: "100%",
          textDecoration: "none",
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: a.lead ? "var(--grad)" : "var(--brand-tint)",
                fontSize: 21,
                color: "#fff",
              }}
            >
              {/* Same imported icon set as the header mega-menu (S3 PNGs).
                  Exception: the lead card's tile is orange, where the orange PNG
                  has no contrast — so it keeps the original white glyph. */}
              {a.lead ? (
                AGENT_ICONS[a.code]
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${ASSET_BASE}/${a.slug}.png`}
                  alt={`${a.name} icon`}
                  width={24}
                  height={24}
                  style={{ display: "block" }}
                />
              )}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontSize: 18.5, fontWeight: 600, lineHeight: 1.15 }}>{a.name}</h3>
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
                  marginTop: 4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {a.role}
              </div>
            </div>
          </div>
          <span
            aria-hidden
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              lineHeight: 1,
              background: a.lead ? "rgba(255,255,255,0.08)" : "var(--surface-soft)",
              border: a.lead ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--line)",
              color: a.lead ? "#fff" : "var(--brand-600)",
              transform: hover ? "translate(3px, -3px)" : "none",
              opacity: hover ? 1 : 0.75,
              transition: "transform .25s ease, opacity .25s ease",
            }}
          >
            ↗
          </span>
        </div>
        <div style={{ position: "relative", marginTop: 18 }}>
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
          <ul
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              paddingTop: 16,
              borderTop: a.lead ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--line-soft)",
            }}
          >
            {a.does.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  fontSize: 13.5,
                  lineHeight: 1.45,
                }}
              >
                <span
                  style={{
                    color: "var(--brand)",
                    flexShrink: 0,
                    marginTop: 1,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: a.lead ? "rgba(255,255,255,0.62)" : "var(--ink-2)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
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
          title="One strategy agent. Four specialists. Zero idle time."
          sub="Geobuild works like a real growth team — except it never sleeps. The Strategy Agent sets direction and delegates to five sub-agents that research, create, build authority, optimize and measure in parallel."
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
