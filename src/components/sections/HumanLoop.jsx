"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import BookDemoButton from "@/components/demo/BookDemoButton";

const STEPS = [
  {
    icon: "⚡",
    t: "Agents do the work",
    d: "Research, drafting, optimization and tracking run at machine speed, around the clock.",
  },
  {
    icon: "◎",
    t: "Human strategist reviews",
    d: "Every deliverable is checked for accuracy, brand voice and strategy before it moves.",
  },
  {
    icon: "✓",
    t: "You approve the final call",
    d: "Nothing ships to your site or the public until it's signed off. No mistakes, no surprises.",
  },
];

export default function HumanLoop() {
  const [active, setActive] = useState(STEPS.length - 1);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="human"
      className="section-pad"
      style={{
        background: "var(--surface-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="wrap hl-wrap"
        style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 64, alignItems: "center" }}
      >
        <div>
          <SectionHead
            eyebrow="Human in the loop"
            title="Machine speed. Human judgment."
            sub="Pure automation makes mistakes. Pure agencies are slow. Geobuild gives you both: agents move fast, a human makes the final call — so the work is quick and right."
          />
          <Reveal delay={180} style={{ marginTop: 28 }}>
            <BookDemoButton
              label="See a sample deliverable"
              className="btn btn-dark"
              style={{ padding: "14px 24px" }}
            />
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
            {STEPS.map((s, i) => {
              const isCur = i === active;
              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    padding: "22px 26px",
                    borderRadius: 18,
                    background: isCur ? "#fff" : "transparent",
                    border: isCur ? "1px solid var(--brand-200)" : "1px solid transparent",
                    boxShadow: isCur ? "0 20px 44px -22px rgba(255,90,31,0.45)" : "none",
                    opacity: isCur ? 1 : 0.4,
                    transform: isCur ? "none" : "scale(0.985)",
                    transition: "all .5s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -1,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: isCur ? 56 : 0,
                      borderRadius: 999,
                      background: "var(--grad)",
                      transition: "height .5s cubic-bezier(.4,0,.2,1)",
                    }}
                  />
                  <span
                    style={{
                      flexShrink: 0,
                      width: 56,
                      height: 56,
                      borderRadius: 15,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      background: isCur ? "var(--grad)" : "rgba(18,18,16,0.05)",
                      color: isCur ? "#fff" : "var(--ink-3)",
                      boxShadow: isCur ? "0 10px 24px -8px rgba(255,90,31,0.55)" : "none",
                      transition: "all .5s cubic-bezier(.4,0,.2,1)",
                    }}
                  >
                    {s.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 18, color: "var(--ink)" }}>{s.t}</div>
                    <div style={{ fontSize: 14.5, color: "var(--ink-2)", marginTop: 5, lineHeight: 1.55 }}>
                      {s.d}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--brand-tint)",
                      color: "var(--brand-600)",
                      fontSize: 15,
                      fontWeight: 700,
                      opacity: isCur ? 1 : 0,
                      transform: isCur ? "scale(1)" : "scale(0.6)",
                      transition: "all .5s cubic-bezier(.4,0,.2,1)",
                    }}
                  >
                    ✓
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 860px){ .hl-wrap{ grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
    </section>
  );
}
