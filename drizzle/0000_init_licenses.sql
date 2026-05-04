CREATE TABLE IF NOT EXISTS "licenses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "license_key" text NOT NULL,
  "stripe_session_id" text NOT NULL,
  "stripe_payment_intent_id" text,
  "customer_email" text NOT NULL,
  "machine_fingerprint_hash" text,
  "activated_at" timestamp with time zone,
  "last_seen_at" timestamp with time zone,
  "revoked_at" timestamp with time zone,
  "refunded_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "licenses_license_key_unique" UNIQUE ("license_key"),
  CONSTRAINT "licenses_stripe_session_id_unique" UNIQUE ("stripe_session_id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "licenses_stripe_payment_intent_id_unique"
  ON "licenses" ("stripe_payment_intent_id")
  WHERE "stripe_payment_intent_id" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "licenses_session_idx" ON "licenses" ("stripe_session_id");

CREATE INDEX IF NOT EXISTS "licenses_key_idx"
  ON "licenses" ("license_key")
  WHERE "revoked_at" IS NULL;
