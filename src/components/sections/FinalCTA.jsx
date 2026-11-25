import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";
import AskEngines from "@/components/sections/AskEngines";
import { AI_SEO_ENABLED } from "@/config/site";

export default function FinalCTA() {
  return (
    <section id="cta" className="section-pad">
      <div className="wrap">
        <Reveal>
          <div
            className="final-cta-box"
            style={{
              position: "relative",
              borderRadius: 24,
              padding: "112px 48px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <div aria-hidden className="cta-glow" />
            <div aria-hidden className="cta-dots" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontSize: "clamp(34px, 5vw, 60px)",
                  lineHeight: 1.05,
                }}
              >
                {AI_SEO_ENABLED ? "Be the answer AI gives." : "Self-improving storefronts."}
              </h2>
              <p
                style={{
                  fontSize: 18.5,
                  color: "var(--ink)",
                  opacity: 0.75,
                  maxWidth: 560,
                  margin: "20px auto 0",
                  lineHeight: 1.55,
                }}
              >
                {AI_SEO_ENABLED
                  ? "See exactly where your brand stands across ChatGPT, Claude and Gemini today — and the plan to win the answers that matter."
                  : "See your collections sorted one to one for every shopper, and each ad audience matched to the right landing page."}
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
                <BookDemoButton
                  event="button_clicked/book_demo_final_cta"
                  className="btn btn-primary"
                  style={{ padding: "16px 30px", fontSize: 16 }}
                />
                {AI_SEO_ENABLED && (
                  <BookDemoButton
                    label="Get a free AI audit"
                    event="button_clicked/get_ai_audit_final_cta"
                    showArrow={false}
                    className="btn"
                    style={{
                      padding: "16px 28px",
                      fontSize: 16,
                      border: "1px solid var(--line-strong)",
                    }}
                  />
                )}
              </div>

              {/* AskEngines is styled for a dark backdrop */}
              {AI_SEO_ENABLED && (
                <div style={{ background: "var(--surface-ink)", borderRadius: 20, marginTop: 34, padding: "0 20px 24px" }}>
                  <AskEngines />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        .final-cta-box { background: linear-gradient(180deg, var(--flow-blue-1), var(--sky-low)); }
        .cta-glow, .cta-dots { position: absolute; inset: 0; pointer-events: none; }
        .cta-glow { background: radial-gradient(60% 75% at 50% 112%, var(--brand) 0%, var(--brand-light) 34%, transparent 72%), radial-gradient(45% 60% at 82% 96%, var(--sky-top), transparent 70%); animation: ctaGlow 9s ease-in-out infinite alternate; transform-origin: bottom; }
        .cta-dots { background-image: radial-gradient(var(--cloud) 1.4px, transparent 1.8px); background-size: 22px 22px; -webkit-mask-image: linear-gradient(180deg, transparent 35%, var(--ink)); mask-image: linear-gradient(180deg, transparent 35%, var(--ink)); }
        @keyframes ctaGlow { from { transform: scale(1); } to { transform: scale(1.14, 1.08); } }
        @media (prefers-reduced-motion: reduce) { .cta-glow { animation: none; } }
        @media (max-width: 560px){ .final-cta-box{ padding: 64px 24px !important; } }
      `}</style>
    </section>
  );
}
