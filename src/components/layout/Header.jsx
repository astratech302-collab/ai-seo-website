"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { GradientDefs } from "@/components/brand/EngineLogo";
import { AGENTS, AGENT_ICONS } from "@/data/agents";
import { RESOURCES, agentHref, serviceHref } from "@/data/nav";
import { SERVICES } from "@/data/services";
import { ADS_NAV } from "@/data/cro";
import { ASSET_BASE, AI_SEO_ENABLED } from "@/config/site";

/* ---- shared bits ---------------------------------------------------------- */

function Caret({ open }) {
  return (
    <svg
      className={`caret ${open ? "up" : ""}`}
      width="11"
      height="11"
      viewBox="0 0 12 12"
      aria-hidden
    >
      <path
        d="M2.5 4.5 L6 8 L9.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTile({ glyph, img, size = 44, scale = 0.55, alt = "" }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.46,
        color: "var(--brand-600)",
        background: "var(--surface-soft)",
        border: "1px solid var(--line)",
      }}
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={alt} width={size * scale} height={size * scale} style={{ display: "block" }} />
      ) : (
        glyph
      )}
    </span>
  );
}

// Header-only icon overrides (imported creative). Detail pages keep the glyph.
const AGENT_TILE_IMG = {
  "strategy-agent": `${ASSET_BASE}/strategy-agent.png`,
  "research-agent": `${ASSET_BASE}/research-agent.png`,
  "content-agent": `${ASSET_BASE}/content-agent.png`,
  "optimizer-agent": `${ASSET_BASE}/optimizer-agent.png`,
  "analyzer-agent": `${ASSET_BASE}/analyzer-agent.png`,
};

// Services mega-menu icons (slug → png on S3).
const SERVICE_TILE_IMG = {
  "answer-engine-optimization": `${ASSET_BASE}/answer-engine-optimization.png`,
  "ai-seo": `${ASSET_BASE}/ai-seo.png`,
  "technical-seo": `${ASSET_BASE}/technical-seo.png`,
  "reddit-marketing": `${ASSET_BASE}/reddit-marketing.png`,
  "conversion-rate-optimization": `${ASSET_BASE}/optimizer-agent.png`, // reuses an existing icon
};

// Resources dropdown icons (label → png on S3).
const RESOURCE_TILE_IMG = {
  Blog: `${ASSET_BASE}/blog.png`,
  FAQ: `${ASSET_BASE}/faq.png`,
};

function MenuLink({ href, title, desc, glyph, img, imgScale, onClick }) {
  const tileAlt = img ? `${title} icon` : "";
  return (
    <Link
      href={href}
      onClick={onClick}
      className="mega-link"
      style={{
        display: "flex",
        gap: 13,
        padding: "10px 12px",
        borderRadius: 12,
        textDecoration: "none",
        alignItems: "flex-start",
      }}
    >
      {(glyph != null || img) && <IconTile glyph={glyph} img={img} scale={imgScale} alt={tileAlt} />}
      <span>
        <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>
          {title}
        </span>
        {desc && (
          <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-2)", marginTop: 3, lineHeight: 1.4 }}>
            {desc}
          </span>
        )}
      </span>
    </Link>
  );
}

/* ---- mega-menu panels ----------------------------------------------------- */

function ProductPanel({ onNav }) {
  return (
    <div className="mega-grid">
      <div className="mega-features mega-services">
        {AGENTS.length > 0 && (
          <>
            <div className="mega-eyebrow">Agents</div>
            <div className="mega-col-2">
              {AGENTS.map((a) => (
                <MenuLink
                  key={a.slug}
                  href={agentHref(a.slug)}
                  title={a.name}
                  desc={a.short}
                  glyph={AGENT_ICONS[a.code]}
                  img={AGENT_TILE_IMG[a.slug]}
                  onClick={onNav}
                />
              ))}
            </div>
          </>
        )}
        <div className="mega-eyebrow" style={AGENTS.length > 0 ? { marginTop: 14 } : undefined}>Products</div>
        <div className="mega-col-2">
          <MenuLink href={ADS_NAV.href} title={ADS_NAV.name} desc={ADS_NAV.short} glyph={ADS_NAV.role.slice(0, 1)} img={AGENT_TILE_IMG["content-agent"]} onClick={onNav} />
        </div>
      </div>
    </div>
  );
}

