"use client";

import Link from "next/link";
import BlogCover from "@/components/blog/BlogCover";
import { track } from "@/lib/track";

/**
 * Blog card: cover + category label + title + excerpt. Used on the blog index
 * and in the related-posts grid (same design). `location` distinguishes the
 * Mixpanel event source ("blog_index" | "related").
 */
export default function BlogCard({ post, location = "blog_index" }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card"
      onClick={() => track(`link_clicked/blog_card_${location}`, { slug: post.slug })}
    >
      <BlogCover post={post} />
      <div className="blog-card-cat mono">{(post.tags && post.tags[0]) || post.category}</div>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-excerpt">{post.excerpt}</p>

      <style>{`
        .blog-card { display: block; text-decoration: none; color: inherit; }
        .blog-card :global(img), .blog-card > div[aria-hidden] {
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .blog-card:hover :global(img), .blog-card:hover > div[aria-hidden] {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }
        .blog-card-cat {
          font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--brand-600); margin-top: 16px;
        }
        .blog-card-title {
          font-size: 20px; font-weight: 600; letter-spacing: -0.02em;
          line-height: 1.25; margin-top: 8px; color: var(--ink);
        }
        .blog-card:hover .blog-card-title { color: var(--brand-600); }
        .blog-card-excerpt {
          font-size: 14.5px; color: var(--ink-2); line-height: 1.55; margin-top: 8px;
        }
      `}</style>
    </Link>
  );
}
