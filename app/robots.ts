import type { MetadataRoute } from "next";

import { getMarketingCanonicalOrigin } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  const base = getMarketingCanonicalOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout/"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base.hostname,
  };
}
