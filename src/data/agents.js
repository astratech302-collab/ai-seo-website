// The six-agent team. One Strategy orchestrator + five specialists.
export const AGENTS = [
  {
    code: "A-00",
    name: "Strategy Agent",
    role: "Orchestrator",
    lead: true,
    short: "Sets the game plan and directs every sub-agent.",
    desc: "Reads your market, picks the prompts and queries worth winning, and assigns work across the team. Every other agent reports back to Strategy, which sequences the roadmap and decides what ships next.",
    does: [
      "Builds the AEO / GEO / SEO roadmap",
      "Prioritizes high-intent prompts",
      "Coordinates the sub-agents",
    ],
  },
  {
    code: "A-01",
    name: "Research Agent",
    role: "Intelligence",
    short: "Maps how AI engines see your brand today.",
    desc: "Continuously queries ChatGPT, Claude, Gemini and Perplexity to find where you appear, where competitors win, and which prompts you're invisible for.",
    does: [
      "Tracks share of voice across engines",
      "Surfaces competitor citations",
      "Finds prompt & content gaps",
    ],
  },
  {
    code: "A-02",
    name: "Content Agent",
    role: "Production",
    short: "Writes content engineered to be cited.",
    desc: "Produces answer-first pages, comparisons and FAQs structured the way LLMs extract and quote — so your brand becomes the source the model pulls from.",
    does: [
      "Drafts answer-engine content",
      "Structures for extractability",
      "Aligns to target prompts",
    ],
  },
  {
    code: "A-03",
    name: "Backlink Agent",
    role: "Authority",
    short: "Builds the citations models trust.",
    desc: "Earns mentions and links across the sources AI engines weight most heavily, strengthening the authority signals behind every recommendation.",
    does: [
      "Identifies high-trust sources",
      "Runs outreach & placements",
      "Grows brand entity signals",
    ],
  },
  {
    code: "A-04",
    name: "Optimizer Agent",
    role: "Technical",
    short: "Makes your site legible to machines.",
    desc: "Handles schema, entities, internal linking and on-page structure so answer engines can parse, attribute and resurface your content cleanly.",
    does: [
      "Schema & entity markup",
      "On-page + technical fixes",
      "Crawl & render hygiene",
    ],
  },
  {
    code: "A-05",
    name: "Analyzer Agent",
    role: "Measurement",
    short: "Proves what's working, in real time.",
    desc: "Monitors rankings and mentions across every AI engine, measures share of voice, and feeds results back to Strategy to tighten the next cycle.",
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
