"use client";

import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";
import FunnelMock from "@/components/hero/FunnelMock";
import { GlowBg } from "@/components/sections/Hero";
import { track } from "@/lib/track";

const SUB =
  "Geobuild reads what each visitor wants, puts them in the right segment, and shows the right widgets, offers and pages in real time. Made only for Shopify stores.";

/** Landing-page hero for the Shopify-only CRO / hyperpersonalization product. */
export default function HeroCro() {
  return (
    <section id="top" className="hero-section" style={{ position: "relative" }}>
      <GlowBg />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center" }}>
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
              Built for Shopify
            </span>
          </Reveal>
          <Reveal delay={40}>
            <h1 style={{ fontSize: "clamp(40px, 5.4vw, 70px)", fontWeight: 600, lineHeight: 1.02 }}>
              Hyperpersonalization <span className="text-grad">at scale</span>.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              style={{
                fontSize: 18.5,
                color: "var(--ink-2)",
                maxWidth: 640,
                margin: "22px auto 0",
                lineHeight: 1.55,
              }}
            >
              {SUB}
            </p>
          </Reveal>
          <Reveal delay={200} style={{ marginTop: 30 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <BookDemoButton
                event="button_clicked/book_demo_hero"
                className="btn btn-primary"
                style={{ padding: "15px 26px", fontSize: 15.5 }}
              />
              <a
                href="#how-it-works"
                className="btn btn-ghost"
                style={{ padding: "15px 24px", fontSize: 15.5 }}
                onClick={() => track("link_clicked/see_how_it_works_hero")}
              >
                See how it works
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160} style={{ marginTop: 56 }}>
          <FunnelMock />
        </Reveal>
      </div>
      <style>{`
        .hero-section{ padding: 72px 0 72px; }
        @media (max-width: 760px){ .hero-section{ padding: 44px 0 32px; } }
      `}</style>
    </section>
  );
}
