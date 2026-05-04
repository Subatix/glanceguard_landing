import { defineConfig } from "drizzle-kit";

const url = process.env.NEON_DATABASE_URL;
if (
  typeof url !== "string" ||
  url.length === 0 ||
  url === "__SET_IN_ENV__"
) {
  console.warn(
    "drizzle.config.ts: NEON_DATABASE_URL is unset; drizzle-kit migrate/generate need a connection string.",
  );
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: typeof url === "string" && url.length > 0 ? url : "postgresql://unset",
  },
  strict: true,
});
