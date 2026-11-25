import Reveal from "@/components/motion/Reveal";
import BlogGrid from "@/components/blog/BlogGrid";
import JsonLd from "@/components/seo/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, getCategories } from "@/data/blog";

export const metadata = {
  title: "Blog — AI Visibility and AI Search Playbooks | Geobuild",
  description:
    "Playbooks and field notes on AI visibility and AI search — how brands become the answer ChatGPT, Claude, Gemini and Perplexity recommend.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);

  return (
    <section style={{ paddingBottom: 78 }}>
      <JsonLd
        schema={[
          blogSchema({
            name: metadata.title,
            description: metadata.description,
            path: "/blog",
            posts,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <div className="wrap" style={{ paddingTop: "clamp(52px, 5vw, 76px)" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(38px, 5.4vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Latest blogs
          </h1>
        </Reveal>
        <div style={{ marginTop: 40 }}>
          {posts.length > 0 ? (
            <BlogGrid posts={posts} categories={categories} />
          ) : (
            <p style={{ fontSize: 17 }}>No posts yet. Check back soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
