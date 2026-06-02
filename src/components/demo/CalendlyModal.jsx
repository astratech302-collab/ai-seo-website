"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CALENDLY_URL } from "@/config/site";

/**
 * A modal containing the Calendly inline embed. Controlled by BookDemoProvider.
 * Every "Book a demo" CTA on the site opens this.
 *
 * The inline widget needs (1) widget.css to size its iframe and (2) a parent
 * element that already has a non-zero box when initInlineWidget runs. Because
 * the dialog mounts its content in a portal that animates in, we wait for the
 * container to have layout (rAF poll) before initializing.
 */
export default function CalendlyModal({ open, onOpenChange }) {
  const containerRef = useRef(null);
  // Seed from an already-injected Calendly script (e.g. on a second open).
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && !!window.Calendly
  );

  // (Re)initialize the inline widget whenever the modal opens.
  useEffect(() => {
    if (!open || !scriptLoaded) return;

    let raf;
    let tries = 0;
    const init = () => {
      const el = containerRef.current;
      if (!el || !window.Calendly) return;
      // Wait until the portal content has actually been laid out.
      if (el.offsetWidth === 0 || el.offsetHeight === 0) {
        if (tries++ < 60) raf = requestAnimationFrame(init);
        return;
      }
      el.innerHTML = "";
      window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: el });
    };
    raf = requestAnimationFrame(init);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [open, scriptLoaded]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onReady={() => setScriptLoaded(true)}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-[calc(100%-1.5rem)] max-w-[440px] overflow-hidden border-0 bg-white p-0 sm:max-w-[440px]"
          style={{ borderRadius: 20 }}
        >
          <DialogTitle className="sr-only">Book a demo with Solorank</DialogTitle>
          <DialogDescription className="sr-only">
            Schedule a 30-minute demo using the calendar below.
          </DialogDescription>
          <div
            ref={containerRef}
            // Calendly recommends a min width/height for inline widgets.
            style={{ minWidth: 320, height: "min(78vh, 720px)" }}
            aria-label="Calendly scheduling calendar"
          >
            {!scriptLoaded && (
              <div
                className="mono"
                style={{
                  height: "100%",
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
