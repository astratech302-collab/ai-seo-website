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
    const el = containerRef.current;
    if (!el || !window.Calendly) return;
    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: el });
  }, [open, scriptLoaded]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
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
            // Calendly recommends a min height for inline widgets.
            style={{ minWidth: 280, height: "min(78vh, 720px)" }}
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
