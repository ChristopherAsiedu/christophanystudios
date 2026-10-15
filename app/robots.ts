import type { MetadataRoute } from "next";
import { studio } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${studio.siteUrl}/sitemap.xml`,
  };
}
