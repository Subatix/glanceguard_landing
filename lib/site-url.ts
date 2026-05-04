/**
 * Canonical public site URL (no trailing slash). Prefer SITE_URL server-side,
 * NEXT_PUBLIC_SITE_URL client-side fallback.
 */
export function getSiteUrl(): string {
  const fromServer = process.env.SITE_URL?.trim();
  if (fromServer) {
    return fromServer.replace(/\/+$/, "");
  }
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromPublic) {
    return fromPublic.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}
