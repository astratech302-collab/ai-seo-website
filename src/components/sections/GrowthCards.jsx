"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProductIcon from "@/components/brand/ProductIcon";
import { GROWTH_PRODUCTS, GROWTH_SECTION } from "@/data/growth";
import { track } from "@/lib/track";

/** Homepage cards linking to the AI Visibility and Catalog Enrichment pages. */
export default function GrowthCards() {
  return (
    <section id="growth" className="wrap gc">
      <Reveal>
        <div className="gc-head">
          <span className="eyebrow">{GROWTH_SECTION.eyebrow}</span>
          <h2>{GROWTH_SECTION.title}</h2>
        </div>
      </Reveal>
      <div className="gc-grid">
        {GROWTH_PRODUCTS.map((p, i) => (
          <Reveal key={p.key} delay={i * 100}>
            <Link href={p.path} className="gc-card" onClick={() => track(`link_clicked/${p.key}_growth_card_home`)}>
              <div className={`flow flow-${p.tone} gc-art`}>
                <span className="gc-icon">
                  <ProductIcon name={p.key} size={34} />
                </span>
                <span className="flow-bubble">{p.bubble}</span>
              </div>
              <p className="two-tone gc-text">
                <strong>{p.data.name}</strong> {p.data.short}.
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
      <style>{`
        .gc { padding-top: 96px; padding-bottom: 96px; }
        .gc-head { text-align: center; max-width: 760px; margin: 0 auto 52px; }
        .gc-head h2 { font-size: clamp(30px, 4.2vw, 48px); line-height: 1.12; margin-top: 18px; }
        .gc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto; }
        .gc-card { display: block; text-decoration: none; }
        .gc-art { height: 250px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 24px; text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
        .gc-card:hover .gc-art { transform: translateY(-4px); box-shadow: var(--shadow); }
        .gc-card:focus-visible { outline: 2px solid var(--brand); outline-offset: 4px; border-radius: 14px; }
        .gc-icon { width: 66px; height: 66px; border-radius: 18px; background: var(--surface); box-shadow: var(--shadow-sm); display: inline-flex; align-items: center; justify-content: center; color: var(--brand-600); }
        .gc-text { font-size: 17px; line-height: 1.55; margin: 22px 16px 0; }
        @media (max-width: 900px) { .gc-grid { grid-template-columns: 1fr; max-width: 480px; margin-inline: auto; gap: 40px; } .gc { padding-top: 64px; padding-bottom: 64px; } }
        @media (prefers-reduced-motion: reduce) { .gc-art { transition: none; } }
      `}</style>
    </section>
  );
}
