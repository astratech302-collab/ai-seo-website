import Reveal from "@/components/motion/Reveal";
import BrowserWindow from "@/components/hero/BrowserWindow";
import CloudSky from "@/components/hero/CloudSky";
import FunnelMock from "@/components/hero/FunnelMock";
import StoreUrlForm from "@/components/hero/StoreUrlForm";
import { TAGLINE } from "@/config/site";

const SUB =
  "Geobuild reads each shopper's intent as it happens, sorts your collections one to one for that session, and matches the right audience to the right landing page on your Shopify store.";

/** Landing-page hero: a rounded sky panel that sits under the header. */
export default function HeroCro() {
  return (
    <section id="top" className="sky-hero">
      <CloudSky />
      <div className="wrap sky-hero-inner">
        <Reveal style={{ display: "inline-block", marginBottom: 24 }}>
          <span className="tag-pill">{TAGLINE}</span>
        </Reveal>
        <Reveal delay={40}>
          <h1 className="sky-title">
            Self-improving
            <br />
            storefronts.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="sky-sub">{SUB}</p>
        </Reveal>
        <Reveal delay={200} style={{ marginTop: 34 }}>
          <StoreUrlForm />
        </Reveal>
        <Reveal delay={260} className="sky-window">
          <BrowserWindow url="yourstore.com" title="A live visit, personalized as it happens">
            <FunnelMock />
          </BrowserWindow>
        </Reveal>
      </div>
      <style>{`
        .sky-hero { position: relative; margin: -70px 0 0; padding-top: 156px; overflow: hidden; isolation: isolate; }
        .sky-hero .sky { z-index: -1; }
        .sky-hero-inner { text-align: center; }
        .sky-title { font-size: clamp(30px, 8.2vw, 76px); line-height: 1.06; }
        .sky-sub { font-size: 18.5px; color: var(--ink); opacity: .78; max-width: 620px; margin: 22px auto 0; line-height: 1.55; }
        .sky-window { margin-top: 72px; padding-bottom: 40px; }
        @media (max-width: 760px) {
          .sky-hero { padding-top: 112px; }
          .sky-hero .wrap { padding-inline: 12px; }
          .sky-window { margin-top: 44px; padding-bottom: 12px; }
        }
      `}</style>
    </section>
  );
}
