import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import BookDemoButton from "@/components/demo/BookDemoButton";
import { PRICING } from "@/data/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title="Plans that scale with your growth."
          center
          sub="Every plan is agent-run and human-approved. Start where your website is today and upgrade anytime — no long contracts."
        />
        <div
          className="price-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 18,
            marginTop: 52,
            alignItems: "stretch",
            maxWidth: 820,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} style={{ height: "100%" }}>
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: p.featured ? "var(--surface-ink)" : "#fff",
                  color: p.featured ? "#fff" : "var(--ink)",
                  border: p.featured ? "none" : "1px solid var(--line)",
                  borderRadius: 20,
                  padding: "32px 30px",
                  boxShadow: p.featured
                    ? "0 26px 60px -22px rgba(20,16,12,0.5)"
                    : "var(--shadow-sm)",
                  overflow: "hidden",
                }}
              >
                {p.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: -70,
                      right: -50,
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,90,31,0.4), transparent 65%)",
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
                  <span style={{ fontWeight: 600, fontSize: 21 }}>{p.name}</span>
                </div>
                <div
                  style={{
                    position: "relative",
                    fontSize: 14.5,
                    color: p.featured ? "rgba(255,255,255,0.62)" : "var(--ink-3)",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {p.tag}
                </div>
                <BookDemoButton
                  label={p.cta}
                  className={p.featured ? "btn btn-primary" : "btn btn-ghost"}
                  style={{
                    position: "relative",
                    marginTop: 24,
                    justifyContent: "center",
                    padding: 14,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    marginTop: 26,
                    paddingTop: 24,
                    borderTop: p.featured
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "1px solid var(--line-soft)",
                  }}
                >
                  {p.featuresHeader && (
                    <div
                      className="mono"
                      style={{
                        fontSize: 11.5,
                        color: p.featured ? "rgba(255,255,255,0.5)" : "var(--ink-3)",
                        letterSpacing: "0.04em",
                        marginBottom: 18,
                      }}
                    >
                      {p.featuresHeader}
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                    {p.features.map((f, fi) => (
                      <div
                        key={f}
                        style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 14.5 }}
                      >
                        <span style={{ color: "var(--brand)", fontSize: 13 }}>✓</span>
                        <span
                          style={{
                            color: p.featured ? "rgba(255,255,255,0.85)" : "var(--ink-2)",
                            fontWeight: fi === 0 ? 600 : 400,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`@media (max-width: 720px){ .price-grid{ grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
