import Link from "next/link";
import type { Metadata } from "next";

import { LegalArticle } from "@/components/marketing/legal-article";
import {
  glanceguardRepoHomepage,
  supportContactHref,
} from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Support",
  description: "Help with GlanceGuard purchase, install, and licensing.",
};

export default function SupportPage() {
  const repo = glanceguardRepoHomepage();
  const issuesUrl = new URL(
    `${repo.pathname.replace(/\/?$/, "")}/issues`,
    `${repo.origin}`,
  );
  const contact = supportContactHref();

  return (
    <LegalArticle title="Support">
      <p>
        Humans answer. No widget maze. Start with the{" "}
        <Link className="font-medium text-foreground" href="/#faq">
          FAQ on the homepage
        </Link>
        , then escalate here.
      </p>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        Channels
      </h2>
      <ul>
        <li>
          <a href={contact}>Contact / ticket entry point</a>
        </li>
        <li>
          OSS + issues: <a href={issuesUrl.toString()}>{issuesUrl.toString()}</a>
        </li>
        <li>
          Receipt + license problems: include your Stripe{" "}
          <code className="font-mono-key text-foreground">session_id</code>{" "}
          (visible in{" "}
          <code className="font-mono-key text-foreground">/checkout/success</code>
          {""}
          URLs) inside the subject line where possible.
        </li>
      </ul>

      <h2 className="text-foreground gf-display mt-12 text-xl font-semibold tracking-tight">
        SLA
      </h2>
      <p className="text-sm">
        Tiny team. Aim for &lt;48h on weekdays, slower on holidays. If urgency is
        sensitive (legal, travel, press) say so in the first line.
      </p>
    </LegalArticle>
  );
}
