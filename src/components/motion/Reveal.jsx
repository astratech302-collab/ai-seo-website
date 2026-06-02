"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered fade-up reveal (GSAP ScrollTrigger).
 * Replaces the prototype's IntersectionObserver `Reveal`, same feel:
 * fade in + translateY(22px) -> 0 when ~12% in view.
 *
 * Respects prefers-reduced-motion (content shown immediately, no animation).
 *
 * Props: delay (ms), as (element/component), plus any element props.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        el.classList.add("is-visible");
        gsap.set(el, { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
