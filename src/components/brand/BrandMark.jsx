function SoloMark({ size, color = "#fff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* open ring with gap at top-right where arrow exits */}
      <path d="M12 5 A7 7 0 1 0 16.9 7" />
      {/* arrow shaft */}
      <path d="M10 14 L15.4 8.6" />
      {/* arrow head */}
      <path d="M11.7 8.6 L15.4 8.6 L15.4 12.3" />
    </svg>
  );
}

export function GeobuildMark({ size = 30, radius }) {
  const r = radius != null ? radius : Math.round(size * 0.3);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: "linear-gradient(150deg, #FF7A45, var(--brand))",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px -3px rgba(251,84,24,.55)",
        flexShrink: 0,
      }}
    >
      <SoloMark size={size * 0.56} />
    </span>
  );
}

export function BrandMark({ size = 28, light = false, href = "/" }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <GeobuildMark size={size} />
      <span
        style={{
          fontWeight: 800,
          fontSize: size * 0.69,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: light ? "#fff" : "var(--ink)",
        }}
      >
        Geo<span style={{ color: "var(--brand)" }}>build</span>
      </span>
    </a>
  );
}
