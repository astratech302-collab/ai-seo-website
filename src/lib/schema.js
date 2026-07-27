/**
 * Schema.org JSON-LD builders — the single source of truth for structured data.
 *
 * Every builder is a PURE function that derives a schema object from data already
 * on the page (metadata, `src/data/*`, fetched content). Nothing here is
 * hardcoded per-page: pages import a builder and pass their own data, so the
 * markup always matches what the user actually sees. Render the result with the
 * <JsonLd> component (src/components/seo/JsonLd.jsx).
 *
 * Follows Google's structured-data guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/search-gallery
 * Validate with https://search.google.com/test/rich-results
 */
import { SITE_URL, ORG_NAME, ORG_DESCRIPTION, SOCIAL_LINKS } from "@/config/site";

// Stable @id anchors so nodes can reference each other across the @graph.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// App-Router serves app/icon.svg at /icon.svg.
const LOGO_URL = `${SITE_URL}/icon.svg`;

const abs = (path = "") => `${SITE_URL}${path}`;

/** The publishing entity. Emitted site-wide from the root layout. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: ORG_DESCRIPTION,
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

/** The website itself. Emitted site-wide from the root layout. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: ORG_NAME,
    description: ORG_DESCRIPTION,
    publisher: { "@id": ORG_ID },
  };
}

/** items: [{ name, path }] — ordered root → current page. */
export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A marketing offering (used for both service and agent detail pages). */
export function serviceSchema({ name, description, path, serviceType }) {
  return {
    "@type": "Service",
    name,
    description,
    ...(serviceType ? { serviceType } : {}),
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
  };
}

export function webPageSchema({ name, description, path }) {
  return {
    "@type": "WebPage",
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function contactPageSchema({ name, description, path }) {
  return {
    "@type": "ContactPage",
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
  };
}

/**
 * FAQ rich result. `faqs` are the same objects the FAQ section renders, so the
 * markup always mirrors the visible Q&A (Google requires this). Tolerates both
 * {q,a} and {question,answer} shapes.
 */
export function faqPageSchema(faqs = []) {
  const items = faqs.filter(Boolean);
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q ?? f.question,
      acceptedAnswer: { "@type": "Answer", text: f.a ?? f.answer },
    })),
  };
}

/**
 * A blog index. `posts` drives the BlogPosting entries — pass the real posts once
 * a data source exists and the entries generate themselves (no hardcoding).
 */
export function blogSchema({ name, description, path, posts = [] }) {
  const schema = {
    "@type": "Blog",
    name,
    description,
    url: abs(path),
    publisher: { "@id": ORG_ID },
  };
  if (posts.length) schema.blogPost = posts.map(blogPostingSchema);
  return schema;
}

/**
 * post: { slug, title, excerpt|description, date, updated?, image?|cover?, author? }
 * Tolerates the blog data shape (excerpt, cover.image, author object or string).
 */
export function blogPostingSchema(post) {
  const description = post.description || post.excerpt;
  const image = post.image || post.cover?.image;
  const authorName = typeof post.author === "string" ? post.author : post.author?.name;
  return {
    "@type": "BlogPosting",
    headline: post.title,
    ...(description ? { description } : {}),
    url: abs(`/blog/${post.slug}`),
    ...(post.date ? { datePublished: post.date } : {}),
    dateModified: post.updated || post.date,
    ...(image ? { image } : {}),
    author: authorName ? { "@type": "Person", name: authorName } : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
