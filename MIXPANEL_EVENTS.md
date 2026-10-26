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
| Book a demo | Hero (CRO home) | `button_clicked/book_demo_hero` | — | `src/components/sections/HeroCro.jsx` |
| See how it works | Hero (CRO home) | `link_clicked/see_how_it_works_hero` | — | `src/components/sections/HeroCro.jsx` |
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
| Connect Google Ads | Google Ads page | `button_clicked/connect_google_ads_google_ads_page` | — | `src/app/google-ads/GoogleAdsConnect.jsx` |
| Generate report | Google Ads page | `button_clicked/generate_report_google_ads_page` | accounts | `src/app/google-ads/GoogleAdsConnect.jsx` |
| Disconnect | Google Ads page | `button_clicked/disconnect_google_ads_page` | — | `src/app/google-ads/GoogleAdsConnect.jsx` |
| Download CSV | Google Ads page | `link_clicked/download_csv_google_ads_page` | — | `src/app/google-ads/GoogleAdsConnect.jsx` |
