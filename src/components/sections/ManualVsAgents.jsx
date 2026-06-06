import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";

const OLD_WAY = [
  ["Slow turnaround", "Content and fixes ship in monthly batches."],
  ["Set-and-forget", "Optimizations go stale as AI engines change."],
  ["Blind spots", "You learn you slipped weeks after it happens."],
  ["Thin coverage", "One team can only watch so many pages and queries."],
  ["Reactive", "Problems get fixed after they've already cost you traffic."],
];

const NEW_WAY = [
  ["Days, not months", "Research, drafting and optimization run in parallel."],
  ["Real-time updates", "Content re-optimizes itself as the engines shift."],
  ["Daily brand monitoring", "See where you're cited across every AI engine, every day."],
  ["Always-on coverage", "A six-agent team watches your whole category, 24/7."],
  ["Proactive", "Issues are caught and fixed before they hurt your visibility."],
];

export default function ManualVsAgents() {
  return (
    <section id="why-agents" className="section-pad">
      <div className="wrap">
        <SectionHead
          eyebrow="Why agents"
          title="Manual SEO can't keep up with AI."
          center
          sub="Search moves in real time now. A team of agents does in days what manual SEO does in months — and never stops watching your brand."
        />
        <div
          className="vs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 52,
            alignItems: "stretch",
          }}
        >
          <Reveal>
            <div
              style={{
                height: "100%",
                background: "var(--surface-soft)",
                border: "1px solid var(--line)",
                borderRadius: 22,
                padding: "34px 32px",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11.5,
                  color: "var(--ink-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                The old way
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8, color: "var(--ink-2)" }}>
                Manual SEO
              </div>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
                {OLD_WAY.map(([t, d]) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(18,18,16,0.05)",
                        color: "var(--ink-3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        marginTop: 1,
                      }}
                    >
                      ✕
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15.5, color: "var(--ink-2)" }}>{t}</div>
                      <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.5 }}>
                        {d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "var(--surface-ink)",
                color: "#fff",
                borderRadius: 22,
                padding: "34px 32px",
                overflow: "hidden",
                boxShadow: "0 26px 60px -26px rgba(20,16,12,0.5)",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -80,
                  right: -60,
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,90,31,0.4), transparent 65%)",
                }}
              />
              <div
                className="mono"
                style={{
                  position: "relative",
                  fontSize: 11.5,
                  color: "var(--brand-200)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                With Geobuild
              </div>
              <div style={{ position: "relative", fontSize: 22, fontWeight: 600, marginTop: 8 }}>
                A team of AI agents
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 26,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {NEW_WAY.map(([t, d]) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "var(--grad)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15.5 }}>{t}</div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,0.6)",
                          marginTop: 3,
                          lineHeight: 1.5,
                        }}
                      >
                        {d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width: 820px){ .vs-grid{ grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
