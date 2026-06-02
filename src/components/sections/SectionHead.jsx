import Reveal from "@/components/motion/Reveal";

/** Shared eyebrow + title + sub heading block used across sections. */
export default function SectionHead({ eyebrow, title, sub, center, children }) {
  return (
    <div
      style={{
        textAlign: center ? "center" : "left",
        maxWidth: center ? 720 : 640,
        margin: center ? "0 auto" : 0,
      }}
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={60}>
        <h2
          style={{
            fontSize: "clamp(27px, 2.9vw, 38px)",
            marginTop: 18,
            fontWeight: 600,
            letterSpacing: "-0.022em",
          }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={120}>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              marginTop: 16,
              lineHeight: 1.55,
              maxWidth: center ? 600 : 560,
              marginLeft: center ? "auto" : 0,
              marginRight: center ? "auto" : 0,
            }}
          >
            {sub}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
