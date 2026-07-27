import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

// Flatten React children (from react-markdown) to a plain string for heading ids.
function nodeText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node.props?.children) return nodeText(node.props.children);
  return "";
}

const COMPONENTS = {
  h2: ({ children }) => (
    <h2 id={slugify(nodeText(children))} className="ab-h2">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="ab-h3">{children}</h3>,
  p: ({ children }) => <p className="ab-p">{children}</p>,
  ul: ({ children }) => <ul className="ab-ul">{children}</ul>,
  ol: ({ children }) => <ol className="ab-ol">{children}</ol>,
  a: ({ href, children }) => (
    <a className="ab-a" href={href}>
      {children}
    </a>
  ),
  blockquote: ({ children }) => <blockquote className="ab-quote">{children}</blockquote>,
  table: ({ children }) => (
    <div className="ab-table-wrap">
      <table className="ab-table">{children}</table>
    </div>
  ),
};

/**
 * Renders a post's article body. Prefers Markdown (GitHub-flavored, so tables
 * work); falls back to the legacy structured block model. h2s get slug ids for
 * TOC anchors with scroll-margin so they clear the sticky header.
 */
export default function ArticleBody({ body, markdown }) {
  return (
    <div className="article-body">
      {markdown ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
          {markdown}
        </ReactMarkdown>
      ) : (
        (body || []).map((b, i) => {
          if (b.type === "h2") {
            return (
              <h2 key={i} id={b.id} className="ab-h2">
                {b.text}
              </h2>
            );
          }
          if (b.type === "ul") {
            return (
              <ul key={i} className="ab-ul">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="ab-p">
              {b.text}
            </p>
          );
        })
      )}
      <style>{`
        .article-body { font-size: 17.5px; line-height: 1.7; color: var(--ink); max-width: 720px; min-width: 0; }
        .ab-h2 {
          font-size: clamp(22px, 2.6vw, 28px); font-weight: 600; letter-spacing: -0.02em;
          margin: 40px 0 14px; scroll-margin-top: 90px;
        }
        .ab-h3 { font-size: 19px; font-weight: 600; letter-spacing: -0.01em; margin: 28px 0 8px; }
        .ab-p { color: var(--ink-2); margin: 0 0 18px; }
        .ab-a { color: var(--brand-600); text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
        .ab-a:hover { color: var(--brand); }
        .ab-ul, .ab-ol { margin: 0 0 18px; padding-left: 0; display: flex; flex-direction: column; gap: 11px; }
        .ab-ul { list-style: none; }
        .ab-ul li { position: relative; padding-left: 26px; color: var(--ink-2); }
        .ab-ul li::before { content: "✓"; position: absolute; left: 0; top: 0; color: var(--brand-600); font-weight: 700; }
        .ab-ol { list-style: none; counter-reset: ab; }
        .ab-ol li { position: relative; padding-left: 38px; color: var(--ink-2); counter-increment: ab; }
        .ab-ol li::before {
          content: counter(ab); position: absolute; left: 0; top: 0;
          width: 24px; height: 24px; border-radius: 999px; background: var(--brand-tint);
          color: var(--brand-600); font-size: 12.5px; font-weight: 700; line-height: 1;
          display: inline-flex; align-items: center; justify-content: center;
          /* center the badge against the first line (line-height ~1.7 * 17.5px). */
          margin-top: calc((1.7em - 24px) / 2);
        }
        .ab-quote {
          margin: 24px 0; padding: 16px 20px; border-left: 3px solid var(--brand);
          background: var(--surface-soft); border-radius: 0 12px 12px 0;
          font-size: 16px; color: var(--ink);
        }
        .ab-quote p { margin: 0; color: var(--ink); }
        .ab-table-wrap { overflow-x: auto; max-width: 100%; margin: 0 0 22px; border: 1px solid var(--line); border-radius: 12px; }
        .ab-table { width: 100%; border-collapse: collapse; font-size: 14.5px; min-width: 520px; }
        .ab-table th, .ab-table td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line-soft); }
        .ab-table thead th { background: var(--surface-soft); font-weight: 600; color: var(--ink); }
        .ab-table tr:last-child td { border-bottom: none; }
        .ab-table td { color: var(--ink-2); }
      `}</style>
    </div>
  );
}
