"use client";

import Link from "next/link";
import { track } from "@/lib/track";

/**
 * Primary demo CTA. Links to /contact-us.
 *
 * Pass an `event` (Mixpanel hierarchy name, e.g. "button_clicked/book_demo_final_cta")
 * to fire a tracked event on click — see CLAUDE.md ("Mixpanel events") and MIXPANEL_EVENTS.md.
 */
export default function BookDemoButton({
  label = "Book a demo",
  showArrow = true,
  className = "btn btn-primary",
  style,
  event,
  onClick,
  ...rest
}) {
  const handleClick = (e) => {
    if (event) track(event);
    onClick?.(e);
  };
  return (
    <Link href="/contact-us" className={className} style={style} onClick={handleClick} {...rest}>
      {label}
      {showArrow && <span className="arr">→</span>}
    </Link>
  );
}
