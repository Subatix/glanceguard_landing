/**
 * 1) Resolve Neon connection string via neonctl (project from .neon-project.json)
 * 2) Generate Ed25519 PKCS8 + SPKI pub PEM (Node crypto)
 * 3) Write / merge .env.local (preserves existing user lines it does not own)
 * 4) Apply drizzle/0000_init_licenses.sql
 *
 * Requires: neonctl on PATH, authenticated.
 */
import { execFileSync } from "node:child_process";
import { generateKeyPairSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const metaPath = join(root, ".neon-project.json");
const envPath = join(root, ".env.local");

const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const { orgId, projectId, databaseName } = meta;

function neonConnectionString() {
  const out = execFileSync(
    "neonctl",
    [
      "connection-string",
      "--org-id",
      orgId,
      "--project-id",
      projectId,
      "--database-name",
      databaseName,
    ],
    { encoding: "utf8" },
  ).trim();
  if (!out.startsWith("postgresql://")) {
    throw new Error(`unexpected connection-string output: ${out.slice(0, 40)}…`);
  }
  return out;
}

function generateLicenseKeyMaterial() {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const ed25519PrivatePkcs8 = privateKey.export({
    type: "pkcs8",
    format: "pem",
  });
  const ed25519PublicSpki = publicKey.export({
    type: "spki",
    format: "pem",
  });
  return { ed25519PrivatePkcs8, ed25519PublicSpki };
}

function mergeEnvLocal(neonUrl, keys) {
  const managedKeys = new Set([
    "NEON_DATABASE_URL",
    "ED25519_PRIVATE_KEY",
    "LICENSE_PUBKEY",
    "SITE_URL",
    "NEXT_PUBLIC_SITE_URL",
  ]);

  const nextLines = [];
  if (existsSync(envPath)) {
    const prev = readFileSync(envPath, "utf8").split("\n");
    for (const line of prev) {
      const key = line.split("=")[0]?.trim();
      if (key && managedKeys.has(key)) {
        continue;
      }
      nextLines.push(line);
    }
    while (nextLines.length && nextLines[nextLines.length - 1] === "") {
      nextLines.pop();
    }
  }

  const esc = (v) => JSON.stringify(v);
  nextLines.push(
    `# --- managed by scripts/bootstrap-neon-local.mjs ---`,
    `NEON_DATABASE_URL=${esc(neonUrl)}`,
    `ED25519_PRIVATE_KEY=${esc(keys.ed25519PrivatePkcs8)}`,
    `LICENSE_PUBKEY=${esc(keys.ed25519PublicSpki)}`,
    `SITE_URL=${esc("http://localhost:3000")}`,
    `NEXT_PUBLIC_SITE_URL=${esc("http://localhost:3000")}`,
    ``,
  );

  writeFileSync(envPath, nextLines.join("\n"), { mode: 0o600 });
}

const neonUrl = neonConnectionString();
const keys = generateLicenseKeyMaterial();
mergeEnvLocal(neonUrl, keys);

execFileSync(
  process.execPath,
  ["--env-file", envPath, join(root, "scripts", "apply-init-sql.mjs")],
  { stdio: "inherit", cwd: root },
);

console.log("\nbootstrap-neon-local: wrote .env.local (mode 0600) and applied SQL.");
