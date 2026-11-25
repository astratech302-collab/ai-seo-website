# Mixpanel event registry

The single source of truth for every element we explicitly track. Whenever you add or
change an interactive element, add its `track()` call **and** a row here.

## Naming convention

Event names are a **top-down hierarchy joined with `/`** — broadest category first, then the
specific element descriptor (specific-thing → where-it-lives), all lowercase snake_case:

```
<action>/<element_descriptor>
```

Examples: `button_clicked/twitter_icon_footer`, `button_clicked/book_demo_final_cta`.

- Actions (level 1): `button_clicked`, `link_clicked`, `form_submitted`, `tab_switched`, …
- Descriptor (level 2): `<element>_<location>`, e.g. `linkedin_icon_footer`, `ask_claude_final_cta`.
- Everything descriptive goes **into the event name**. Extra runtime context goes in `props`.

Fire events only via `track(event, props)` from `@/lib/track`. It no-ops in dev (Mixpanel
initializes in production builds only).

## Registered events

| Element descriptor | Location | Event name | Properties | File |
| --- | --- | --- | --- | --- |
| LinkedIn icon | Footer | `button_clicked/linkedin_icon_footer` | — | `src/components/layout/Footer.jsx` |
| X (Twitter) icon | Footer | `button_clicked/twitter_icon_footer` | — | `src/components/layout/Footer.jsx` |
| Ask ChatGPT | Final CTA | `button_clicked/ask_chatgpt_final_cta` | — | `src/components/sections/AskEngines.jsx` |
| Ask Claude | Final CTA | `button_clicked/ask_claude_final_cta` | — | `src/components/sections/AskEngines.jsx` |
| Ask Gemini | Final CTA | `button_clicked/ask_gemini_final_cta` | — | `src/components/sections/AskEngines.jsx` |
| Ask Perplexity | Final CTA | `button_clicked/ask_perplexity_final_cta` | — | `src/components/sections/AskEngines.jsx` |
| Book a demo | Final CTA | `button_clicked/book_demo_final_cta` | — | `src/components/sections/FinalCTA.jsx` |
| Get a free AI audit | Final CTA | `button_clicked/get_ai_audit_final_cta` | — | `src/components/sections/FinalCTA.jsx` |
| Agent card | System section | `button_clicked/agent_card_system` | `{ agent }` — agent slug | `src/components/sections/SystemSection.jsx` |
| Blog card | Blog index | `link_clicked/blog_card_blog_index` | `{ slug }` | `src/components/blog/BlogCard.jsx` |
| Blog card | Related posts | `link_clicked/blog_card_related` | `{ slug }` | `src/components/blog/BlogCard.jsx` |
| Category filter tab | Blog index | `button_clicked/blog_filter_tab` | `{ category }` | `src/components/blog/BlogGrid.jsx` |
| TOC item | Blog post | `link_clicked/toc_item_blog_post` | `{ heading }` | `src/components/blog/ArticleToc.jsx` |
| Share — X | Blog post | `link_clicked/share_twitter_blog_post` | `{ url }` | `src/components/blog/ShareRow.jsx` |
| Share — LinkedIn | Blog post | `link_clicked/share_linkedin_blog_post` | `{ url }` | `src/components/blog/ShareRow.jsx` |
| Share — Facebook | Blog post | `link_clicked/share_facebook_blog_post` | `{ url }` | `src/components/blog/ShareRow.jsx` |
| Share — Email | Blog post | `link_clicked/share_email_blog_post` | `{ url }` | `src/components/blog/ShareRow.jsx` |
| Dismiss (×) | Announcement banner | `button_clicked/dismiss_announcement_banner` | — | `src/components/layout/AnnouncementBanner.jsx` |
| Banner link | Announcement banner | `link_clicked/cro_announcement_banner` | — | `src/components/layout/AnnouncementBanner.jsx` |
| Channel tab (search, shopping, meta, youtube, ugc, retargeting) | Ad-to-Landing page | `tab_switched/ad_channel_<key>` | — | `src/components/cro/ChannelShowcase.jsx` |
| Privacy link | Footer | `link_clicked/privacy_link_footer` | — | `src/components/layout/Footer.jsx` |
| Terms link | Footer | `link_clicked/terms_link_footer` | — | `src/components/layout/Footer.jsx` |

## Aside-style rebrand and Onsite Discovery

| Element | Event | Properties |
| --- | --- | --- |
| Home intro eyebrow link | `link_clicked/introducing_geobuild_intro_home` | – |
| Home capability card: Onsite Discovery | `link_clicked/onsite_discovery_card_home` | – |
| Home capability card: Ad-to-Landing | `link_clicked/ad_to_landing_card_home` | – |
| Home Onsite Discovery eyebrow | `link_clicked/onsite_discovery_eyebrow_home` | – |
| Collection sorter need pill (commute, hiking, campus, budget) | `tab_switched/need_{need}_collection_sorter_{home|page}` | – |
| Onsite Discovery hero CTA | `button_clicked/book_demo_hero_onsite_discovery` | – |
| Header nav | `link_clicked/pricing_header` | – |
| Header menu trigger (product, services) | `button_clicked/{menu}_menu_header` | – |
| Product menu | `link_clicked/onsite_discovery_product_menu_header` | – |
| Product menu | `link_clicked/ad_to_landing_product_menu_header` | – |
| Services menu item | `link_clicked/{service}_services_menu_header` | – |
| Header CTA | `button_clicked/book_demo_header` | – |
| Mobile menu icon | `button_clicked/menu_icon_header` | – |
| Mobile drawer sub-item | `link_clicked/{item}_mobile_menu` | – |
| Mobile drawer accordion | `button_clicked/{section}_section_mobile_menu` | – |
| Mobile drawer CTA | `button_clicked/book_demo_mobile_menu` | – |
| Footer column link | `link_clicked/{label}_footer` | – |
| Home capability card: real-time intent | `link_clicked/real_time_intent_card_home` | – |
| Home hero store URL field submit (arrow button or Enter) | `form_submitted/store_url_hero` | `has_url` |
| Product menu: AI Visibility, Catalog Enrichment | `link_clicked/{ai_visibility\|catalog_enrichment}_product_menu_header` | – |
| Home growth cards | `link_clicked/{ai_visibility\|catalog_enrichment}_growth_card_home` | – |
| Header nav: Blog | `link_clicked/blog_header` | – |
| Mobile drawer: Pricing, Blog | `link_clicked/{pricing\|blog}_mobile_menu` | – |
