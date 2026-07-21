// The agent team. One Strategy orchestrator + four specialists.
//
// Landing page (SystemSection) uses: name, role, short, desc, does[].
// Agent detail pages additionally use: tagline, how{heading,sub}, features[{title,desc}], why.
export const AGENTS = [
  {
    code: "A-00",
    slug: "strategy-agent",
    name: "Strategy Agent",
    role: "Orchestrator",
    lead: true,
    tagline: "The brain that runs the plan",
    short: "Main agent. Understands the brand fully and creates a custom strategy.",
    desc: "Reads your market, picks the prompts and queries worth winning, and assigns work across the team. Every other agent reports back to Strategy, which sequences the roadmap and decides what ships next.",
    how: {
      heading: "One plan, built around your brand",
      sub: "Strategy gets to know your business and your market, then decides exactly what the team should win — and changes course when the data says so.",
    },
    features: [
      {
        title: "Learns your business",
        desc: "Gets to know what you sell, who you sell to, and what makes you different.",
        body: "Strategy starts by understanding your business the way a sharp new head of marketing would — what you sell, who your best customers are, and what genuinely sets you apart.",
        why: [
          "A plan built on your real positioning beats generic tactics",
          "Every agent then optimizes toward what actually makes you different",
          "You brief it once — the whole team works from the same truth",
        ],
        cta: "Map your strategy",
      },
      {
        title: "Studies the competition",
        desc: "Sees which brands AI already recommends and finds your opening.",
        body: "It studies who AI already recommends in your category, reads what those brands do well, and finds the specific questions where there's a clear opening for you.",
        why: [
          "You attack the gaps competitors have left wide open",
          "You stop pouring effort in where rivals are unbeatable",
          "You see exactly who you're up against in AI answers",
        ],
        cta: "See your competitive gaps",
      },
      {
        title: "Builds the game plan",
        desc: "Picks the exact questions worth winning and sets the order of work.",
        body: "Strategy turns all of that into a prioritized plan — the exact prompts and pages worth winning, in the order that gets results fastest — and assigns the work across the team.",
        why: [
          "Effort goes to the highest-impact wins first",
          "Nothing happens at random — every task has a reason",
          "You approve the plan; the agents execute it",
        ],
        cta: "Get your game plan",
      },
      {
        title: "Watches results & adapts",
        desc: "If something isn't working, it reworks the plan for the next cycle.",
        body: "After everything ships, it tracks what's working and reworks the plan for the next cycle — doubling down on wins and dropping what isn't moving the needle.",
        why: [
          "The plan gets sharper every month, not stale",
          "You never keep spending on tactics that don't work",
          "Results feed straight back into the next sprint",
        ],
        cta: "See it adapt",
      },
    ],
    why: "You get one clear direction instead of scattered tactics. Every other agent works toward the same goal, and the plan gets sharper every month.",
    does: [
      "Builds the AEO / GEO / SEO roadmap",
      "Prioritizes high-intent prompts",
      "Coordinates the sub-agents",
    ],
  },
  {
    code: "A-01",
    slug: "research-agent",
    name: "Research Agent",
    role: "Intelligence",
    tagline: "The scout",
    short: "Scans AI models to map where your brand is cited, or losing to competitors.",
    desc: "Continuously queries ChatGPT, Claude, Gemini and Perplexity to find where you appear, where competitors win, and which prompts you're invisible for.",
    how: {
      heading: "See exactly how AI talks about you",
      sub: "Research asks the AI engines the real questions your customers ask, then reports back who gets named — and where you're missing.",
    },
    features: [
      {
        title: "Asks the AIs about your space",
        desc: "Runs the real questions through ChatGPT, Claude, Gemini and Perplexity.",
        body: "Research runs the real questions your buyers ask straight through ChatGPT, Claude, Gemini and Perplexity — then records who each engine names and where you land.",
        why: [
          "You see your brand through the AIs' eyes, not guesses",
          "Every major engine is checked, not just one",
          "It tracks real buyer questions, not vanity keywords",
        ],
        cta: "Track your prompts",
      },
      {
        title: "Finds where you're invisible",
        desc: "Spots the questions your brand never shows up for.",
        body: "It surfaces the prompts where AI recommends rivals but never mentions you — the invisible gaps quietly sending customers to someone else.",
        why: [
          "You can't fix what you can't see",
          "Each gap is a customer picking a competitor",
          "Blind spots become a clear, ranked to-do list",
        ],
        cta: "Find your blind spots",
      },
      {
        title: "Tracks competitor mentions",
        desc: "Shows which rivals get cited, and why they win.",
        body: "Research shows which competitors get cited across your category, how often, and in which answers — so you know exactly who's winning the recommendation.",
        why: [
          "You learn who to beat and why they win",
          "Share of voice becomes a number you can track",
          "You spot rivals rising before they pull ahead",
        ],
        cta: "See who AI recommends",
      },
      {
        title: "Hands Strategy the gaps",
        desc: "Turns findings into a clear target list of prompts to win.",
        body: "Everything it finds becomes a ranked target list — the winnable, high-value prompts — handed straight to Strategy to turn into work.",
        why: [
          "Findings become action, not another report",
          "The team works the highest-opportunity prompts first",
          "Research and Strategy stay in lock-step",
        ],
        cta: "Get your target list",
      },
    ],
    why: "You stop guessing. You can see, in black and white, where AI recommends you — and where it recommends someone else.",
    does: [
      "Tracks share of voice across models",
      "Surfaces competitor citations",
      "Finds prompt & content gaps",
    ],
  },
  {
    code: "A-02",
    slug: "content-agent",
    name: "Content Agent",
    role: "Production",
    tagline: "The writer",
    short: "Writes structured citable pages, blogs optimized for SEO & GEO",
    desc: "Produces answer-first pages, comparisons and FAQs structured the way LLMs extract and quote — so your brand becomes the source the model pulls from.",
    how: {
      heading: "Content AI quotes — that still sounds human",
      sub: "Content finds the right angle, writes it in natural language, structures it so AI can quote it, and has a human expert sign off before it goes live.",
    },
    features: [
      {
        title: "Finds the right angle",
        desc: "Works out what the page should actually say to answer the question best.",
        body: "Before a word is written, Content works out the exact angle that answers the question best — the framing your buyers actually search for, and the one competitors have missed.",
        why: [
          "The right angle is what makes AI pick your page over a generic one",
          "You skip writing content that never had a chance to rank",
          "Every piece targets a real question people ask AI",
        ],
        cta: "See it find your angle",
      },
      {
        title: "Writes like a human",
        desc: "Natural, readable copy that doesn't sound AI-generated.",
        body: "The draft reads like a person wrote it — clear, specific and natural. Then it's run through AI-detection and refined until it reads as genuinely human, not machine-made filler.",
        why: [
          "AI engines quietly demote content that looks machine-generated",
          "Readers trust and stay on pages that sound human",
          "Natural writing is what gets quoted — stiff filler doesn't",
        ],
        cta: "Get content that sounds human",
      },
      {
        title: "Structures it for AI",
        desc: "Clear headings and direct answers that LLMs can lift and quote.",
        body: "The page is laid out the way answer engines read it: a direct answer up top, clear headings, comparison tables and FAQs — plus schema markup so machines can parse and attribute every part.",
        why: [
          "AI lifts answers straight from pages it can parse cleanly",
          "Clear structure makes your brand the source it quotes",
          "Schema helps you surface in rich results and AI answers",
        ],
        cta: "Make your pages quotable",
      },
      {
        title: "Expert-reviewed",
        desc: "A human specialist checks every piece before it ships.",
        body: "Every piece is checked by a human specialist before it ships — claims fact-checked, sources added, and tone matched to your brand. Nothing goes live unread.",
        why: [
          "Wrong facts destroy the trust AI places in your whole site",
          "Sourced, accurate claims are far more likely to be cited",
          "A human catches the nuance automation misses",
        ],
        cta: "Get expert-reviewed content",
      },
    ],
    why: "Your pages read well for people and are easy for AI to quote — so your brand becomes the source the model pulls from.",
    does: [
      "Drafts answer-models content",
      "Structures for extractability",
      "Aligns to target prompts",
    ],
  },
  {
    code: "A-04",
    slug: "optimizer-agent",
    name: "Optimizer Agent",
    role: "Technical",
    tagline: "The mechanic",
    short: "Analyzes what content is ranking and optimize pages that are slipping",
    desc: "Handles schema, entities, internal linking and on-page structure so answer engines can parse, attribute and resurface your content cleanly.",
    how: {
      heading: "Keeps every page performing",
      sub: "Optimizer keeps an eye on your pages, catches the ones losing ground, and rewrites or repairs them so they climb back.",
    },
    features: [
      {
        title: "Keeps constant watch",
        desc: "Checks how your pages are performing on a regular basis.",
        body: "Optimizer keeps a constant eye on your pages — re-checking rankings and citations across every engine so nothing slips by unnoticed.",
        why: [
          "Problems get caught in days, not quarters",
          "You always know how each page is performing",
          "Monitoring runs automatically, around the clock",
        ],
        cta: "Put pages on watch",
      },
      {
        title: "Catches slipping content",
        desc: "Flags pages that are losing rank or mentions.",
        body: "When a page starts losing rank or citations, Optimizer flags it immediately — before the slow drop turns into lost customers.",
        why: [
          "Early warning beats a nasty surprise later",
          "You protect the wins you fought hard for",
          "Declines get triaged the moment they start",
        ],
        cta: "Catch drops early",
      },
      {
        title: "Rewrites & refreshes",
        desc: "Rewrites weak pages so they recover and climb again.",
        body: "It rewrites and refreshes the weak pages — updating the content and structure so they climb back into AI answers.",
        why: [
          "A page you won last quarter keeps winning",
          "Refreshed content re-earns its citations",
          "No page is left to quietly decay",
        ],
        cta: "Refresh weak pages",
      },
      {
        title: "Keeps pages machine-readable",
        desc: "Tunes structure so answer engines parse them cleanly.",
        body: "Optimizer keeps your pages easy for machines to read — schema, clean structure and technical hygiene tuned for answer engines.",
        why: [
          "AI can only quote pages it can parse cleanly",
          "Schema unlocks rich results and AI answers",
          "Good structure makes every other effort pay off",
        ],
        cta: "Make pages machine-readable",
      },
    ],
    why: "Rankings drift over time. Optimizer makes sure a page you won last quarter is still winning this one.",
    does: [
      "Schema & entity markup",
      "On-page + technical fixes",
      "Crawl & render hygiene",
    ],
  },
  {
    code: "A-05",
    slug: "analyzer-agent",
    name: "Analyzer Agent",
    role: "Measurement",
    tagline: "The scorekeeper",
    short: "Monitors ranking, mention and share of voice across every AI model",
    desc: "Monitors rankings and mentions across every AI engine, measures share of voice, and feeds results back to Strategy to tighten the next cycle.",
    how: {
      heading: "Know exactly where you stand",
      sub: "Analyzer tracks your visibility across every AI engine, measures how often you're recommended versus rivals, and turns it into reports you can actually read.",
    },
    features: [
      {
        title: "Tracks visibility live",
        desc: "Monitors rankings and mentions across every AI engine.",
        body: "Analyzer tracks your visibility as it happens — rankings and mentions across every AI engine, updated continuously.",
        why: [
          "You see movement the moment it happens",
          "Every engine in one place, no manual checking",
          "Decisions run on live data, not last month's",
        ],
        cta: "Track your visibility",
      },
      {
        title: "Measures share of voice",
        desc: "Shows how often you're recommended vs. competitors.",
        body: "It measures how often AI recommends you versus your competitors — turning “are we winning?” into a number you can actually watch.",
        why: [
          "Share of voice is the score that matters",
          "You can prove progress to the whole team",
          "You spot competitors gaining before it hurts",
        ],
        cta: "Measure your share",
      },
      {
        title: "Turns data into plain reports",
        desc: "Dashboards you can actually read — no jargon.",
        body: "Analyzer turns all of it into plain-English reports and dashboards anyone can read — no jargon, just what changed and why.",
        why: [
          "Everyone understands the results, not just specialists",
          "Reports ship automatically on schedule",
          "You spend time acting, not building slides",
        ],
        cta: "See your reports",
      },
      {
        title: "Feeds the next sprint",
        desc: "Sends results back to Strategy so the plan keeps improving.",
        body: "Its findings flow straight back to Strategy as ranked recommendations — so every cycle is smarter than the last.",
        why: [
          "Insight becomes the next round of work",
          "The whole system compounds over time",
          "Nothing useful gets lost between cycles",
        ],
        cta: "Close the loop",
      },
    ],
    why: "You always know if it's working — real numbers on how visible your brand is, and proof it's improving.",
    does: [
      "Live rank & mention tracking",
      "Share-of-voice reporting",
      "Feeds the next sprint",
    ],
  },
];

// Glyph per agent, used by the agent grid + system viz.
export const AGENT_ICONS = {
  "A-00": "◎",
  "A-01": "⌕",
  "A-02": "✎",
  "A-03": "⚯",
  "A-04": "⚙",
  "A-05": "▤",
};
