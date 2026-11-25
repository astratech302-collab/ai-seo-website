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
  // sky + flow gradient stops -> --sky-top, --cloud, --flow-blue-1 ...
  const flow = Object.fromEntries(
    Object.entries(colors.flow).flatMap(([tone, stops]) =>
      stops.map((hex, i) => [`--flow-${tone}-${i + 1}`, hex])
    )
  );

  return {
    ...flow,
    "--sky-top": colors.sky.top,
    "--sky-mid": colors.sky.mid,
    "--sky-low": colors.sky.low,
    "--cloud": colors.sky.cloud,
    "--surface-muted": colors.surface.muted,
    "--surface-nav": colors.surface.nav,
    "--line-strong": colors.line.strong,
    "--brand-light": colors.brand.light,
    "--brand": colors.brand.DEFAULT,
    "--brand-600": colors.brand["600"],
    "--brand-700": colors.brand["700"],
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
    "--primary": colors.ink.DEFAULT,
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
