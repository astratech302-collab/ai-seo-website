"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll to the top on every route (pathname) change.
 *
 * Next's default scroll-to-top on navigation is unreliable here because
 * `html { scroll-behavior: smooth }` (globals.css) animates the reset, and
 * navigating between two pages of the same dynamic segment (e.g.
 * /agents/[slug] → /agents/[slug]) can preserve the old offset. This forces an
 * instant jump to the top — but skips when the URL has a hash so in-page anchor
 * links (#system, #faq, article TOC) still scroll to their target.
 *
 * Mounted once in the root layout. Renders nothing.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
