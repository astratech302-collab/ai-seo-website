"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SortCompare from "@/components/onsite/SortCompare";
import { ONSITE_PRODUCT, ONSITE_PATH } from "@/data/onsite";
import { track } from "@/lib/track";

/** Homepage section for Onsite Discovery. */
export default function OnsiteSection() {
  return (
    <section id="onsite-discovery" className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
          <Link
            href={ONSITE_PATH}
            className="eyebrow-link"
            onClick={() => track("link_clicked/onsite_discovery_eyebrow_home")}
          >
            {ONSITE_PRODUCT.name}
          </Link>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 48px)", lineHeight: 1.12, marginTop: 18 }}>
            {ONSITE_PRODUCT.headline}
          </h2>
          <p style={{ fontSize: 17.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 18 }}>
            {ONSITE_PRODUCT.desc}
          </p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <SortCompare location="home" />
      </Reveal>
    </section>
  );
}
