import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/site";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes().map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
