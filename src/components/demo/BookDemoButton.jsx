"use client";

import { useBookDemo } from "@/components/demo/BookDemoProvider";

/**
 * The canonical "Book a demo" CTA. Opens the Calendly modal.
 * Use this for every demo-booking action so behavior stays consistent.
 *
 * Props:
 *  - label: button text (default "Book a demo")
 *  - showArrow: render the trailing → (default true)
 *  - className: button classes (default `btn btn-primary`)
 *  - style: inline style overrides
 */
export default function BookDemoButton({
  label = "Book a demo",
  showArrow = true,
  className = "btn btn-primary",
  style,
  ...rest
}) {
  const { openDemo } = useBookDemo();
  return (
    <button type="button" className={className} style={style} onClick={openDemo} {...rest}>
      {label}
      {showArrow && <span className="arr">→</span>}
    </button>
  );
}
