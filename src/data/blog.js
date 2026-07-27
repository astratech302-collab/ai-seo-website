// Blog content source.
//
// Posts are fetched from BLOG_JSON_URL (the admin-config S3 bucket, same pattern
// as pricing/FAQs). Until that file exists the site falls back to SAMPLE_POSTS
// below, so the blog renders fully today. Editing copy = edit the JSON (or these
// samples); no component changes needed.
//
// ── Post schema ────────────────────────────────────────────────────────────
// {
//   slug:     string    // URL segment, /blog/<slug>
//   title:    string
//   excerpt:  string     // 1–2 sentence card + meta description (~150-160 chars)
//   category: string     // post type shown as the card label fallback + breadcrumb
//   tags:     string[]   // drives related-posts (shared tag = related); tags[0] is the card label
//   date:     string     // ISO "YYYY-MM-DD"
//   author:   { name, role, avatar? }
//   cover:    { image? , theme?: "orange"|"ink"|"blue" }   // image wins; else branded gradient
//   markdown: string     // article body as GitHub-flavored Markdown (h2/h3/p/ul/ol/table/blockquote)
// }
// The "In this article" TOC is derived automatically from the `## ` headings.
import { BLOG_JSON_URL, ASSET_BASE } from "@/config/site";
import { slugify } from "@/lib/utils";

// Default author, assigned to every post.
export const AUTHOR = {
  name: "Karan Jain",
  role: "Founder, Geobuild",
  avatar: `${ASSET_BASE}/karan-jain.jpeg`,
};

