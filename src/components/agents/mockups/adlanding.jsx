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
  { key: "search", ad: "“vitamin c serum for dull skin”", channel: "Google Ads" },
  { key: "shopping", ad: "Glow Serum, 30 ml · $34.00", channel: "Google Shopping" },
  { key: "meta", ad: "Reel: “Your morning glow”", channel: "Meta" },
  { key: "youtube", ad: "Video: “How to use Glow Serum”", channel: "YouTube" },
];

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

/* 0 — Connect your ad accounts */
function ConnectMock() {
  const rows = [
    { k: "meta", n: "Meta Ads", s: "Connected", tone: "green" },
    { k: "search", n: "Google Ads", s: "Connected", tone: "green" },
    { k: "tiktok", n: "TikTok Ads", s: "Connect", tone: "orange" },
    { k: "youtube", n: "YouTube", s: "Connect", tone: "orange" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Ad accounts" meta="Connect the platforms you run ads on" />
        <div className="dash-table">
          {rows.map((r) => (
            <div className="dash-tr al-conn" key={r.k}>
              <span className="dash-td-title al-ad"><ChannelLogo channel={r.k} size={22} />{r.n}</span>
              {r.s === "Connected" ? <Chip tone="green">✓ Connected</Chip> : <span className="dash-btn-primary">Connect</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 170 }}>
        <Chip tone="green">2 connected</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>You choose what we can see.</p>
      </div>
    </MockStage>
  );
}

/* 1 — We fetch every ad */
function FetchMock() {
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Ads imported" meta="From all connected accounts" right={<Chip tone="green">24 ads</Chip>} />
        <div className="dash-table">
          <div className="dash-tr dash-th al-row">
            <span>Ad</span><span>Platform</span><span>Status</span>
          </div>
          {ADS.map((a) => (
            <div className="dash-tr al-row" key={a.key}>
              <span className="dash-td-title al-ad"><ChannelLogo channel={a.key} size={16} />{a.ad}</span>
              <span className="dash-td-muted">{a.channel}</span>
              <span><Chip tone="green">Imported</Chip></span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, top: 70, width: 170 }}>
        <span className="dash-eyebrow">Read</span>
        <p style={{ fontSize: 12.5, color: "var(--d-text2)", marginTop: 6 }}>Creative, copy, offer and audience for every ad.</p>
      </div>
    </MockStage>
  );
}

/* 2 — We suggest the changes for each ad */
function SuggestMock() {
  const rows = [
    { t: "Headline", v: "Vitamin C Serum for Dull Skin", tone: "orange" },
    { t: "Hero image", v: "Product close-up, amber bottle", tone: "violet" },
    { t: "Offer", v: "Free shipping over $40", tone: "green" },
    { t: "Proof", v: "4.8 ★ from 2,184 reviews", tone: "amber" },
  ];
  return (
    <MockStage>
      <div className="dash-card">
        <TopHead title="Suggestions" meta="For: “vitamin c serum for dull skin”" right={<span className="dash-btn-primary">Approve all</span>} />
        <div className="dash-table">
          {rows.map((r) => (
            <div className="dash-tr al-sug" key={r.t}>
              <span><Chip tone={r.tone}>{r.t}</Chip></span>
              <span className="dash-td-title">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 176 }}>
        <span className="dash-eyebrow" style={{ color: "#1A9E63" }}>✓ Strategist reviewed</span>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 6 }}>You approve before anything is built.</p>
      </div>
    </MockStage>
  );
}

/* 3 — We create the landing pages */
function BuildMock() {
  return (
    <MockStage>
      <div className="al-pair">
        <div>
          <div className="al-cap"><ChannelLogo channel="search" size={15} /><Chip tone="neutral">Google Ads</Chip></div>
          <Page k="search" compact />
        </div>
        <div>
          <div className="al-cap"><ChannelLogo channel="meta" size={15} /><Chip tone="neutral">Meta</Chip></div>
          <Page k="meta" compact />
        </div>
      </div>
      <div className="dash-float" style={{ right: -14, bottom: -16, width: 172 }}>
        <Chip tone="green">✓ Pages ready</Chip>
        <p style={{ fontSize: 12, color: "var(--d-text2)", marginTop: 8 }}>One page for every ad.</p>
      </div>
    </MockStage>
  );
}

const AD_MOCKS = [ConnectMock, FetchMock, SuggestMock, BuildMock];
export default AD_MOCKS;

export function AdLandingMockStyles() {
  return (
    <>
      <DashBaseStyles />
      <style>{`
        .al-row { grid-template-columns: 1.7fr 1fr 1.2fr; }
        .al-conn { grid-template-columns: 1fr auto; }
        .al-sug { grid-template-columns: auto 1fr; }
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
