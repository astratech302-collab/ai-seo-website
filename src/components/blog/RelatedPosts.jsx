import BlogGrid from "@/components/blog/BlogGrid";

/** Related-posts block — same card design as the blog index, no filter tabs. */
export default function RelatedPosts({ posts }) {
  if (!posts?.length) return null;
  return (
    <section
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)", paddingTop: 64, paddingBottom: 96 }}
    >
      <div className="wrap">
        <h2 className="h-tight" style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.025em", marginBottom: 36 }}>
          Related articles
        </h2>
        <BlogGrid posts={posts} showTabs={false} location="related" />
      </div>
    </section>
  );
}
