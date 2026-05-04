import type { Metadata } from "next";

import { LegalArticle } from "@/components/marketing/legal-article";

function supportEmailHref(): string | null {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();
  if (email?.includes("@")) {
    return `mailto:${email}`;
  }
  return null;
}

export const metadata: Metadata = {
  title: "Refunds",
  description:
    "GlanceGuard 30-day refunds — revoke license server-side to match Stripe events.",
};

export default function RefundPage() {
  const mail = supportEmailHref();

  return (
    <LegalArticle title="Refund policy">
      <p>
        Buying software without a demo is irritating. Stripe handles money; we mirror
        trust with plain language refunds.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        30-day window
      </h2>
      <p>
        If GlanceGuard is not what you hoped, contact support through{" "}
        <a href="/support">the support page</a>
        {mail ? (
          <>
            {" "}
            or{" "}
            <a href={mail}>email directly</a>
          </>
        ) : null}{" "}
        inside <strong className="text-foreground font-medium">30 days</strong>
        {""}
        from your Stripe receipt time.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Mechanics
      </h2>
      <ul>
        <li>
          Approved refunds originate in Stripe; you should see reversal activity in
          the same card timeline as any other Stripe merchant.
        </li>
        <li>
          The license row sets{" "}
          <code className="font-mono-key text-foreground">refunded_at</code>
          {""}
          and{" "}
          <code className="font-mono-key text-foreground">revoked_at</code>. JWTs
          become stale on the next validation / refresh handshake.
        </li>
      </ul>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Not covered
      </h2>
      <p className="text-sm">
        Refunds do not cover chargebacks abused for credential farming. If Stripe
        flags fraud, manual review kicks in instead of instantaneous automation —
        blunt, but beats enabling key resale rings.
      </p>
    </LegalArticle>
  );
}
