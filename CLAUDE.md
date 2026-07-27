@AGENTS.md

# Geobuild — project conventions

Marketing site for **Geobuild**: an agency running AEO / GEO / SEO for brands with a
team of AI agents (one Strategy orchestrator + five specialists) and a human strategist
making the final call. Goal: help brands become the answer ChatGPT / Claude / Gemini /
Perplexity recommend.

## Stack

- **Next.js 16 (App Router) + React 19**, JavaScript (`.jsx` / `.js`, no TypeScript).
- **Tailwind CSS v4** (CSS-first config in `globals.css`) + **shadcn/ui** (`radix-nova` style, primitives in `src/components/ui/`).
- **GSAP** (`gsap` + `@gsap/react`) for scroll reveals and entrance animations.
- **Calendly** inline embed for all demo bookings.

Build/dev: `npm run dev`, `npm run build`, `npm run lint`.

## Architecture — route-based

The site is route-based so new pages slot in cleanly. Only the landing page exists today.

```
src/
  app/
    layout.js        # shared shell: fonts, ThemeVars, BookDemoProvider, Header, Footer
    page.js          # "/" landing — composes section components in order
    globals.css      # Tailwind v4 + shadcn base + brand tokens + utility classes
  components/
    ui/              # shadcn primitives (button, dialog, accordion) — add via `npx shadcn@latest add <name>`
    layout/          # Header, Footer (shared across all routes via layout.js)
    sections/        # one file per landing-page section + shared SectionHead
    brand/           # BrandMark, EngineLogo (+ GradientDefs, ENGINE_META)
    hero/            # TypedEngine, AnswerMock (hero-specific animated pieces)
    demo/            # BookDemoProvider, BookDemoButton, CalendlyModal
    motion/          # Reveal (GSAP scroll-reveal wrapper)
    theme/           # ThemeVars (injects colors.json as :root CSS vars)
  config/            # colors.json (color source of truth), site.js (Calendly URL, etc.)
  data/              # agents, engines, faqs, pricing — content, ported verbatim
  lib/               # theme.js (colors.json → CSS vars), gsap.js (plugin registration), utils.js (cn)
```

**Adding a new page:** create `src/app/<route>/page.js`. It automatically inherits the
Header/Footer/providers from `layout.js`. Reuse `sections/`, `brand/`, `ui/` components.
Keep page-specific sections under `sections/` (or a route-scoped folder if they grow).
**Always add the new route to `src/app/sitemap.js` at the same time.**

## Colors — single source of truth

**All colors live in `src/config/colors.json`. Never hardcode hex values in components.**

- `lib/theme.js` flattens the JSON into `:root` CSS variables; `components/theme/ThemeVars.jsx`
  renders them into the document. Editing a value in `colors.json` updates the whole site.
- Tailwind utilities are wired to those vars in the `@theme inline` block of `globals.css`:
  `bg-brand`, `text-brand-600`, `bg-surface-soft`, `bg-surface-ink`, `text-ink-2`,
  `border-line`, etc.
- In inline styles, reference the vars directly: `var(--brand)`, `var(--ink-2)`,
  `var(--surface-ink)`, `var(--line)`, `var(--grad)` (the brand gradient), etc.
- Gradient helpers: `.bg-grad` (background) and `.text-grad` (gradient text clip).
- Engine brand colors (ChatGPT/Claude/Gemini/Perplexity/Google) also live in
  `colors.json` under `engines` and are consumed by `brand/EngineLogo.jsx`.

Effect tokens that aren't colors (shadows, radii) live in the `:root` block of `globals.css`
(`--shadow`, `--shadow-sm`, `--shadow-orange`, `--r`, `--r-lg`).

## Fonts

`Roboto` (UI, `--font-sans`) + `Geist Mono` (mono / eyebrows, `--font-geist-mono`), loaded
via `next/font/google` in `layout.js`. Use the `.mono` class or `font-mono` for monospace.

## Images & assets

**Main images (raster / PNG / JPG, logos, icon artwork, hero imagery) live on S3, not in
the repo.** Upload them to the bucket path `geobuild-admin-config/assets/website_assets/`
(region `ap-south-1`) and reference them via the `ASSET_BASE` constant in
`src/config/site.js` — never hardcode the full S3 URL in a component:

