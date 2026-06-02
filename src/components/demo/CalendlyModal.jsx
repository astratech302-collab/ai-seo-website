"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CALENDLY_URL } from "@/config/site";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Ensure Calendly's widget.js is loaded and `window.Calendly` is available.
 * Loaded imperatively (rather than via next/script) because afterInteractive
 * can fail to fire its onLoad under Turbopack dev, leaving the embed stuck.
 */
function ensureCalendly() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.Calendly) return resolve();

    if (!document.getElementById("calendly-widget-js")) {
      const s = document.createElement("script");
      s.id = "calendly-widget-js";
      s.src = WIDGET_JS;
      s.async = true;
      s.onerror = () => reject(new Error("widget.js failed to load"));
      document.head.appendChild(s);
    }

    // Poll for the global regardless of how/when the script finishes — robust
    // against a prior load event we may have missed.
    const start = Date.now();
    const t = setInterval(() => {
      if (window.Calendly) {
        clearInterval(t);
        resolve();
      } else if (Date.now() - start > 8000) {
        clearInterval(t);
        reject(new Error("Calendly never loaded"));
      }
    }, 50);
  });
}

/**
 * A modal containing the Calendly inline embed. Controlled by BookDemoProvider.
 * Every "Book a demo" CTA on the site opens this.
 */
export default function CalendlyModal({ open, onOpenChange }) {
  // The Calendly mount node, tracked via a callback ref *in state* so the init
  // effect re-runs the moment Radix actually mounts the portal node — a plain
  // ref would read null on the first render where `open` flips true (the
  // portal content isn't in the DOM yet) and the effect would bail forever.
  const [el, setEl] = useState(null);
  // Whether the Calendly iframe has been injected (controls the loading overlay).
  const [ready, setReady] = useState(false);

  // (Re)initialize the inline widget once the modal is open AND its mount node
  // exists. We wait for the script (event-driven) and for a real layout box,
  // then let Calendly own the DOM inside its dedicated node.
  useEffect(() => {
    if (!open || !el) return;

    let cancelled = false;
    let raf;

    const inject = (attempt = 0) => {
      if (cancelled) return;
      const hasSize = el.offsetWidth > 0 && el.offsetHeight > 0;
      // Prefer a laid-out box, but never loop forever — after ~0.5s init
      // regardless so we can never hang on a zero-size read.
      if (!hasSize && attempt < 30) {
        raf = requestAnimationFrame(() => inject(attempt + 1));
        return;
      }
      el.innerHTML = "";
      window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: el });
      setReady(true);
    };

    ensureCalendly()
      .then(() => {
        if (!cancelled) raf = requestAnimationFrame(() => inject());
      })
      .catch((err) => {
        console.error("[Calendly]", err);
      });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      el.innerHTML = "";
      setReady(false);
    };
  }, [open, el]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-[calc(100%-1.5rem)] max-w-[1100px] overflow-hidden border-0 bg-white p-0 sm:w-[calc(100%-3rem)] sm:max-w-[1100px]"
          style={{ borderRadius: 20 }}
        >
          <DialogTitle className="sr-only">Book a demo with Solorank</DialogTitle>
          <DialogDescription className="sr-only">
            Schedule a 30-minute demo using the calendar below.
          </DialogDescription>
          {/* Size the iframe Calendly injects. We deliberately do NOT use the
              `calendly-inline-widget` class here: widget.js auto-scans for it
              on load and crashes (split of null) on any such element missing a
              `data-url`. We init manually instead, then size the iframe. */}
          <style>{`.sr-cal-embed iframe { width: 100%; height: 100%; border: 0; }`}</style>
          <div style={{ position: "relative", minWidth: 280 }}>
            {/* Loading overlay — a sibling, so toggling it never touches the
                Calendly-owned node below. */}
            {!ready && (
              <div
                className="mono"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-3)",
                  fontSize: 13,
                }}
              >
                Loading calendar…
              </div>
            )}
            {/* Calendly mount target: kept empty in JSX (self-closing) so React
                never reconciles its children and clobbers the injected iframe.
                The `.sr-cal-embed` rule above sizes the iframe to fill this box
                (two-pane on desktop, stacked on mobile). */}
            <div
              ref={setEl}
              className="sr-cal-embed"
              style={{ position: "relative", width: "100%", height: "min(92vh, 860px)" }}
              aria-label="Calendly scheduling calendar"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
