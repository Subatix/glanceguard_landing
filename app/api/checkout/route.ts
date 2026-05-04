import { NextResponse } from "next/server";

import { jsonError } from "@/lib/api/json-response";
import { getSiteUrl } from "@/lib/site-url";
import {
  requireStripe,
  requireStripePriceId,
} from "@/lib/stripe/stripe-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const site = getSiteUrl();

  try {
    const stripe = requireStripe();
    const priceId = requireStripePriceId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/checkout/cancel`,
    });

    if (!session.url) {
      return jsonError(500, "checkout_no_url", "Stripe Checkout URL unavailable.");
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "checkout_failed";
    return jsonError(503, "checkout_failed", msg);
  }
}
