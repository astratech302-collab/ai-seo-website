"use client";

import { track } from "@/lib/track";

/** "In this article" table of contents. Anchors to the h2 ids in the body. */
export default function ArticleToc({ toc }) {
  if (!toc?.length) return null;
  return (
    <nav className="toc" aria-label="In this article">
      <div className="toc-label mono">In this article</div>
      <ul className="toc-list">
        {toc.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="toc-link"
              onClick={() => track("link_clicked/toc_item_blog_post", { heading: h.text })}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <style>{`
        .toc-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 14px;
        }
        .toc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .toc-link {
          font-size: 14px; line-height: 1.4; color: var(--ink-2); text-decoration: none;
          border-left: 2px solid var(--line); padding-left: 12px; display: block;
          transition: color .15s ease, border-color .15s ease;
        }
        .toc-link:hover { color: var(--brand-600); border-left-color: var(--brand); }
      `}</style>
    </nav>
  );
}
