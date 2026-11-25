"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { GradientDefs } from "@/components/brand/EngineLogo";
import { AGENTS, AGENT_ICONS } from "@/data/agents";
import { PRODUCT_LINKS, agentHref, serviceHref } from "@/data/nav";
import ProductIcon from "@/components/brand/ProductIcon";
import { SERVICES } from "@/data/services";
import { track } from "@/lib/track";
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
          {PRODUCT_LINKS.map((p) => (
            <MenuLink
              key={p.key}
              href={p.href}
              title={p.name}
              desc={p.short}
              glyph={<ProductIcon name={p.key} />}
              onClick={() => {
                track(`link_clicked/${p.key}_product_menu_header`);
                onNav();
              }}
            />
          ))}
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
              glyph={<ProductIcon name={s.slug.replaceAll("-", "_")} />}
              onClick={() => { track(`link_clicked/${s.slug.replaceAll("-", "_")}_services_menu_header`); onNav(); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Order: Product, Services (menus), then Pricing and Blog (links).
const NAV_MENUS = ["Product", "Services"];
const NAV_LINKS = [
  { label: "Pricing", href: "/pricing", event: "link_clicked/pricing_header", mobileEvent: "link_clicked/pricing_mobile_menu" },
  { label: "Blog", href: "/blog", event: "link_clicked/blog_header", mobileEvent: "link_clicked/blog_mobile_menu" },
];

const MENUS = {
  Product: ProductPanel,
  Services: ServicesPanel,
};

/* ---- header --------------------------------------------------------------- */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null); // 'Product' | 'Services' | null
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

  return (
    <>
      <GradientDefs />
      <header
        className={`hdr${scrolled ? " is-float" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="hdr-bar">
          <BrandMark />

          <nav className="hdr-nav hdr-center" aria-label="Main">
            {NAV_MENUS.map((name) => (
              <button
                key={name}
                type="button"
                className="hdr-trigger"
                aria-expanded={open === name}
                onMouseEnter={() => openMenu(name)}
                onFocus={() => openMenu(name)}
                onClick={() => {
                  track(`button_clicked/${name.toLowerCase()}_menu_header`);
                  setOpen((o) => (o === name ? null : name));
                }}
              >
                {name}
                <Caret open={open === name} />
              </button>
            ))}
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hdr-trigger"
                onMouseEnter={scheduleClose}
                onClick={() => track(l.event)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hdr-right">
            <Link
              href="/contact-us"
              className="btn btn-primary hdr-cta"
              style={{ padding: "10px 20px", fontSize: 15, borderRadius: 14 }}
              onClick={() => track("button_clicked/book_demo_header")}
            >
              Book a demo <span className="arr">→</span>
            </Link>
            <button
              type="button"
              className="hdr-burger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => {
                track("button_clicked/menu_icon_header");
                setMobileOpen((v) => !v);
              }}
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
              <div className="mega-card">
                <Panel onNav={() => setOpen(null)} />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      <style>{`
        .hdr { position: sticky; top: 0; z-index: 200; height: 70px; }
        .hdr-bar {
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
          height: 62px; margin: 4px auto; max-width: 1360px; padding: 0 40px;
          border-radius: 20px;
          transition: max-width .35s ease, margin .35s ease, padding .35s ease, background .25s ease, box-shadow .35s ease;
        }
        /* Scrolled: the bar becomes a floating dark pill. */
        .is-float .hdr-bar {
          max-width: min(1180px, calc(100% - 24px)); margin-top: 8px; padding: 0 14px 0 26px;
          background: var(--surface-nav);
          box-shadow: 0 18px 44px -14px color-mix(in srgb, var(--ink) 55%, transparent);
          --brand-text: var(--surface); --mark-bg: var(--surface); --mark-fg: var(--ink);
        }
        .is-float .hdr-trigger { color: var(--surface); }
        .is-float .hdr-trigger:hover, .is-float .hdr-trigger[aria-expanded="true"] { background: color-mix(in srgb, var(--surface) 12%, transparent); }
        .is-float .hdr-cta { background: var(--brand-600); }
        .is-float .hdr-burger span { background: var(--surface); }
        .hdr-center { display: flex; gap: 10px; }
        .hdr-right { grid-column: 3; justify-self: end; display: flex; align-items: center; gap: 12px; }
        .hdr-trigger {
          font-family: var(--font-sans), sans-serif;
          font-size: 15.5px; font-weight: 500; color: var(--ink); white-space: nowrap;
          background: none; border: none; cursor: pointer;
          padding: 8px 12px; border-radius: 10px; text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          transition: color .15s, background .15s;
        }
        .hdr-trigger:hover, .hdr-trigger[aria-expanded="true"] { background: color-mix(in srgb, var(--ink) 6%, transparent); }
        .caret { display: block; transition: transform .2s ease; opacity: .6; }
        .caret.up { transform: rotate(180deg); }

        .mega-wrap { position: absolute; left: 0; right: 0; top: 70px; }
        .hdr-trigger:focus-visible, .hdr-cta:focus-visible { outline: 2px solid var(--brand-light); outline-offset: 2px; }
        .mega-card {
          background: var(--surface); border: 1px solid var(--line);
          border-radius: 20px; box-shadow: var(--shadow);
          padding: 30px 34px; margin: 6px auto 0; max-width: 820px;
          animation: megaIn .18s ease;
        }
        @keyframes megaIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

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

        @media (prefers-reduced-motion: reduce) { .hdr-bar { transition: none; } }
        @media (max-width: 880px) {
          .hdr-bar { padding-inline: 24px; }
          .is-float .hdr-bar { padding-inline: 18px 10px; }
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
  const onClick = () => {
    track(`link_clicked/${label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_mobile_menu`);
    onClose();
  };
  return (
    <Link href={href} onClick={onClick} className="md-sub">
      <span style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{label}</span>
      {sub && <span style={{ fontSize: 12.5, color: "var(--ink-2)", display: "block", marginTop: 2 }}>{sub}</span>}
    </Link>
  );
}

function MdAcc({ id, title, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        type="button"
        className="md-acc"
        onClick={() => {
          track(`button_clicked/${id}_section_mobile_menu`);
          onToggle(id);
        }}
        aria-expanded={open}
      >
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
          {PRODUCT_LINKS.map((p) => (
            <MdRow key={p.key} href={p.href} label={p.name} onClose={onClose} />
          ))}
        </MdAcc>
        <MdAcc id="services" title="Services" open={section === "services"} onToggle={toggle}>
          {SERVICES.map((s) => (
            <MdRow key={s.slug} href={serviceHref(s.slug)} label={s.name} onClose={onClose} />
          ))}
        </MdAcc>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => {
              track(l.mobileEvent);
              onClose();
            }}
            className="md-acc md-link"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact-us"
          onClick={() => { track("button_clicked/book_demo_mobile_menu"); onClose(); }}
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
          font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 500; color: var(--ink);
          padding: 15px 0; display: flex; align-items: center; justify-content: space-between;
        }
        .md-link { display: flex; text-decoration: none; border-bottom: 1px solid var(--line); }
        .md-sub { display: block; padding: 9px 12px; border-radius: 10px; text-decoration: none; }
        .md-sub:hover { background: var(--surface-soft); }
      `}</style>
    </div>
  );
}
