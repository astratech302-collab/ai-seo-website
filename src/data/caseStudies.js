import { ONSITE_PATH } from "@/data/onsite";
import { ADS_PATH, CRO_PATH } from "@/data/cro";
import { GROWTH_PRODUCTS } from "@/data/growth";

export const CASE_STUDIES_PATH = "/case-studies";
export const caseStudyHref = (slug) => `${CASE_STUDIES_PATH}/${slug}`;

export const CASE_STUDIES_PAGE = {
  eyebrow: "Case studies",
  title: "Conversion lifts by category",
  sub: "Five store categories. Open one to see the problem, what we do about it.",
};

const CATALOG = GROWTH_PRODUCTS.find((p) => p.key === "catalog_enrichment");

const SORT = { name: "Onsite Discovery", key: "onsite_discovery", href: ONSITE_PATH };
const LANDING = { name: "Ad-to-Landing Pages", key: "ad_to_landing", href: ADS_PATH };
const ENRICH = { name: CATALOG.data.name, key: CATALOG.key, href: CATALOG.path };
const CRO = { name: "Conversion Rate Optimization", key: "conversion_rate_optimization", href: CRO_PATH };

const MEASURE =
  "We compare the changed experience with the current one over the same period and traffic sources, and keep only what raises conversion rate.";

/*
 * The figures are modelled, not measured, and each entry shows `label` to say so. Replace an
 * entry with a customer's measured figures (and their approval) before changing its label.
 */
export const CASE_STUDIES = [
  {
    slug: "fashion-apparel",
    tone: "blue",
    category: "Fashion & apparel",
    title: "Putting the right styles first",
    summary: "Long collection pages can hide the styles each shopper wants. Sorting them per session brings those styles to the top.",
    metaTitle: "Fashion and Apparel Conversion Scenario | Geobuild",
    metaDescription: "A modelled fashion store scenario: 1:1 session sort and richer product attributes take conversion rate from 2.00% to 2.24%, a relative lift of 12%.",
    challenge: [
      "Collection pages often hold hundreds of styles in one fixed order. A shopper looking for relaxed linen shirts sees the same first rows as someone shopping for formal wear.",
      "A visitor who scrolls a few rows and finds nothing suitable is likely to leave. Thin product data about fit, fabric or occasion makes it harder.",
    ],
    steps: [
      { title: "Add the missing attributes", text: "We add fit, fabric and occasion to each product so the store knows what makes one style different from another. Your team reviews them before they publish." },
      { title: "Read intent during the visit", text: "Searches, filters, products viewed and the ad that brought the shopper show what they are after right now." },
      { title: "Sort each collection 1:1", text: "The collection order changes for that session, so matching styles appear in the first rows without hiding the rest of the range." },
    ],
    products: [SORT, ENRICH],
    before: 2.0,
    after: 2.24,
  },
  {
    slug: "beauty-skincare",
    tone: "pink",
    category: "Beauty & skincare",
    title: "Matching ads to skin concerns",
    summary: "When every ad leads to one general collection, the message is lost. A landing page for each audience continues it.",
    metaTitle: "Beauty and Skincare Conversion Scenario | Geobuild",
    metaDescription: "A modelled skincare store scenario: landing pages matched to each ad audience and 1:1 session sort take conversion rate from 3.00% to 3.27%, up 9%.",
    challenge: [
      "Campaigns speak about dryness, breakouts or sun care, but every click often arrives on one general collection.",
      "Shoppers then have to work out again which products address their concern.",
    ],
    steps: [
      { title: "Map each ad to an audience", text: "We connect the ad accounts and group campaigns by the concern and audience each one targets." },
      { title: "Build a matching landing page", text: "Each audience gets a page whose headline, products and order follow the ad they clicked." },
      { title: "Keep adapting as they browse", text: "If a shopper moves on to another concern, the collection order follows what they are looking at now." },
    ],
    products: [LANDING, SORT],
    before: 3.0,
    after: 3.27,
  },
  {
    slug: "home-furniture",
    tone: "mint",
    category: "Home & furniture",
    title: "Helping shoppers compare",
    summary: "Missing sizes and materials make buyers hesitate. Complete product data and clearer pages answer their questions.",
    metaTitle: "Home and Furniture Conversion Scenario | Geobuild",
    metaDescription: "A modelled furniture store scenario: catalog enrichment and tested product page fixes take conversion rate from 1.00% to 1.07%, a relative lift of 7%.",
    challenge: [
      "Furniture is a considered purchase. Dimensions and materials are often missing or written differently from one product to the next.",
      "A shopper who cannot compare pieces with confidence tends to put the decision off.",
    ],
    steps: [
      { title: "Enrich the catalog", text: "We fill in dimensions, materials and care details in one consistent, machine-readable format, ready for your review." },
      { title: "Watch session recordings", text: "Recordings of product pages show where shoppers hesitate, what they scroll past and where they leave." },
      { title: "Fix and test the pages", text: "We rank the problems, change the product pages and test each change against the current version." },
    ],
    products: [ENRICH, CRO],
    before: 1.0,
    after: 1.07,
  },
  {
    slug: "bags-outdoor",
    tone: "blue",
    category: "Bags & outdoor gear",
    title: "Sorting by what the trip needs",
    summary: "Commuters and hikers need different packs. Reading intent in the session puts the right ones first for each.",
    metaTitle: "Bags and Outdoor Gear Conversion Scenario | Geobuild",
    metaDescription: "A modelled bag store scenario: 1:1 session sort and landing pages matched to commute and trail ads take conversion rate from 2.50% to 2.85%, up 14%.",
    challenge: [
      "One backpack collection often serves laptop commuters, weekend hikers and students, all in the same best-seller order.",
      "A visitor from a trail campaign may see office bags first and not scroll far enough to find what they came for.",
    ],
    steps: [
      { title: "Match landing pages to ads", text: "Commute and trail campaigns each lead to a page built around that use." },
      { title: "Read the session signals", text: "A search for a laptop sleeve or two trail packs viewed tells us what this trip needs." },
      { title: "Re-sort for that shopper", text: "The most relevant packs move to the top of the collection while the shopper is still browsing." },
    ],
    products: [SORT, LANDING],
    before: 2.5,
    after: 2.85,
  },
  {
    slug: "food-beverage",
    tone: "pink",
    category: "Food & beverage",
    title: "Shortening the path to a repeat order",
    summary: "Searching again for a favourite slows a repeat order. An order that adapts to the visit gets shoppers there sooner.",
    metaTitle: "Food and Beverage Conversion Scenario | Geobuild",
    metaDescription: "A modelled food store scenario: an adaptive collection order and fixes for cart friction take conversion rate from 4.00% to 4.24%, a lift of 6%.",
    challenge: [
      "Shoppers coming back for a particular flavour or pack size often start from the same default collection as first-time visitors.",
      "Extra searching, followed by friction in the cart, puts nearly complete orders at risk.",
    ],
    steps: [
      { title: "Adapt the collection to the visit", text: "Flavours and pack sizes the shopper shows interest in move up during the session." },
      { title: "Find the cart friction", text: "Session recordings show where shoppers stall between adding to cart and starting checkout." },
      { title: "Fix and test", text: "We make the changes in order of impact and test them against the current experience." },
    ],
    products: [SORT, CRO],
    before: 4.0,
    after: 4.24,
  },
].map((c) => ({ ...c, measure: MEASURE, lift: Math.round((c.after / c.before - 1) * 100) }));

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug) || null;
