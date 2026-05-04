export function glanceguardRepoHomepage(): URL {
  const raw = process.env.NEXT_PUBLIC_GLANCEGUARD_REPO_URL?.trim();
  if (
    typeof raw === "string" &&
    (raw.startsWith("http://") || raw.startsWith("https://"))
  ) {
    return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
  }
  return new URL("https://github.com/Subatix/glanceguard");
}

/** Latest GitHub Releases page (preferred DMG anchor until CDN env is wired). */
export function glanceguardReleasesLatestUrl(): URL {
  const homepage = glanceguardRepoHomepage();
  return new URL(`${homepage.pathname.replace(/\/$/, "")}/releases/latest`, homepage);
}

export function supportContactHref(): string {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();
  const subject = encodeURIComponent("GlanceGuard support");
  if (email?.includes("@")) {
    return `mailto:${email}?subject=${subject}`;
  }
  return `https://${glanceguardRepoHomepage().host}/issues`;
}
