// Realistic-looking ad creatives (Google Search, Google Shopping, Instagram, YouTube)
// and a photo-based store page, used inside the CRO / Ad-to-Landing mockups.
// Brand + store are fictional; platform logos identify the channel only.
import { DEMO_IMG, DEMO_STORE } from "@/data/demoAssets";

const SANS = '-apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

/* ---------------- platform logos ---------------- */

export function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function InstagramLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA77" />
          <stop offset="0.35" stopColor="#F58529" />
          <stop offset="0.6" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGrad)" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  );
}

export function YouTubeLogo({ size = 18 }) {
  return (
    <svg width={size * 1.4} height={size} viewBox="0 0 28 20" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <rect width="28" height="20" rx="5.5" fill="#FF0000" />
      <path d="M11.2 5.8v8.4l7.3-4.2z" fill="#fff" />
    </svg>
  );
}

const glyph = { fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

function ShoppingBagIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <path {...glyph} stroke="#4285F4" d="M5 8h14l-1 12H6z" />
      <path {...glyph} stroke="#EA4335" d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function CreatorIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <circle {...glyph} stroke="#DD2A7B" cx="12" cy="8.5" r="3.5" />
      <path {...glyph} stroke="#DD2A7B" d="M5 20c.8-3.6 3.4-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  );
}

function RetargetIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <path {...glyph} stroke="#FB5418" d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path {...glyph} stroke="#FB5418" d="M20 4v4.5h-4.5" />
    </svg>
  );
}

/** Channel icon: real platform logo where one exists, a colored glyph otherwise. */
export function ChannelLogo({ channel, size = 16 }) {
  switch (channel) {
    case "search":
      return <GoogleG size={size} />;
    case "shopping":
      return <ShoppingBagIcon size={size} />;
    case "youtube":
      return <YouTubeLogo size={size} />;
    case "ugc":
      return <CreatorIcon size={size} />;
    case "retargeting":
      return <RetargetIcon size={size} />;
    default:
      return <InstagramLogo size={size} />;
  }
}

/* ---------------- small icons ---------------- */

const ig = { fill: "none", stroke: "#262626", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
function IgActions() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px 4px" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path {...ig} d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11z" /></svg>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path {...ig} d="M20.5 12a8.5 8.5 0 1 1-3.4-6.8L21 4l-1 4.3a8.4 8.4 0 0 1 .5 3.7z" /></svg>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path {...ig} d="M21 3 10 14M21 3l-6.5 18-3.5-7-7-3.5z" /></svg>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden style={{ marginLeft: "auto" }}><path {...ig} d="M6 3h12v18l-6-4.5L6 21z" /></svg>
    </div>
  );
}

function Stars({ n = 4.8, color = "#F5A623", size = 12 }) {
  return (
    <span style={{ color, fontSize: size, letterSpacing: 1 }} aria-label={`${n} out of 5`}>
      ★★★★★
    </span>
  );
}

/* ---------------- ad creatives ---------------- */

const frame = {
  background: "#fff",
  border: "1px solid #dbdbdb",
  borderRadius: 12,
  overflow: "hidden",
  fontFamily: SANS,
  color: "#262626",
  boxShadow: "0 18px 40px -22px rgba(20,16,12,0.35)",
};

function GoogleSearchAd({ ad }) {
  return (
    <div style={{ ...frame, fontFamily: "Arial, Helvetica, sans-serif", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #dfe1e5", borderRadius: 24, padding: "8px 14px", boxShadow: "0 1px 6px rgba(32,33,36,.12)" }}>
        <GoogleG size={18} />
        <span style={{ fontSize: 14, color: "#202124", flex: 1 }}>{ad.query}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><circle cx="10" cy="10" r="6.5" fill="none" stroke="#4285F4" strokeWidth="2.4" /><path d="m15 15 6 6" stroke="#4285F4" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: 99, background: "#F1F3F4", color: "#5f6368", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>D</span>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 12.5, color: "#202124" }}>{DEMO_STORE.name}</div>
            <div style={{ fontSize: 11.5, color: "#4d5156" }}><b style={{ color: "#202124" }}>Sponsored</b> · https://{DEMO_STORE.domain}</div>
          </div>
        </div>
        <div style={{ fontSize: 18, color: "#1a0dab", marginTop: 8, lineHeight: 1.3 }}>{ad.title}</div>
        <div style={{ fontSize: 13, color: "#4d5156", marginTop: 4, lineHeight: 1.5 }}>{ad.body}</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10, fontSize: 13, color: "#1a0dab" }}>
          {ad.links.map((l) => (<span key={l}>{l}</span>))}
        </div>
      </div>
    </div>
  );
}