```js
import { ASSET_BASE } from "@/config/site";
// -> https://geobuild-admin-config.s3.ap-south-1.amazonaws.com/assets/website_assets
<img src={`${ASSET_BASE}/strategy-agent.png`} alt="" />
```

- Use clean, descriptive **kebab-case** filenames (`strategy-agent.png`, `ai-seo.png`) — no
  underscores, no redundant `-icon` suffixes, no duplicate variants.
- Export raster icons at **256×256, transparent PNG** (matches the agent/service icon set).
- Upload with `--content-type image/png` and a long `--cache-control`; the bucket serves
  public reads, so the URLs work directly client-side.
- **Do not** drop loose images into `public/` — that folder is for served text assets only
  (`llms.txt`) and documented dev sources (`engines/*.png`, base64 regeneration source for
  `data/engineMarks.js`).

**Small SVGs may stay in the repo, but only inside a dedicated folder** (`public/icons/`),
never loose in the `public/` root. Purely presentational marks (brand mark, favicon
`app/icon.svg`, decorative UI) that are written as inline `<svg>` in components stay inline —
they are not "assets" and need neither S3 nor a folder.

## Reusable utility classes (globals.css)

`.wrap` (1180px max content column), `.section-pad` (section vertical rhythm),
`.eyebrow`, `.tag-pill`, `.mono`, and the pill buttons `.btn` + `.btn-primary` /
`.btn-ghost` / `.btn-dark` (with `.arr` for the animated trailing arrow). Prefer these over
re-deriving the same styles.

## Animations (GSAP)

- Scroll reveals: wrap content in `<Reveal delay={ms}>` (`components/motion/Reveal.jsx`).
  It fades + translates up on scroll-in via ScrollTrigger and respects
  `prefers-reduced-motion`. Stagger siblings with increasing `delay`.
- For bespoke timelines use `useGSAP` from `@/lib/gsap` (plugins are registered there).
- State-driven loops (typewriter, answer-card cycle, human-loop step cycle) are plain React
  `useState` + `useEffect` + CSS transitions — not GSAP.

## "Book a demo" → Calendly

Every demo CTA must open the Calendly modal — **do not** create ad-hoc booking links.

- Use `<BookDemoButton label="…" className="…" />` (`components/demo/BookDemoButton.jsx`).
- It calls `useBookDemo().openDemo()`; the single `CalendlyModal` (shadcn `Dialog` +
  Calendly inline embed) is mounted once by `BookDemoProvider` in `layout.js`.
- The Calendly URL is in `src/config/site.js` (`CALENDLY_URL`).

## Mixpanel events

Mixpanel is initialized once in `components/analytics/MixpanelProvider.jsx` (production
builds only) with autocapture + session replay on. **In addition to autocapture, every
interactive element — every button, link, icon, toggle, tab, form submit — must fire an
explicit named event** so we get clean, intentional analytics.

- Fire events with the `track(event, props)` helper from `@/lib/track` — never call
  `mixpanel.track` directly. It no-ops safely in dev.
- **Event name format (mandatory, site-wide):** a top-down hierarchy joined with `/`, going
  from the broadest category down to the specific element:

  ```
  <action>/<element_descriptor>
  ```

  The descriptor reads specific-thing → where-it-lives, e.g.:

  - `button_clicked/twitter_icon_footer`
  - `button_clicked/linkedin_icon_footer`
  - `button_clicked/book_demo_header`

  Actions are snake_case past-tense (`button_clicked`, `link_clicked`, `form_submitted`,
  `tab_switched`). Keep the whole name lowercase snake_case with `/` only between hierarchy
  levels. Everything descriptive goes **into the event name**, top-down — extra context goes
  in `props`.

- **Whenever you add or change any interactive element, you MUST add its `track()` call and
  register it in `MIXPANEL_EVENTS.md`** (element descriptor → event name → properties). Keep
  that file in sync — it's the single source of truth for what's tracked.

## Structured data (JSON-LD)

**Every page must emit schema.org structured data as JSON-LD**, machine-readable for search
engines and AI, following Google's guidelines:
https://developers.google.com/search/docs/appearance/structured-data/search-gallery
(validate with the Rich Results Test). Structured data must describe content the user
actually sees on the page — never mark up content that isn't there.

