import { BrandMark } from "@/components/brand/BrandMark";

const COLS = [
  ["Product", ["How it works", "Pricing", "FAQ"]],
  ["Company", ["Contact"]],
];

const HREFS = {
  "How it works": "#system",
  Pricing: "#pricing",
  FAQ: "#faq",
  Contact: "#cta",
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "62px 0 40px",
        background: "var(--surface)",
      }}
    >
      <div
        className="wrap foot-grid"
        style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 40 }}
      >
        <div>
          <BrandMark />
          <p
            style={{
              fontSize: 14,
              color: "var(--ink-2)",
              marginTop: 16,
              maxWidth: 260,
              lineHeight: 1.55,
            }}
          >
            Agent-run AEO, GEO and SEO with a human final call. Be the brand AI recommends.
          </p>
        </div>
        {COLS.map(([h, items]) => (
          <div key={h}>
            <div
              className="mono"
              style={{
                fontSize: 11.5,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              {h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((it) => (
                <a
                  key={it}
                  href={HREFS[it] || "#"}
                  style={{ fontSize: 14, color: "var(--ink-2)", textDecoration: "none" }}
                >
                  {it}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="wrap"
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid var(--line-soft)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
          © 2026 Geobuild, Inc.
        </span>
        <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
          Privacy · Terms
        </span>
      </div>
      <style>{`@media (max-width: 760px){ .foot-grid{ grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px){ .foot-grid > div:first-child{ grid-column: 1 / -1; } }`}</style>
    </footer>
  );
}
