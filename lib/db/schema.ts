import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";

export const licenses = pgTable(
  "licenses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    licenseKey: text("license_key").notNull().unique(),
    stripeSessionId: text("stripe_session_id").notNull().unique(),
    /** Correlate Stripe refund webhooks via `payment_intent` */
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    customerEmail: text("customer_email").notNull(),
    machineFingerprintHash: text("machine_fingerprint_hash"),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("licenses_session_idx").on(table.stripeSessionId)],
);

export type LicenseRow = typeof licenses.$inferSelect;
export type LicenseInsert = typeof licenses.$inferInsert;
