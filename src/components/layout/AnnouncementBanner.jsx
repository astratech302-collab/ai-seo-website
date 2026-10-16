"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/track";
import { BANNER } from "@/data/cro";

const KEY = "geobuild:banner-cro-dismissed";

/** Dismissible announcement bar above the header. Dismissal is remembered per browser. */
export default function AnnouncementBanner() {
  // Start hidden so a previously dismissed banner never flashes on load.
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(KEY) === "1";
    } catch {
      // storage unavailable — show the banner
    }
    const raf = requestAnimationFrame(() => setShow(!dismissed));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    track("button_clicked/dismiss_announcement_banner");
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-grad"
      style={{ position: "relative", color: "#fff" }}
    >
      <div
        className="wrap"
        style={{
          minHeight: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "8px 44px",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 999,
            padding: "3px 9px",
            fontWeight: 500,
          }}
        >
          {BANNER.label}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{BANNER.text}</span>
        <Link
          href={BANNER.href}
          onClick={() => track("link_clicked/cro_announcement_banner")}
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          {BANNER.cta} →
        </Link>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          width: 30,
          height: 30,
          borderRadius: 999,
          border: "none",
          background: "transparent",
          color: "#fff",
          fontSize: 20,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
