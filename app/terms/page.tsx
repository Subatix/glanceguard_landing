import type { Metadata } from "next";

import { LegalArticle } from "@/components/marketing/legal-article";

export const metadata: Metadata = {
  title: "Terms",
  description: "GlanceGuard licensing terms — DMG distribution, seat limits, refunds.",
};

export default function TermsPage() {
  return (
    <LegalArticle title="Terms of use">
      <p>
        By purchasing or installing GlanceGuard you agree you are at least 18, you
        understand the app uses the camera, and you will not misuse the license to
        circumvent export or surveillance laws in your jurisdiction.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        License grant
      </h2>
      <p>
        You receive a non-exclusive, non-transferable perpetual license to run the
        binary on <strong className="text-foreground font-medium">one Mac</strong>.
        The first successful validation binds a machine fingerprint hash stored
        beside your key; moving machines is not supported in v1.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Open source vs paid binary
      </h2>
      <p>
        Source may be published under Apache-2.0; the Stripe receipt covers a
        curated, signed build. You are free to compile from source yourself, but the
        commercially supported path is the artifact we ship on GitHub Releases.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Warranty disclaimer
      </h2>
      <p className="text-sm">
        Computer vision is probabilistic. GlanceGuard aims to reduce accidental
        disclosures; it does not guarantee zero false positives / negatives. Use
        layered controls (screen privacy filters, seating, etc.) where it matters.
      </p>
    </LegalArticle>
  );
}
