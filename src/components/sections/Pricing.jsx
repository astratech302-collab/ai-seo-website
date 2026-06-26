import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import BookDemoButton from "@/components/demo/BookDemoButton";

export default function Pricing({ plans = [] }) {
  return (
    <section id="pricing" className="section-pad">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title="Plans that scale with your growth."
          center
          sub="Every plan is agent-run and human-approved. Start where you are today and upgrade anytime."
        />
        <div
          className="price-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 20,
            marginTop: 52,
            alignItems: "stretch",
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {plans.map((p, i) => (
            <Reveal key={p.id ?? p.name} delay={i * 80} style={{ height: "100%" }}>
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: p.featured ? "rgba(255,90,31,0.04)" : "#fff",
                  border: p.featured ? "1.5px solid var(--brand)" : "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: "32px 30px",
                  boxShadow: "none",
                }}
              >
                {/* Header row: name + badge */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1 }}>
                    {p.name}
                  </h3>
                  {p.badge && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 12px",
                        borderRadius: 99,
                        background: "var(--brand-tint)",
                        color: "var(--brand)",
                        fontSize: 13,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      ★ {p.badge}
                    </span>
                  )}
                </div>

                {/* Tag */}
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-3)",
                    lineHeight: 1.55,
                    marginTop: 12,
                  }}
                >
                  {p.tag}
                </p>

                {/* CTA button */}
                <BookDemoButton
                  label={p.cta ?? "Book a Demo"}
                  showArrow={false}
                  className={p.featured ? "btn btn-primary" : "btn"}
                  style={{
                    marginTop: 24,
                    justifyContent: "center",
                    padding: "14px 24px",
                    fontSize: 15,
                    background: p.featured ? undefined : "#f0ece8",
                    color: p.featured ? undefined : "var(--ink)",
                    border: "none",
                    borderRadius: 10,
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />

                {/* Divider */}
                <div
                  style={{
                    marginTop: 28,
                    borderTop: "1px solid #e5e7eb",
                  }}
                />

                {/* Features */}
                <div style={{ marginTop: 24, flex: 1 }}>
                  {p.featuresHeader && (
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: "var(--ink-3)",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        marginBottom: 20,
                      }}
                    >
                      {p.featuresHeader}
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {p.features.map((f) => {
                      const label = typeof f === "string" ? f : f.label;
                      return (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span
                            style={{
                              color: "var(--brand)",
                              fontSize: 13,
                              flexShrink: 0,
                              fontWeight: 500,
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.4 }}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
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