- **Never hardcode JSON-LD inline in a page.** Build it from data with the pure helpers in
  `src/lib/schema.js` (`organizationSchema`, `websiteSchema`, `serviceSchema`,
  `webPageSchema`, `contactPageSchema`, `faqPageSchema`, `blogSchema`, `blogPostingSchema`,
  `breadcrumbSchema`) and render with `<JsonLd schema={…} />` (`components/seo/JsonLd.jsx`).
  Pass one object or an array — an array is wrapped in an `@graph` and shares one script tag.
- `layout.js` emits site-wide `Organization` + `WebSite` on every page. Each page adds its
  own type on top (e.g. `Service` + `BreadcrumbList` on detail pages, `FAQPage` from the
  fetched FAQs on pricing/contact, `Blog`/`BlogPosting` on the blog).
- **Dynamic, not hardcoded:** derive fields from `src/data/*`, page `metadata`, or fetched
  content. Blog posts drive `BlogPosting` entries automatically via the `posts` array — when
  a post source exists, entries generate themselves. Add a new builder to `schema.js` (don't
  inline objects) when a new page type needs a new schema type.
- Org identity (name, description, social `sameAs`) lives in `src/config/site.js`
  (`ORG_NAME`, `ORG_DESCRIPTION`, `SOCIAL_LINKS`) — the single source shared by the footer
  and the structured data.

## Page SEO essentials (every page)

Each page must satisfy these on-page SEO/GEO checks. Wire them through Next
`metadata` (or `generateMetadata` for dynamic routes) — never hand-write `<head>` tags.

- **Canonical (required):** `layout.js` sets `metadataBase: new URL(SITE_URL)`; every page
  sets `alternates: { canonical: "/its-path" }` (relative — Next makes it absolute). Dynamic
  routes set it in `generateMetadata` from the slug.
- **Title ~50–60 chars, descriptive:** end with `| Geobuild` (or `— Geobuild`). Don't ship
  bare 2–3 word titles. Templates in use: agents `"<Name> — Agent-Run AEO, GEO & SEO | Geobuild"`,
  services `"<Name> — AEO, GEO & SEO Service | Geobuild"`.
- **Meta description ~150–160 chars:** detail pages use the long `desc` field (not the short
  `short`) so descriptions aren't truncated-short.
- **Exactly one `<h1>` per page:** section headings are `<h2>` via `SectionHead`. When a
  section IS the page's main heading (e.g. `/pricing`), pass `SectionHead as="h1"`. Never zero
  or multiple h1s; don't skip heading levels.
- **Descriptive `alt` on informative images:** logos/icons that convey meaning get real alt
  text (e.g. `alt={`${name} icon`}`); only purely decorative images use `alt=""`.
- **Structured data:** see "Structured data (JSON-LD)" above — every page emits it.
- **Content visibility:** keep primary content in the DOM and visible by default. Accordions
  (FAQ) are fine as long as the same content is also exposed via `FAQPage` JSON-LD, which is
  how machines read it; don't hide primary copy behind `display:none`.

## Responsive

Mobile-first / all-screen. Section components carry their own breakpoints (scoped `<style>`
blocks) mirroring the prototype: hero/grids collapse to one column ≤900px, header nav hides
≤820px, two-column layouts stack ≤760/720px, etc. Verify changes at 1440 / 1024 / 768 / 390px
and ensure no horizontal scroll (`body` has `overflow-x: hidden`).

## Conventions

- Mark interactive components (`useState`, effects, GSAP, context) `"use client"`. Keep
  purely presentational sections as server components where possible.
- Content/copy lives in `src/data/` — edit there, not inline in components.
- Match the existing inline-style + CSS-var idiom when porting/extending design pieces;
  it keeps fidelity to the prototype.
- Keep styling consistent across the whole site: reuse the same color scheme (the `colors.json`
  tokens / brand orange), spacing, typography, radii, and shared utility classes on every new
  page and component — no one-off palettes or visual styles.
- **Sitemap:** always update `src/app/sitemap.js` when adding or removing a public route.
- **Never `git push` (or commit) unless the user explicitly asks.** Make and stage changes
  locally; wait for an explicit "push"/"commit" instruction before publishing — pushing to
  `main` auto-deploys via **AWS Amplify** (not Vercel).
