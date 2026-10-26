"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { FOOTER_COLS } from "@/data/nav";
import { track } from "@/lib/track";
import { SOCIAL_LINKS, ORG_NAME } from "@/config/site";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    hoverColor: "#0A66C2",
    event: "button_clicked/linkedin_icon_footer",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    ),
  },
  {
    label: "X",
    href: SOCIAL_LINKS.twitter,
    hoverColor: "#000000",
    event: "button_clicked/twitter_icon_footer",
    icon: (
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65z" />
    ),
  },
];

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
            Everything to get sales for your store.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="foot-social"
                style={{ "--sc-hover": s.hoverColor }}
                onClick={() => track(s.event)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
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
          © 2026 {ORG_NAME}
        </span>
        <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
          <Link
            href="/privacy-policy"
            className="foot-link"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() => track("link_clicked/privacy_link_footer")}
          >
            Privacy
          </Link>
          {" · "}
          <Link
            href="/terms-and-conditions"
            className="foot-link"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() => track("link_clicked/terms_link_footer")}
          >
            Terms
          </Link>
        </span>
      </div>

      <style>{`
        .foot-grid {
          display: grid;
          grid-template-columns: 1.6fr repeat(${FOOTER_COLS.length}, 1fr);
          gap: 40px;
        }
        .foot-link:hover { color: var(--ink) !important; }
        .foot-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid var(--line);
          color: var(--ink-2);
          transition: color .18s ease, border-color .18s ease, background .18s ease;
        }
        .foot-social:hover {
          color: var(--sc-hover, var(--brand));
          border-color: var(--sc-hover, var(--brand));
          background: var(--surface-soft);
        }
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
