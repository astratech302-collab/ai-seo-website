// Cover art for a blog post. Uses a real image when `cover.image` is set,
// otherwise renders an on-brand gradient cover with the post title (like a
// designed cover card). Themes: orange (brand), ink (dark), blue.

const THEMES = {
  orange: { bg: "linear-gradient(150deg, #FF7A45, var(--brand))", fg: "#fff", sub: "rgba(255,255,255,0.82)" },
  ink: { bg: "linear-gradient(150deg, #23201d, var(--surface-ink))", fg: "#fff", sub: "rgba(255,255,255,0.7)" },
  blue: { bg: "linear-gradient(150deg, #3b6ff5, #1b2b6b)", fg: "#fff", sub: "rgba(255,255,255,0.82)" },
};

export default function BlogCover({ post, big = false }) {
  const cover = post.cover || {};
  const radius = big ? 18 : 14;

  if (cover.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cover.image}
        alt={`${post.title} cover`}
        style={{ display: "block", width: "100%", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: radius }}
      />
    );
  }

  const theme = THEMES[cover.theme] || THEMES.orange;
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: big ? "16 / 9" : "16 / 10",
        borderRadius: radius,
        overflow: "hidden",
        background: theme.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: big ? "34px 36px" : "22px 22px",
      }}
    >
      <span
        style={{
          color: theme.fg,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.08,
          fontSize: big ? "clamp(28px, 4vw, 44px)" : "clamp(19px, 2.4vw, 24px)",
        }}
      >
        {post.title}
      </span>
    </div>
  );
}
