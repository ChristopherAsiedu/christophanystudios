import type { MetadataRoute } from "next";
import { services, studio } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    "",
    "/portfolio",
    "/services",
    ...services.map(({ slug }) => `/services/${slug}`),
    "/about",
    "/contact",
    "/book",
    "/privacy",
  ].map((path) => ({
    url: `${studio.siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
