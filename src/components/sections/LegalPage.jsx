import SectionHead from "@/components/sections/SectionHead";
import Reveal from "@/components/motion/Reveal";
import { LEGAL } from "@/config/site";

/** Shared layout for the Terms and Privacy pages. `doc` comes from src/data/legal.js. */
export default function LegalPage({ doc }) {
  return (
    <section className="section-pad">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <SectionHead as="h1" eyebrow={doc.eyebrow} title={doc.heading} sub={doc.intro} />
        <p className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 20 }}>
          Effective {LEGAL.effectiveDateLabel}
        </p>

        <nav
          aria-label="On this page"
          style={{
            marginTop: 36,
            padding: "20px 24px",
            background: "var(--surface-soft)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
          }}
        >
          <ol
            className="legal-toc"
            style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6, fontSize: 14.5 }}
          >
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} style={{ color: "var(--ink-2)", textDecoration: "none" }}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div style={{ marginTop: 20 }}>
          {doc.sections.map((s, i) => (
            <Reveal key={s.id}>
              <section id={s.id} style={{ marginTop: 40, scrollMarginTop: 90 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {i + 1}. {s.title}
                </h2>
                {s.body.map((b, j) =>
                  typeof b === "string" ? (
                    <p
                      key={j}
                      style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 12 }}
                    >
                      {b}
                    </p>
                  ) : (
                    <ul
                      key={j}
                      style={{
                        marginTop: 12,
                        paddingLeft: 22,
                        display: "grid",
                        gap: 8,
                        fontSize: 16,
                        lineHeight: 1.65,
                        color: "var(--ink-2)",
                      }}
                    >
                      {b.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .legal-toc a:hover { color: var(--brand) !important; }
      `}</style>
    </section>
  );
}
