// Site-wide configuration constants.
export const CALENDLY_URL = "https://calendly.com/karan-geobuild/30min";
export const SITE_URL = "https://geobuild.in";
export const API_URL = "https://api.geobuild.in";
export const MIXPANEL_TOKEN = "78d6e5098285835fec99e824591d1775";
export const PRICING_JSON_URL =
  "https://geobuild-admin-config.s3.ap-south-1.amazonaws.com/admin/geobuild_common_pricing.json";
export const FAQS_JSON_URL =
  "https://geobuild-admin-config.s3.ap-south-1.amazonaws.com/admin/geobuild_website_faqs.json";
// Blog posts source (same admin-config bucket as pricing/FAQs). Until this file
// exists, the blog falls back to the sample posts in `src/data/blog.js`.
export const BLOG_JSON_URL =
  "https://geobuild-admin-config.s3.ap-south-1.amazonaws.com/admin/geobuild_website_blog.json";

// Base URL for website image assets (agent/service/resource icons) hosted on S3.
export const ASSET_BASE =
  "https://geobuild-admin-config.s3.ap-south-1.amazonaws.com/assets/website_assets";

// Organization identity — single source of truth for the footer, structured data
// (JSON-LD), and anywhere else the brand's canonical details are needed.
export const ORG_NAME = "Geobuild";

// Product pivot switch. The site is now Shopify-only CRO / hyperpersonalization.
// All AEO / GEO / SEO surfaces (agents, SEO services, blog, pricing, AI-audit copy)
// are kept in the code but hidden while this is false. Flip to true to bring them back.
export const AI_SEO_ENABLED = false;

export const AI_SEO_ORG_DESCRIPTION =
  "Geobuild runs AEO, GEO and SEO with a team of AI agents and a human strategist making the final call — so your brand becomes the answer ChatGPT, Claude, Gemini and Perplexity recommend.";
export const CRO_ORG_DESCRIPTION =
  "Geobuild turns every ad click into a landing page made for that shopper. Hyperpersonalization at scale, built for Shopify stores.";
export const ORG_DESCRIPTION = AI_SEO_ENABLED ? AI_SEO_ORG_DESCRIPTION : CRO_ORG_DESCRIPTION;

// Official social profiles (used by the footer + Organization `sameAs`).
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/geobuild-ai",
  twitter: "https://x.com/geobuildai",
};

// Legal identity for the Terms of Service + Privacy Policy. Geobuild is not yet a
// registered company, so these name the individual operating it. When the company
// is incorporated, update `operator` / `entityType` / `address` here and both
// pages (and their JSON-LD) update automatically.
export const LEGAL = {
  operator: "Karan Jain",
  entityType: "sole proprietor",
  email: "karan@geobuild.in",
  country: "India",
  governingLaw: "the laws of India",
  effectiveDate: "2026-10-19",
  effectiveDateLabel: "October 19, 2026",
};
