import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing/marketing-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  robots: "noindex",
  title: "Purchase received",
};

type Search = { session_id?: string | string[] };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<Search>;
}) {
  const resolved = await searchParams;

  let sessionSnippet: string | null = null;
  if (
    resolved?.session_id &&
    typeof resolved.session_id === "string" &&
    resolved.session_id.startsWith("cs_")
  ) {
    sessionSnippet = resolved.session_id;
  }

  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-lg space-y-8 px-4 py-24">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-muted-foreground font-mono-key text-xs tracking-[0.14em] uppercase">
            Stripe · checkout.session.completed
          </p>
          <h1 className="gf-display text-foreground text-3xl font-semibold tracking-tight">
            Payment recorded — key en route.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Webhooks mint the{" "}
            <code className="font-mono-key text-foreground">GG1-…</code> license and
            Resend delivers it. If the inbox is quiet after a few minutes, check spam
            + billing email typos, then hit{" "}
            <Link className="text-foreground underline" href="/support">
              support
            </Link>
            .
          </p>
        </div>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">Debug receipt</CardTitle>
            <CardDescription>
              Keep this when emailing support — it maps straight to Stripe metadata.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Session id:{" "}
              <code className="font-mono-key text-foreground break-all">
                {sessionSnippet ?? "not present in URL — check Stripe dashboard"}
              </code>
            </p>
            <Separator />
            <p className="text-muted-foreground text-xs leading-relaxed">
              Local dev tip: run{" "}
              <code className="font-mono-key text-foreground">
                stripe listen --forward-to localhost:3000/api/stripe/webhook
              </code>{" "}
              so this page’s promise matches your machine.
            </p>
          </CardContent>
        </Card>
      </div>
    </MarketingShell>
  );
}
