/** Crockford base32 alphabet (no I L O U) */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function encode(bytes: Uint8Array, len: number): string {
  let bits = 0;
  let buffer = 0;
  let out = "";
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(buffer >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    out += ALPHABET[(buffer << (5 - bits)) & 31];
  }
  return out.slice(0, len);
}

/** Format `GG1-XXXX-XXXX-XXXX`, 12 Crockford chars after prefix */
export function generateLicenseKeyDraft(): string {
  const entropy = new Uint8Array(10);
  crypto.getRandomValues(entropy);
  const body = encode(entropy, 12);
  if (body.length < 12) {
    throw new Error("unexpected_short_license_encoding");
  }
  const a = body.slice(0, 4);
  const b = body.slice(4, 8);
  const c = body.slice(8, 12);
  return `GG1-${a}-${b}-${c}`;
}

const KEY_RE = /^GG1-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/;

/** Uppercase / trim; returns normalized key or undefined */
export function normalizeLicenseKey(raw: string): string | undefined {
  const s = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!KEY_RE.test(s)) {
    return undefined;
  }
  return s;
}