function GoogleShoppingAd({ ad }) {
  return (
    <div style={{ ...frame, fontFamily: "Arial, Helvetica, sans-serif", padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <GoogleG size={16} />
        <span style={{ fontSize: 13, color: "#5f6368" }}>Shopping</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#5f6368" }}>Sponsored</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ border: "1px solid #dfe1e5", borderRadius: 10, overflow: "hidden", opacity: i ? 0.55 : 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_IMG.product} alt={i ? "" : `${DEMO_STORE.product} product listing`} width={200} height={200} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: i ? "30% 70%" : "center 62%", display: "block" }} />
            <div style={{ padding: "8px 10px 10px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#202124" }}>{ad.price}</div>
              <div style={{ fontSize: 12.5, color: "#1a0dab", lineHeight: 1.3, marginTop: 2 }}>{ad.title}</div>
              <div style={{ fontSize: 11.5, color: "#5f6368", marginTop: 3 }}>{DEMO_STORE.name}</div>
              <div style={{ fontSize: 11.5, marginTop: 3, color: "#5f6368" }}><Stars /> {ad.rating}</div>
              <div style={{ fontSize: 11.5, color: "#188038", marginTop: 3 }}>Free shipping</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstagramAd({ ad, image, handle = "dewlab", sub = "Sponsored", overlay }) {
  return (
    <div style={{ ...frame, maxWidth: 380 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px" }}>
        <span style={{ width: 32, height: 32, borderRadius: 99, padding: 2, background: "linear-gradient(45deg,#FEDA77,#F58529,#DD2A7B,#8134AF)", display: "inline-flex" }}>
          <span style={{ flex: 1, borderRadius: 99, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{handle[0].toUpperCase()}</span>
        </span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{handle}</div>
          <div style={{ fontSize: 11.5, color: "#737373" }}>{sub}</div>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 18, letterSpacing: 1, color: "#262626" }} aria-hidden>···</span>
      </div>
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={`${DEMO_STORE.product} ad creative`} width={380} height={380} style={{ width: "100%", aspectRatio: "4 / 4.4", objectFit: "cover", display: "block" }} />
        {overlay && (
          <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, background: "rgba(255,255,255,0.92)", borderRadius: 10, padding: "10px 12px", fontSize: 15, fontWeight: 700, color: "#111", lineHeight: 1.25 }}>
            {overlay}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#EFEFEF", padding: "10px 12px", fontSize: 13, fontWeight: 600 }}>
        <span>{ad.cta || "Shop now"}</span>
        <span aria-hidden>›</span>
      </div>
      <IgActions />
      <div style={{ padding: "0 12px 12px", fontSize: 13, lineHeight: 1.4 }}>
        <b>{handle}</b> {ad.caption}
      </div>
    </div>
  );
}

function YouTubeAd({ ad }) {
  return (
    <div style={{ ...frame, fontFamily: "Roboto, Arial, sans-serif" }}>
      <div style={{ position: "relative", background: "#000" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DEMO_IMG.howto} alt={`${DEMO_STORE.product} video ad`} width={380} height={214} style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "center 45%", display: "block" }} />
        <span style={{ position: "absolute", left: 10, bottom: 18, background: "rgba(0,0,0,.7)", color: "#fff", fontSize: 11, padding: "3px 7px", borderRadius: 4 }}>Ad · 0:12</span>
        <span style={{ position: "absolute", right: 10, bottom: 18, background: "rgba(0,0,0,.75)", color: "#fff", fontSize: 12, fontWeight: 500, padding: "7px 12px", borderRadius: 3 }}>Skip ▸|</span>
        <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,.3)" }}>
          <span style={{ display: "block", width: "42%", height: "100%", background: "#FFCC00" }} />
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
        <span style={{ width: 34, height: 34, borderRadius: 99, background: "#F1F3F4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>D</span>
        <div style={{ lineHeight: 1.25, flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{ad.headline}</div>
          <div style={{ fontSize: 11.5, color: "#606060" }}>Ad · {DEMO_STORE.domain}</div>
        </div>
        <span style={{ background: "#065FD4", color: "#fff", fontSize: 12.5, fontWeight: 500, padding: "7px 12px", borderRadius: 18, whiteSpace: "nowrap" }}>Visit site</span>
      </div>
    </div>
  );
}

/** channel: search | shopping | meta | youtube | ugc | retargeting. `ad` comes from data/cro.js. */
export function AdCreative({ channel, ad }) {
  switch (channel) {
    case "search":
      return <GoogleSearchAd ad={ad} />;
    case "shopping":
      return <GoogleShoppingAd ad={ad} />;
    case "youtube":
      return <YouTubeAd ad={ad} />;
    case "ugc":
      return <InstagramAd ad={ad} image={DEMO_IMG.routine} handle="mia.glows" sub="Paid partnership with dewlab" />;
    case "retargeting":
      return <InstagramAd ad={ad} image={DEMO_IMG.product} overlay={ad.headline} />;
    default:
      return <InstagramAd ad={ad} image={DEMO_IMG.lifestyle} />;
  }
}

/* ---------------- store (landing) page ---------------- */

/**
 * A mobile-style product page with a real photo. `children` render as an
 * absolutely-positioned overlay (used for heatmaps / session traces).
 */
export function StorePage({ image = DEMO_IMG.product, imagePos = "center 60%", headline, sub, chips = [], price, quote, banner, compact, children }) {
  return (
    <div style={{ ...frame, position: "relative", maxWidth: 360, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>dewlab</span>
        <span style={{ fontSize: 12, color: "#737373" }} aria-hidden>🛒 0</span>
      </div>
      {banner && <div style={{ background: "#FFF3EC", color: "#CF400E", fontSize: 11.5, fontWeight: 600, padding: "6px 14px", textAlign: "center" }}>{banner}</div>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={`${headline} product photo`} width={360} height={300} style={{ width: "100%", height: compact ? 120 : 190, objectFit: "cover", objectPosition: imagePos, display: "block" }} />
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{headline}</div>
        {sub && <div style={{ fontSize: 12.5, color: "#555", marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
        {!compact && quote && <div style={{ fontSize: 12.5, color: "#333", marginTop: 8, fontStyle: "italic" }}>{quote}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <Stars /> <span style={{ fontSize: 11.5, color: "#737373" }}>4.8 · 2,184 reviews</span>
        </div>
        {!compact && chips.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {chips.map((c) => (
              <span key={c} style={{ fontSize: 11, fontWeight: 600, color: "#CF400E", background: "#FFEDE3", borderRadius: 99, padding: "4px 10px" }}>{c}</span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          {price && <span style={{ fontSize: 16, fontWeight: 800 }}>{price}</span>}
          <span style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#FF7A45,#FB5418)", borderRadius: 10, padding: "10px 0" }}>Add to cart</span>
        </div>
      </div>
      {children}
    </div>
  );
}
