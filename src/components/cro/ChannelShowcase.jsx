"use client";

import { useState } from "react";
import { track } from "@/lib/track";
import Reveal from "@/components/motion/Reveal";
import { MockStage } from "@/components/agents/mockups/kit";
import { Chip } from "@/components/agents/mockups/dash";
import { AdLandingMockStyles } from "@/components/agents/mockups/adlanding";
import { AdCreative, StorePage, ChannelLogo } from "@/components/cro/AdCreatives";
import { DEMO_IMG } from "@/data/demoAssets";

/**
 * Multi-channel personalization: pick a channel to see the ad and the landing page
 * built for it. Uses the same MockStage + dash kit as the other product mockups.
 */
export default function ChannelShowcase({ data }) {
  const [active, setActive] = useState(0);
  const c = data.items[active];

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    track(`tab_switched/ad_channel_${data.items[i].key}`);
  };

  return (
    <section id="channels" className="section-pad" style={{ paddingTop: 56, paddingBottom: 24 }}>
      <div className="wrap">
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="h-tight" style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.025em", marginTop: 16 }}>
              {data.title}
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 16 }}>{data.sub}</p>
          </div>
        </Reveal>

        <div role="tablist" aria-label="Ad channel" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 36 }}>
          {data.items.map((ch, i) => (
            <button
              key={ch.key}
              type="button"
              role="tab"
              id={`chan-tab-${ch.key}`}
              aria-selected={i === active}
              aria-controls="chan-panel"
              onClick={() => select(i)}
              className={`cs-tab${i === active ? " is-on" : ""}`}
            >
              <ChannelLogo channel={ch.key} size={22} />
              <span>{ch.label}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" id="chan-panel" aria-labelledby={`chan-tab-${c.key}`} style={{ marginTop: 28 }}>
          <MockStage>
            <div className="cs-pair">
              <div>
                <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <ChannelLogo channel={c.key} size={16} />
                  <Chip tone="neutral">The ad your shopper clicked</Chip>
                </div>
                <AdCreative channel={c.key} ad={c.ad} />
              </div>
              <span className="cs-arrow" aria-hidden>→</span>
              <div>
                <div style={{ marginBottom: 8 }}><Chip tone="orange">Landing page for this ad</Chip></div>
                <StorePage
                  image={DEMO_IMG[c.page.image]}
                  imagePos={c.page.imagePos}
                  headline={c.page.headline}
                  sub={c.page.sub}
                  chips={c.page.chips}
                  price={c.page.price}
                  quote={c.page.quote}
                  banner={c.page.banner}
                />
              </div>
            </div>
          </MockStage>

          <div className="cs-detail">
            <div className="cs-box">
              <span className="eyebrow">The visitor expects</span>
              <p style={{ fontSize: 16.5, marginTop: 12, lineHeight: 1.5 }}>{c.expects}</p>
            </div>
            <div className="cs-box">
              <span className="eyebrow">What the page changes</span>
              <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {c.changes.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 9, fontSize: 15, lineHeight: 1.45 }}>
                    <span aria-hidden style={{ color: "var(--brand)" }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AdLandingMockStyles />
      <style>{`
        .cs-pair { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1.1fr); gap: 16px; align-items: center; }
        .cs-arrow { width: 38px; height: 38px; border-radius: 99px; background: var(--grad); color: #fff; display: inline-flex; align-items: center; justify-content: center; box-shadow: var(--shadow-orange); }
        .cs-tab { border: 0; border-radius: 14px; background: transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 9px; padding: 10px 16px 10px 12px; font-family: inherit; font-size: 14.5px; font-weight: 600; color: var(--ink-2); transition: background .15s ease, color .15s ease; }
        .cs-tab:hover { background: var(--surface-soft); color: var(--ink); }
        .cs-tab.is-on { background: var(--brand-tint); color: var(--brand-600); }
        .cs-tab:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
        .cs-detail { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cs-box { background: var(--surface-soft); border: 1px solid var(--line); border-radius: 16px; padding: 20px 22px; }
        @media (max-width: 760px) {
          .cs-pair { grid-template-columns: 1fr; }
          .cs-arrow { transform: rotate(90deg); margin: 0 auto; }
          .cs-detail { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
