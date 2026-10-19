/** @type {import('next').NextConfig} */
const nextConfig = {
  // Legal pages were first published at /privacy and /terms.
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
