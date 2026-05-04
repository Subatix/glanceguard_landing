import Stripe from "stripe";

export function requireStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, {
    typescript: true,
  });
}

export function requireStripeWebhookSecret(): string {
  const s = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!s) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return s;
}

export function requireStripePriceId(): string {
  const id = process.env.STRIPE_PRICE_ID?.trim();
  if (!id) {
    throw new Error("STRIPE_PRICE_ID is not set");
  }
  return id;
}
