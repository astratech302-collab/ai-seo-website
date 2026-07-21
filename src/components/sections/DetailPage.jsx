import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";

/**
 * Shared template for agent + service detail pages. Content-driven, so new pages
 * are just data (see data/agents.js, data/services.js). The user iterates on this.
 *
 * Props:
 *  - kind: "Agent" | "Service" (eyebrow label)
 *  - data: { name, role, tagline?, short, desc, how?{heading,sub}, features?[{title,desc}], does[], why? }
 *  - icon: optional glyph shown in the hero tile
 *  - mockup: optional React node — the simple "How it works" explainer visual
 *  - showcase: optional React node — a full per-feature zigzag; when present it
 *    REPLACES the how + feature-card sections (used by agents with built mockups)
 *  - related: { heading, hrefBase, items: [{ slug, name, short }] }
 *
 * The How it works / feature-card / Why it matters sections render only when the
 * matching data is present, so service pages (data-only, no mockup) stay unchanged.
 */
export default function DetailPage({ kind, data, icon, mockup, showcase, heroMedia, related }) {
  const features = data.features?.length ? data.features : null;

  return (
    <>
      {/* Hero */}
      <section className="section-pad" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className={`detail-hero${heroMedia ? " has-media" : ""}`}>
            <div className="detail-hero-copy">
          {!data.tagline && (
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                {icon != null && (
                  <span
                    aria-hidden
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      color: "var(--brand-600)",
                      background: "var(--brand-tint)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {icon}
                  </span>
                )}
                <span className="eyebrow">
                  {kind}
                  {data.role ? ` · ${data.role}` : ""}
                </span>
              </div>
            </Reveal>
          )}
          {data.tagline && (
            <Reveal delay={40}>
              <div style={{ marginBottom: 18 }}>
                <span
                  className="mono"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 12.5,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: "var(--brand-600)",
                    background: "var(--brand-tint)",
                    border: "1px solid var(--brand-200)",
                    borderRadius: 999,
                    padding: "6px 13px",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--brand)",
                    }}
                  />
                  {data.tagline}
                </span>
              </div>
            </Reveal>
          )}
          <Reveal delay={60}>
            <h1
              className="h-tight"
              style={{ fontSize: "clamp(34px, 5vw, 58px)", letterSpacing: "-0.025em" }}
            >
              {data.name}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              style={{
                fontSize: "clamp(18px, 2.2vw, 22px)",
                color: "var(--ink)",
                marginTop: 18,
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: 620,
              }}
            >
              {data.short}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontSize: 17,
                color: "var(--ink-2)",
                marginTop: 18,
                lineHeight: 1.6,
                maxWidth: 640,
              }}
            >
              {data.desc}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <BookDemoButton />
              <Link href="/pricing" className="btn btn-ghost">
                See pricing
              </Link>
            </div>
          </Reveal>
            </div>
            {heroMedia && (
              <div className="detail-hero-media">
                <Reveal delay={180}>{heroMedia}</Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why it's required — 3 stat-backed pointers */}
      {data.whyRequired && (
        <section className="section-pad" style={{ paddingTop: 72, paddingBottom: 36 }}>
          <div className="wrap">
            <Reveal>
              <div className="wr-head">
                <h2 className="h-tight wr-title">{data.whyRequired.heading}</h2>
                <p className="wr-sub">{data.whyRequired.sub}</p>
              </div>
            </Reveal>
            <div className="wr-cards">
              {data.whyRequired.points.map((p, i) => (
                <Reveal key={p.title} delay={60 + i * 70}>
                  <div className="wr-card">
                    <span className="wr-ic" aria-hidden>{p.icon}</span>
                    <h3 className="wr-card-t">{p.title}</h3>
                    <p className="wr-card-d">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Per-feature zigzag showcase (replaces how + feature cards when provided) */}
      {showcase}

      {/* How it works — explainer + mockup */}
      {!showcase && (data.how || mockup) && (
        <section style={{ paddingBottom: 20, paddingTop: 20 }}>
          <div className="wrap">
            <div className="detail-how">
              <div className="detail-how-copy">
                <Reveal>
                  <span className="eyebrow">How it works</span>
                </Reveal>
                {data.how?.heading && (
                  <Reveal delay={60}>
                    <h2
                      className="h-tight"
                      style={{
                        fontSize: "clamp(24px, 3vw, 34px)",
                        letterSpacing: "-0.02em",
                        marginTop: 16,
                      }}
                    >
                      {data.how.heading}
                    </h2>
                  </Reveal>
                )}
                {data.how?.sub && (
                  <Reveal delay={120}>
                    <p
                      style={{
                        fontSize: 17,
                        color: "var(--ink-2)",
                        marginTop: 16,
                        lineHeight: 1.6,
                      }}
                    >
                      {data.how.sub}
                    </p>
                  </Reveal>
                )}
              </div>
              {mockup && (
                <Reveal delay={140}>
                  <div className="detail-how-mock">{mockup}</div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* What it does */}
      {!showcase && (features || data.does?.length > 0) && (
        <section style={{ paddingBottom: 20, paddingTop: 44 }}>
          <div className="wrap">
            <Reveal>
              <span className="eyebrow">What it does</span>
            </Reveal>
            {features ? (
              <div className="detail-features">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={80 + i * 70}>
                    <div className="detail-feat">
                      <span className="mono" style={{ fontSize: 12, color: "var(--brand-600)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        style={{
                          fontSize: 17,
                          color: "var(--ink)",
                          marginTop: 12,
                          lineHeight: 1.35,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {f.title}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--ink-2)",
                          marginTop: 8,
                          lineHeight: 1.55,
                        }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="detail-does">
                {data.does.map((d, i) => (
                  <Reveal key={d} delay={80 + i * 70}>
                    <div
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: 16,
                        padding: "24px 22px",
                        height: "100%",
                        background: "var(--surface)",
                      }}
                    >
                      <span className="mono" style={{ fontSize: 12, color: "var(--brand-600)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        style={{
                          fontSize: 16,
                          color: "var(--ink)",
                          marginTop: 12,
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        {d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why it matters */}
      {data.why && (
        <section style={{ paddingTop: 44, paddingBottom: 20 }}>
          <div className="wrap">
            <Reveal>
              <div className="detail-why">
                <span className="eyebrow" style={{ color: "#fff", opacity: 0.85 }}>
                  Why it matters
                </span>
                <p className="detail-why-p">{data.why}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related?.items?.length > 0 && (
        <section className="section-pad" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <Reveal>
              <h2
                className="h-tight"
                style={{
                  fontSize: "clamp(24px, 3vw, 34px)",
                  letterSpacing: "-0.02em",
                  marginBottom: 28,
                  textAlign: "center",
                }}
              >
                {related.heading}
              </h2>
            </Reveal>
            <div className="detail-related">
              {related.items.map((it, i) => (
                <Reveal key={it.slug} delay={60 + i * 60}>
                  <Link
                    href={`${related.hrefBase}/${it.slug}`}
                    className="detail-rel-card"
                    style={{
                      display: "block",
                      position: "relative",
                      border: "1px solid var(--line)",
                      borderRadius: 14,
                      padding: "18px 20px",
                      textDecoration: "none",
                      background: "var(--surface)",
                      height: "100%",
                    }}
                  >
                    <span className="detail-rel-arrow" aria-hidden>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                    <span className="detail-rel-top">
                      {it.icon && (
                        <span className="detail-rel-ic" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.icon} alt="" width={26} height={26} style={{ display: "block" }} />
                        </span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                        {it.name}
                      </span>
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "var(--ink-2)",
                        marginTop: 6,
                        lineHeight: 1.45,
                      }}
                    >
                      {it.short}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .wr-head { text-align: center; max-width: 760px; margin: 0 auto 40px; }
        .wr-title { font-size: clamp(28px, 3.6vw, 42px); letter-spacing: -0.025em; }
        .wr-sub { font-size: 17px; color: var(--ink-2); line-height: 1.6; margin-top: 18px; }
        .wr-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .wr-card {
          border: 1px solid var(--line); border-radius: 18px; padding: 26px 24px;
          background: var(--surface-soft); height: 100%;
          transition: border-color .18s ease, transform .18s ease;
        }
        .wr-card:hover { border-color: rgba(18,18,16,0.14); transform: translateY(-2px); }
        .wr-ic { font-size: 30px; line-height: 1; display: block; }
        .wr-card-t { font-size: 19px; font-weight: 700; letter-spacing: -0.01em; margin-top: 16px; }
        .wr-card-d { font-size: 14.5px; color: var(--ink-2); line-height: 1.55; margin-top: 10px; }
        @media (max-width: 760px) { .wr-cards { grid-template-columns: 1fr; } }
        .detail-hero-copy { max-width: 820px; }
        .detail-hero.has-media {
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start;
        }
        .detail-hero.has-media .detail-hero-copy { max-width: none; }
        .detail-hero-media { min-width: 0; }
        @media (max-width: 900px) {
          .detail-hero.has-media { grid-template-columns: 1fr; gap: 40px; }
        }
        .detail-how {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
        }
        .detail-how-mock { min-width: 0; }
        .detail-does {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 22px;
        }
        .detail-features {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 22px;
        }
        .detail-feat {
          border: 1px solid var(--line); border-radius: 16px; padding: 24px 22px;
          height: 100%; background: var(--surface);
          transition: border-color .18s ease, transform .18s ease;
        }
        .detail-feat:hover { border-color: rgba(18,18,16,0.16); transform: translateY(-2px); }
        .detail-why {
          background: var(--surface-ink); color: #fff;
          border-radius: 20px; padding: 40px 44px;
        }
        .detail-why-p {
          font-size: clamp(19px, 2.4vw, 26px); line-height: 1.5; font-weight: 500;
          letter-spacing: -0.01em; margin-top: 16px; max-width: 760px;
        }
        .detail-related {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          max-width: 940px; margin: 0 auto;
        }
        .detail-rel-top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; padding-right: 22px; }
        .detail-rel-card { transition: border-color .18s ease, transform .18s ease; }
        .detail-rel-card:hover { border-color: rgba(18,18,16,0.16); transform: translateY(-2px); }
        .detail-rel-arrow {
          position: absolute; top: 16px; right: 16px;
          display: inline-flex; color: var(--ink-3);
          transition: color .18s ease, transform .18s ease;
        }
        .detail-rel-card:hover .detail-rel-arrow { color: var(--brand-600); transform: translate(2px, -2px); }
        .detail-rel-ic {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
          background: var(--surface-soft); border: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .detail-how { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 860px) { .detail-does, .detail-related { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) {
          .detail-does, .detail-features, .detail-related { grid-template-columns: 1fr; }
          .detail-why { padding: 30px 24px; }
        }
      `}</style>
    </>
  );
}
