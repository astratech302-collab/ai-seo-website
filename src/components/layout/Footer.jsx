import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { FOOTER_COLS } from "@/data/nav";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "62px 0 40px",
        background: "var(--surface)",
      }}
    >
      <div className="wrap foot-grid">
        <div className="foot-brand">
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

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
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
              {col.heading}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((it) => (
                <Link
                  key={it.label}
                  href={it.href}
                  className="foot-link"
                  style={{ fontSize: 14, color: "var(--ink-2)", textDecoration: "none" }}
                >
                  {it.label}
                </Link>
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

      <style>{`
        .foot-grid {
          display: grid;
          grid-template-columns: 1.6fr repeat(4, 1fr);
          gap: 40px;
        }
        .foot-link:hover { color: var(--ink) !important; }
        @media (max-width: 900px) {
          .foot-grid { grid-template-columns: repeat(3, 1fr); }
          .foot-brand { grid-column: 1 / -1; margin-bottom: 8px; }
        }
        @media (max-width: 560px) {
          .foot-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}
