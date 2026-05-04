import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError } from "@/lib/api/json-response";
import { licenses } from "@/lib/db/schema";
import { getDbInstance } from "@/lib/server/db-helper";
import { normalizeLicenseKey } from "@/lib/licensing/crockford";
import { hashMachineFingerprint } from "@/lib/licensing/machine-fingerprint";
import { signLicenseToken } from "@/lib/licensing/jwt-license";

const payloadSchema = z.object({
  license_key: z.string().min(8),
  machine_fingerprint: z.string().min(16).max(4096),
});

function requireLicensePubkey(): string {
  const k = process.env.LICENSE_PUBKEY?.trim();
  if (!k) {
    throw new Error("LICENSE_PUBKEY is not set");
  }
  return k;
}

async function issueJsonForRow(
  row: typeof licenses.$inferSelect,
  fingerprintHash: string,
) {
  const { token, expiresAtEpoch } = await signLicenseToken({
    licenseId: row.id,
    normalizedKey: row.licenseKey,
    machineFingerprintHash: fingerprintHash,
  });

  return NextResponse.json({
    ok: true,
    valid: true,
    signed_jwt: token,
    expires_at: new Date(expiresAtEpoch * 1000).toISOString(),
    license_pubkey: requireLicensePubkey(),
  });
}

async function validateBody(request: Request) {
  const raw = payloadSchema.safeParse(await request.json());
  if (!raw.success) {
    return {
      parseError: jsonError(400, "invalid_payload", "Request body validation failed."),
    } as const;
  }

  const normalized = normalizeLicenseKey(raw.data.license_key);
  if (!normalized) {
    return {
      parseError: jsonError(400, "invalid_license_key", "Malformed license key."),
    } as const;
  }

  return {
    body: raw.data,
    normalized,
    fingerprintHash: hashMachineFingerprint(raw.data.machine_fingerprint),
  } as const;
}

/** First-use activation + JWT; refresh heartbeat on repeats with same fingerprint. */
export async function handleLicenseValidatePost(request: Request) {
  const step = await validateBody(request);
  if ("parseError" in step) {
    return step.parseError;
  }

  const db = getDbInstance();
  const [row] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.licenseKey, step.normalized))
    .limit(1);

  if (!row) {
    return jsonError(404, "license_not_found", "Unknown license key.");
  }

  if (row.revokedAt ?? row.refundedAt) {
    return jsonError(403, "license_revoked", "This license is no longer valid.");
  }

  if (
    row.machineFingerprintHash !== null &&
    row.machineFingerprintHash !== step.fingerprintHash
  ) {
    return jsonError(
      403,
      "machine_mismatch",
      "Already activated on a different Mac.",
    );
  }

  const now = new Date();

  if (row.machineFingerprintHash === null) {
    await db
      .update(licenses)
      .set({
        machineFingerprintHash: step.fingerprintHash,
        activatedAt: now,
        lastSeenAt: now,
      })
      .where(eq(licenses.id, row.id));
  } else {
    await db
      .update(licenses)
      .set({ lastSeenAt: now })
      .where(eq(licenses.id, row.id));
  }

  const [next] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.id, row.id))
    .limit(1);

  if (!next) {
    return jsonError(500, "inconsistent_license", "License row missing.");
  }

  return issueJsonForRow(next, step.fingerprintHash);
}

/** Heartbeat-only: license must already be bound to fingerprint. */
export async function handleLicenseRefreshPost(request: Request) {
  const step = await validateBody(request);
  if ("parseError" in step) {
    return step.parseError;
  }

  const db = getDbInstance();

  const [row] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.licenseKey, step.normalized))
    .limit(1);

  if (!row) {
    return jsonError(404, "license_not_found", "Unknown license key.");
  }

  if (row.revokedAt ?? row.refundedAt) {
    return jsonError(403, "license_revoked", "This license is no longer valid.");
  }

  if (
    row.machineFingerprintHash === null ||
    row.machineFingerprintHash !== step.fingerprintHash
  ) {
    return jsonError(
      403,
      "not_activated",
      "Activate with /api/license/validate first.",
    );
  }

  const now = new Date();
  await db
    .update(licenses)
    .set({ lastSeenAt: now })
    .where(eq(licenses.id, row.id));

  const [next] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.id, row.id))
    .limit(1);

  if (!next) {
    return jsonError(500, "inconsistent_license", "License row missing.");
  }

  return issueJsonForRow(next, step.fingerprintHash);
}
