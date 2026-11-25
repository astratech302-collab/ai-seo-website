import { MockStage } from "./kit";
import { TopHead, Chip } from "./dash";
import { AdLandingMockStyles } from "./adlanding";
import { NEEDS, PRODUCTS, TAG_LABELS } from "@/data/onsite";
import { sortForNeed, matchedTags } from "@/lib/collectionSort";

/**
 * Storefront mockups (intent -> 1:1 sort), built from the shared dash kit.
 * The store, shopper and numbers are fictional.
 */

/* 0 — Capture visitor intent */
function IntentMock() {
  const signals = [
    { k: "Searched", v: "15 inch laptop backpack" },
    { k: "Product viewed", v: "Metro Slim ×3" },
    { k: "Time on page", v: "2m 10s" },
    { k: "Came from", v: "Instagram ad" },
    { k: "Filter", v: "Fits 15″ laptop" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Live visitor" meta="yourstore.com · Backpacks" right={<Chip tone="green">● Live</Chip>} />
        <div className="dash-table">
          {signals.map((s) => (
            <div className="dash-tr hp-row" key={s.k}>
              <span className="dash-td-muted">{s.k}</span>
              <span className="dash-td-title hp-val">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow">Captured</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>Searches, filters, views and source, as they happen.</p>
      </div>
    </MockStage>
  );
}

/* 1 — Sort the collection for this session */
function SessionSortMock() {
  const need = NEEDS[0];
  const top = sortForNeed(PRODUCTS, need).slice(0, 4);
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Backpacks" meta="Sorted for this shopper" right={<Chip tone="green">● In session</Chip>} />
        <div className="dash-table">
          {top.map((p, i) => (
            <div className="dash-tr hp-sort" key={p.id}>
              <span className="dash-td-muted">{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} width="36" height="45" loading="lazy" />
              <span className="dash-td-title">{p.name}</span>
              <Chip tone="orange">{TAG_LABELS[matchedTags(p, need)[0]]}</Chip>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 190 }}>
        <span className="dash-eyebrow">This shopper</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>{need.signal}</p>
      </div>
    </MockStage>
  );
}

export function HyperMockStyles() {
  return (
    <>
      <AdLandingMockStyles />
      <style>{`
        .hp-row { grid-template-columns: 1fr auto; }
        .hp-val { display: inline-flex; align-items: center; gap: 10px; justify-content: flex-end; }
        .hp-sort { grid-template-columns: 14px 36px 1fr auto; }
        .hp-sort img { width: 36px; height: 45px; object-fit: cover; border-radius: 6px; }
      `}</style>
    </>
  );
}

export { IntentMock, SessionSortMock };
