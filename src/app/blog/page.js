import Reveal from "@/components/motion/Reveal";
import BookDemoButton from "@/components/demo/BookDemoButton";

export const metadata = {
  title: "Blog — Geobuild",
  description:
    "Playbooks and field notes on Answer Engine Optimization, GEO and AI search. Coming soon.",
};

export default function BlogPage() {
  return (
    <section className="section-pad">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <Reveal>
          <span className="eyebrow">Blog</span>
        </Reveal>
        <Reveal delay={60}>
          <h1
            className="h-tight"
            style={{ fontSize: "clamp(34px, 5vw, 56px)", letterSpacing: "-0.025em", marginTop: 18 }}
          >
            Field notes on AI search.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 18, color: "var(--ink-2)", marginTop: 18, lineHeight: 1.6 }}>
            We&apos;re putting together playbooks on Answer Engine Optimization, GEO and how
            brands win recommendations from ChatGPT, Claude, Gemini and Perplexity. Check back
            soon — or book a demo and we&apos;ll walk you through it directly.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ marginTop: 30 }}>
            <BookDemoButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