const GEO_ARTICLE = `> **Quick insights**: AI search engines cite earned, third-party sources far more than your own website. To win Generative Engine Optimization (GEO), you need to earn authoritative coverage, structure content so machines can scan it, and tune your approach for each engine and language.

Buyers now start their research inside AI answers, not on a page of blue links. When someone asks ChatGPT, Perplexity, or Gemini for the best option in your category, the model writes one short answer and names only a few brands. Everyone else is invisible. Generative Engine Optimization (GEO) is how you make sure your brand is one of the names it picks.

This guide is for marketers, founders, and SEO teams who can see traffic patterns changing and want a clear, evidence-based playbook. We will cover what GEO is, how it differs from traditional SEO, what large-scale testing shows about how these engines actually source information, and the four moves that move the needle.

## What Is Generative Engine Optimization (GEO)?

Generative Engine Optimization (GEO) is the practice of getting your brand cited inside AI search answers from tools like ChatGPT, Perplexity, and Gemini. Instead of chasing a blue-link ranking, GEO focuses on becoming one of the few trusted sources an AI model quotes when it builds an answer for a buyer.

## GEO vs SEO: What Actually Changed

Traditional SEO optimized for a ranked list. You wanted to be link number one so a person would click. AI search collapses that list into a single written answer with a handful of citations. The click is often gone, and being cited matters more than being ranked.

The mechanics still rhyme. Crawlable pages, clean structure, and real authority help in both worlds. What changed is the target. You are no longer trying to win a position. You are trying to be the source the model trusts enough to quote.

| Dimension | Traditional SEO (Google) | Generative Engine Optimization (GEO) |
| --- | --- | --- |
| Output | A ranked list of links | One synthesized, cited answer |
| Main goal | Rank number one | Be a cited source |
| Source mix | Balanced brand, earned, social | Heavily earned media |
| What wins | The highest-ranking page | The most trusted, scannable source |
| Stability | Fairly stable per keyword | Varies by engine, language, phrasing |

## The Big Finding: AI Search Runs on Earned Media

The clearest pattern from large-scale testing is a heavy, systematic bias toward earned media. Earned media means third-party, independent coverage: reviews, roundups, expert articles, and reputable publications. Brand-owned pages (your own website) and social posts get far less weight inside AI answers than they do on Google.

The numbers are striking. In a study of 1,000 consumer ranking prompts across 10 product verticals, AI answers pulled most of their citations from earned sources. On United States automotive queries, ChatGPT sourced 81.9% of its citations from earned media, compared with 45.1% on Google. In consumer electronics, ChatGPT reached about 92% earned. In software, ChatGPT sat near 72.7% earned while Google gave brand-owned sites 43.7%. Social content nearly disappeared in AI answers, often landing at 0%.

> **Key insight**: On United States automotive queries, ChatGPT drew 81.9% of its citations from earned media, while brand-owned and social sources barely registered.

| Vertical (United States) | Google earned media | ChatGPT earned media | ChatGPT social |
| --- | --- | --- | --- |
| Automotive | 45.1% | 81.9% | 0% |
| Consumer electronics | around 55% | 92.1% | 0% |
| Software | 45.4% | 72.7% | near 0% |

Why does this happen? An AI model is trying to justify the answer it gives, and independent sources are easier to trust than a company describing itself. A third-party roundup that compares ten products reads as neutral. Your own landing page reads as a sales pitch. Social posts are noisy and hard to verify. So the model reaches for the source that looks most objective, and that source is almost always earned media.

The lesson is blunt. If your plan is built on publishing more pages on your own site and posting more on social, you are optimizing for the channels these engines trust least. See our [Answer Engine Optimization](/services/answer-engine-optimization) approach for how we shift that balance.

## Every AI Engine Is Different

Treating "AI search" as one thing is a mistake. The engines diverge on how diverse their sources are, how fresh their citations are, how stable they stay across languages, and how much they favor big brands.

| Engine | Earned-media bias | Cross-language reuse | Notable trait |
| --- | --- | --- | --- |
| ChatGPT | Strongest | Near zero | Switches site ecosystems by language |
| Claude | High | Highest | Transfers English authority across languages |
| Perplexity | High | Low, like Google | Most balanced source mix |
| Gemini | High | Mid-range (about 0.32 EN to DE) | Balanced localization |

ChatGPT shows the strongest earned-media bias and the most dramatic habit of switching to entirely different sites depending on the language of the query. Claude reuses its English sources across languages more than any other engine, so authority built in English can travel. Perplexity keeps the most balanced source mix and behaves a bit more like Google. Gemini sits in the middle on most measures.

Freshness and domain diversity vary too. Some engines refresh their sources quickly and pull from a wide set of domains, while others lean on a smaller, more repetitive list. That difference matters for planning. On an engine with narrow diversity, a single strong piece of coverage can carry a lot of weight, while a broad-diversity engine rewards being cited in many places. The only reliable way to know which pattern you face is to test each engine for your own category and track it over time.

## Language Changes The Game

Language is not a minor setting. It reshapes which sites an engine trusts. Measured as domain overlap across languages, Google stays low, roughly 0 to 0.11. ChatGPT sits close to zero, which means it effectively uses a different site ecosystem for each language. Gemini peaks around 0.32 for English and German. Claude reuses the most.

Localization patterns are uneven too. Japanese queries return more than 75% local-language sites. Chinese queries are an odd exception where English sources still dominate many results. If you operate in more than one market, translating your existing pages is not enough. You need local-language earned coverage in each market. Our [AI Search](/services/ai-seo) work is built around that reality.

## Phrasing Matters Less Than You Think

There is good news for anyone worried about matching exact wording. Across 7 paraphrase templates, changing how you phrase a question moved results less than changing the language. AI engines held domain overlaps in the 0.3 to 0.7 range across rewordings. Google stayed even more stable, from about 0.5 to 0.73, unless the paraphrase changed the underlying intent, where overlap dropped to roughly 0.1.

The takeaway is simple. Stop obsessing over exact-match keywords. Focus on the intent behind a question and on being the clearest answer to it. The earned-media preference held steady no matter how the question was phrased.

## Overcoming Big-Brand Bias

AI answers lean toward established brands, which is discouraging for niche players. But the data also shows an opening. For local service queries, the overlap between Google and AI results was tiny: 20.6% for home cleaning, 2.5% for auto repair, and just 0.1% for IT support. AI is surfacing a different set of sources than Google, which means the incumbents who dominate classic search have not locked up AI answers yet.

Niche and local players win by going narrow. Target specific, high-intent questions, earn focused third-party coverage in your category, and be the most scannable, most useful answer for that exact query. Precision beats brand size when the question is specific enough.

## What This Means For Your Budget

The data has a direct budget implication. If AI answers pull the majority of their citations from earned media, then spend that only touches your own website is working the weakest channel. That does not make brand pages useless. They still need to be clean, structured, and easy to quote, because the model checks them to confirm what it reads elsewhere. It means the balance should tip toward earning third-party coverage, building local-language authority, and measuring visibility engine by engine.

Think of it as a shift in role for your own site. In classic SEO your website carried the weight and fought for the ranking. In GEO your website becomes the place a model confirms what independent sources already say about you. The pages still matter, but the proof now lives outside your domain. Plan spend, staffing, and reporting around that change and you will stop pouring effort into the channels these engines quietly ignore.

## The GEO Playbook: 4 Moves That Work

1. **Dominate earned media.** Shift budget from publishing endless brand pages toward earning coverage on authoritative third-party sites. This is the single biggest lever in AI search.
2. **Engineer content for machine scannability.** Use comparison tables, clear pros and cons, explicit value statements, and Schema.org markup so a model can lift a clean answer. Aim to be easy for a machine to parse and justify.
3. **Go engine and language specific.** Tune your plan per engine and build local-language authority in each market rather than translating one set of pages.
4. **Cover the full lifecycle.** Create content for every stage, from awareness to consideration to decision to loyalty, so you stay present across the buyer journey.

> **Pro Tip**: Before you write another page on your own site, list the top ten third-party articles an AI already cites in your category. Winning a mention on those beats publishing ten new brand pages.

To see where you stand across engines today, our [Research Agent](/agents/research-agent) maps exactly which prompts cite you and which cite your competitors.

## Common GEO Mistakes

- Leaning on brand-owned pages and social posts, the two channels AI trusts least.
- Translating your website instead of earning local-language coverage.
- Treating all engines the same when their behavior differs sharply.
- Publishing dense walls of text a model cannot scan or quote.
- Chasing exact-match keywords instead of answering the real intent.

## Frequently Asked Questions

### What is Generative Engine Optimization (GEO)?
Generative Engine Optimization is the practice of getting your brand cited inside AI search answers from tools like ChatGPT, Perplexity, and Gemini. It replaces the old goal of ranking a link with the new goal of becoming a trusted source the model quotes.

### Is GEO replacing SEO?
Not entirely. GEO builds on SEO fundamentals like crawlability, structure, and authority. The difference is the target: instead of ranking in a list, you aim to be one of the few sources an AI answer cites. Both matter while search keeps shifting.

### How do I get cited by ChatGPT?
Earn coverage on authoritative third-party sites, since ChatGPT sourced about 81.9% of its citations from earned media in testing. Then structure your own pages with tables, clear value statements, and schema so a model can scan and justify quoting you.

### Does GEO work for small brands?
Yes. AI surfaces different sources than Google, and overlap on local queries fell as low as 0.1%. That gap is an opening. Niche players win by targeting specific questions and earning focused third-party coverage instead of competing on brand size.

### How is GEO different for each AI engine?
Engines diverge on source diversity, freshness, and language behavior. ChatGPT has the strongest earned-media bias and switches site ecosystems by language. Claude reuses English authority across languages. Perplexity keeps the most balanced mix. Gemini sits in the middle.

## Conclusion

AI search rewards a different kind of work than classic SEO. The evidence is consistent: Generative Engine Optimization is won by earning authoritative third-party coverage, structuring content so machines can scan and quote it, and adapting to each engine and language rather than treating them as one. Big-brand bias is real, but the low overlap between AI and Google results leaves room for focused players to break in.

Start by finding out where you already appear and where competitors are winning. [Book a free AI visibility audit](/contact-us) and we will show you exactly which prompts cite you today, and the plan to win the ones that matter.`;

