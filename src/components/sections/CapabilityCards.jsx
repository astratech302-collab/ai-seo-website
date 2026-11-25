"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/data/home";
import { NEEDS, PRODUCTS } from "@/data/onsite";
import { sortForNeed } from "@/lib/collectionSort";
import { track } from "@/lib/track";

// Illustrative mini mockups (fictional store).
function IntentCard() {
  const rows = [["Searched", "laptop backpack"], ["Filtered", "fits 15″"], ["Came from", "Instagram ad"]];
  return (
    <div className="cap-mock">
      <span className="cap-mock-title">This session</span>
      {rows.map(([label, value], i) => (
        <div className="cap-row" key={label} style={{ "--d": `${0.35 + i * 0.15}s` }}>
          <span>{label}</span>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}

function SortCard() {
  const top = sortForNeed(PRODUCTS, NEEDS[0]).slice(0, 3);
  return (
    <div className="cap-mock">
      <span className="cap-mock-title">Collection · Backpacks</span>
      <div className="cap-tiles">
        {top.map((p, i) => (
          <div className="cap-tile" key={p.id} style={{ "--d": `${0.35 + i * 0.15}s` }}>
            <span className="cap-thumb">{i + 1}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" width="30" height="36" loading="lazy" />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdsCard() {
  return (
    <div className="cap-mock">
      <span className="cap-mock-title">Landing page for this ad</span>
      <b className="cap-headline">Your morning glow, in one drop</b>
      <span className="cap-line" style={{ width: "82%" }} />
      <span className="cap-line" style={{ width: "58%" }} />
      <span className="cap-cta">Add to cart</span>
    </div>
  );
}

const MOCKS = { intent: IntentCard, sort: SortCard, ads: AdsCard };

export default function CapabilityCards() {
  return (
    <section className="wrap cap">
      <Reveal>
        <div className="cap-head">
          <span className="eyebrow">{CAPABILITIES.eyebrow}</span>
          <h2>{CAPABILITIES.title}</h2>
        </div>
      </Reveal>
      <div className="cap-grid">
        {CAPABILITIES.cards.map((card, i) => {
          const Mock = MOCKS[card.key];
          return (
            <Link key={card.key} href={card.href} className="cap-card" onClick={() => track(card.event)}>
              <div className={`flow flow-${card.tone} cap-art`}>
                <Reveal delay={150 + i * 100}>
                  <span className="flow-bubble">{card.bubble}</span>
                </Reveal>
                <Reveal delay={380 + i * 100} className="cap-slide">
                  <Mock />
                </Reveal>
              </div>
              <p className="two-tone cap-text">
                <strong>{card.title}</strong> {card.body}
              </p>
            </Link>
          );
        })}
      </div>
      <style>{`
        .cap { padding-top: 96px; padding-bottom: 96px; }
        .cap-head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
        .cap-head h2 { font-size: clamp(30px, 4.2vw, 48px); line-height: 1.12; margin-top: 18px; }
        .cap-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .cap-card { text-decoration: none; display: block; }
        .cap-art { border-radius: 14px; height: 390px; padding: 40px 0 0 34px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; transition: transform .3s ease, box-shadow .3s ease; }
        .cap-card:hover .cap-art { transform: translateY(-4px); box-shadow: var(--shadow); }
        .cap-card:focus-visible { outline: 2px solid var(--brand); outline-offset: 4px; border-radius: 14px; }
        .cap-art > :first-child { padding-right: 26px; }
        .cap-slide { align-self: stretch; flex: 1; display: flex; }
        .cap-mock { flex: 1; background: var(--surface); border-radius: 16px 0 0 0; padding: 20px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 13px; overflow: hidden; }
        .cap-mock-title { font-size: 12.5px; font-weight: 600; color: var(--ink-3); }
        .cap-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13.5px; color: var(--ink-2); border: 1px solid var(--line); border-radius: 12px; padding: 12px; animation: capRise .7s var(--d) ease both; }
        .cap-row b { font-weight: 500; color: var(--ink); text-align: right; }
        .cap-tiles { display: flex; flex-direction: column; gap: 9px; }
        .cap-tile img { width: 30px; height: 36px; object-fit: cover; border-radius: 6px; }
        .cap-tile { display: flex; align-items: center; gap: 11px; font-size: 13.5px; color: var(--ink); border: 1px solid var(--line); border-radius: 12px; padding: 8px 10px; animation: capRise .7s var(--d) ease both; }
        .cap-thumb { width: 30px; height: 30px; border-radius: 8px; background: var(--flow-pink-2); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12.5px; }
        @keyframes capRise { from { transform: translateY(14px); } to { transform: none; } }
        .cap-headline { font-size: 18px; font-weight: 500; color: var(--ink); line-height: 1.3; }
        .cap-line { height: 8px; border-radius: 99px; background: var(--surface-muted); }
        .cap-cta { align-self: flex-start; background: var(--ink); color: var(--surface); border-radius: 99px; font-size: 13px; padding: 9px 18px; }
        .cap-text { font-size: 17px; line-height: 1.55; margin: 22px 16px 0; }
        @media (max-width: 900px) { .cap-grid { grid-template-columns: 1fr; max-width: 480px; margin-inline: auto; gap: 40px; } .cap { padding-top: 64px; padding-bottom: 64px; } }
        @media (prefers-reduced-motion: reduce) { .cap-row, .cap-tile { animation: none; } .cap-art { transition: none; } }
      `}</style>
    </section>
  );
}
