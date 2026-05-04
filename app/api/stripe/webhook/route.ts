import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { jsonError } from "@/lib/api/json-response";
import {
  fulfillPaidCheckoutSession,
  revokeLicenseForStripeRefund,
} from "@/lib/stripe/fulfillment";
import {
  requireStripe,
  requireStripeWebhookSecret,
} from "@/lib/stripe/stripe-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = requireStripe().webhooks.constructEvent(
      rawBody,
      request.headers.get("stripe-signature") ?? "",
      requireStripeWebhookSecret(),
    );
  } catch {
    return jsonError(400, "invalid_signature", "Webhook signature mismatch.");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await fulfillPaidCheckoutSession(session);
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await revokeLicenseForStripeRefund(charge);
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "webhook_error";
    return NextResponse.json(
      {
        ok: false,
        error: { code: "webhook_handler_failed", message: msg },
      },
      { status: 500 },
    );
  }
}
