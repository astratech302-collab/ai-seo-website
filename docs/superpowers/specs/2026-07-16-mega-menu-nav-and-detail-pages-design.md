# Mega-menu nav, detail pages & expanded footer — design

Date: 2026-07-16

## Goal

Replace the simple text-link header with a Clay-style mega-menu, give each agent and
each service its own route (driven by a shared template), and expand the footer into
separated columns. Content-first templates the user will iterate on afterward.

## Navigation

Header nav items (desktop; hover opens panels, Pricing is a plain link):

| Item | Type | Contents |
|------|------|----------|
| Product | Mega-menu | "Agents" — 6 agents. Strategy Agent (A-00) featured as the *brand brain*; the other 5 listed. Right: promo card. |
| Services | Mega-menu | 5 services + right promo card. |
| Resources | Dropdown | Blog, FAQ. |
| Pricing | Link → `/pricing` | — |

Right side keeps the **Book a demo** button (→ `/contact-us`, matching current header).
Mobile (≤820px): nav hides, hamburger opens a drawer with accordion sections.

## Routes (shared template)

- `/agents/[slug]` — 6 static pages via `generateStaticParams`.
  Slugs: `strategy-agent`, `research-agent`, `content-agent`, `backlink-agent`,
  `optimizer-agent`, `analyzer-agent`.
- `/services/[slug]` — 5 static pages.
  Slugs: `answer-engine-optimization`, `ai-seo`, `technical-seo`, `reddit-marketing`,
  `backlinks`.
- `/blog` — simple stub page ("coming soon") so the Resources → Blog link resolves.

Next 16 note: `params` is a Promise (`const { slug } = await params`);
`generateStaticParams` returns `[{ slug }]`; add `generateMetadata` per page.

## Shared `DetailPage` component

`components/sections/DetailPage.jsx` renders from a plain object:
eyebrow · title · tagline (`short`) · description (`desc`) · "What it does" list (`does[]`)
· Book-a-demo CTA · a "related" strip (siblings in the same group). Uses existing
utility classes (`.wrap`, `.section-pad`, `.eyebrow`, `.tag-pill`, `.btn`) and
`colors.json` tokens — no new palette. Wrapped in `<Reveal>` for scroll-in.

## Data

- `data/agents.js`: add `slug` to each agent.
- `data/services.js` (new): 5 services, same shape as agents
  (`{ slug, name, role, short, desc, does[] }`).
- `data/nav.js` (new): declarative nav config consumed by Header + Footer so the two
  never drift (agent links, service links, resources links, promo-card copy).

## Mega-menu creative (right panel)

Code-built promo card: brand gradient (`.bg-grad`) + subtle SVG-noise grain overlay,
eyebrow + heading + one-line blurb + a small visual reusing existing brand pieces
(`EngineLogo` marks / `GeobuildMark`). Two copies — Product vs. Services. No image assets.

## Footer

Columns: brand blurb + **Product** (6 agents) · **Services** (5) · **Resources**
(Blog, FAQ) · **Company** (Contact, Pricing). Keeps bottom bar (© / Privacy·Terms).
Collapses to 2 cols ≤760px, 1 col ≤560px.

## Sitemap

Add all 11 new routes (`/blog`, 6 agents, 5 services... = 12) to `src/app/sitemap.js`.

## Constraints

- Match existing inline-style + CSS-var idiom; reuse utility classes; one palette.
- `"use client"` only where interactivity is needed (Header). DetailPage + route pages
  stay server components; Reveal is already a client component.
- No commit/push (per CLAUDE.md; AWS Amplify auto-deploys on push).
