/** @type {import('next').NextConfig} */
const nextConfig = {
  // Legal pages were first published at /privacy and /terms.
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      // Hidden SEO service and agent pages point to AI Visibility. Blog posts link to some.
      // Temporary on purpose: remove these if AI_SEO_ENABLED is switched back on.
      ...["/services/ai-seo", "/services/technical-seo", "/agents/:slug"].map(
        (source) => ({ source, destination: "/products/ai-visibility", permanent: false })
      ),
    ];
  },
};

export default nextConfig;
