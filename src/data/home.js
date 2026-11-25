// Homepage copy for the intro statement and capability cards. Edit here, not in components.
import { ADS_PATH } from "@/data/cro";
import { ONSITE_PATH } from "@/data/onsite";

export const INTRO = {
  link: "Introducing Geobuild",
  paragraphs: [
    {
      lead: "Most stores show every shopper the same page.",
      rest: "The ad promised one thing, the visitor wants another, and the store looks identical to both.",
    },
    {
      lead: "Geobuild personalizes the whole visit.",
      rest: "It reads intent as it happens, sorts your collections one to one for each session, and matches the right audience to the right landing page. From discovery to conversion, on Shopify.",
    },
  ],
};

export const CAPABILITIES = {
  eyebrow: "What Geobuild changes",
  title: "Every visit, shaped around the shopper.",
  cards: [
    {
      key: "intent",
      tone: "blue",
      bubble: "What is this shopper looking for?",
      title: "Real-time intent",
      body: "Searches, filters, views and traffic source show what each shopper needs in this session.",
      href: "#how-it-works",
      event: "link_clicked/real_time_intent_card_home",
    },
    {
      key: "sort",
      tone: "pink",
      bubble: "Show what fits this shopper first",
      title: "1:1 session sort",
      body: "Your collection re-orders itself for one shopper at a time, not for a segment.",
      href: ONSITE_PATH,
      event: "link_clicked/onsite_discovery_card_home",
    },
    {
      key: "ads",
      tone: "mint",
      bubble: "Send this audience to the right page",
      title: "Audience-matched landing pages",
      body: "Each ad audience lands on a page that continues the promise the ad made.",
      href: ADS_PATH,
      event: "link_clicked/ad_to_landing_card_home",
    },
  ],
};
