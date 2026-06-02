@AGENTS.md

# Solorank — project conventions

Marketing site for **Solorank**: an agency running AEO / GEO / SEO for brands with a
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
