"use client";

import Reveal from "@/components/motion/Reveal";
import { track } from "@/lib/track";
import { INTRO } from "@/data/home";

export default function IntroStatement() {
  return (
    <section className="wrap intro">
      <Reveal>
        <a
          href="#how-it-works"
          className="eyebrow-link"
          onClick={() => track("link_clicked/introducing_geobuild_intro_home")}
        >
          {INTRO.link}
        </a>
      </Reveal>
      <div>
        {INTRO.paragraphs.map((p, i) => (
          <Reveal key={p.lead} delay={i * 90}>
            <p className="two-tone intro-p">
              <strong>{p.lead}</strong> {p.rest}
            </p>
          </Reveal>
        ))}
      </div>
      <style>{`
        .intro { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; padding-top: 112px; padding-bottom: 112px; }
        .intro-p { font-size: clamp(19px, 2.1vw, 25px); line-height: 1.5; }
        .intro-p + .intro-p, .intro > div > * + * { margin-top: 30px; }
        @media (max-width: 760px) { .intro { grid-template-columns: 1fr; gap: 22px; padding-top: 64px; padding-bottom: 64px; } }
      `}</style>
    </section>
  );
}
