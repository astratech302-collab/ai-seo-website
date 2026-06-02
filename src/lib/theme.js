import colors from "@/config/colors.json";

/**
 * Flattens colors.json into a {cssVarName: value} map that ThemeVars renders
 * into :root. This is what makes colors.json the single runtime source of truth:
 * edit a value there and every token below updates across the whole site.
 *
 * Tailwind utilities (bg-brand, text-ink-2, border-line, ...) are wired to these
 * vars in globals.css via the `@theme inline` block.
 */
export function getThemeVars() {
  return {
    "--brand": colors.brand.DEFAULT,
    "--brand-600": colors.brand["600"],
    "--brand-200": colors.brand["200"],
    "--brand-tint": colors.brand.tint,
    "--grad": colors.brand.gradient,

    "--surface": colors.surface.DEFAULT,
    "--surface-soft": colors.surface.soft,
    "--surface-ink": colors.surface.ink,

    "--ink": colors.ink.DEFAULT,
    "--ink-2": colors.ink.muted,
    "--ink-3": colors.ink.subtle,

    "--line": colors.line.DEFAULT,
    "--line-soft": colors.line.soft,

    // Map shadcn primitives (Button/Dialog/Accordion focus rings, etc.) onto the brand.
    "--primary": colors.brand.DEFAULT,
    "--primary-foreground": "#ffffff",
    "--ring": colors.brand.DEFAULT,
  };
}

/** Serializes the theme map into a `:root { ... }` CSS string. */
export function getThemeCss() {
  const vars = getThemeVars();
  const body = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `:root {\n${body}\n}`;
}

export { colors };
