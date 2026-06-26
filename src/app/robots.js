import { SITE_URL } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
