# Aside-style Rebrand + Onsite Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Restyle Geobuild after aside.com and add the Onsite Discovery product.

**Architecture:** Change tokens, font and shared classes first so every page follows; then
rebuild the homepage shell; then add Onsite Discovery with its sort logic in a pure module.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, GSAP `Reveal`, `node:test` (no new deps).

**Spec:** `docs/superpowers/specs/2026-11-25-aside-rebrand-onsite-discovery-design.md`

## Global Constraints
- Colors only in `src/config/colors.json`; components use CSS vars.
- Every interactive element calls `track()` and is listed in `MIXPANEL_EVENTS.md`.
- One `<h1>` per page. Motion respects `prefers-reduced-motion`.
- No Aside or Spangle assets or copy. No new performance or inventory claims.
- No commit, no push (overrides the skill's commit steps).

## Review Focus
- Unknown or default need: the grid keeps the store order.
- Products with equal scores keep their relative store order; input array is not mutated.
- A shopper who clicks a need is not overridden by auto-cycling.
- 390px: header, hero window and product grid cause no horizontal scroll.
- Reduced motion: no auto-cycling or drifting; all content visible.

---

### Task 1: Tokens, font, shared styles
**Files:** `config/colors.json`, `lib/theme.js`, `app/layout.js`, `app/globals.css`,
`components/brand/BrandMark.jsx`, `app/icon.svg`, every file with orange literals, `CLAUDE.md` (Fonts).
**Produces:** vars `--brand*`, `--sky-top|mid|low`, `--cloud`, `--flow-{blue,pink,mint}-{1..4}`; classes
`.flow .flow-blue|.flow-pink|.flow-mint`, `.flow-bubble`, `.frame`, `.eyebrow-link`, `.two-tone`, `.seg`.
- [ ] Add tokens and map them in `theme.js`; shadcn `--primary` becomes ink.
- [ ] Geist replaces Roobert as `--font-sans`; `h1,h2` weight 450, tracking -0.025em.
- [ ] `.btn-primary` black pill; replace orange literals with `color-mix(in srgb, var(--brand) N%, transparent)`.
- [ ] `MockStage` sits on a flow gradient so existing mockups pick it up.
- [ ] Verify: grep for `255, ?90, ?31|#FF5A1F|#FF6A2B|#FF7A45` returns nothing outside engine marks.

### Task 2: Collection sort logic
**Files:** create `lib/collectionSort.js`, `lib/collectionSort.test.mjs`, `data/onsite.js`.
**Produces:** `sortForNeed(products, need) -> product[]`; `matchedTags(product, need) -> string[]`;
`data/onsite.js` exports `PRODUCTS` (`{id,name,price,tags,tone}`), `NEEDS` (`{key,label,signal,weights}`,
first key `"default"` with empty weights), `ONSITE_PATH`, `ONSITE_NAV`, `ONSITE_PRODUCT`.
- [ ] Tests: `default keeps store order` (ids equal input); `higher weighted score ranks first`
  (`{weights:{a:1,b:3}}` over tags `[a],[b],[]` gives b,a,none); `ties keep store order`;
  `does not mutate input`; `missing need returns store order`.
- [ ] Run `node --test src/lib/collectionSort.test.mjs`: fails (module missing).
- [ ] Implement (score = sum of matched weights, stable sort on a copy). Run: 5 pass.

### Task 3: Header and footer
**Files:** `components/layout/Header.jsx`, `Footer.jsx`, `data/nav.js`, `MIXPANEL_EVENTS.md`.
- [ ] Brand left, centered nav (How it works, Onsite Discovery, Product, Services), black CTA right;
  transparent at top, slim white sticky bar after 16px scroll.
- [ ] Onsite Discovery in top nav, Product menu, mobile drawer, footer Product column.
- [ ] Footer: minimal white, grey column headings.

### Task 4: Homepage and final CTA
**Files:** `components/sections/HeroCro.jsx`, create `hero/CloudSky.jsx`, `sections/IntroStatement.jsx`,
`sections/CapabilityCards.jsx`, `sections/OnsiteSection.jsx`, `onsite/CollectionSorter.jsx`;
`app/page.js`, `sections/FinalCTA.jsx`, `cro/ChannelShowcase.jsx` (segmented tabs).
**Produces:** `<CloudSky />`, `<CollectionSorter location="home"|"page" />`.
- [ ] Hero: inset rounded sky pulled under the header, drifting clouds, centered h1, pill CTA,
  browser window around `FunnelMock` flush with the panel bottom.
- [ ] Intro two-tone statement; three flow cards with bubble fade-in, mock slide-up, growing bars.
- [ ] Sorter: need pills, auto-cycles until the first click, FLIP reorder, event
  `tab_switched/need_{key}_collection_sorter_{location}`.
- [ ] FinalCTA: blue dotted gradient panel, black button.

### Task 5: Onsite Discovery page
**Files:** create `app/products/onsite-discovery/page.js`; modify `app/sitemap.js`, `public/llms.txt`.
- [ ] Metadata (title 50-60 chars, description ~150-160, canonical), Service + Breadcrumb JSON-LD,
  one h1, sorter, three steps, store-order vs per-shopper comparison, FinalCTA.

### Task 6: Verify
- [ ] `node --test`, `npm run lint`, `npm run build` pass.
- [ ] Browser at 1440 and 390: home, new page, one service page, contact; console clean.
- [ ] Fresh-reviewer pass over the diff; fix real findings.
