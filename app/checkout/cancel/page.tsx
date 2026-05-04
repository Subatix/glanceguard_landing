import type { Metadata } from "next";

import { LegalArticle } from "@/components/marketing/legal-article";

export const metadata: Metadata = {
  robots: "noindex",
  title: "Checkout canceled",
};

export default function CheckoutCancelPage() {
  return (
    <LegalArticle title="Checkout canceled">
      <p>
        Stripe closed the window before the charge finalized — nothing billed, no key
        minted.
      </p>
      <p>
        When ready, revisit the homepage and tap{" "}
        <strong className="text-foreground font-medium">
          Buy GlanceGuard — $20
        </strong>{" "}
        again.
      </p>
    </LegalArticle>
  );
}
