import { notFound } from "next/navigation";
import Link from "next/link";
import BlogCover from "@/components/blog/BlogCover";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleToc from "@/components/blog/ArticleToc";
import ShareRow from "@/components/blog/ShareRow";
import RelatedPosts from "@/components/blog/RelatedPosts";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import { SITE_URL } from "@/config/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = getPostBySlug(posts, slug);
  if (!post) return {};
  return {
    title: `${post.title} | Geobuild Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatDate(iso) {
  const [y, m, d] = (iso || "").split("-");
  if (!y) return "";
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

function Avatar({ author }) {
  if (author?.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={author.avatar} alt={`${author.name} avatar`} className="bp-avatar-img" />;
  }
  const initial = (author?.name || "G").trim()[0];
  return <span className="bp-avatar" aria-hidden>{initial}</span>;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = getPostBySlug(posts, slug);
  if (!post) notFound();

  const related = getRelatedPosts(posts, post, 3);
  const url = `${SITE_URL}/blog/${slug}`;

  return (
    <article>
      <JsonLd
        schema={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bp-hero">
        <div className="wrap bp-hero-grid">
          <div className="bp-hero-copy">
            <div className="bp-crumb">
              <Link href="/blog" className="bp-crumb-link">Blog</Link>
              <span className="bp-crumb-arrow" aria-hidden>→</span>
              <span>{post.category}</span>
            </div>
            <div className="bp-date mono">{formatDate(post.date)}</div>
            <h1 className="bp-title">{post.title}</h1>
            <div className="bp-author">
              <Avatar author={post.author} />
              <div>
                <div className="bp-author-name">{post.author?.name}</div>
                {post.author?.role && <div className="bp-author-role">{post.author.role}</div>}
              </div>
            </div>
          </div>
          <div className="bp-hero-media">
            <BlogCover post={post} big />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bp-body-wrap">
        <div className="wrap bp-body-grid">
          <aside className="bp-aside">
            <ShareRow url={url} title={post.title} />
            <ArticleToc toc={post.toc} />
          </aside>
          <div className="bp-main">
            <ArticleBody body={post.body} markdown={post.markdown} />
            {/* Share moves below the article on mobile (aside is hidden there). */}
            <div className="bp-mobile-share">
              <span className="bp-mobile-share-label mono">Share this article</span>
              <ShareRow url={url} title={post.title} />
            </div>
          </div>
        </div>
      </section>

      <RelatedPosts posts={related} />

      <style>{`
        .bp-hero {
          background: var(--surface-soft);
          border-bottom: 1px solid var(--line);
          padding: clamp(52px, 6vw, 84px) 0 clamp(40px, 4vw, 56px);
        }
        .bp-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .bp-crumb { display: flex; align-items: center; gap: 9px; font-size: 14px; color: var(--ink-3); }
        .bp-crumb-link { color: var(--ink-2); text-decoration: none; }
        .bp-crumb-link:hover { color: var(--brand-600); }
        .bp-crumb-arrow { opacity: 0.6; }
        .bp-date { font-size: 13px; color: var(--ink-3); margin-top: 26px; }
        .bp-title {
          font-size: clamp(30px, 4.4vw, 52px); font-weight: 600; letter-spacing: -0.03em;
          line-height: 1.08; margin-top: 14px; color: var(--ink);
        }
        .bp-author { display: flex; align-items: center; gap: 12px; margin-top: 28px; }
        .bp-avatar, .bp-avatar-img {
          width: 42px; height: 42px; border-radius: 999px; flex-shrink: 0;
        }
        .bp-avatar {
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--grad); color: #fff; font-weight: 700; font-size: 17px;
        }
        .bp-avatar-img { object-fit: cover; }
        .bp-author-name { font-size: 15px; font-weight: 600; color: var(--ink); }
        .bp-author-role { font-size: 13px; color: var(--ink-3); margin-top: 1px; }

        .bp-body-wrap { padding: clamp(44px, 5vw, 72px) 0; }
        .bp-body-grid { display: grid; grid-template-columns: 200px 1fr; gap: 56px; align-items: start; }
        /* min-width:0 lets the content column shrink so wide children (tables)
           scroll inside their own container instead of overflowing the page. */
        .bp-main { min-width: 0; }
        .bp-aside {
          position: sticky; top: 96px; display: flex; flex-direction: column; gap: 28px;
        }
        .bp-mobile-share { display: none; }
        .bp-mobile-share-label {
          display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: var(--ink-3); margin-bottom: 14px;
        }

        @media (max-width: 900px) {
          .bp-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .bp-body-grid { grid-template-columns: 1fr; gap: 32px; }
          /* Hide the sidebar (TOC + top share) on mobile; share goes to the bottom. */
          .bp-aside { display: none; }
          .bp-mobile-share { display: block; margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--line); }
        }
      `}</style>
    </article>
  );
}
