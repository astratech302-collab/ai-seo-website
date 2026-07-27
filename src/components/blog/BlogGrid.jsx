"use client";

import { useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { track } from "@/lib/track";

/**
 * The blog index grid with category filter tabs (All + each category).
 * Reused, without tabs, for the related-posts grid.
 */
export default function BlogGrid({ posts, categories = [], showTabs = true, location = "blog_index" }) {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories];
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);

  const pick = (t) => {
    setActive(t);
    track("button_clicked/blog_filter_tab", { category: t });
  };

  return (
    <div>
      {showTabs && tabs.length > 1 && (
        <div className="blog-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              className={`blog-tab ${t === active ? "is-on" : ""}`}
              aria-pressed={t === active}
              onClick={() => pick(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="blog-grid">
        {shown.map((p) => (
          <BlogCard key={p.slug} post={p} location={location} />
        ))}
      </div>

      <style>{`
        .blog-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 40px; }
        .blog-tab {
          cursor: pointer; font-size: 14px; font-weight: 600;
          padding: 9px 18px; border-radius: 999px;
          border: 1px solid var(--line); background: var(--surface); color: var(--ink-2);
          transition: all .18s ease;
        }
        .blog-tab:hover { color: var(--ink); border-color: var(--ink-3); }
        .blog-tab.is-on { background: var(--surface-ink); color: #fff; border-color: var(--surface-ink); }
        .blog-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 30px;
        }
        @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr; gap: 32px 24px; } }
        @media (max-width: 560px) { .blog-grid { grid-template-columns: 1fr; gap: 34px; } }
      `}</style>
    </div>
  );
}