function ServicesPanel({ onNav }) {
  return (
    <div className="mega-grid">
      <div className="mega-features mega-services">
        <div className="mega-eyebrow">Services</div>
        <div className="mega-col-2">
          {SERVICES.map((s) => (
            <MenuLink
              key={s.slug}
              href={serviceHref(s.slug)}
              title={s.name}
              desc={s.short}
              glyph={s.role.slice(0, 1)}
              img={SERVICE_TILE_IMG[s.slug]}
              onClick={onNav}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourcesPanel({ onNav }) {
  return (
    <div style={{ padding: 8, minWidth: 300 }}>
      {RESOURCES.map((r) => (
        <MenuLink key={r.label} href={r.href} title={r.label} desc={r.desc} img={RESOURCE_TILE_IMG[r.label]} onClick={onNav} />
      ))}
    </div>
  );
}

// Resources (blog + FAQ) is AI-SEO content and is empty while the flag is off.
const NAV_MENUS = ["Product", "Services", ...(RESOURCES.length > 0 ? ["Resources"] : [])];

const MENUS = {
  Product: ProductPanel,
  Services: ServicesPanel,
  Resources: ResourcesPanel,
};

/* ---- header --------------------------------------------------------------- */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null); // 'Product' | 'Services' | 'Resources' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    // Defer the initial read to rAF so we never setState synchronously in the effect.
    const raf = requestAnimationFrame(on);
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const Panel = open ? MENUS[open] : null;
  const solid = scrolled || open;

  return (
    <>
      <GradientDefs />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          borderBottom: "1px solid var(--line)",
          background: solid ? "rgba(255,255,255,0.86)" : "transparent",
          backdropFilter: solid ? "saturate(180%) blur(14px)" : "none",
          WebkitBackdropFilter: solid ? "saturate(180%) blur(14px)" : "none",
          transition: "background .3s ease, border-color .3s ease",
        }}
        onMouseLeave={scheduleClose}
      >
        <div
          className="wrap"
          style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div className="hdr-left" style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <BrandMark />

            <nav className="hdr-nav" style={{ display: "flex", gap: 4 }}>
              {NAV_MENUS.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="hdr-trigger"
                  aria-expanded={open === name}
                  onMouseEnter={() => openMenu(name)}
                  onFocus={() => openMenu(name)}
                  onClick={() => setOpen((o) => (o === name ? null : name))}
                >
                  {name}
                  <Caret open={open === name} />
                </button>
              ))}
              {AI_SEO_ENABLED && (
                <Link href="/pricing" className="hdr-trigger" onMouseEnter={scheduleClose}>
                  Pricing
                </Link>
              )}
            </nav>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/contact-us"
              className="btn btn-primary hdr-cta"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              Book a demo <span className="arr">→</span>
            </Link>
            <button
              type="button"
              className="hdr-burger"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Desktop mega-menu panel */}
        {Panel && (
          <div
            className="mega-wrap hdr-nav"
            onMouseEnter={() => openMenu(open)}
            onMouseLeave={scheduleClose}
          >
            <div className="wrap">
              <div className={`mega-card${open === "Resources" ? " mega-card-sm" : ""}`}>
                <Panel onNav={() => setOpen(null)} />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      <style>{`
        .hdr-trigger {
          font-family: var(--font-sans), sans-serif;
          font-size: 13.5px; font-weight: 600; color: var(--ink-2);
          background: none; border: none; cursor: pointer;
          padding: 8px 12px; border-radius: 10px; text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          transition: color .15s, background .15s;
        }
        .hdr-trigger:hover, .hdr-trigger[aria-expanded="true"] { color: var(--ink); background: var(--surface-soft); }
        .caret { display: block; transition: transform .2s ease; opacity: .6; }
        .caret.up { transform: rotate(180deg); }

        .mega-wrap { position: absolute; left: 0; right: 0; top: 70px; }
        .mega-card {
          background: var(--surface); border: 1px solid var(--line);
          border-radius: 20px; box-shadow: var(--shadow);
          padding: 30px 34px; margin-top: 6px;
          animation: megaIn .18s ease;
        }
        @keyframes megaIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .mega-card-sm { max-width: 320px; padding: 14px; margin-left: 372px; }

        .mega-grid { display: grid; grid-template-columns: 1fr; align-items: start; }
        .mega-col-2 { display: grid; grid-template-columns: 1fr 1fr; column-gap: 26px; row-gap: 6px; }
        .mega-eyebrow {
          font-size: 12.5px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-3);
          padding: 0 12px 14px;
        }
        .mega-link { transition: background .15s ease; }
        .mega-link:hover { background: var(--surface-soft); }

        .hdr-burger { display: none; }

        @media (max-width: 820px) {
          .hdr-nav { display: none !important; }
          .hdr-cta { display: none !important; }
          .hdr-burger {
            display: inline-flex; flex-direction: column; gap: 5px;
            background: none; border: none; cursor: pointer; padding: 8px;
          }
          .hdr-burger span { width: 22px; height: 2px; background: var(--ink); border-radius: 2px; }
        }
      `}</style>
    </>
  );
}