export const SAMPLE_POSTS = [
  {
    slug: "generative-engine-optimization-win-ai-search",
    title: "Generative Engine Optimization: How to Win AI Search",
    excerpt:
      "Generative Engine Optimization (GEO) is how brands get cited by ChatGPT, Perplexity and Gemini. See what changed in AI search and the playbook to win it.",
    category: "Article",
    tags: ["GEO", "AI Search", "AEO"],
    date: "2026-07-27",
    author: AUTHOR,
    cover: { image: `${ASSET_BASE}/blog-geo-ai-search.svg` },
    markdown: GEO_ARTICLE,
  },
];

// ── Helpers (pure over a posts array) ────────────────────────────────────────

/** Attach a derived `toc` from the `## ` headings (markdown) or h2 body blocks. */
function normalizePost(p) {
  const tags = p.tags || [];
  if (p.markdown) {
    const toc = [];
    for (const line of p.markdown.split("\n")) {
      const m = /^##\s+(.+?)\s*$/.exec(line); // h2 only (## ), not ### or ####
      if (m) toc.push({ id: slugify(m[1]), text: m[1] });
    }
    return { ...p, tags, toc };
  }
  const body = (p.body || []).map((b) =>
    b.type === "h2" ? { ...b, id: b.id || slugify(b.text) } : b
  );
  const toc = body.filter((b) => b.type === "h2").map((b) => ({ id: b.id, text: b.text }));
  return { ...p, tags, body, toc };
}

function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * All posts, newest first. Fetches BLOG_JSON_URL; on any failure or empty
 * result, falls back to SAMPLE_POSTS so the blog always renders.
 */
export async function getAllPosts() {
  let posts = SAMPLE_POSTS;
  try {
    const res = await fetch(BLOG_JSON_URL, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const fetched = Array.isArray(data) ? data : data.posts;
      if (Array.isArray(fetched) && fetched.length) posts = fetched;
    }
  } catch (e) {
    console.error("[Blog] Falling back to sample posts:", e.message);
  }
  return sortByDateDesc(posts.map(normalizePost));
}

export function getPostBySlug(posts, slug) {
  return posts.find((p) => p.slug === slug) || null;
}

/** Other posts that share at least one tag, most-overlapping first. */
export function getRelatedPosts(posts, post, limit = 3) {
  const tags = new Set(post.tags || []);
  return posts
    .filter((p) => p.slug !== post.slug && (p.tags || []).some((t) => tags.has(t)))
    .map((p) => ({ p, overlap: (p.tags || []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Distinct categories present, for the index filter tabs. */
export function getCategories(posts) {
  return [...new Set(posts.map((p) => p.category).filter(Boolean))];
}
