import { SignJWT, importPKCS8 } from "jose";

const TTL_SECONDS_DEFAULT = 60 * 60 * 24 * 7;

function getPrivateKey(): string {
  const k = process.env.ED25519_PRIVATE_KEY?.trim();
  if (!k) {
    throw new Error("ED25519_PRIVATE_KEY_not_configured");
  }
  return k;
}

function getIssuer(): string {
  const site = process.env.SITE_URL?.trim();
  return site ?? "https://glanceguard.app";
}

/** EdDSA (Ed25519) JWT bound to license + machine hash (desktop Phase 11) */
export async function signLicenseToken(input: {
  licenseId: string;
  normalizedKey: string;
  machineFingerprintHash: string;
}): Promise<{ token: string; expiresAtEpoch: number }> {
  const pkcs8 = getPrivateKey();
  const alg = "EdDSA" as const;
  const key = await importPKCS8(pkcs8, alg);

  const now = Math.floor(Date.now() / 1000);
  const exp = now + TTL_SECONDS_DEFAULT;

  const token = await new SignJWT({
    lk: input.normalizedKey,
    mh: input.machineFingerprintHash,
    ver: 1,
  })
    .setProtectedHeader({ alg })
    .setSubject(input.licenseId)
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .setIssuer(getIssuer())
    .sign(key);

  return { token, expiresAtEpoch: exp };
}
