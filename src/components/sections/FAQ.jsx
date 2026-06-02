import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/sections/SectionHead";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/faqs";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-pad"
      style={{ background: "var(--surface-soft)", borderTop: "1px solid var(--line)" }}
    >
      <div className="wrap" style={{ maxWidth: 860 }}>
        <SectionHead eyebrow="FAQ" title="Questions, answered." center />
        <div style={{ marginTop: 40 }}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b-0"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <AccordionTrigger
                    className="cursor-pointer items-center gap-5 rounded-none py-[22px] hover:no-underline [&>svg]:hidden!"
                    style={{ color: "var(--ink)" }}
                  >
                    <span style={{ fontSize: 17.5, fontWeight: 500 }}>{f.q}</span>
                    <span
                      aria-hidden
                      className="shrink-0"
                      style={{
                        position: "relative",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--brand)",
                      }}
                    >
                      {/* horizontal bar — always visible (the "−") */}
                      <span
                        style={{
                          position: "absolute",
                          width: 12,
                          height: 2,
                          borderRadius: 2,
                          background: "currentColor",
                        }}
                      />
                      {/* vertical bar — fades out when open, turning "+" into "−" */}
                      <span
                        className="transition-opacity duration-300 group-aria-expanded/accordion-trigger:opacity-0"
                        style={{
                          position: "absolute",
                          width: 2,
                          height: 12,
                          borderRadius: 2,
                          background: "currentColor",
                        }}
                      />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      style={{
                        fontSize: 15.5,
                        color: "var(--ink-2)",
                        lineHeight: 1.62,
                        paddingBottom: 24,
                        maxWidth: 680,
                      }}
                    >
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
