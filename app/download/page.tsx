import Link from "next/link";

import { LegalArticle } from "@/components/marketing/legal-article";
import { Separator } from "@/components/ui/separator";
import {
  glanceguardReleasesLatestUrl,
  supportContactHref,
} from "@/lib/site-links";

export const metadata = {
  title: "Download",
};

export default function DownloadPage() {
  const releasesUrl = glanceguardReleasesLatestUrl();

  return (
    <LegalArticle title="Download GlanceGuard">
      <p>
        Signed and notarized binaries ship on{" "}
        <a href={releasesUrl.toString()}>GitHub Releases (latest)</a>. That is
        the authoritative link until you set a direct asset URL in{" "}
        <code className="font-mono-key">NEXT_PUBLIC_DMG_DOWNLOAD_URL</code> (see{" "}
        <code className="font-mono-key">.env.example</code>).
      </p>

      <Separator className="my-6" />

      <h2 className="text-foreground gf-display text-xl font-semibold tracking-tight">
        Gatekeeper honesty
      </h2>
      <p>
        The first open on a new machine can still show Apple’s “cannot be
        verified” sheet if you downloaded via an unusual path. Right-click →
        Open once, or approve in <strong>Privacy &amp; Security</strong>.
        After notarization staples correctly, double-click should be enough on
        Sonoma+.
      </p>

      <ul>
        <li>DMG → drag GlanceGuard → Applications.</li>
        <li>Launch from Applications the first time.</li>
        <li>
          If prompted, allow camera + notifications when the in-app explainer
          tells you to — the macOS dialog should only follow the copy in the
          wizard.
        </li>
      </ul>

      <p className="text-sm">
        Paid customers also get the download link in their license email (
        <Link className="underline" href="/checkout/success">
          after checkout
        </Link>
        ) — same GitHub URL for v1.
      </p>

      <p className="text-sm">
        Need help? <a href={supportContactHref()}>Contact support</a>.
      </p>
    </LegalArticle>
  );
}
