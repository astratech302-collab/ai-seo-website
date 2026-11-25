// Discovery products: AI Visibility and Catalog Enrichment. Edit copy here.
// The catalog example in the demo is fictional.
import { TAGLINE } from "@/config/site";
import { ALL_SERVICES } from "@/data/services";
import { PRODUCTS } from "@/data/onsite";

const answers = ALL_SERVICES.find((s) => s.slug === "answer-engine-optimization");

export const GROWTH_PRODUCTS = [
  {
    key: "ai_visibility",
    tone: "mint",
    bubble: "Get my products into AI answers",
    path: "/products/ai-visibility",
    heroMedia: "answer-engine-optimization",
    serviceType: "AI search visibility",
    metaTitle: "AI Visibility for Shopify Stores | Geobuild",
    metaDescription:
      "AI visibility for Shopify stores: find the questions shoppers ask AI, build content it can quote, earn citations and track how often you are recommended.",
    // `slug` is kept from the answer-engine service so its feature mockups still apply.
    data: {
      ...answers,
      name: "AI Visibility",
      role: "AI",
      tagline: TAGLINE,
      short: "Get recommended when shoppers ask AI",
      desc: "We work on how ChatGPT, Claude, Gemini and Perplexity see your store, so that when a shopper asks for the best option in your category, your brand is in the answer.",
      why: "When a shopper asks AI what to buy, the brands it names get the visit. AI Visibility works to make yours one of them.",
    },
  },
  {
    key: "catalog_enrichment",
    tone: "blue",
    bubble: "Make my products readable to AI agents",
    path: "/products/catalog-enrichment",
    heroMedia: "catalog-enrichment",
    serviceType: "Product catalog enrichment for AI agents",
    metaTitle: "Catalog Enrichment for AI Shopping Agents | Geobuild",
    metaDescription:
      "Catalog enrichment for AI agents: we turn your Shopify product data into complete, structured information that shopping agents can read, match and compare.",
    data: {
      slug: "catalog-enrichment",
      name: "Catalog Enrichment",
      role: "CATALOG",
      tagline: TAGLINE,
      short: "A product catalog that AI agents can read",
      desc: "AI agents choose products from the data they can read. We turn your Shopify catalog into complete, machine-readable information, so agents can understand, match and compare what you sell.",
      features: [
        { title: "See what agents can read", desc: "We check what an AI agent can pick up about each product, and list what is missing, vague or only visible in images." },
        { title: "Add the attributes agents match on", desc: "Size, material, fit, use case, compatibility and more, named the same way across every product." },
        { title: "Convert it to machine-readable data", desc: "Consistent fields and structured data markup, so the facts are not buried in paragraphs or pictures." },
        { title: "Review and publish", desc: "A person checks the changes with you before they go to your store." },
      ],
      why: "An agent shopping for someone cannot guess. If it cannot read a fact about your product, it cannot match that product to the request.",
    },
  },
];

export const getGrowthProduct = (key) => GROWTH_PRODUCTS.find((p) => p.key === key);

export const GROWTH_SECTION = {
  eyebrow: "Get discovered",
  title: "Be found in AI answers, with a catalog AI agents can read.",
};

const sample = PRODUCTS.find((p) => p.id === "metro");

// Catalog Enrichment hero: a product, the machine-readable data it becomes, and an agent
// request it can then match. Code lines are [indent, key, value].
export const CATALOG_DEMO = {
  image: sample.image,
  imageAlt: `${sample.name} backpack`,
  productLabel: "Your product",
  productTitle: "Backpack MS-15 Navy",
  productNote: "A photo and a code name. An agent learns little.",
  codeLabel: "Machine-readable",
  code: [
    [0, null, "{"],
    [1, "type", '"Product",'],
    [1, "name", `"${sample.name} laptop backpack",`],
    [1, "category", '"Backpacks",'],
    [1, "color", '"Navy",'],
    [1, "laptop_size_in", "15,"],
    [1, "use_case", '"Work commute",'],
    [1, "price", `${sample.price},`],
    [1, "currency", '"USD"'],
    [0, null, "}"],
  ],
  requestLabel: "AI agent request",
  request: "Find a 15″ laptop backpack under $100 for commuting",
  result: "✓ Match found",
};
