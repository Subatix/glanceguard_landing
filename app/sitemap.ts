import type { MetadataRoute } from "next";

import { getMarketingCanonicalOrigin } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getMarketingCanonicalOrigin();
  const paths = [
    "/",
    "/download",
    "/privacy",
    "/refund",
    "/terms",
    "/support",
  ] as const;

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
