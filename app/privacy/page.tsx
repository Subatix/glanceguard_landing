import type { Metadata } from "next";

import { LegalArticle } from "@/components/marketing/legal-article";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What GlanceGuard’s marketing site & license servers collect · and what never leaves your Mac.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle title="Privacy & data practices">
      <p>
        This page covers the glanceguard.app web property and the HTTPS APIs
        that power licensing. The macOS binary has its own on-device behavior
        (documented alongside the OSS repo); here we only discuss network-touching
        systems.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        What stays on-device
      </h2>
      <p>
        Face frames, detector crops, embeddings, enrollment artifacts, alerts,
        and UI state belong to CoreML/ONNX + disk + Apple Keychain on the laptop.
        We do not receive those blobs on our servers — there is nowhere in this
        stack for them to go.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        What the commerce stack collects
      </h2>
      <ul>
        <li>
          <strong>Billing:</strong> Stripe Checkout holds card data inside Stripe’s
          PCI boundary. GlanceGuard only stores references your database needs
          (session id + payment intent + email copied from Stripe).
        </li>
        <li>
          <strong>Licensing API:</strong>{" "}
          <code className="font-mono-key text-foreground">POST</code>{" "}
          <code className="font-mono-key text-foreground">/api/license/validate</code>{" "}
          and{" "}
          <code className="font-mono-key text-foreground">
            /api/license/refresh
          </code>{" "}
          accept your license key and a salted machine fingerprint (hash-only on
          the wire). Responses include a JWT signed offline with Ed25519.
        </li>
        <li>
          <strong>Email:</strong> Resend transmits license delivery emails. Message
          content includes key + onboarding links plus whatever headers Resend emits
          automatically.
        </li>
      </ul>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Telemetry
      </h2>
      <p>
        Optional crash reporting stays default-off in-app per milestones. Turning
        it on may send breadcrumbs to our Sentry project — nothing from the CV
        pipeline attaches by design.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Contact / requests
      </h2>
      <p>
        Email the support route listed at /support if you want export or deletion of
        the tiny licensing row associated with Stripe’s customer email — subject to
        having enough identifying context to satisfy fraud checks.
      </p>
    </LegalArticle>
  );
}
