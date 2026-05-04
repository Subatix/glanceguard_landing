/**
 * Apply drizzle/0000_init_licenses.sql using Neon HTTP driver (no local psql).
 * Usage: NEON_DATABASE_URL=... node scripts/apply-init-sql.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.NEON_DATABASE_URL?.trim();
if (!url) {
  console.error("NEON_DATABASE_URL is required");
  process.exit(1);
}

const file = readFileSync(join(root, "drizzle", "0000_init_licenses.sql"), "utf8");
const statements = file
  .split(/;\s*\n/g)
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

const sql = neon(url);

for (const stmt of statements) {
  await sql.unsafe(`${stmt};`);
}

console.log(`apply-init-sql: executed ${statements.length} statement(s)`);
