/** Public marketing base — used for OG + sitemap. Override with NEXT_PUBLIC_SITE_URL. */
export function getMarketingCanonicalOrigin(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (
    typeof raw === "string" &&
    (raw.startsWith("http://") || raw.startsWith("https://"))
  ) {
    const normalized = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    return new URL(normalized);
  }
  return new URL("https://glanceguard.app");
}
