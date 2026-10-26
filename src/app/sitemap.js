import { SITE_URL, AI_SEO_ENABLED } from "@/config/site";
import { AGENTS } from "@/data/agents";
import { SERVICES } from "@/data/services";
import { getAllPosts } from "@/data/blog";
import { ADS_PATH } from "@/data/cro";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    ...(AI_SEO_ENABLED ? [{ path: "/pricing", changeFrequency: "monthly", priority: 0.8 }] : []),
    { path: "/contact-us", changeFrequency: "monthly", priority: 0.6 },
    ...(AI_SEO_ENABLED ? [{ path: "/blog", changeFrequency: "weekly", priority: 0.6 }] : []),
    { path: ADS_PATH, changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  ];

  const agentRoutes = AGENTS.map((a) => ({
    path: `/agents/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = AI_SEO_ENABLED ? await getAllPosts() : [];
  const blogRoutes = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: p.updated || p.date,
  }));

  return [...staticRoutes, ...agentRoutes, ...serviceRoutes, ...blogRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: r.lastModified ? new Date(r.lastModified) : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
