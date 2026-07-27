import Reveal from "@/components/motion/Reveal";
import BlogGrid from "@/components/blog/BlogGrid";
import JsonLd from "@/components/seo/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, getCategories } from "@/data/blog";

export const metadata = {
  title: "Blog — AEO, GEO & AI Search Playbooks | Geobuild",
  description:
    "Playbooks and field notes on Answer Engine Optimization, GEO and AI search — how brands become the answer ChatGPT, Claude, Gemini and Perplexity recommend.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);

  return (
    <section className="section-pad" style={{ paddingTop: "clamp(52px, 5vw, 76px)" }}>
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
      <div className="wrap">
        <Reveal>
          <h1 style={{ fontSize: "clamp(38px, 5.4vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Latest blogs
          </h1>
        </Reveal>
        <div style={{ marginTop: 40 }}>
          <BlogGrid posts={posts} categories={categories} />
        </div>
      </div>
    </section>
  );
}
