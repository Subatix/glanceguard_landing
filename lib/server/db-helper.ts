import { createDb } from "@/lib/db/client";

export function requireNeonDatabaseUrl(): string {
  const url = process.env.NEON_DATABASE_URL?.trim();
  if (!url) {
    throw new Error("NEON_DATABASE_URL is not set");
  }
  return url;
}

export function getDbInstance() {
  return createDb(requireNeonDatabaseUrl());
}
