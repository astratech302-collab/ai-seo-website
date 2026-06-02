"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { GradientDefs } from "@/components/brand/EngineLogo";
import { useBookDemo } from "@/components/demo/BookDemoProvider";

const LINKS = [
  ["How it works", "#system"],
  ["Process", "#human"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openDemo } = useBookDemo();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <GradientDefs />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          background: scrolled ? "rgba(255,255,255,0.78)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <div
          className="wrap"
          style={{
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <BrandMark />
          <nav className="hdr-nav" style={{ display: "flex", gap: 32 }}>
            {LINKS.map(([l, h]) => (
              <a
                key={l}
                href={h}
                style={{
                  fontSize: 14.5,
                  color: "var(--ink-2)",
                  textDecoration: "none",
                  fontWeight: 450,
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-2)")}
              >
                {l}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "10px 18px", fontSize: 14 }}
              onClick={openDemo}
            >
              Book a demo
            </button>
          </div>
        </div>
        <style>{`@media (max-width: 820px){ .hdr-nav{ display:none !important; } }`}</style>
      </header>
    </>
  );
}
