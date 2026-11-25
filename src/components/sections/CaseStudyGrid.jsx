"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import CaseStudyCover from "@/components/sections/CaseStudyCover";
import { caseStudyHref } from "@/data/caseStudies";
import { track } from "@/lib/track";

/**
 * Clickable case study cards. `featureFirst` lays the first one across the full width.
 * `location` ends the event name: link_clicked/{slug}_card_{location}.
 */
export default function CaseStudyGrid({ studies, featureFirst = false, location }) {
  return (
    <>
      <div className="cst-grid">
        {studies.map((c, i) => (
          <div key={c.slug} className={featureFirst && i === 0 ? "cst-cell is-wide" : "cst-cell"}>
            <Reveal delay={(i % 2) * 80}>
              <Link
                href={caseStudyHref(c.slug)}
                className="cst-card"
                onClick={() => track(`link_clicked/${c.slug.replaceAll("-", "_")}_card_${location}`)}
              >
                <CaseStudyCover study={c} />
                <div className="cst-body">
                  <div className="cst-tags">
                    <span className="cst-cat">{c.category}</span>
                    {c.label && <span className="cst-flag">{c.label}</span>}
                  </div>
                  <h2>{c.title}</h2>
                  <p>{c.summary}</p>
                  <span className="cst-more">Read the case study <span className="cst-arr" aria-hidden>→</span></span>
                </div>
              </Link>
            </Reveal>
          </div>
        ))}
      </div>
      <style>{`
        .cst-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
        .cst-cell > div, .cst-card { height: 100%; }
        .cst-cell.is-wide { grid-column: 1 / -1; }
        .cst-card { display: flex; flex-direction: column; overflow: hidden; text-decoration: none; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); transition: transform .25s ease, box-shadow .25s ease; }
        .cst-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .cst-card:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }
        .cst-body { display: flex; flex: 1; flex-direction: column; gap: 12px; padding: 26px 28px 28px; }
        .cst-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
        .cst-cat { font-size: 13px; font-weight: 600; color: var(--brand-600); }
        .cst-flag { font-size: 11.5px; color: var(--ink-2); border: 1px solid var(--line); border-radius: 99px; padding: 3px 10px; }
        .cst-body h2 { font-size: 24px; line-height: 1.2; color: var(--ink); }
        .cst-body p { font-size: 15px; line-height: 1.55; color: var(--ink-2); }
        .cst-more { margin-top: auto; padding-top: 6px; font-size: 14.5px; font-weight: 500; color: var(--ink); }
        .cst-arr { display: inline-block; transition: transform .2s ease; }
        .cst-card:hover .cst-arr { transform: translateX(4px); }
        @media (min-width: 861px) {
          .is-wide .cst-card { flex-direction: row; }
          .is-wide .csc { flex: 1 1 54%; min-height: 340px; }
          .is-wide .cst-body { flex: 1 1 46%; justify-content: center; padding: 40px; }
          .is-wide .cst-body h2 { font-size: 32px; }
          .is-wide .cst-more { margin-top: 8px; }
        }
        @media (max-width: 700px) { .cst-grid { grid-template-columns: 1fr; } .cst-body { padding: 22px; } }
        @media (prefers-reduced-motion: reduce) { .cst-card, .cst-arr { transition: none; } .cst-card:hover { transform: none; } }
      `}</style>
    </>
  );
}
