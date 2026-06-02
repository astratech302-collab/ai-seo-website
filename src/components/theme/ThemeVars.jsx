import { getThemeCss } from "@/lib/theme";

/**
 * Injects the JSON-driven color tokens as `:root` CSS variables.
 * Rendered once near the top of the document in the root layout.
 * Server component — no client JS needed.
 */
export default function ThemeVars() {
  return (
    <style dangerouslySetInnerHTML={{ __html: getThemeCss() }} />
  );
}
