import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";

const STATS = [
  {
    n: "0 clicks",
    l: "A growing share of searches end inside the AI answer — never reaching a website.",
    src: "the zero-click shift",
  },
  {
    n: "1 answer",
    l: "is all an AI gives — naming a few brands, not a page of ten blue links.",
    src: "winner takes most",
  },
  {
    n: "Every category",
    l: "is being quietly re-ranked by the models that decide who gets recommended.",
    src: "the new front page",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="section-pad">
      <div className="wrap">
        <SectionHead
          eyebrow="The shift"
          title="Your buyers stopped Googling. They're asking AI."
          sub="Ask ChatGPT, Claude or Gemini for the best option in your category and you get one answer naming just a few brands. If you're not one of them, you don't exist — and traditional SEO can't put you there."
        />
        <div
          className="prob-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
            marginTop: 52,
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="prob-card"
                style={{
                  position: "relative",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: "26px 26px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "border-color .25s, box-shadow .25s, transform .25s",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "var(--grad)",
                  }}
                />
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 11.5,
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span style={{ color: "var(--brand-600)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ width: 14, height: 1, background: "var(--line)" }} />
                  {s.src}
                </div>
                <div
                  className="text-grad"
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    marginTop: 22,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 12, lineHeight: 1.55 }}>
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`@media (max-width: 760px){ .prob-grid{ grid-template-columns: 1fr !important; } } .prob-card:hover{ border-color: var(--brand-200); box-shadow: 0 18px 40px -22px rgba(255,90,31,0.35); transform: translateY(-3px); }`}</style>
      </div>
    </section>
  );
}
