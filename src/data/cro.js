// Content for the e-commerce CRO launch. Edit copy here — not in components.
//   - CRO service lives in data/services.js (slug: conversion-rate-optimization)
//   - Ad-to-Landing product page → /products/ad-to-landing-pages (below)
// Store, ads and numbers inside mockups are fictional.

export const CRO_PATH = "/services/conversion-rate-optimization";
export const ADS_PATH = "/products/ad-to-landing-pages";

// Top-of-site announcement banner.
export const BANNER = {
  label: "New Service",
  text: "Conversion Rate Optimization for E-commerce",
  cta: "Learn more",
  href: CRO_PATH,
};

// Product-menu entry (read by Header, Footer, sitemap).
export const ADS_NAV = {
  name: "Ad-to-Landing Pages",
  role: "ADS",
  short: "A personalized landing page for every ad and channel you run",
  href: ADS_PATH,
  iconFile: "content-agent", // reuses an existing S3 asset
};

// Same shape as an agent/service so the shared DetailPage template renders it.
export const ADS_PRODUCT = {
  slug: "ad-to-landing-pages",
  name: "Ad-to-Landing Pages",
  role: "ADS",
  tagline: "New · Built for e-commerce",
  short: "A personalized landing page for every ad and channel you run",
  desc: "Every channel brings shoppers with different expectations. We build a landing page for each ad, so every visitor lands on a page that continues what they just clicked.",
  metaTitle: "Personalized Ad-to-Landing Pages for E-commerce | Geobuild",
  metaDescription:
    "A dedicated landing page for every ad and channel you run. Geobuild matches each page to the ad that brought the visitor, so e-commerce clicks turn into orders.",
  features: [
    {
      title: "Share your ads",
      desc: "Tell us which ads and channels you run for the product.",
      body: "You share the ads you run for a product across search, shopping, social, video and creators. That tells us what each visitor was promised before they land.",
      why: [
        "We start from the promise the ad made",
        "Every channel and audience is covered",
      ],
      cta: "Share your ads",
    },
    {
      title: "We match a page type to each ad",
      desc: "The right landing-page approach for every ad.",
      body: "We suggest the landing-page approach that fits each ad: search-intent pages, product-first pages, hook-led pages, social-proof pages and more.",
      why: [
        "Message match between the ad and the page",
        "Each channel's visitor gets what they expect",
      ],
      cta: "Match your pages",
    },
    {
      title: "We build the personalized pages",
      desc: "One page per ad, in your brand.",
      body: "We build a personalized page for each ad, with the headline, hero visual, proof and call to action tuned to the ad and the intent behind that channel.",
      why: [
        "Visitors land on a page that continues the ad",
        "One product, a different page for every ad",
      ],
      cta: "Build your pages",
    },
    {
      title: "Test and refine",
      desc: "Keep the pages that win and improve the rest.",
      body: "We compare how each page performs and keep refining, so the pages that convert best stay and the weaker ones get improved.",
      why: [
        "You keep what works",
        "Pages get better over time, not stale",
      ],
      cta: "Start refining",
    },
  ],
  why: "You pay for every click. A landing page that matches the ad gives that click the best chance of becoming an order.",
};

// Channel switcher content (ad-to-landing page). Fictional store: Dewlab / Glow Serum.
// `image` keys map to DEMO_IMG in data/demoAssets.js.
export const CHANNELS = {
  eyebrow: "Multi-channel personalization",
  title: "Same product. A different page for every ad.",
  sub: "Each channel brings a different shopper with a different expectation. Choose a channel to see how the page changes.",
  items: [
    {
      key: "search",
      label: "Google Search",
      expects: "An answer to the exact query they typed.",
      changes: ["Headline echoes the search term", "Key benefits and shipping near the top", "Fast route to add-to-cart"],
      ad: {
        query: "vitamin c serum for dull skin",
        title: "Vitamin C Serum for Dull Skin | Dewlab Glow Serum",
        body: "Lightweight daily serum for a brighter look. Free shipping over $40. 30-day returns.",
        links: ["Shop Glow Serum", "Reviews", "Free Shipping"],
      },
      page: { image: "product", headline: "Vitamin C Serum for Dull Skin", sub: "Lightweight, daily-use, free shipping over $40.", chips: ["Brightening", "Free shipping"], price: "$34" },
    },
    {
      key: "shopping",
      label: "Google Shopping",
      expects: "The exact product, price and variant they saw.",
      changes: ["Product-first layout", "Price and size match the listing", "One clear add-to-cart"],
      ad: { title: "Glow Serum, 30 ml", price: "$34.00", rating: "4.8 (2.1K)" },
      page: { image: "product", headline: "Glow Serum, 30 ml", sub: "The size and price from the listing, ready to buy.", chips: ["30 ml selected"], price: "$34" },
    },
    {
      key: "meta",
      label: "Meta / Instagram",
      expects: "The hook or offer from the creative.",
      changes: ["Ad hook carried into the hero", "Lifestyle imagery", "Social proof early on the page"],
      ad: { cta: "Shop now", caption: "Your morning glow, in one drop. Meet Glow Serum." },
      page: { image: "lifestyle", imagePos: "center 40%", headline: "Your morning glow, in one drop", sub: "Meet Glow Serum, as seen on Instagram.", chips: ["4.8 ★ reviews"], price: "$34" },
    },
    {
      key: "youtube",
      label: "YouTube",
      expects: "The demo or story from the video.",
      changes: ["Demo moment above the fold", "Benefit-led copy", "Short route from demo to purchase"],
      ad: { headline: "How to use Glow Serum" },
      page: { image: "howto", imagePos: "center 40%", headline: "How to use Glow Serum", sub: "The same routine from the video, right here.", chips: ["Watch demo", "3 steps"], price: "$34" },
    },
    {
      key: "ugc",
      label: "UGC / Creator",
      expects: "The creator's recommendation, and proof it's real.",
      changes: ["Social-proof-first layout", "Creator quote in the hero", "Real customer photos and reviews"],
      ad: { cta: "Shop now", caption: "My 3-step morning routine. Link in bio." },
      page: { image: "routine", imagePos: "center 30%", headline: "Mia's morning routine", quote: "“The only serum I reach for every day.”", sub: "Reviewed by 2,184 customers.", chips: ["Creator pick"], price: "$34" },
    },
    {
      key: "retargeting",
      label: "Retargeting",
      expects: "Their last visit, and an answer to what held them back.",
      changes: ["Shorter page", "Removes the likely objection (returns, sizing)", "Product they viewed, ready to buy"],
      ad: { cta: "Shop now", headline: "Still thinking it over?", caption: "Free returns on every order. Your Glow Serum is waiting." },
      page: { image: "product", banner: "Free 30-day returns", headline: "Still thinking it over?", sub: "Your Glow Serum is waiting. Free returns on every order.", chips: ["Free returns"], price: "$34" },
    },
  ],
};
