import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";

export default function FinalCTA() {
  return (
    <section id="cta" className="section-pad">
      <div className="wrap">
        <Reveal>
          <div
            className="final-cta-box"
            style={{
              position: "relative",
              background: "var(--surface-ink)",
              borderRadius: 28,
              padding: "76px 48px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <div aria-hidden style={{ position: "absolute", inset: 0 }}>
              <div
                style={{
                  position: "absolute",
                  bottom: -160,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 700,
                  height: 400,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,90,31,0.4), transparent 62%)",
                }}
              />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                className="tag-pill"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                Book a demo
              </span>
              <h2
                style={{
                  fontSize: "clamp(34px, 5vw, 60px)",
                  color: "#fff",
                  fontWeight: 600,
                  marginTop: 22,
                  lineHeight: 1.05,
                }}
              >
                Be the answer AI gives.
              </h2>
              <p
                style={{
                  fontSize: 18.5,
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 560,
                  margin: "20px auto 0",
                  lineHeight: 1.55,
                }}
              >
                See exactly where your brand stands across ChatGPT, Claude and Gemini today — and the
                plan to win the answers that matter.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 34,
                }}
              >
                <BookDemoButton className="btn btn-primary" style={{ padding: "16px 30px", fontSize: 16 }} />
                <BookDemoButton
                  label="Get a free AI audit"
                  showArrow={false}
                  className="btn"
                  style={{
                    padding: "16px 28px",
                    fontSize: 16,
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 560px){ .final-cta-box{ padding: 52px 24px !important; } }`}</style>
    </section>
  );
}
