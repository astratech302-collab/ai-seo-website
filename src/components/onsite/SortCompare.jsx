"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { COMPARE, NEEDS, PRODUCTS, TAG_LABELS } from "@/data/onsite";
import { sortForNeed, matchedTags } from "@/lib/collectionSort";
import { track } from "@/lib/track";

const CYCLE_MS = 3600;
const SLOTS = 4;

function Product({ product, tag, innerRef }) {
  return (
    <li ref={innerRef} className="sc-item">
      <span className="sc-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={`${product.name} backpack`} width="360" height="450" loading="lazy" />
        {tag && <span className="sc-tag">{tag}</span>}
      </span>
      <span className="sc-name">{product.name}</span>
      <span className="sc-price">${product.price}</span>
    </li>
  );
}

/**
 * Segment-based sorting next to Geobuild's 1:1 session sort. The right-hand grid is
 * live: it cycles through shopper signals until the visitor picks one. Fictional store.
 */
export default function SortCompare({ location }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const items = useRef(new Map());
  const positions = useRef(new Map());
  const need = NEEDS[active];
  const sorted = sortForNeed(PRODUCTS, need).slice(0, SLOTS);
  const fixed = COMPARE.before.productIds.map((id) => PRODUCTS.find((p) => p.id === id));

  // Note where every card sits right before the order changes.
  const snapshot = useCallback(() => {
    positions.current = new Map(
      [...items.current].map(([id, el]) => [id, { x: el.offsetLeft, y: el.offsetTop }])
    );
  }, []);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      snapshot();
      setActive((i) => (i + 1) % NEEDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, snapshot]);

  // FLIP: cards that stay slide to their new slot, new ones fade in.
  useLayoutEffect(() => {
    if (!positions.current.size || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    items.current.forEach((el, id) => {
      const prev = positions.current.get(id);
      const frames = prev
        ? [{ transform: `translate(${prev.x - el.offsetLeft}px, ${prev.y - el.offsetTop}px)` }, { transform: "none" }]
        : [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }];
      el.animate(frames, { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" });
    });
  }, [active]);

  const pick = (i) => {
    snapshot();
    setAuto(false);
    setActive(i);
    track(`tab_switched/need_${NEEDS[i].key}_collection_sorter_${location}`);
  };

  const register = (id) => (el) => {
    if (el) items.current.set(id, el);
    return () => items.current.delete(id);
  };

  const { before, after, signalLabel } = COMPARE;

  return (
    <div className="sc">
      <div className="sc-col sc-before">
        <span className="sc-when">{before.when}</span>
        <h3 className="sc-title">{before.title}</h3>
        <div className="sc-card">
          <p className="sc-desc">{before.desc}</p>
          <span className="sc-label">{signalLabel}</span>
          <div className="sc-signals">
            <span className="sc-signal">
              <i aria-hidden />
              {before.signal}
            </span>
          </div>
          <ul className="sc-grid">
            {fixed.map((p) => (
              <Product key={p.id} product={p} />
            ))}
          </ul>
          <p className="sc-foot">{before.footer}</p>
        </div>
        <p className="sc-question">{before.question}</p>
      </div>

      <span className="sc-arrow" aria-hidden>
        →
      </span>

      <div className="sc-col sc-after">
        <span className="sc-when">{after.when}</span>
        <h3 className="sc-title">{after.title}</h3>
        <div className="sc-card">
          <p className="sc-desc">{after.desc}</p>
          <span className="sc-label">{signalLabel}</span>
          <div className="sc-signals">
            <span className="sc-signal">
              <i aria-hidden />
              {need.signal}
            </span>
          </div>
          <ul className="sc-grid">
            {sorted.map((p) => (
              <Product key={p.id} product={p} tag={TAG_LABELS[matchedTags(p, need)[0]]} innerRef={register(p.id)} />
            ))}
          </ul>
          <p className="sc-foot">{after.footer}</p>
          <div className="sc-picker" role="group" aria-label="Try a shopper">
            {NEEDS.map((n, i) => (
              <button key={n.key} type="button" className={i === active ? "is-on" : ""} aria-pressed={i === active} onClick={() => pick(i)}>
                {n.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sc-question">{after.question}</p>
      </div>

      <style>{`
        .sc { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr); grid-template-rows: auto auto auto auto; column-gap: 18px; text-align: left; }
        .sc-col { display: grid; grid-template-rows: subgrid; grid-row: 1 / -1; }
        .sc-before { grid-column: 1; }
        .sc-after { grid-column: 3; }
        .sc-when { font-family: var(--font-geist-mono), monospace; font-size: 12px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-3); }
        .sc-after .sc-when { color: var(--brand-600); }
        .sc-title { font-size: clamp(26px, 3.4vw, 42px); font-weight: 450; letter-spacing: -.025em; line-height: 1.15; margin: 6px 0 18px; color: var(--ink-3); }
        .sc-after .sc-title { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .sc-card { display: flex; flex-direction: column; border-radius: 18px; padding: 26px; border: 1px solid var(--line); background: var(--surface); }
        .sc-after .sc-card { background: var(--surface-ink); border-color: var(--surface-ink); color: var(--surface); box-shadow: 0 34px 60px -30px color-mix(in srgb, var(--brand) 70%, transparent); }
        .sc-desc { font-size: 15px; color: var(--ink-2); line-height: 1.5; min-height: 45px; }
        .sc-after .sc-desc { color: color-mix(in srgb, var(--surface) 82%, transparent); }
        .sc-label { font-family: var(--font-geist-mono), monospace; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); margin-top: 14px; }
        .sc-after .sc-label { color: var(--brand-light); }
        .sc-signals { min-height: 46px; display: flex; align-items: center; margin-top: 4px; }
        .sc-signal { display: inline-flex; align-items: center; gap: 9px; border-radius: 99px; padding: 6px 14px; font-size: 13.5px; font-weight: 500; background: var(--surface-muted); color: var(--ink-2); }
        .sc-signal i { width: 7px; height: 7px; border-radius: 99px; border: 1.5px solid var(--ink-3); flex-shrink: 0; }
        .sc-after .sc-signal { background: color-mix(in srgb, var(--surface) 10%, transparent); color: var(--surface); border: 1px solid color-mix(in srgb, var(--surface) 16%, transparent); }
        .sc-after .sc-signal i { border: 0; background: var(--brand-light); box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-light) 28%, transparent); }
        .sc-grid { list-style: none; margin: 14px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 10px; }
        .sc-item { display: flex; flex-direction: column; gap: 3px; }
        .sc-photo { position: relative; display: block; aspect-ratio: 4 / 5; border-radius: 10px; overflow: hidden; background: var(--surface-muted); }
        .sc-after .sc-photo { background: color-mix(in srgb, var(--surface) 8%, transparent); }
        .sc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s ease; }
        .sc-item:hover img { transform: scale(1.05); }
        .sc-before img { filter: saturate(.55); opacity: .85; }
        .sc-tag { position: absolute; left: 5px; bottom: 5px; max-width: calc(100% - 10px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10.5px; font-weight: 600; color: var(--brand-700); background: var(--surface); border-radius: 99px; padding: 2px 8px; }
        .sc-name { font-size: 12.5px; line-height: 1.3; margin-top: 5px; color: var(--ink-2); }
        .sc-price { font-size: 12px; color: var(--ink-3); }
        .sc-after .sc-name { color: var(--surface); }
        .sc-after .sc-price { color: color-mix(in srgb, var(--surface) 68%, transparent); }
        .sc-foot { margin-top: auto; padding-top: 18px; text-align: center; font-size: 13.5px; font-weight: 500; color: var(--ink-3); }
        .sc-after .sc-foot { margin-top: 0; color: color-mix(in srgb, var(--surface) 82%, transparent); }
        .sc-picker { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 16px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--surface) 14%, transparent); }
        .sc-picker button { font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 99px; padding: 7px 13px; background: transparent; color: var(--surface); border: 1px solid color-mix(in srgb, var(--surface) 22%, transparent); transition: background .2s ease, color .2s ease; }
        .sc-picker button:hover { background: color-mix(in srgb, var(--surface) 12%, transparent); }
        .sc-picker button.is-on { background: var(--surface); color: var(--ink); border-color: var(--surface); }
        .sc-picker button:focus-visible { outline: 2px solid var(--brand-light); outline-offset: 2px; }
        .sc-question { font-size: clamp(19px, 2.2vw, 28px); line-height: 1.35; letter-spacing: -.015em; margin-top: 30px; color: var(--ink); }
        .sc-after .sc-question { color: var(--brand-600); }
        .sc-arrow { grid-column: 2; grid-row: 3; align-self: center; width: 44px; height: 44px; border-radius: 99px; background: var(--ink); color: var(--surface); display: inline-flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: var(--shadow); }
        @media (prefers-reduced-motion: reduce) { .sc-photo img, .sc-picker button { transition: none; } }
        @media (max-width: 900px) {
          .sc { display: flex; flex-direction: column; }
          .sc-col { display: flex; flex-direction: column; }
          .sc-arrow { align-self: center; transform: rotate(90deg); margin: 28px 0; }
          .sc-question { margin-top: 20px; }
        }
        @media (max-width: 560px) {
          .sc-card { padding: 16px; }
          .sc-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
      `}</style>
    </div>
  );
}
