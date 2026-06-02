/**
 * Solorank brand mark — a gradient squircle holding ascending "rank" bars
 * topped by a spark (growth + being the #1 answer).
 */
export function SolorankMark({ size = 30, radius }) {
  const r = radius != null ? radius : Math.round(size * 0.3);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: "var(--grad)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 5px 16px -4px rgba(255,90,31,0.55)",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="4.4" y="18.4" width="5.6" height="8.6" rx="2.4" fill="#fff" fillOpacity="0.7" />
        <rect x="13.2" y="12.4" width="5.6" height="14.6" rx="2.4" fill="#fff" fillOpacity="0.88" />
        <rect x="22" y="6.4" width="5.6" height="20.6" rx="2.4" fill="#fff" />
        <circle cx="24.8" cy="3.4" r="2.15" fill="#fff" />
      </svg>
    </span>
  );
}

export function BrandMark({ size = 28, light = false, href = "/" }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <SolorankMark size={size} />
      <span
        style={{
          fontWeight: 600,
          fontSize: size * 0.7,
          letterSpacing: "-0.035em",
          color: light ? "#fff" : "var(--ink)",
        }}
      >
        Solo<span style={{ color: "var(--brand)" }}>rank</span>
      </span>
    </a>
  );
}
