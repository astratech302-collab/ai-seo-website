/**
 * Renders schema.org structured data as a <script type="application/ld+json">.
 *
 * Per Next.js guidance, JSON-LD is emitted as a plain <script> tag (not
 * next/script). `<` is escaped to < to neutralize XSS via injected strings.
 *
 * Pass one schema object, or an array — an array is wrapped in an @graph so
 * multiple nodes (e.g. Organization + WebSite) share one script tag and can
 * cross-reference each other via @id.
 *
 * Build the schema objects with the pure helpers in src/lib/schema.js.
 */
export default function JsonLd({ schema }) {
  const nodes = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
  if (!nodes.length) return null;

  const data =
    nodes.length === 1
      ? { "@context": "https://schema.org", ...nodes[0] }
      : { "@context": "https://schema.org", "@graph": nodes };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
