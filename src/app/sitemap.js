import { SITE_URL } from "@/config/site";
import { AGENTS } from "@/data/agents";
import { SERVICES } from "@/data/services";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact-us", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.5 },
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

  return [...staticRoutes, ...agentRoutes, ...serviceRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
