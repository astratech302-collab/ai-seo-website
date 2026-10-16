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
  desc: "Connect your Meta and Google ad accounts. We read every ad, suggest what each page should say, and build a landing page that continues it.",
  metaTitle: "Personalized Ad-to-Landing Pages for E-commerce | Geobuild",
  metaDescription:
    "A dedicated landing page for every ad and channel you run. Geobuild matches each page to the ad that brought the visitor, so e-commerce clicks turn into orders.",
  features: [
    {
      title: "Connect your ad accounts",
      desc: "Link your Meta and Google accounts in a few clicks.",
      body: "Connect your Meta and Google ad accounts, and any other platform you run on. You stay in control of what we can see.",
      why: [
        "No exporting or uploading ads by hand",
        "Every platform you run on, in one place",
      ],
      cta: "Connect your accounts",
    },
    {
      title: "We fetch every ad",
      desc: "We read all your ads from all your accounts.",
      body: "We pull in every ad from every connected account: the creative, headline, copy, offer and audience, so we know what each visitor was promised.",
      why: [
        "Nothing gets missed or re-typed",
        "We start from the real promise each ad makes",
      ],
      cta: "Import your ads",
    },
    {
      title: "We suggest the changes for each ad",
      desc: "Page copy and content, suggested per ad.",
      body: "For each ad we generate suggested copy and content for its landing page: the headline, hero image, offer and proof that fit that ad and its audience. You review and approve.",
      why: [
        "Every page matches the ad that sends the click",
        "A strategist reviews the suggestions with you",
      ],
      cta: "See the suggestions",
    },
    {
      title: "We create the landing pages",
      desc: "A personalized page for every ad, built for you.",
      body: "Once you approve, we create the landing pages for you, one per ad, in your brand and ready to send traffic to.",
      why: [
        "Visitors land on a page that continues the ad",
        "You get the pages built, not just advice",
        "Conversion rates increase by up to 40% for customers",
      ],
      cta: "Get your pages",
    },
  ],
  why: "You pay for every click. A landing page that matches the ad gives that click the best chance of becoming an order.",
};

// Channel switcher content (ad-to-landing page). Fictional store: Dewlab / Glow Serum.
// `image` keys map to DEMO_IMG in data/demoAssets.js.
export const CHANNELS = {
  eyebrow: "Works with every platform",
  title: "Meta, Google, TikTok, YouTube and more.",
  sub: "Wherever you run ads, we build the page that continues them. Pick a platform to see how the page changes.",
  items: [
    {
      key: "search",
      label: "Google Ads",
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
      key: "tiktok",
      label: "TikTok",
      expects: "The same feel as the video, in a page that loads fast.",
      changes: ["Creator-style hero that matches the video", "Fast, thumb-friendly mobile layout", "Real reviews and photos near the top"],
      ad: { cta: "Shop now", caption: "My 3-step morning routine. Link in bio." },
      page: { image: "routine", imagePos: "center 30%", headline: "Mia's morning routine", quote: "“The only serum I reach for every day.”", sub: "Reviewed by 2,184 customers.", chips: ["Creator pick"], price: "$34" },
    },
  ],
};
