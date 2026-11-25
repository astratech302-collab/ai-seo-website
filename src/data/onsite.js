// Onsite Discovery: per-shopper collection ordering. Edit copy here, not in components.
// Store, products, prices and shoppers in the demo are fictional.

import { TAGLINE } from "@/config/site";

export const ONSITE_PATH = "/products/onsite-discovery";

export const ONSITE_NAV = {
  name: "Onsite Discovery",
  role: "SORT",
  short: "1:1 session sort for your collection pages",
  href: ONSITE_PATH,
  iconFile: "research-agent", // reuses an existing S3 asset
};

export const ONSITE_PRODUCT = {
  name: "Onsite Discovery",
  tagline: TAGLINE,
  headline: "One collection. A different order for every shopper.",
  desc: "Not segments. Geobuild reads what each shopper is doing in this session, works out their need and use case, and re-orders your collection one to one.",
  metaTitle: "Onsite Discovery: Intent-Based Shopify Sorting | Geobuild",
  metaDescription:
    "1:1 session sort for Shopify: Geobuild re-orders collection pages for each shopper from real-time intent, needs and use cases, not broad segments.",
  steps: [
    {
      tone: "blue",
      title: "Read intent as it happens",
      body: "Clicks, filters, searches, scrolls and traffic source show what the shopper is trying to do in this visit.",
      bubble: "Filtered by “fits 15″ laptop”",
    },
    {
      tone: "pink",
      title: "Work out the need",
      body: "Those signals point to a need and a use case, such as a work commute, a weekend hike or a tight budget.",
      bubble: "Need: daily work commute",
    },
    {
      tone: "mint",
      title: "Re-order the collection",
      body: "Products that fit the need move to the top. Nothing is removed, and the order keeps adapting as the shopper browses.",
      bubble: "Laptop bags first",
    },
  ],
};

export const ONSITE_STEPS_TITLE = "How the order changes";

// Demo photography: Unsplash (Unsplash License). TODO: move to ASSET_BASE on S3.
const photo = (id) => `https://images.unsplash.com/${id}?w=360&h=450&fit=crop&q=75`;

export const PRODUCTS = [
  { id: "daypack", name: "Everyday Daypack", price: 49, image: photo("photo-1581605405669-fcdf81165afa"), tags: ["campus", "under-80"] },
  { id: "summit", name: "Summit 30L", price: 119, image: photo("photo-1509762774605-f07235a08f1f"), tags: ["hiking", "bottle-pocket"] },
  { id: "heritage", name: "Heritage Leather", price: 149, image: photo("photo-1622560257067-108402fcedc0"), tags: ["work"] },
  { id: "campus", name: "Campus Flap Pack", price: 72, image: photo("photo-1628381882111-9b5030d16ea6"), tags: ["campus", "under-80"] },
  { id: "metro", name: "Metro Slim 15″", price: 98, image: photo("photo-1553062407-98eeb64c6a62"), tags: ["work", "laptop"] },
  { id: "ridge", name: "Trail Ridge 28L", price: 109, image: photo("photo-1575844264771-892081089af5"), tags: ["hiking", "bottle-pocket"] },
  { id: "studio", name: "Studio Flap", price: 84, image: photo("photo-1680039211156-66c721b87625"), tags: ["work"] },
  { id: "commuter", name: "Commuter Grey", price: 76, image: photo("photo-1611010344444-5f9e4d86a6e1"), tags: ["laptop", "under-80", "work"] },
];

export const TAG_LABELS = {
  work: "Work ready",
  laptop: "Fits 15″ laptop",
  hiking: "Trail ready",
  "bottle-pocket": "Bottle pocket",
  campus: "Campus pick",
  "under-80": "Under $80",
};

export const NEEDS = [
  { key: "commute", label: "Work commute", signal: "Filtered by “fits 15″ laptop”", weights: { laptop: 3, work: 2 } },
  { key: "hiking", label: "Weekend hike", signal: "Viewed two trail packs", weights: { hiking: 3, "bottle-pocket": 1 } },
  { key: "campus", label: "Back to campus", signal: "Arrived from a student ad", weights: { campus: 3, "under-80": 1 } },
  { key: "budget", label: "Under $80", signal: "Sorted by price, low to high", weights: { "under-80": 3 } },
];

// "How others do it" vs "how we do it".
export const COMPARE = {
  before: {
    when: "Yesterday",
    title: "Segment-based sorting",
    desc: "One order per segment, built from rules and past behaviour.",
    signal: "Not used",
    productIds: ["daypack", "summit", "heritage", "campus"],
    footer: "Everyone in the segment sees the same grid.",
    question: "Traditional tools ask “which segment is this shopper in?”",
  },
  after: {
    when: "Today",
    title: "1:1 session sort",
    desc: "Sorted from what this shopper is doing right now.",
    footer: "Re-sorted for this shopper, in session.",
    question: "Geobuild asks “what is this shopper trying to do right now?”",
  },
  signalLabel: "In-session signal",
};
