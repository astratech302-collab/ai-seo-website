// The services Geobuild sells. Same shape as agents (data/agents.js) so the shared
// DetailPage template renders both uniformly. Edit copy here — not in components.
//
// Service pages: hero (name + short + desc) → whyRequired (3 stat pointers) →
// feature zigzag (features[] with body/why/cta + mockups) → why → related → CTA.
export const SERVICES = [
  {
    slug: "answer-engine-optimization",
    name: "Answer Engine Optimization",
    role: "AEO",
    tagline: "Be the answer AI gives",
    short: "Structure your content so AI models pick your brand as the answer",
    desc: "We engineer your presence inside ChatGPT, Claude, Gemini and Perplexity so that when a buyer asks for the best option in your category, your brand is in the answer — structured, cited and recommended.",
    whyRequired: {
      heading: "Your buyers are asking AI, not Google",
      sub: "ChatGPT alone answers 900M+ people a week, and each answer recommends only a handful of brands. If AI doesn't know you, you're not in the conversation.",
      points: [
        { icon: "💬", title: "Buying starts in AI", desc: "900M+ people use ChatGPT weekly, shortlisting brands inside the chat — before they ever visit a site." },
        { icon: "🎯", title: "Few brands make the cut", desc: "AI answers cite only a handful of sources — a Google AI Overview alone narrows 200–500 pages to just 5–15 cited." },
        { icon: "📈", title: "AI visitors are worth more", desc: "Traffic from AI search converts up to 4.4× better than organic search." },
      ],
    },
    features: [
      {
        title: "Map the prompts that matter",
        desc: "Find the exact questions your buyers ask AI, the ones worth winning.",
        body: "We research the real prompts your buyers type into ChatGPT, Claude, Gemini and Perplexity — then prioritize the high-intent ones actually worth winning first.",
        why: [
          "You target questions that drive real buying decisions",
          "No effort wasted on prompts nobody asks",
        ],
        cta: "Map your prompts",
      },
      {
        title: "Build answer-first content",
        desc: "Pages structured the way LLMs extract and quote, so you're the source.",
        body: "We write answer-first pages, comparisons and FAQs structured exactly the way LLMs extract and quote — so your brand becomes the source the model pulls from.",
        why: [
          "Answer-first structure gets you cited, not skimmed",
          "You become the source, not a footnote",
        ],
        cta: "Get answer-first content",
      },
      {
        title: "Earn the citation",
        desc: "Get your brand named and cited across ChatGPT, Claude, Gemini & Perplexity.",
        body: "We work every lever — content, authority and structure — until your brand is named and cited in the answers themselves, across all four major engines.",
        why: [
          "Being cited is what puts you in the recommendation",
          "Citations compound into lasting visibility",
        ],
        cta: "Earn your citations",
      },
      {
        title: "Track share of voice",
        desc: "Measure how often AI recommends you vs. rivals, on every engine.",
        body: "We track how often each engine recommends you versus competitors, turning “are we winning?” into a live number you can watch improve.",
        why: [
          "You can prove the work is moving the needle",
          "Spot rivals gaining before they pull ahead",
        ],
        cta: "Track share of voice",
      },
    ],
    why: "When a buyer asks AI for the best option in your category, the brand it names wins the deal. AEO makes sure that brand is you.",
    does: [
      "Map the prompts your buyers actually ask",
      "Build answer-first content models pull from",
      "Track share of voice across every engine",
    ],
  },
  {
    slug: "ai-seo",
    name: "AI Search",
    role: "GEO",
    tagline: "Win generative search",
    short: "Optimize for how AI models retrieve and rank",
    desc: "Google AI Overviews and AI Mode are re-ranking every category. We optimise for generative search end to end — entities, structure and authority — so you stay visible as the SERP turns into an answer.",
    whyRequired: {
      heading: "The blue links are disappearing",
      sub: "AI Overviews now show on up to 60% of searches — and ~83% of those end without a click. The only way to stay visible is to be inside the answer.",
      points: [
        { icon: "🔎", title: "AI Overviews are everywhere", desc: "They appear on up to 60% of searches, pushing the classic results far down the page." },
        { icon: "🚫", title: "Clicks are vanishing", desc: "~83% of AI-Overview searches end with zero clicks — ranking #1 no longer guarantees traffic." },
        { icon: "🏆", title: "Ranking #1 isn't enough", desc: "Only 38% of AI-Overview citations come from the top 10 results; the rest are won on relevance." },
      ],
    },
    features: [
      {
        title: "Optimize for AI Overviews & AI Mode",
        desc: "Tuned for Google's AI answers, not just the blue links.",
        body: "We optimize your pages specifically for Google's AI Overviews and AI Mode — the summaries that now sit above the classic results and decide what buyers see first.",
        why: [
          "AI Overviews appear on up to 60% of searches",
          "Being in the answer beats ranking below it",
        ],
        cta: "Win AI Overviews",
      },
      {
        title: "Build topical authority",
        desc: "Align entities and topic clusters so AI sees you as the authority.",
        body: "We align your entities, topic clusters and internal structure so generative search recognizes you as the authority on your category — not just one page on a topic.",
        why: [
          "AI favors sources with clear topical depth",
          "Authority lifts you across many related queries",
        ],
        cta: "Build your authority",
      },
      {
        title: "Win answer-triggering queries",
        desc: "Target the searches that now return AI answers, and be in them.",
        body: "We find the queries that now trigger AI answers in your category and make sure your pages are the ones those answers are built from.",
        why: [
          "Only 38% of AI citations come from the top 10",
          "Relevance, not rank, wins the citation",
        ],
        cta: "Win the queries",
      },
      {
        title: "Keep pages machine-readable",
        desc: "Schema and structure so generative search can parse and cite you.",
        body: "We keep every page clean and structured — schema, headings and markup — so generative search can parse, attribute and resurface your content without friction.",
        why: [
          "AI can only cite what it can parse cleanly",
          "Schema unlocks rich results and AI answers",
        ],
        cta: "Make pages readable",
      },
    ],
    why: "Search is becoming an answer, not a list. AI Search keeps you visible — and cited — as that shift accelerates across every query.",
    does: [
      "Optimise for AI Overviews & AI Mode",
      "Align entities and topical authority",
      "Win the queries that trigger AI answers",
    ],
  },
  {
    slug: "technical-seo",
    name: "Technical SEO",
    role: "Foundations",
    tagline: "The foundation AI can read",
    short: "Fast, crawlable, schema-rich pages that Google and AI crawlers can read.",
    desc: "Answer engines can only recommend what they can parse. We handle schema, internal linking, crawl and render hygiene and on-page structure so models attribute and resurface your content cleanly.",
    whyRequired: {
      heading: "AI can only recommend what it can parse",
      sub: "Structured, fast, crawlable pages are the price of entry — rich-result pages earn up to 82% higher click-through, and everything else you do only works on a clean foundation.",
      points: [
        { icon: "🧩", title: "Structure wins clicks", desc: "Pages with structured data see up to 82% higher click-through from rich results." },
        { icon: "⚡", title: "Speed keeps visitors", desc: "53% of mobile users abandon a site that takes over 3 seconds to load." },
        { icon: "✅", title: "Most sites fail the bar", desc: "Only 33% of sites pass all of Google's Core Web Vitals — passing puts you ahead." },
      ],
    },
    features: [
      {
        title: "Schema & structured data",
        desc: "Markup that lets AI parse, attribute and quote your pages.",
        body: "We add the structured data — Organization, FAQ, Product, Article and more — that lets Google and AI models parse, attribute and quote your pages correctly.",
        why: [
          "Rich-result pages earn up to 82% higher CTR",
          "Correct markup stops AI misattributing you",
        ],
        cta: "Add structured data",
      },
      {
        title: "Crawl & render hygiene",
        desc: "Make sure crawlers and AI bots can reach and read every page.",
        body: "We fix crawl, render and indexing issues so Google's and AI's crawlers can actually reach, render and read every page that matters.",
        why: [
          "A page that can't be crawled can't be cited",
          "Clean indexing means nothing valuable is hidden",
        ],
        cta: "Fix crawl issues",
      },
      {
        title: "Speed & Core Web Vitals",
        desc: "Fast pages that both users and ranking systems reward.",
        body: "We tune Core Web Vitals — loading, interactivity and stability — so your pages are fast for users and favored by ranking systems.",
        why: [
          "53% of mobile users leave sites slower than 3s",
          "Speed lifts both rankings and conversions",
        ],
        cta: "Speed up your site",
      },
      {
        title: "Internal links & structure",
        desc: "Clean structure that spreads authority where it counts.",
        body: "We build clean on-page structure and internal links that spread authority to your most important pages and help crawlers understand your site.",
        why: [
          "Internal links tell AI what matters most",
          "Good structure surfaces your best pages",
        ],
        cta: "Improve site structure",
      },
    ],
    why: "Every other effort only works if AI can read your site. Technical SEO is the foundation the whole strategy stands on.",
    does: [
      "Schema & entity markup",
      "Crawl, render and indexing hygiene",
      "On-page structure and internal links",
    ],
  },
  {
    slug: "reddit-marketing",
    name: "Reddit Marketing",
    role: "Community",
    tagline: "Where AI goes for opinions",
    short: "Build presence where AI models search when they need human opinions.",
    desc: "LLMs lean heavily on Reddit and community sources when they form recommendations. We build authentic, on-topic presence in the threads and subreddits that shape how AI describes your category.",
    whyRequired: {
      heading: "AI trusts Reddit more than your website",
      sub: "Reddit is the single most-cited source across AI answers — up to 46% of Perplexity citations and ~21% of Google's AI Overviews. If AI forms opinions from Reddit, your brand has to be in those threads.",
      points: [
        { icon: "🥇", title: "The #1 cited source", desc: "Reddit is the most-cited domain in AI answers — up to 46% of Perplexity citations." },
        { icon: "🔗", title: "In Google's answers too", desc: "Reddit makes up ~21% of Google AI Overview citations." },
        { icon: "👥", title: "471M weekly voices", desc: "Reddit's 471M weekly users are exactly the human opinions AI leans on." },
      ],
    },
    features: [
      {
        title: "Find the threads AI cites",
        desc: "Map the subreddits and threads models pull from in your category.",
        body: "We map the exact subreddits and threads AI models pull from in your category — the conversations that actually shape how you're described.",
        why: [
          "Reddit is the #1 cited source in AI answers",
          "You focus where it moves the recommendation",
        ],
        cta: "Find the threads",
      },
      {
        title: "Earn genuine mentions",
        desc: "Authentic, on-topic presence — no spam, no fake accounts.",
        body: "We build authentic, on-topic presence in those threads — genuine contributions that earn mentions, never spam or fake accounts that get you banned.",
        why: [
          "Authenticity is what communities and AI trust",
          "No risk of bans that erase your presence",
        ],
        cta: "Earn real mentions",
      },
      {
        title: "Shape the narrative",
        desc: "Steer how your category is discussed where it influences AI most.",
        body: "We steer how your category is discussed in the communities that influence AI most — surfacing your strengths where buyers and models are listening.",
        why: [
          "AI describes you the way Reddit does",
          "Shape the story before competitors do",
        ],
        cta: "Shape the narrative",
      },
      {
        title: "Turn mentions into citations",
        desc: "Community signals that feed straight into AI recommendations.",
        body: "We turn genuine community mentions into the signals AI cites — so your presence on Reddit shows up directly in the answers buyers get.",
        why: [
          "Reddit is ~21% of Google AI Overview citations",
          "Mentions become citations, not just goodwill",
        ],
        cta: "Turn mentions into citations",
      },
    ],
    why: "AI forms its opinions from communities. Reddit Marketing puts your brand into the conversations that shape what it recommends.",
    does: [
      "Find the threads models cite most",
      "Earn genuine, on-topic mentions",
      "Shape the community narrative",
    ],
  },
  {
    slug: "conversion-rate-optimization",
    name: "Conversion Rate Optimization",
    role: "CRO",
    tagline: "New · Built for e-commerce",
    iconFile: "optimizer-agent", // header/related icon (reuses an existing S3 asset)
    metaTitle: "Conversion Rate Optimization for E-commerce | Geobuild",
    metaDescription:
      "Geobuild reviews session recordings of your product pages, finds what stops customers from buying, and implements the fixes. CRO built for e-commerce brands.",
    short: "Find out why shoppers leave your product pages, then fix it",
    desc: "We watch session recordings of your product pages, find the pain points that stop customers from buying, and implement and test the fixes with you.",
    features: [
      {
        title: "Watch the session recordings",
        desc: "See how real shoppers use your product page: where they click, hesitate and leave.",
        body: "We review session recordings of real shoppers on your product page. We see where they click, where they hesitate, what they scroll past and the moment they leave.",
        why: [
          "You see what customers actually do, not what you assume",
          "Friction that never shows in a dashboard becomes visible",
        ],
        cta: "See your shoppers' sessions",
      },
      {
        title: "Find the pain points",
        desc: "A ranked list of what stops customers from buying that product.",
        body: "We turn what we see into a ranked list of pain points for that particular product page, so you know which problems cost you the most orders.",
        why: [
          "You fix the biggest problems first",
          "Every finding is backed by real sessions",
        ],
        cta: "Find your pain points",
      },
      {
        title: "Get the insights",
        desc: "Clear recommendations on what to change, in priority order.",
        body: "You get specific recommendations on what to change on the page, ordered by impact and effort, with a human strategist reviewing every one.",
        why: [
          "No guesswork about what to change",
          "A strategist signs off before anything ships",
        ],
        cta: "Get your insights",
      },
      {
        title: "Implement and test",
        desc: "We make the changes and test them against your current page.",
        body: "We implement the changes and test them against your current page, so you keep what wins and drop what doesn't.",
        why: [
          "Changes are proven before they stay",
          "You get the fixes shipped, not just a report",
        ],
        cta: "Start testing",
      },
    ],
    why: "You already paid for the traffic. CRO makes sure more of those visitors become orders, starting with the evidence of why they leave.",
    does: [
      "Review session recordings of your product pages",
      "Find the pain points that stop purchases",
      "Implement and test the changes",
    ],
    // No related cards or closing CTA band on this page.
    standalone: true,
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}
