import { MockStage } from "./kit";
import { DashBaseStyles, TopHead, Chip } from "./dash";
import { AdCreative, StorePage, ChannelLogo } from "@/components/cro/AdCreatives";
import { CHANNELS } from "@/data/cro";
import { DEMO_IMG } from "@/data/demoAssets";

/**
 * Ad-to-Landing Pages mockups, composed from the shared dash kit so they match
 * the other product/service pages. Ads use real platform UI + photography;
 * the store (Dewlab) and its numbers are fictional.
 */

const byKey = (k) => CHANNELS.items.find((c) => c.key === k);

function Page({ k, compact }) {
  const c = byKey(k);
  return (
    <StorePage
      image={DEMO_IMG[c.page.image]}
      imagePos={c.page.imagePos}
      headline={c.page.headline}
      sub={c.page.sub}
      chips={c.page.chips}
      price={c.page.price}
      quote={c.page.quote}
      banner={c.page.banner}
      compact={compact}
    />
  );
}

const ADS = [
  { key: "search", ad: "“vitamin c serum for dull skin”", channel: "Google Search", page: "Search-intent page" },
  { key: "shopping", ad: "Glow Serum, 30 ml · $34.00", channel: "Google Shopping", page: "Product-first page" },
  { key: "meta", ad: "Reel: “Your morning glow”", channel: "Instagram", page: "Hook-led page" },
  { key: "ugc", ad: "Creator: “My 3-step routine”", channel: "Creator", page: "Social-proof page" },
];

function AdsTable({ third }) {
  return (
    <div className="dash-table">
      <div className="dash-tr dash-th al-row">
        <span>Ad</span><span>Channel</span><span>{third}</span>
      </div>
      {ADS.map((a) => (
        <div className="dash-tr al-row" key={a.key}>
          <span className="dash-td-title al-ad"><ChannelLogo channel={a.key} size={16} />{a.ad}</span>
          <span className="dash-td-muted">{a.channel}</span>
          <span className="dash-td-muted">{third === "Landing page" ? a.page : "Ready to share"}</span>
        </div>
      ))}
    </div>
  );
}

export function AdsHeroMock() {
  const search = byKey("search");
  return (
    <MockStage>
      <div className="al-hero-grid">
        <AdCreative channel="search" ad={search.ad} />
        <span className="al-hero-arrow" aria-hidden>→</span>
        <Page k="search" compact />
      </div>
      <div className="dash-float" style={{ right: -16, top: -14, width: 170 }}>
        <Chip tone="orange">1 ad → 1 page</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Every ad gets a page that continues it.</p>
      </div>
    </MockStage>
  );
}

/* 0 — Share your ads */
function ShareMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Your ads" meta="What you run for Glow Serum" right={<span className="dash-btn-primary">+ Add ad</span>} />
        <AdsTable third="Status" />
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 168 }}>
        <Chip tone="green">4 channels</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Search, shopping, social, creator</p>
      </div>
    </MockStage>
  );
}

/* 1 — We match a page type */
function MatchMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Page match" meta="The right page type for each ad" right={<Chip tone="violet">Suggested</Chip>} />
        <AdsTable third="Landing page" />
      </div>
      <div className="dash-float" style={{ right: -14, top: 70, width: 170 }}>
        <span className="dash-eyebrow">Why</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Each channel&apos;s visitor expects something different.</p>
      </div>
    </MockStage>
  );
}

/* 2 — We build the pages */
function BuildMock() {
  return (
    <MockStage>
      <div className="al-pair">
        <div>
          <div className="al-cap"><ChannelLogo channel="search" size={15} /><Chip tone="neutral">Google Search</Chip></div>
          <Page k="search" />
        </div>
        <div>
          <div className="al-cap"><ChannelLogo channel="meta" size={15} /><Chip tone="neutral">Instagram</Chip></div>
          <Page k="meta" />
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 172 }}>
        <Chip tone="green">✓ Same product</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>A different page for every ad.</p>
      </div>
    </MockStage>
  );
}

/* 3 — Test and refine */
function RefineMock() {
  const rows = [
    { k: "search", p: "Search-intent page", v: "3.4%", tone: "green", s: "Winning" },
    { k: "meta", p: "Hook-led page", v: "2.9%", tone: "amber", s: "Testing" },
    { k: "ugc", p: "Social-proof page", v: "3.1%", tone: "green", s: "Winning" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Page results" meta="Which pages keep winning" right={<Chip tone="neutral">Last 14 days</Chip>} />
        <div className="dash-table">
          <div className="dash-tr dash-th al-row">
            <span>Page</span><span>Order rate</span><span>Status</span>
          </div>
          {rows.map((r) => (
            <div className="dash-tr al-row" key={r.p}>
              <span className="dash-td-title al-ad"><ChannelLogo channel={r.k} size={16} />{r.p}</span>
              <span className="dash-td-muted">{r.v}</span>
              <span><Chip tone={r.tone}>{r.s}</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 168 }}>
        <Chip tone="orange">Refining</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>Keep what works, improve the rest.</p>
      </div>
    </MockStage>
  );
}

const AD_MOCKS = [ShareMock, MatchMock, BuildMock, RefineMock];
export default AD_MOCKS;

export function AdLandingMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <style>{`
        .al-row { grid-template-columns: 1.7fr 1fr 1.2fr; }
        .al-ad { display: flex; align-items: center; gap: 8px; }
        .al-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .al-cap { margin-bottom: 8px; display: flex; align-items: center; gap: 7px; }
        .al-hero-grid { display: grid; grid-template-columns: minmax(0,1.15fr) auto minmax(0,0.85fr); gap: 10px; align-items: center; }
        .al-hero-ads { display: flex; flex-direction: column; gap: 12px; }
        .al-hero-arrow { width: 32px; height: 32px; border-radius: 99px; background: var(--grad); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; }
        @media (max-width: 760px) {
          .al-pair, .al-hero-grid { grid-template-columns: 1fr; }
          .al-hero-arrow { transform: rotate(90deg); margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .al-row { grid-template-columns: 1fr auto; gap: 12px; }
          .al-row > :nth-child(3) { display: none; }
        }
      `}</style>
    </>
  );
}
