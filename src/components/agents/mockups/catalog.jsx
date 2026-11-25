/**
 * Catalog Enrichment hero: a product is converted into machine-readable data that an AI
 * agent can match against a request. Fictional store. CSS-only motion.
 */
import { MockStage } from "./kit";
import { DashBaseStyles } from "./dash";
import { CATALOG_DEMO as demo } from "@/data/growth";

export function CatalogHeroMock() {
  return (
    <MockStage>
      <div className="ce">
        <div className="ce-product">
          <span className="ce-label">{demo.productLabel}</span>
          <span className="ce-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={demo.image} alt={demo.imageAlt} width="360" height="450" />
            <i className="ce-scan" aria-hidden />
          </span>
          <b>{demo.productTitle}</b>
          <span className="ce-note">{demo.productNote}</span>
        </div>

        <span className="ce-arrow" aria-hidden>→</span>

        <div className="ce-code mono">
          <span className="ce-label">{demo.codeLabel}</span>
          <code>
            {demo.code.map(([depth, key, value], i) => (
              <span className="ce-line" key={i} style={{ paddingLeft: depth * 14, "--d": `${0.5 + i * 0.18}s` }}>
                {key && <em>{`"${key}": `}</em>}
                {value}
              </span>
            ))}
          </code>
        </div>

        <div className="ce-agent">
          <span className="ce-label">{demo.requestLabel}</span>
          <p>{demo.request}</p>
          <span className="ce-result">{demo.result}</span>
        </div>
      </div>
    </MockStage>
  );
}

export function CatalogMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <style>{`
        .ce { display: grid; grid-template-columns: minmax(0, .8fr) auto minmax(0, 1.35fr); gap: 10px; align-items: stretch; text-align: left; }
        .ce-label { font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
        .ce-product { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border-radius: 12px; padding: 12px; box-shadow: var(--shadow-sm); }
        .ce-photo { position: relative; display: block; overflow: hidden; border-radius: 8px; }
        .ce-photo img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; }
        .ce-scan { position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--brand-light); box-shadow: 0 0 14px 4px color-mix(in srgb, var(--brand-light) 60%, transparent); animation: ceScan 2.8s ease-in-out infinite alternate; }
        .ce-product b { font-size: 12.5px; font-weight: 600; line-height: 1.35; color: var(--ink); }
        .ce-note { font-size: 11.5px; line-height: 1.4; color: var(--ink-3); }
        .ce-arrow { align-self: center; width: 28px; height: 28px; border-radius: 99px; background: var(--grad); color: var(--surface); display: inline-flex; align-items: center; justify-content: center; font-size: 14px; }
        .ce-code { display: flex; flex-direction: column; gap: 10px; min-width: 0; background: var(--surface-ink); color: var(--surface); border-radius: 12px; padding: 12px 14px; }
        .ce-code .ce-label, .ce-agent .ce-label { color: var(--brand-light); }
        .ce-code code { display: flex; flex-direction: column; font: inherit; font-size: 11px; line-height: 1.75; }
        .ce-line { display: block; overflow-wrap: anywhere; animation: ceType .45s var(--d) ease both; }
        .ce-line em { font-style: normal; color: var(--brand-light); }
        .ce-agent { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; align-items: center; background: var(--surface); border-radius: 12px; padding: 12px 14px; box-shadow: var(--shadow-sm); }
        .ce-agent .ce-label { grid-column: 1 / -1; color: var(--brand-600); }
        .ce-agent p { font-size: 13px; line-height: 1.4; color: var(--ink); }
        .ce-result { font-size: 11.5px; font-weight: 600; white-space: nowrap; color: var(--brand-700); background: var(--brand-tint); border-radius: 99px; padding: 5px 11px; animation: ceType .45s 2.6s ease both; }
        @keyframes ceScan { from { top: 0; } to { top: calc(100% - 2px); } }
        @keyframes ceType { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .ce-line, .ce-result { animation: none; } .ce-scan { display: none; } }
        @media (max-width: 480px) {
          .ce { grid-template-columns: 1fr; }
          .ce-photo { max-width: 160px; }
          .ce-arrow { justify-self: center; transform: rotate(90deg); }
          .ce-agent { grid-template-columns: 1fr; }
          .ce-result { justify-self: start; }
        }
      `}</style>
    </>
  );
}
