// Single source of truth for site navigation. Both Header (mega-menu) and Footer
// read from here so the two never drift. Link builders derive from agents/services data.
import { AGENTS } from "@/data/agents";
import { SERVICES } from "@/data/services";

export const agentHref = (slug) => `/agents/${slug}`;
export const serviceHref = (slug) => `/services/${slug}`;

// Product mega-menu: Strategy (lead) is featured, the rest are the specialist grid.
export const FEATURED_AGENT = AGENTS.find((a) => a.lead) || AGENTS[0];
export const SPECIALIST_AGENTS = AGENTS.filter((a) => !a.lead);

// Resources dropdown.
export const RESOURCES = [
  { label: "Blog", href: "/blog", desc: "Playbooks on AEO, GEO and AI search." },
  { label: "FAQ", href: "/pricing#faq", desc: "Answers to the questions we hear most." },
];

// Promo cards shown on the right of each mega-menu.
export const PROMO = {
  product: {
    eyebrow: "The team",
    title: "Five agents, one brand brain",
    blurb:
      "A Strategy orchestrator directs four specialists — with a human strategist on the final call.",
    href: "/#system",
    cta: "Meet the agents",
  },
  services: {
    eyebrow: "Full stack",
    title: "AEO · GEO · SEO, run end to end",
    blurb:
      "From answer-engine content to Reddit and technical foundations — one team, one system.",
    href: serviceHref(SERVICES[0].slug),
    cta: "Explore services",
  },
};

// Footer columns.
export const FOOTER_COLS = [
  {
    heading: "Product",
    links: AGENTS.map((a) => ({ label: a.name, href: agentHref(a.slug) })),
  },
  {
    heading: "Services",
    links: SERVICES.map((s) => ({ label: s.name, href: serviceHref(s.slug) })),
  },
  {
    heading: "Resources",
    links: RESOURCES.map((r) => ({ label: r.label, href: r.href })),
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact-us" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];