/* ---- mobile drawer -------------------------------------------------------- */

function MdRow({ href, label, sub, onClose }) {
  return (
    <Link href={href} onClick={onClose} className="md-sub">
      <span style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{label}</span>
      {sub && <span style={{ fontSize: 12.5, color: "var(--ink-2)", display: "block", marginTop: 2 }}>{sub}</span>}
    </Link>
  );
}

function MdAcc({ id, title, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button type="button" className="md-acc" onClick={() => onToggle(id)} aria-expanded={open}>
        {title}
        <Caret open={open} />
      </button>
      {open && <div style={{ padding: "0 0 12px" }}>{children}</div>}
    </div>
  );
}

function MobileDrawer({ onClose }) {
  const [section, setSection] = useState(null);
  const toggle = (s) => setSection((cur) => (cur === s ? null : s));

  return (
    <div className="md-scrim" onClick={onClose}>
      <div className="md-panel" onClick={(e) => e.stopPropagation()}>
        <MdAcc id="product" title="Product" open={section === "product"} onToggle={toggle}>
          {AGENTS.map((a) => (
            <MdRow key={a.slug} href={agentHref(a.slug)} label={a.name} onClose={onClose} />
          ))}
          <MdRow href={ADS_NAV.href} label={ADS_NAV.name} onClose={onClose} />
        </MdAcc>
        <MdAcc id="services" title="Services" open={section === "services"} onToggle={toggle}>
          {SERVICES.map((s) => (
            <MdRow key={s.slug} href={serviceHref(s.slug)} label={s.name} onClose={onClose} />
          ))}
        </MdAcc>
        {RESOURCES.length > 0 && (
          <MdAcc id="resources" title="Resources" open={section === "resources"} onToggle={toggle}>
            {RESOURCES.map((r) => (
              <MdRow key={r.label} href={r.href} label={r.label} onClose={onClose} />
            ))}
          </MdAcc>
        )}
        {AI_SEO_ENABLED && (
          <Link href="/pricing" onClick={onClose} className="md-acc" style={{ display: "flex" }}>
            Pricing
          </Link>
        )}
        <Link
          href="/contact-us"
          onClick={onClose}
          className="btn btn-primary"
          style={{ marginTop: 18, width: "100%" }}
        >
          Book a demo
        </Link>
      </div>
      <style>{`
        .md-scrim {
          position: fixed; inset: 0; z-index: 300; background: rgba(18,18,16,0.35);
          backdrop-filter: blur(2px); animation: mdFade .2s ease;
        }
        .md-panel {
          position: absolute; top: 0; right: 0; height: 100%; width: min(88vw, 380px);
          background: var(--surface); box-shadow: var(--shadow);
          padding: 78px 22px 28px; overflow-y: auto; animation: mdSlide .22s ease;
        }
        @keyframes mdFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mdSlide { from { transform: translateX(100%); } to { transform: none; } }
        .md-acc {
          width: 100%; text-align: left; background: none; border: none; cursor: pointer;
          font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 600; color: var(--ink);
          padding: 15px 0; display: flex; align-items: center; justify-content: space-between;
        }
        .md-sub { display: block; padding: 9px 12px; border-radius: 10px; text-decoration: none; }
        .md-sub:hover { background: var(--surface-soft); }
      `}</style>
    </div>
  );
}
