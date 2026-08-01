import type { MetadataRoute } from "next";

import { routes } from "@/lib/content/navigation";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.href),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.sitemapPriority,
  }));
}
