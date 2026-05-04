import type Stripe from "stripe";
import { eq } from "drizzle-orm";

import { licenses } from "@/lib/db/schema";
import { getDbInstance } from "@/lib/server/db-helper";
import { generateLicenseKeyDraft } from "@/lib/licensing/crockford";
import { sendLicenseDeliveryEmail } from "@/lib/email/send-license-email";
import { requireStripe } from "@/lib/stripe/stripe-config";

function paymentIntentFromSession(
  session: Stripe.Checkout.Session,
): string | undefined {
  const pi = session.payment_intent;
  if (typeof pi === "string") {
    return pi;
  }
  if (typeof pi === "object" && pi?.id) {
    return pi.id;
  }
  return undefined;
}

/**
 * Stripe may deliver `checkout.session.completed` twice; DB unique on session id keeps this safe.
 */
export async function fulfillPaidCheckoutSession(eventSession: Stripe.Checkout.Session) {
  if (eventSession.mode !== "payment") {
    return;
  }
  /** Only paid sessions mint keys */
  if (
    eventSession.payment_status !== "paid" ||
    eventSession.status !== "complete"
  ) {
    return;
  }

  const stripe = requireStripe();
  let session = eventSession;

  if (!paymentIntentFromSession(session)) {
    session = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["payment_intent"],
    });
  }

  const paymentIntentId = paymentIntentFromSession(session);

  const db = getDbInstance();

  const [duplicate] = await db
    .select({ id: licenses.id })
    .from(licenses)
    .where(eq(licenses.stripeSessionId, session.id))
    .limit(1);
  if (duplicate) {
    return;
  }

  const emailRaw =
    session.customer_details?.email?.trim() ?? session.customer_email?.trim();

  if (!emailRaw?.length) {
    throw new Error("checkout_customer_email_missing");
  }

  /**
   * Try insert; Stripe retries + duplicate keys are tolerated by pre-check +
   * `license_key` unique collision retries.
   */
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const licenseKey = generateLicenseKeyDraft();

    const inserted = await db
      .insert(licenses)
      .values({
        licenseKey,
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntentId ?? null,
        customerEmail: emailRaw,
      })
      .onConflictDoNothing({ target: licenses.stripeSessionId })
      .returning({
        licenseKey: licenses.licenseKey,
        stripeSessionId: licenses.stripeSessionId,
      });

    if (!inserted[0]) {
      const [wonRace] = await db
        .select({ id: licenses.id })
        .from(licenses)
        .where(eq(licenses.stripeSessionId, session.id))
        .limit(1);
      if (wonRace) {
        return;
      }
      continue;
    }

    await sendLicenseDeliveryEmail({
      to: emailRaw,
      licenseKey: inserted[0].licenseKey,
    });
    return;
  }

  throw new Error("license_insert_exhausted");
}

export async function revokeLicenseForStripeRefund(charge: Stripe.Charge) {
  const pi =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;

  if (!pi) {
    return;
  }

  const db = getDbInstance();

  await db
    .update(licenses)
    .set({
      revokedAt: new Date(),
      refundedAt: new Date(),
    })
    .where(eq(licenses.stripePaymentIntentId, pi));
}
