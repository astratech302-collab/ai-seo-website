# Aside-style rebrand + Onsite Discovery

Approved in chat on 2026-11-25 ("go"), with Onsite Discovery added in the same reply.

## Intent
Rebrand Geobuild so it looks and moves like aside.com (light blue, black, white, flowing
pastel gradients), keeping Geobuild's content, and add a new product: Onsite Discovery.

## Approaches
1. Recolor only. Cheap, but not "exactly like this".
2. **Rebuild the look (picked).** New tokens and font site-wide; homepage, header, footer and
   final CTA rebuilt in Aside's layout with our own artwork.
3. Copy Aside's files. Rejected: their artwork and display font are theirs.

## Design
- **Font:** Geist for body and headings (headings weight 400, tight tracking). Geist Mono stays.
- **Colors:** sky blue, blue accent, near-black, white; pink, blue and mint gradients. All in
  `colors.json`. Engine brand colors unchanged.
- **Hero:** rounded sky panel, own CSS/SVG clouds that drift, header inside it, centered h1,
  black pill CTA, browser window with the funnel mock peeking from the bottom.
- **Header:** transparent over the hero; slim white sticky bar after scrolling.
- **Sections:** thin vertical gridlines, blue eyebrow links, black + grey two-tone paragraphs.
- **Cards:** flowing gradient cards; prompt bubble fades in, mock slides up on scroll.
- **Effects:** scroll reveals, animated bars, pill tab switchers, hover states. All respect
  `prefers-reduced-motion`.
- **Ending:** blue dotted-gradient CTA, minimal footer.
- **Scope:** every page gets the new tokens and font; homepage, header, footer and CTA get the
  full layout rebuild.

## Onsite Discovery (new)
Geobuild changes a collection page's product order for each shopper, from their real-time
intent, needs and use cases. Reference: spangle.ai/onsite-discovery (idea only; own copy,
visuals and store).
- Route `/products/onsite-discovery`, in sitemap, with Service + Breadcrumb JSON-LD.
- Header: top-level link, plus an entry in the Product menu, mobile drawer and footer.
- Homepage: a section with a live demo; picking a shopper need re-sorts the grid with animation.
- Scope is collection sorting only (no recommendations feed or search).
- No performance figures or inventory claims for this product: we have none to cite.

## Non-goals
No new copy claims, no changes to the contact API or legal text, no commit or push.

## Constraints
CLAUDE.md rules: colors from `colors.json`, `track()` + `MIXPANEL_EVENTS.md` for every
interactive element, one h1 per page, sitemap updated, mobile verified at 1440/1024/768/390.
